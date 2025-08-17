import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, ProgressBar, Form } from "react-bootstrap";
import * as api from "./client";
import type { Question, Quiz } from "./types";

export default function QuizPreview() {
  const { qid } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string | number | boolean>>({});
  const [graded, setGraded] = useState<{ score: number; results: Record<string, boolean> } | null>(null);

  // Preview-only controls
  const [revealCorrect, setRevealCorrect] = useState(false);
  const [bypassCode, setBypassCode] = useState(false);

  // Keep student-like behavior
  const [step, setStep] = useState(0);
  const [access, setAccess] = useState("");
  const [remainingSec, setRemainingSec] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!qid) return;
      const q = await api.getQuiz(qid);
      setQuiz(q);
      setQuestions(await api.listQuestions(qid));
    })();
  }, [qid]);

  const total = useMemo(
    () => questions.reduce((acc, q) => acc + (q.points || 0), 0),
    [questions]
  );

  const requiresCode = !!quiz?.accessCode && quiz.accessCode.trim().length > 0;
  const unlocked =
    !requiresCode || bypassCode || (quiz && access.trim() === quiz.accessCode.trim());

  // Start timer only once when unlocked (simulate, do not auto-submit in preview)
  useEffect(() => {
    if (!quiz) return;
    if (unlocked && remainingSec == null && quiz.timeLimitMinutes && quiz.timeLimitMinutes > 0) {
      setRemainingSec(quiz.timeLimitMinutes * 60);
      setError(null);
    }
  }, [quiz, unlocked, remainingSec]);

  useEffect(() => {
    if (remainingSec == null) return;
    if (remainingSec <= 0) {
      setError("Time is up (preview).");
      return;
    }
    const id = setInterval(() => setRemainingSec((s) => (s == null ? s : s - 1)), 1000);
    return () => clearInterval(id);
  }, [remainingSec]);

  function resetAnswers() {
    setAnswers({});
    setGraded(null);
    setStep(0);
  }

  function gradeLocal() {
    let score = 0;
    const results: Record<string, boolean> = {};
    for (const q of questions) {
      const v = answers[q._id];
      let correct = false;
      if (q.type === "TRUE_FALSE") {
        correct = Boolean(v) === Boolean(q.correctBoolean);
      } else if (q.type === "FILL_BLANK") {
        const norm = String(v ?? "").trim().toLowerCase();
        correct = (q.acceptableAnswers || []).some(
          (ans) => String(ans).trim().toLowerCase() === norm
        );
      } else {
        let idx = -1;
        if (typeof v === "number") idx = v;
        else {
          const text = String(v ?? "");
          idx = (q.choices || []).findIndex((c) => c.text === text);
        }
        correct = idx >= 0 && !!q.choices?.[idx]?.correct;
      }
      results[q._id] = correct;
      if (correct) score += q.points || 0;
    }
    setGraded({ score, results });
  }

  async function togglePublish() {
    if (!qid || !quiz) return;
    const saved = quiz.published ? await api.unpublishQuiz(qid) : await api.publishQuiz(qid);
    setQuiz(saved);
  }

  if (!quiz) return null;

  const oneAtATime = quiz.oneQuestionAtATime;
  const toRender = oneAtATime ? [questions[step]].filter(Boolean) : questions;
  const progress = oneAtATime
    ? Math.round(((questions.length ? step : 0) / (questions.length || 1)) * 100)
    : Math.round((Object.keys(answers).length / (questions.length || 1)) * 100);

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3>Preview: {quiz.title}</h3>
        <div className="d-flex flex-wrap gap-2">
          <Form.Check
            type="switch"
            id="reveal-correct"
            label="Reveal correct answers"
            checked={revealCorrect}
            onChange={(e) => setRevealCorrect(e.currentTarget.checked)}
          />
          {requiresCode && (
            <Form.Check
              type="switch"
              id="bypass-code"
              label="Bypass access code"
              checked={bypassCode}
              onChange={(e) => setBypassCode(e.currentTarget.checked)}
            />
          )}
          <Button onClick={gradeLocal}>Grade Preview</Button>
          <Button variant="secondary" onClick={resetAnswers}>Reset Answers</Button>
          <Button variant={quiz.published ? "outline-secondary" : "success"} onClick={togglePublish}>
            {quiz.published ? "Unpublish" : "Publish"}
          </Button>
          <Button variant="outline-primary" onClick={() => navigate("../" + qid + "/edit")}>
            Edit Quiz
          </Button>
          <Button variant="secondary" onClick={() => navigate("../" + qid)}>
            Back to Details
          </Button>
        </div>
      </div>

      {/* ACCESS CODE FIRST */}
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
              <div className="text-muted small mt-2">
                Enter the access code or toggle “Bypass access code.”
              </div>
            </div>
          </Card>
        </>
      )}

      {/* Small left timer */}
      {unlocked && remainingSec != null && (
        <div className="small text-muted mb-2">
          ⏳ Time left:{" "}
          <strong>
            {Math.floor(remainingSec / 60)}:{String(remainingSec % 60).padStart(2, "0")}
          </strong>
        </div>
      )}

      {unlocked && error && <Alert variant="warning">{error}</Alert>}

      {unlocked && oneAtATime && <ProgressBar now={progress} className="mb-3" />}

      {/* Student-like question cards */}
      {unlocked && toRender.map((q, i) => (
        <Card key={q._id} className="mb-3">
          {/* grey header with pts on right */}
          <div className="bg-light px-3 py-2 border-bottom d-flex justify-content-between align-items-center">
            <div><strong>Q{oneAtATime ? step + 1 : i + 1}.</strong> {q.title}</div>
            <div className="text-muted small">{q.points} pts</div>
          </div>

          {/* question body */}
          <div className="p-3 border-bottom" dangerouslySetInnerHTML={{ __html: q.questionHtml || "" }} />

          {/* answers */}
          <div className="p-3">
            {q.type === "MCQ" && (
              <div className="vstack gap-2">
                {(q.choices || []).map((c, idx) => {
                  const isCorrect = !!c.correct;
                  return (
                    <label key={idx} className="form-check d-flex align-items-center gap-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`q-${q._id}`}
                        onChange={() => setAnswers((a) => ({ ...a, [q._id]: idx }))}
                      />
                      <span className="form-check-label">
                        {c.text}{" "}
                        {revealCorrect && isCorrect && <span role="img" aria-label="correct">✅</span>}
                      </span>
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
                  <span className="form-check-label">
                    True {revealCorrect && q.correctBoolean === true && "✅"}
                  </span>
                </label>
                <label className="form-check d-flex align-items-center gap-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`q-${q._id}`}
                    onChange={() => setAnswers((a) => ({ ...a, [q._id]: false }))}
                  />
                  <span className="form-check-label">
                    False {revealCorrect && q.correctBoolean === false && "✅"}
                  </span>
                </label>
              </div>
            )}

            {q.type === "FILL_BLANK" && (
              <input
                className="form-control"
                onChange={(e) => setAnswers((a) => ({ ...a, [q._id]: e.target.value }))}
              />
            )}

            {/* per-question correctness after Grade Preview */}
            {graded && (
              <div className="mt-2">
                {graded.results[q._id] ? (
                  <span className="text-success">Correct</span>
                ) : (
                  <span className="text-danger">Incorrect</span>
                )}
              </div>
            )}
          </div>
        </Card>
      ))}

      {/* one-at-a-time nav to mirror student view */}
      {unlocked && oneAtATime && (
        <div className="d-flex gap-2">
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
        </div>
      )}

      {/* Summary after grading */}
      {graded && (
        <Alert variant="info" className="mt-3">
          Preview score: <strong>{graded.score}</strong> / {total}
        </Alert>
      )}
    </div>
  );
}
