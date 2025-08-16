import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Alert, Button, Card, Col, Form, Nav, Row, Tab } from "react-bootstrap";
import * as api from "./client";
import { sumPoints } from "./types";
import type { Question, Quiz, QuizType, Role } from "./types";

const QUIZ_TYPES: { value: QuizType; label: string }[] = [
  { value: "GRADED_QUIZ", label: "Graded Quiz" },
  { value: "PRACTICE_QUIZ", label: "Practice Quiz" },
  { value: "GRADED_SURVEY", label: "Graded Survey" },
  { value: "UNGRADED_SURVEY", label: "Ungraded Survey" },
];

export default function QuizEditor() {
  const { qid } = useParams();
  const [search] = useSearchParams();
  const defaultTab = search.get("tab") || "details";

  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!qid) return;
      const q = await api.getQuiz(qid);
      setQuiz(q);
      setQuestions(await api.listQuestions(qid));
    })();
  }, [qid]);

  const totalPoints = useMemo(() => sumPoints(questions), [questions]);

  async function save(updates: Partial<Quiz>, redirect: "details" | "list" | null) {
    if (!qid) return;
    setSaving(true);
    setError(null);
    try {
      const saved = await api.updateQuiz(qid, updates);
      setQuiz(saved);
      if (redirect === "details") navigate("../" + qid);
      if (redirect === "list") navigate("../");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function publishAndExit() {
    if (!qid) return;
    await save({}, null);
    await api.publishQuiz(qid);
    navigate("../");
  }

  // -------- Question editing helpers --------
  async function addNewQuestion() {
    if (!qid) return;
    const created = await api.createQuestion(qid, {
      type: "MCQ",
      title: "New Question",
      points: 1,
      questionHtml: "",
      choices: [
        { text: "Choice 1", correct: true },
        { text: "Choice 2", correct: false },
      ],
    });
    setQuestions((prev) => [...prev, created]);
  }

  async function saveQuestion(q: Question) {
    const saved = await api.updateQuestion(q._id, q);
    setQuestions((prev) => prev.map((x) => (x._id === q._id ? saved : x)));
  }

  async function deleteQuestionLocal(q: Question) {
    if (!window.confirm("Delete this question?")) return;
    await api.deleteQuestion(q._id);
    setQuestions((prev) => prev.filter((x) => x._id !== q._id));
  }

  if (!quiz) return null;

  return (
    <div className="container mt-3">
      <h3>Edit Quiz</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Tab.Container defaultActiveKey={defaultTab}>
        <Row>
          <Col sm={12}>
            <Nav variant="tabs" className="mb-3">
              <Nav.Item><Nav.Link eventKey="details">Details</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="questions">Questions</Nav.Link></Nav.Item>
            </Nav>
          </Col>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="details">
                <Card className="p-3">
                  <Form>
                    <Row className="g-3">
                      <Col md={8}>
                        <Form.Group className="mb-2">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            value={quiz.title}
                            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                          />
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Description (HTML)</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={6}
                            value={quiz.description}
                            onChange={(e) =>
                              setQuiz({ ...quiz, description: e.target.value })
                            }
                            placeholder="<p>Describe the quiz…</p>"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-2">
                          <Form.Label>Quiz Type</Form.Label>
                          <Form.Select
                            value={quiz.quizType}
                            onChange={(e) =>
                              setQuiz({ ...quiz, quizType: e.target.value as any })
                            }
                          >
                            {QUIZ_TYPES.map((t) => (
                              <option key={t.value} value={t.value}>
                                {t.label}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                          <Form.Label>Assignment Group</Form.Label>
                          <Form.Select
                            value={quiz.assignmentGroup}
                            onChange={(e) =>
                              setQuiz({
                                ...quiz,
                                assignmentGroup: e.target.value as any,
                              })
                            }
                          >
                            <option>Quizzes</option>
                            <option>Exams</option>
                            <option>Assignments</option>
                            <option>Project</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Check
                          type="switch"
                          label="Shuffle Answers"
                          checked={quiz.shuffleAnswers}
                          onChange={(e) =>
                            setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
                          }
                        />
                        <Form.Group className="mt-2">
                          <Form.Label>Time Limit (minutes)</Form.Label>
                          <Form.Control
                            type="number"
                            value={quiz.timeLimitMinutes}
                            onChange={(e) =>
                              setQuiz({
                                ...quiz,
                                timeLimitMinutes: Number(e.target.value),
                              })
                            }
                          />
                        </Form.Group>
                        <Form.Check
                          className="mt-2"
                          type="switch"
                          label="Multiple Attempts"
                          checked={quiz.multipleAttempts}
                          onChange={(e) =>
                            setQuiz({ ...quiz, multipleAttempts: e.target.checked })
                          }
                        />
                        <Form.Group className="mt-2">
                          <Form.Label>How Many Attempts</Form.Label>
                          <Form.Control
                            type="number"
                            value={quiz.attemptsAllowed}
                            disabled={!quiz.multipleAttempts}
                            onChange={(e) =>
                              setQuiz({
                                ...quiz,
                                attemptsAllowed: Number(e.target.value),
                              })
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mt-2">
                          <Form.Label>Show Correct Answers (note)</Form.Label>
                          <Form.Control
                            value={quiz.showCorrectAnswers}
                            onChange={(e) =>
                              setQuiz({ ...quiz, showCorrectAnswers: e.target.value })
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mt-2">
                          <Form.Label>Access Code</Form.Label>
                          <Form.Control
                            value={quiz.accessCode}
                            onChange={(e) =>
                              setQuiz({ ...quiz, accessCode: e.target.value })
                            }
                          />
                        </Form.Group>
                        <Form.Check
                          className="mt-2"
                          type="switch"
                          label="One Question at a Time"
                          checked={quiz.oneQuestionAtATime}
                          onChange={(e) =>
                            setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })
                          }
                        />
                        <Form.Check
                          className="mt-2"
                          type="switch"
                          label="Webcam Required"
                          checked={quiz.webcamRequired}
                          onChange={(e) =>
                            setQuiz({ ...quiz, webcamRequired: e.target.checked })
                          }
                        />
                        <Form.Check
                          className="mt-2"
                          type="switch"
                          label="Lock Questions After Answering"
                          checked={quiz.lockAfterAnswering}
                          onChange={(e) =>
                            setQuiz({ ...quiz, lockAfterAnswering: e.target.checked })
                          }
                        />
                        <hr />
                        <Form.Group className="mt-2">
                          <Form.Label>Due date</Form.Label>
                          <Form.Control
                            type="datetime-local"
                            value={quiz.due ? quiz.due.slice(0, 16) : ""}
                            onChange={(e) =>
                              setQuiz({
                                ...quiz,
                                due: e.target.value
                                  ? new Date(e.target.value).toISOString()
                                  : ("" as any),
                              })
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mt-2">
                          <Form.Label>Available from</Form.Label>
                          <Form.Control
                            type="datetime-local"
                            value={quiz.availableFrom ? quiz.availableFrom.slice(0, 16) : ""}
                            onChange={(e) =>
                              setQuiz({
                                ...quiz,
                                availableFrom: e.target.value
                                  ? new Date(e.target.value).toISOString()
                                  : ("" as any),
                              })
                            }
                          />
                        </Form.Group>
                        <Form.Group className="mt-2">
                          <Form.Label>Until</Form.Label>
                          <Form.Control
                            type="datetime-local"
                            value={quiz.availableUntil ? quiz.availableUntil.slice(0, 16) : ""}
                            onChange={(e) =>
                              setQuiz({
                                ...quiz,
                                availableUntil: e.target.value
                                  ? new Date(e.target.value).toISOString()
                                  : ("" as any),
                              })
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                  <div className="d-flex gap-2 justify-content-end mt-3">
                    <Button variant="secondary" onClick={() => navigate("../")}>
                      Cancel
                    </Button>
                    <Button
                      disabled={saving}
                      variant="primary"
                      onClick={() => save(quiz!, "details")}
                    >
                      Save
                    </Button>
                    <Button disabled={saving} variant="success" onClick={publishAndExit}>
                      Save & Publish
                    </Button>
                  </div>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="questions">
                <Card className="p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <strong>Total Points:</strong> {totalPoints} • <strong>Questions:</strong>{" "}
                      {questions.length}
                    </div>
                    <div>
                      <Button onClick={addNewQuestion}>New Question</Button>
                    </div>
                  </div>

                  {questions.map((q) => (
                    <QuestionEditor
                      key={q._id}
                      q={q}
                      onSave={saveQuestion}
                      onDelete={deleteQuestionLocal}
                    />
                  ))}

                  <div className="d-flex gap-2 justify-content-end mt-3">
                    <Button variant="secondary" onClick={() => navigate("../")}>
                      Done
                    </Button>
                  </div>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

// Inline question editor
function QuestionEditor({
  q,
  onSave,
  onDelete,
}: {
  q: Question;
  onSave: (q: Question) => void;
  onDelete: (q: Question) => void;
}) {
  const [local, setLocal] = useState<Question>({ ...q });
  const [editing, setEditing] = useState(true);

  function set<K extends keyof Question>(key: K, value: Question[K]) {
    setLocal((prev) => ({ ...prev, [key]: value }));
  }

  function toggleCorrect(index: number) {
    setLocal((prev) => ({
      ...prev,
      choices: (prev.choices || []).map((c, i) => ({ ...c, correct: i === index })),
    }));
  }

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <strong>{local.title || "Untitled question"}</strong>
          <div className="d-flex gap-2">
            {editing ? (
              <>
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => {
                    onSave(local);
                    setEditing(false);
                  }}
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setLocal(q);
                    setEditing(false);
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="outline-primary" onClick={() => setEditing(true)}>
                  Edit
                </Button>
                <Button size="sm" variant="outline-danger" onClick={() => onDelete(local)}>
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>

        {editing ? (
          <div className="mt-3">
            <Row className="g-3">
              <Col md={8}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    value={local.title}
                    onChange={(e) => set("title", e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Question (HTML)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={local.questionHtml}
                    onChange={(e) => set("questionHtml", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    value={local.type}
                    onChange={(e) => set("type", e.target.value as any)}
                  >
                    <option value="MCQ">Multiple Choice</option>
                    <option value="TRUE_FALSE">True / False</option>
                    <option value="FILL_BLANK">Fill in the Blank</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Points</Form.Label>
                  <Form.Control
                    type="number"
                    value={local.points}
                    onChange={(e) => set("points", Number(e.target.value))}
                  />
                </Form.Group>
              </Col>
            </Row>

            {local.type === "MCQ" && (
              <div className="mt-3">
                <Form.Label>Choices</Form.Label>
                {(local.choices || []).map((c, i) => (
                  <InputRow key={i}>
                    <Form.Check
                      type="radio"
                      name={`mcq-${local._id}`}
                      checked={!!c.correct}
                      onChange={() => toggleCorrect(i)}
                    />
                    <Form.Control
                      value={c.text}
                      onChange={(e) =>
                        setLocal((prev) => ({
                          ...prev,
                          choices: (prev.choices || []).map((cc, ii) =>
                            ii === i ? { ...cc, text: e.target.value } : cc
                          ),
                        }))
                      }
                    />
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() =>
                        setLocal((prev) => ({
                          ...prev,
                          choices: (prev.choices || []).filter((_, ii) => ii !== i),
                        }))
                      }
                    >
                      Remove
                    </Button>
                  </InputRow>
                ))}
                <Button
                  size="sm"
                  className="mt-2"
                  onClick={() =>
                    setLocal((prev) => ({
                      ...prev,
                      choices: [...(prev.choices || []), { text: "New choice", correct: false }],
                    }))
                  }
                >
                  + Add Choice
                </Button>
              </div>
            )}

            {local.type === "TRUE_FALSE" && (
              <div className="mt-3">
                <Form.Label>Correct Answer</Form.Label>
                <div className="d-flex gap-3">
                  <Form.Check
                    type="radio"
                    label="True"
                    checked={!!local.correctBoolean}
                    onChange={() => set("correctBoolean", true)}
                  />
                  <Form.Check
                    type="radio"
                    label="False"
                    checked={local.correctBoolean === false}
                    onChange={() => set("correctBoolean", false)}
                  />
                </div>
              </div>
            )}

            {local.type === "FILL_BLANK" && (
              <div className="mt-3">
                <Form.Label>Acceptable Answers</Form.Label>
                {(local.acceptableAnswers || []).map((ans, i) => (
                  <InputRow key={i}>
                    <Form.Control
                      value={ans}
                      onChange={(e) =>
                        setLocal((prev) => ({
                          ...prev,
                          acceptableAnswers: (prev.acceptableAnswers || []).map((a, ii) =>
                            ii === i ? e.target.value : a
                          ),
                        }))
                      }
                    />
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() =>
                        setLocal((prev) => ({
                          ...prev,
                          acceptableAnswers: (prev.acceptableAnswers || []).filter(
                            (_, ii) => ii !== i
                          ),
                        }))
                      }
                    >
                      Remove
                    </Button>
                  </InputRow>
                ))}
                <Button
                  size="sm"
                  className="mt-2"
                  onClick={() =>
                    setLocal((prev) => ({
                      ...prev,
                      acceptableAnswers: [...(prev.acceptableAnswers || []), ""],
                    }))
                  }
                >
                  + Add Answer
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-2">
            <div
              dangerouslySetInnerHTML={{
                __html: local.questionHtml || "<em>No question text</em>",
              }}
            />
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

function InputRow({ children }: { children: React.ReactNode }) {
  return <div className="d-flex align-items-center gap-2 mb-2">{children}</div>;
}
