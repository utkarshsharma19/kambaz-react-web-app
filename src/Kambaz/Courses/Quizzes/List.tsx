import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Dropdown, Form, ListGroup, Spinner } from "react-bootstrap";
import * as api from "./client";
import { availabilityLabel, formatDateTime, sumPoints } from "./types";
import type { Question, Quiz, User } from "./types";
import * as userClient from "../../Account/client";

type Attempt = { score: number } | null; // keep whatever your real type is

export default function QuizList() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const [me, setMe] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<Quiz[]>([]);
  const [qMeta, setQMeta] = useState<Record<string, { points: number; count: number }>>({});
  const [lastByQuiz, setLastByQuiz] = useState<Record<string, Attempt>>({});
  const [sortKey, setSortKey] = useState<"title" | "due" | "availableFrom">("title");

  useEffect(() => {
    (async () => {
      try {
        const profile = await userClient.profile();
        setMe(profile);
      } catch {}
      try {
        if (!cid) return;
        const res = await api.listQuizzes(cid);
        setList(res);

        const entries: [string, { points: number; count: number }][] = await Promise.all(
          res.map(async (q) => {
            const qs: Question[] = await api.listQuestions(q._id);
            return [q._id, { points: sumPoints(qs), count: qs.length }];
          })
        );
        setQMeta(Object.fromEntries(entries));

        try {
          const attempts = await Promise.all(
            res.map((q) => api.getLastAttempt(q._id).catch(() => null))
          );
          const map: Record<string, Attempt> = {};
          res.forEach((q, i) => (map[q._id] = attempts[i]));
          setLastByQuiz(map);
        } catch {}
      } finally {
        setLoading(false);
      }
    })();
  }, [cid]);

  const isFaculty = me?.role === "FACULTY";

  const sorted = useMemo(() => {
    const copy = [...list];
    copy.sort((a, b) => {
      if (sortKey === "title") return a.title.localeCompare(b.title);
      const da = (a as any)[sortKey] ? new Date((a as any)[sortKey]).getTime() : 0;
      const db = (b as any)[sortKey] ? new Date((b as any)[sortKey]).getTime() : 0;
      return da - db;
    });
    return copy;
  }, [list, sortKey]);

  async function onAdd() {
    if (!cid) return;
    const created = await api.createQuiz(cid, { title: "New Quiz" });
    navigate(`../Quizzes/${created._id}/edit`);
  }

  async function togglePublish(q: Quiz) {
    const saved = q.published ? await api.unpublishQuiz(q._id) : await api.publishQuiz(q._id);
    setList((prev) => prev.map((x) => (x._id === q._id ? saved : x)));
  }

  async function onDelete(q: Quiz) {
    if (!window.confirm(`Delete quiz “${q.title}”?`)) return;
    await api.deleteQuiz(q._id);
    setList((prev) => prev.filter((x) => x._id !== q._id));
  }

  if (loading) return <Spinner animation="border" className="m-3" />;

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Quizzes</h3>
        <div className="d-flex gap-2">
          <Form.Select
            size="sm"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as any)}
            style={{ width: 220 }}
          >
            <option value="title">Sort by: Name</option>
            <option value="due">Sort by: Due date</option>
            <option value="availableFrom">Sort by: Available from</option>
          </Form.Select>
          {isFaculty && (
            <Button onClick={onAdd} variant="success">
              + Quiz
            </Button>
          )}
        </div>
      </div>

      {sorted.length === 0 ? (
        <Card className="p-4 text-center text-muted">
          No quizzes yet. {isFaculty ? "Click + Quiz to add one." : ""}
        </Card>
      ) : (
        // ⬇️ Green left border that runs the full height of the list
        <ListGroup
          className="rounded-3"
          style={{ borderLeft: "4px solid var(--bs-success)" }}
        >
          {sorted.map((q) => {
            const meta = qMeta[q._id];
            const availability = availabilityLabel(q);

            const detailParts: (string | null)[] = [
              `Availability: ${availability}`,
              q.due ? `Due: ${formatDateTime(q.due)}` : null,
              meta ? `Points: ${meta.points}` : null,
              meta ? `Questions: ${meta.count}` : null,
              me?.role === "STUDENT" ? `Score: ${lastByQuiz[q._id]?.score ?? "—"}` : null,
            ];
            const details = detailParts.filter(Boolean).join(" | ");

            return (
              <ListGroup.Item
                key={q._id}
                className="d-flex justify-content-between align-items-start"
              >
                {/* LEFT: green rocket + title + details (publish moved to right) */}
                <div className="d-flex align-items-start">
                  <span
                    className="me-2 rounded-circle bg-success d-inline-flex align-items-center justify-content-center"
                    style={{ width: 28, height: 28 }}
                    title="Quiz"
                  >
                    <span style={{ fontSize: 14, lineHeight: 1 }}>🚀</span>
                  </span>

                  <div>
                    <div className="d-flex align-items-center gap-2">
                      <a
                        onClick={() => navigate(`../Quizzes/${q._id}`)}
                        style={{ cursor: "pointer" }}
                        className="fw-semibold link-body-emphasis"
                      >
                        {q.title}
                      </a>
                    </div>
                    <div className="text-muted small mt-1">{details}</div>
                  </div>
                </div>

                {/* RIGHT: Publish/Unpublish button just left of the ⋮ with padding */}
                <div className="d-flex align-items-center">
                  {isFaculty && (
                    <Button
                      size="sm"
                      variant={q.published ? "outline-secondary" : "success"}
                      onClick={() => togglePublish(q)}
                      title={q.published ? "Unpublish" : "Publish"}
                      className="me-2 px-3"
                    >
                      {q.published ? "Unpublish" : "Publish"}
                    </Button>
                  )}

                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      size="sm"
                      className="border-0"
                      aria-label="Actions"
                    >
                      ⋮
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => navigate(`../Quizzes/${q._id}`)}>
                        Open
                      </Dropdown.Item>
                      {isFaculty && (
                        <Dropdown.Item onClick={() => navigate(`../Quizzes/${q._id}/edit`)}>
                          Edit
                        </Dropdown.Item>
                      )}
                      {isFaculty && (
                        <Dropdown.Item onClick={() => togglePublish(q)}>
                          {q.published ? "Unpublish" : "Publish"}
                        </Dropdown.Item>
                      )}
                      {isFaculty && <Dropdown.Divider />}
                      {isFaculty && (
                        <Dropdown.Item className="text-danger" onClick={() => onDelete(q)}>
                          Delete
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </div>
  );
}
