import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card } from "react-bootstrap";
import * as api from "./client";
import type { Question, Quiz } from "./types";

export default function QuizPreview() {
  const { qid } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string | number | boolean>>({});
  const [graded, setGraded] = useState<{ score: number; results: Record<string, boolean> } | null>(null);

  useEffect(() => {
    (async () => {
      if (!qid) return;
      setQuiz(await api.getQuiz(qid));
      setQuestions(await api.listQuestions(qid));
    })();
  }, [qid]);

  const total = useMemo(
    () => questions.reduce((acc, q) => acc + (q.points || 0), 0),
    [questions]
  );

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

  if (!quiz) return null;

  return (
    <div className="container mt-3">
      <h3>Preview: {quiz.title}</h3>
      {graded && (
        <Alert variant="info">
          Your preview score: <strong>{graded.score}</strong> / {total}
        </Alert>
      )}

      {questions.map((q, i) => (
        <Card key={q._id} className="mb-3 p-3">
          <div className="mb-1">
            <strong>Q{i + 1}.</strong> {q.title}{" "}
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
                  {graded && (c.correct ? <span>✅</span> : null)}
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

          {graded && (
            <div className="mt-2">
              {graded.results[q._id] ? (
                <span className="text-success">Correct</span>
              ) : (
                <span className="text-danger">Incorrect</span>
              )}
            </div>
          )}
        </Card>
      ))}

      <div className="d-flex gap-2">
        <Button onClick={gradeLocal}>Grade Preview</Button>
        <Button variant="secondary" onClick={() => navigate("../" + qid)}>
          Back to Details
        </Button>
      </div>
    </div>
  );
}
