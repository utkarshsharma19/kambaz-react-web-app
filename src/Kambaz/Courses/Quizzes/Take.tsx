import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, ProgressBar } from "react-bootstrap";
import * as api from "./client";
import type { Attempt, AttemptAnswerPayload, Question, Quiz } from "./types";


function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizTake() {
  const { qid } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string | number | boolean>>({});
  const [submitted, setSubmitted] = useState<Attempt | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [step, setStep] = useState(0);                          
  const [access, setAccess] = useState<string>("");            
  const [remainingSec, setRemainingSec] = useState<number | null>(null); // countdown


  const [choiceOrderMap, setChoiceOrderMap] = useState<Record<string, number[]>>({});

  useEffect(() => {
    (async () => {
      if (!qid) return;
      const q = await api.getQuiz(qid);
      const qsRaw = await api.listQuestions(qid);

  
      const qs = q.shuffleAnswers ? shuffle(qsRaw) : qsRaw;

      // If shuffle is enabled, also shuffle choices per MCQ question,
      // but keep a mapping from displayed index -> original index so grading stays correct.
      const map: Record<string, number[]> = {};
      if (q.shuffleAnswers) {
        qs.forEach((qq) => {
          if (qq.type === "MCQ" && Array.isArray(qq.choices) && qq.choices.length > 1) {
            const originalIdx = qq.choices.map((_, i) => i);
            map[qq._id] = shuffle(originalIdx);
          }
        });
      }

      setQuiz(q);
      setQuestions(qs);
      setChoiceOrderMap(map);
    })();
  }, [qid]);

  // Determine if access code is required and if the quiz is unlocked
  const requiresCode = !!quiz?.accessCode && quiz.accessCode.trim().length > 0;
  const unlocked = !requiresCode || (quiz && access.trim() === quiz.accessCode.trim());

  // Start timer only once, when the quiz is unlocked
  useEffect(() => {
    if (!quiz) return;
    if (unlocked && remainingSec == null && quiz.timeLimitMinutes && quiz.timeLimitMinutes > 0) {
      setRemainingSec(quiz.timeLimitMinutes * 60);
    }
  }, [quiz, unlocked, remainingSec]);

  // countdown timer: auto-submits when it hits zero
  useEffect(() => {
    if (remainingSec == null || submitted) return;
    if (remainingSec <= 0) {
      onSubmit();
      return;
    }
    const id = setInterval(() => setRemainingSec((s) => (s == null ? s : s - 1)), 1000);
    return () => clearInterval(id);
  }, [remainingSec, submitted]);

  const total = useMemo(
    () => questions.reduce((acc, q) => acc + (q.points || 0), 0),
    [questions]
  );

  async function onSubmit() {
    if (!qid) return;
    // Keep server-side guard for access code for safety
    if (quiz?.accessCode && access.trim() !== quiz.accessCode.trim()) {
      setError("Access code is incorrect");
      return;
    }
    const payload: AttemptAnswerPayload[] = Object.entries(answers).map(
      ([questionId, value]) => ({ questionId, value })
    );
    try {
      const a = await api.submitAttempt(qid, payload);
      setSubmitted(a);
      setError(null);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Submit failed");
    }
  }

  if (!quiz) return null;

  if (submitted) {
    return (
      <div className="container mt-3">
        <h3>{quiz.title} — Results</h3>
        <Alert variant="success">
          Score: <strong>{submitted.score}</strong> / {total}
        </Alert>
        {submitted.answers.map((ans, i) => {
          const q = questions.find((qq) => qq._id === ans.question) as Question;
          return (
            <Card
              key={ans.question}
              className="mb-3"
              style={{
                borderLeft: `6px solid ${ans.isCorrect ? "var(--bs-success)" : "var(--bs-danger)"}`,
              }}
            >
              <div className="bg-light px-3 py-2 border-bottom d-flex justify-content-between align-items-center">
                <div><strong>Q{i + 1}.</strong> {q?.title}</div>
                <div className="text-muted small">{q?.points} pts</div>
              </div>
              <div className="p-3 border-bottom" dangerouslySetInnerHTML={{ __html: q?.questionHtml || "" }} />
              <div className="p-3">{ans.isCorrect ? "✅ Correct" : "❌ Incorrect"}</div>
            </Card>
          );
        })}
        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={() => navigate("../" + qid)}>Back to Details</Button>
        </div>
      </div>
    );
  }

  const oneAtATime = quiz.oneQuestionAtATime;
  const toRender = oneAtATime ? [questions[step]].filter(Boolean) : questions;
  const progress = oneAtATime
    ? Math.round(((questions.length ? step : 0) / (questions.length || 1)) * 100)
    : Math.round(((Object.keys(answers).length) / (questions.length || 1)) * 100);

  return (
    <div className="container mt-3">
      <h3>Take Quiz: {quiz.title}</h3>

      {/* Access code FIRST; gate the quiz until correct */}
      {requiresCode && !unlocked && (
        <>
          {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
          <Card className="mb-3">
            <div className="bg-light px-3 py-2 border-bottom">
              <strong>Access Code Required</strong>
            </div>
            <div className="p-3">
              <div className="d-flex gap-2">
                <input
                  className="form-control"
                  placeholder="Enter access code"
                  value={access}
                  onChange={(e) => setAccess(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
                />
              </div>
              <div className="text-muted small mt-2">Enter the access code to unlock the quiz.</div>
            </div>
          </Card>
          <div className="d-flex gap-2">
            <Button variant="secondary" onClick={() => navigate("../" + qid)}>Back to Details</Button>
          </div>
          <br />
        </>
      )}

      {/* Small timer, left-aligned (shown only after unlocked and timer exists) */}
      {unlocked && remainingSec != null && (
        <div className="small text-muted mb-2">
          ⏳ Time left: <strong>{Math.floor(remainingSec / 60)}:{String(remainingSec % 60).padStart(2, "0")}</strong>
        </div>
      )}

      {/* Error (non-access) */}
      {unlocked && error && <Alert variant="danger">{error}</Alert>}

      {/* One-at-a-time progress */}
      {unlocked && oneAtATime && <ProgressBar now={progress} className="mb-3" />}

      {/* Question card layout with grey header, split sections */}
      {unlocked && toRender.map((q, i) => {
        // Determine the order in which to DISPLAY choices for this question
        const order = q.type === "MCQ"
          ? (choiceOrderMap[q._id] || (q.choices ? q.choices.map((_, idx) => idx) : []))
          : [];

        return (
          <Card key={q._id} className="mb-3">
            {/* Grey header */}
            <div className="bg-light px-3 py-2 border-bottom d-flex justify-content-between align-items-center">
              <div><strong>Q{oneAtATime ? step + 1 : i + 1}.</strong> {q.title}</div>
              <div className="text-muted small">{q.points} pts</div>
            </div>

            {/* Question text section */}
            <div className="p-3 border-bottom" dangerouslySetInnerHTML={{ __html: q.questionHtml || "" }} />

            {/* Answers section */}
            <div className="p-3">
              {q.type === "MCQ" && (
                <div className="vstack gap-2">
                  {order.map((origIdx) => {
                    const c = q.choices?.[origIdx];
                    if (!c) return null;
                    return (
                      <label key={origIdx} className="form-check d-flex align-items-center gap-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`q-${q._id}`}
                          // Store ORIGINAL index in the answer so server grading stays correct
                          onChange={() => setAnswers((a) => ({ ...a, [q._id]: origIdx }))}
                        />
                        <span className="form-check-label">{c.text}</span>
                      </label>
                    );
                  })}
                </div>
              )}

              {q.type === "TRUE_FALSE" && (
                <div className="d-flex gap-4">
                  <label className="form-check d-flex align-items-center gap-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`q-${q._id}`}
                      onChange={() => setAnswers((a) => ({ ...a, [q._id]: true }))}
                    />
                    <span className="form-check-label">True</span>
                  </label>
                  <label className="form-check d-flex align-items-center gap-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`q-${q._id}`}
                      onChange={() => setAnswers((a) => ({ ...a, [q._id]: false }))}
                    />
                    <span className="form-check-label">False</span>
                  </label>
                </div>
              )}

              {q.type === "FILL_BLANK" && (
                <input
                  className="form-control"
                  onChange={(e) => setAnswers((a) => ({ ...a, [q._id]: e.target.value }))}
                />
              )}
            </div>
          </Card>
        );
      })}

      {/* Navigation (for one-at-a-time) */}
      {unlocked && (
        <div className="d-flex gap-2">
          {oneAtATime && (
            <>
              <Button
                variant="secondary"
                disabled={step === 0 || quiz.lockAfterAnswering}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                Back
              </Button>
              <Button
                variant="secondary"
                disabled={step >= questions.length - 1}
                onClick={() => setStep((s) => Math.min(questions.length - 1, s + 1))}
              >
                Next
              </Button>
            </>
          )}
        </div>
      )}

      {/* Submit on its own line and grey */}
      {unlocked && (
        <div className="mt-3">
          <Button variant="secondary" onClick={onSubmit}>Submit</Button>
        </div>
      )}
    </div>
  );
}
