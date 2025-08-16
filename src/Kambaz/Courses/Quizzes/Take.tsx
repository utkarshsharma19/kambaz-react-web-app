import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, ProgressBar } from "react-bootstrap";
import * as api from "./client";
import type { Attempt, AttemptAnswerPayload, Question, Quiz } from "./types";

export default function QuizTake() {
  const { qid } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string | number | boolean>>({});
  const [submitted, setSubmitted] = useState<Attempt | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0); // for one-at-a-time
  const [access, setAccess] = useState<string>("");
  const [remainingSec, setRemainingSec] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      if (!qid) return;
      const q = await api.getQuiz(qid);
      setQuiz(q);
      setQuestions(await api.listQuestions(qid));
      if (q.timeLimitMinutes && q.timeLimitMinutes > 0) {
        setRemainingSec(q.timeLimitMinutes * 60);
      }
    })();
  }, [qid]);

  // countdown timer: auto-submits when it hits zero
  useEffect(() => {
    if (remainingSec == null || submitted) return;
    if (remainingSec <= 0) {
      onSubmit();
      return;
    }
    const id = setInterval(
      () => setRemainingSec((s) => (s == null ? s : s - 1)),
      1000
    );
    return () => clearInterval(id);
  }, [remainingSec, submitted]);

  const total = useMemo(
    () => questions.reduce((acc, q) => acc + (q.points || 0), 0),
    [questions]
  );

  async function onSubmit() {
    if (!qid) return;
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
              className="mb-3 p-3"
              style={{
                borderLeft: `6px solid ${
                  ans.isCorrect ? "var(--bs-success)" : "var(--bs-danger)"
                }`,
              }}
            >
              <div className="mb-1">
                <strong>Q{i + 1}.</strong> {q?.title}{" "}
                <span className="text-muted">({q?.points} pts)</span>
              </div>
              <div
                className="mb-2"
                dangerouslySetInnerHTML={{ __html: q?.questionHtml || "" }}
              />
              <div>{ans.isCorrect ? "✅ Correct" : "❌ Incorrect"}</div>
            </Card>
          );
        })}
        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={() => navigate("../" + qid)}>
            Back to Details
          </Button>
        </div>
      </div>
    );
  }

  const oneAtATime = quiz.oneQuestionAtATime;
  const toRender = oneAtATime ? [questions[step]].filter(Boolean) : questions;
  const progress = oneAtATime
    ? Math.round((step / questions.length) * 100)
    : Math.round((Object.keys(answers).length / questions.length) * 100);

  return (
    <div className="container mt-3">
      <h3>Take Quiz: {quiz.title}</h3>

      {remainingSec != null && (
        <Alert variant={remainingSec < 60 ? "warning" : "secondary"}>
          Time left:{" "}
          <strong>
            {Math.floor(remainingSec / 60)}:{String(remainingSec % 60).padStart(2, "0")}
          </strong>
        </Alert>
      )}

      {quiz.accessCode && (
        <Alert variant="secondary">
          This quiz requires an access code.
          <div className="d-flex gap-2 mt-2">
            <input
              className="form-control"
              placeholder="Enter access code"
              value={access}
              onChange={(e) => setAccess(e.target.value)}
            />
          </div>
        </Alert>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {oneAtATime && <ProgressBar now={progress} className="mb-3" />}

      {toRender.map((q, i) => (
        <Card key={q._id} className="mb-3 p-3">
          <div className="mb-1">
            <strong>Q{oneAtATime ? step + 1 : i + 1}.</strong> {q.title}{" "}
            <span className="text-muted">({q.points} pts)</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: q.questionHtml || "" }} />
          {q.type === "MCQ" && (
            <div className="mt-2 d-flex flex-column gap-2">
              {(q.choices || []).map((c, idx) => (
                <label key={idx} className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    name={`q-${q._id}`}
                    onChange={() => setAnswers((a) => ({ ...a, [q._id]: idx }))}
                  />
                  <span>{c.text}</span>
                </label>
              ))}
            </div>
          )}
          {q.type === "TRUE_FALSE" && (
            <div className="mt-2 d-flex gap-3">
              <label className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name={`q-${q._id}`}
                  onChange={() => setAnswers((a) => ({ ...a, [q._id]: true }))}
                />{" "}
                True
              </label>
              <label className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name={`q-${q._id}`}
                  onChange={() => setAnswers((a) => ({ ...a, [q._id]: false }))}
                />{" "}
                False
              </label>
            </div>
          )}
          {q.type === "FILL_BLANK" && (
            <div className="mt-2">
              <input
                className="form-control"
                onChange={(e) => setAnswers((a) => ({ ...a, [q._id]: e.target.value }))}
              />
            </div>
          )}
        </Card>
      ))}

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
        <Button onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  );
}
