// QuizEditor.tsx
// Adds a dependency-free rich HTML editor (contentEditable + Bootstrap toolbar)
// for BOTH the quiz description and each question's HTML.

import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Alert, Button, Card, Col, Dropdown, Form, Nav, Row, Tab } from "react-bootstrap";
import * as api from "./client";
import { sumPoints } from "./types";
import type { Question, Quiz, QuizType } from "./types";

/* ============================= Types ============================= */

const QUIZ_TYPES: { value: QuizType; label: string }[] = [
  { value: "GRADED_QUIZ", label: "Graded Quiz" },
  { value: "PRACTICE_QUIZ", label: "Practice Quiz" },
  { value: "GRADED_SURVEY", label: "Graded Survey" },
  { value: "UNGRADED_SURVEY", label: "Ungraded Survey" },
];

type Student = {
  _id: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
};

/* ====================== Dependency-free Editor ====================== */

function RichHtmlEditor({
  value,
  onChange,
  placeholder = "Type here…",
  minHeight = 160,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const savedSelection = useRef<Range | null>(null);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (el.innerHTML !== (value || "")) el.innerHTML = value || "";
  }, [value]);

  function saveSelection() {
    const sel = window.getSelection?.();
    if (!sel || sel.rangeCount === 0) return;
    savedSelection.current = sel.getRangeAt(0);
  }
  function restoreSelection() {
    if (!savedSelection.current) return;
    const sel = window.getSelection?.();
    if (!sel) return;
    sel.removeAllRanges();
    sel.addRange(savedSelection.current);
  }
  function focusEditor() {
    editorRef.current?.focus();
  }
  function exec(command: string, val?: string) {
    focusEditor();
    restoreSelection();
    document.execCommand(command, false, val);
    onChange(editorRef.current?.innerHTML || "");
    saveSelection();
  }
  function insertHTML(html: string) {
    focusEditor();
    restoreSelection();
    document.execCommand("insertHTML", false, html);
    onChange(editorRef.current?.innerHTML || "");
    saveSelection();
  }
  function handleInput() {
    onChange(editorRef.current?.innerHTML || "");
  }
  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    insertHTML(text.replace(/\n/g, "<br>"));
  }
  function promptLink() {
    const url = window.prompt("Enter URL:", "https://");
    if (url) exec("createLink", url);
  }
  function promptImage() {
    const url = window.prompt("Image URL:", "https://");
    if (url) exec("insertImage", url);
  }
  function promptTable() {
    const rows = Number(window.prompt("Rows:", "2") || "0");
    const cols = Number(window.prompt("Columns:", "2") || "0");
    if (!rows || !cols) return;
    const cells = Array.from({ length: cols })
      .map(() => "<td style='border:1px solid #dee2e6; padding:6px;'> </td>")
      .join("");
    const trs = Array.from({ length: rows })
      .map(() => `<tr>${cells}</tr>`)
      .join("");
    insertHTML(
      `<table style="border-collapse:collapse; width:100%; margin:6px 0; border:1px solid #dee2e6;">
         ${trs}
       </table>`
    );
  }

  return (
    <div className="border rounded">
      <div className="d-flex flex-wrap align-items-center gap-2 p-2 border-bottom bg-light">
        {/* Undo/Redo */}
        <div className="btn-group">
          <Button size="sm" variant="outline-secondary" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("undo")}>Undo</Button>
          <Button size="sm" variant="outline-secondary" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("redo")}>Redo</Button>
        </div>

        {/* Font family */}
        <Form.Select
          size="sm"
          style={{ width: 160 }}
          onMouseDown={(e) => e.preventDefault()}
          onChange={(e) => exec("fontName", e.currentTarget.value)}
          defaultValue=""
        >
          <option value="" disabled>Font</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Verdana">Verdana</option>
        </Form.Select>

        {/* Font size (1-7) */}
        <Form.Select
          size="sm"
          style={{ width: 120 }}
          onMouseDown={(e) => e.preventDefault()}
          onChange={(e) => exec("fontSize", e.currentTarget.value)}
          defaultValue=""
        >
          <option value="" disabled>Size</option>
          <option value="2">Small</option>
          <option value="3">Normal</option>
          <option value="4">Large</option>
          <option value="5">X-Large</option>
        </Form.Select>

        {/* B/I/U/S */}
        <div className="btn-group">
          <Button size="sm" variant="outline-secondary" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("bold")}>B</Button>
          <Button size="sm" variant="outline-secondary" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("italic")}><em>I</em></Button>
          <Button size="sm" variant="outline-secondary" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("underline")}><u>U</u></Button>
          <Button size="sm" variant="outline-secondary" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("strikeThrough")}><s>S</s></Button>
        </div>

        {/* Colors */}
        <div className="d-flex align-items-center gap-1">
          <Form.Label className="small mb-0">Text</Form.Label>
          <Form.Control type="color" size="sm" style={{ width: 36, height: 28, padding: 2 }}
            onMouseDown={(e) => e.preventDefault()} onChange={(e) => exec("foreColor", e.currentTarget.value)} />
        </div>
        <div className="d-flex align-items-center gap-1">
          <Form.Label className="small mb-0">Highlight</Form.Label>
          <Form.Control type="color" size="sm" style={{ width: 36, height: 28, padding: 2 }}
            onMouseDown={(e) => e.preventDefault()} onChange={(e) => exec("hiliteColor", e.currentTarget.value)} />
        </div>

        {/* Alignment */}
        <div className="btn-group">
          <Button size="sm" variant="outline-secondary" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("justifyLeft")}>Left</Button>
          <Button size="sm" variant="outline-secondary" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("justifyCenter")}>Center</Button>
          <Button size="sm" variant="outline-secondary" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("justifyRight")}>Right</Button>
          <Button size="sm" variant="outline-secondary" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("justifyFull")}>Justify</Button>
        </div>

        {/* Lists / Indent */}
        <div className="btn-group">
          <Button size="sm" variant="outline-secondary" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("insertUnorderedList")}>• List</Button>
          <Button size="sm" variant="outline-secondary" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("insertOrderedList")}>1. List</Button>
          <Button size="sm" variant="outline-secondary" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("outdent")}>Outdent</Button>
          <Button size="sm" variant="outline-secondary" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("indent")}>Indent</Button>
        </div>

        {/* Insert */}
        <Dropdown>
          <Dropdown.Toggle size="sm" variant="outline-secondary">Insert</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onMouseDown={(e) => e.preventDefault()} onClick={promptLink}>Link…</Dropdown.Item>
            <Dropdown.Item onMouseDown={(e) => e.preventDefault()} onClick={promptImage}>Image…</Dropdown.Item>
            <Dropdown.Item onMouseDown={(e) => e.preventDefault()} onClick={promptTable}>Table…</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onMouseDown={(e) => e.preventDefault()} onClick={() => exec("formatBlock", "BLOCKQUOTE")}>Blockquote</Dropdown.Item>
            <Dropdown.Item onMouseDown={(e) => e.preventDefault()} onClick={() => exec("formatBlock", "PRE")}>Code Block</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Clear */}
        <div className="btn-group">
          <Button size="sm" variant="outline-secondary" onMouseDown={(e) => e.preventDefault()} onClick={() => exec("removeFormat")}>Clear</Button>
        </div>
      </div>

      <div
        ref={editorRef}
        className="p-2"
        style={{ minHeight, outline: "none" }}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={saveSelection}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        onPaste={handlePaste}
        data-placeholder={placeholder}
      />
      <style>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #adb5bd;
        }
      `}</style>
    </div>
  );
}

/* ============================= Main Page ============================= */

export default function QuizEditor() {
  const { qid } = useParams();
  const [search] = useSearchParams();
  const defaultTab = search.get("tab") || "details";

  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Assign panel state
  const [assignScope, setAssignScope] = useState<"EVERYONE" | "SOME">("EVERYONE");
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      if (!qid) return;
      const q = await api.getQuiz(qid);
      setQuiz(q);
      setQuestions(await api.listQuestions(qid));
    })();
  }, [qid]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/users?role=STUDENT", { credentials: "include" });
        const data = await res.json();
        setStudents(Array.isArray(data) ? data : []);
      } catch {
        setStudents([]);
      }
    })();
  }, []);

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
      return saved;
    } catch (e: any) {
      setError(e?.response?.data?.message || "Save failed");
      throw e;
    } finally {
      setSaving(false);
    }
  }

  async function publishAndExit() {
    if (!qid || !quiz) return;
    setSaving(true);
    setError(null);
    try {
      const saved = await api.updateQuiz(qid, quiz); // persist current edits
      setQuiz(saved);
      await api.publishQuiz(qid);                     // then publish
      navigate("../");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Save & publish failed");
    } finally {
      setSaving(false);
    }
  }

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

  const nameFor = (u: Student) =>
    [u.firstName, u.lastName].filter(Boolean).join(" ") || u.username || u.email || u._id;

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
              {/* ===================== DETAILS TAB (single column) ===================== */}
              <Tab.Pane eventKey="details">
                <Card className="p-3">
                  <Form>
                    <div className="vstack gap-3">
                      {/* Title / Description */}
                      <section>
                        <Form.Group className="mb-2">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            value={quiz.title}
                            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                          />
                        </Form.Group>

                        {/* ✅ Rich editor for QUIZ DESCRIPTION */}
                        <Form.Group className="mb-0">
                          <Form.Label>Description</Form.Label>
                          <RichHtmlEditor
                            value={quiz.description || ""}
                            onChange={(html) => setQuiz({ ...quiz, description: html })}
                            placeholder="Describe the quiz…"
                            minHeight={220}
                          />
                        </Form.Group>
                      </section>

                      {/* Settings — every control on its own line */}
                      <section>
                        <h6 className="fw-semibold mb-2">Settings</h6>
                        <div className="vstack gap-3">
                          <Form.Group>
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

                          <Form.Group>
                            <Form.Label>Assignment Group</Form.Label>
                            <Form.Select
                              value={quiz.assignmentGroup}
                              onChange={(e) =>
                                setQuiz({ ...quiz, assignmentGroup: e.target.value as any })
                              }
                            >
                              <option>Quizzes</option>
                              <option>Exams</option>
                              <option>Assignments</option>
                              <option>Project</option>
                            </Form.Select>
                          </Form.Group>

                          <Form.Group>
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
                            type="switch"
                            label="Multiple Attempts"
                            checked={quiz.multipleAttempts}
                            onChange={(e) =>
                              setQuiz({ ...quiz, multipleAttempts: e.target.checked })
                            }
                          />

                          <Form.Group>
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

                          <Form.Group>
                            <Form.Label>Access Code</Form.Label>
                            <Form.Control
                              value={quiz.accessCode}
                              onChange={(e) =>
                                setQuiz({ ...quiz, accessCode: e.target.value })
                              }
                            />
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>Show Correct Answers (note)</Form.Label>
                            <Form.Control
                              value={quiz.showCorrectAnswers}
                              onChange={(e) =>
                                setQuiz({ ...quiz, showCorrectAnswers: e.target.value })
                              }
                            />
                          </Form.Group>

                          <Form.Check
                            type="switch"
                            label="Shuffle Answers"
                            checked={quiz.shuffleAnswers}
                            onChange={(e) =>
                              setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
                            }
                          />
                          <Form.Check
                            type="switch"
                            label="One Question at a Time"
                            checked={quiz.oneQuestionAtATime}
                            onChange={(e) =>
                              setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })
                            }
                          />
                          <Form.Check
                            type="switch"
                            label="Webcam Required"
                            checked={quiz.webcamRequired}
                            onChange={(e) =>
                              setQuiz({ ...quiz, webcamRequired: e.target.checked })
                            }
                          />
                          <Form.Check
                            type="switch"
                            label="Lock Questions After Answering"
                            checked={quiz.lockAfterAnswering}
                            onChange={(e) =>
                              setQuiz({ ...quiz, lockAfterAnswering: e.target.checked })
                            }
                          />
                        </div>
                      </section>

                      {/* Assign (bordered) — keeps Avail/Until on the same line */}
                      <section>
                        <h6 className="fw-semibold mb-2">Assign</h6>
                        <div className="border rounded p-3">
                          <Row className="g-2">
                            <Col xs={12} md={6}>
                              <Form.Label className="mb-1">Available from</Form.Label>
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
                            </Col>
                            <Col xs={12} md={6}>
                              <Form.Label className="mb-1">Until</Form.Label>
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
                            </Col>
                          </Row>

                          <Form.Group className="mt-2">
                            <Form.Label className="mb-1">Due date</Form.Label>
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
                            <Form.Label className="mb-1">Assign to</Form.Label>
                            <Form.Select
                              value={assignScope}
                              onChange={(e) =>
                                setAssignScope(e.currentTarget.value as "EVERYONE" | "SOME")
                              }
                            >
                              <option value="EVERYONE">Everyone</option>
                              <option value="SOME">Specific students…</option>
                            </Form.Select>
                          </Form.Group>

                          {assignScope === "SOME" && (
                            <Form.Group className="mt-2">
                              <Form.Label className="mb-1">Students</Form.Label>
                              <Form.Select
                                multiple
                                size={Math.min(6, Math.max(3, students.length || 3))}
                                value={selectedStudentIds}
                                onChange={(e) =>
                                  setSelectedStudentIds(
                                    Array.from(e.currentTarget.selectedOptions).map(
                                      (o) => o.value
                                    )
                                  )
                                }
                              >
                                {students.map((s) => (
                                  <option key={s._id} value={s._id}>
                                    {nameFor(s)} {s.email ? ` <${s.email}>` : ""}
                                  </option>
                                ))}
                              </Form.Select>
                              <Form.Text muted>Hold Cmd/Ctrl to select multiple.</Form.Text>
                            </Form.Group>
                          )}
                        </div>
                      </section>
                    </div>
                  </Form>

                  {/* Footer actions */}
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
                    <Button disabled={saving} variant="danger" onClick={publishAndExit}>
                      Save &amp; Publish
                    </Button>
                  </div>
                </Card>
              </Tab.Pane>

              {/* ===================== QUESTIONS TAB ===================== */}
              <Tab.Pane eventKey="questions">
                <Card className="p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <strong>Total Points:</strong> {totalPoints} • <strong>Questions:</strong>{" "}
                      {questions.length}
                    </div>
                    <div>
                      <Button variant="secondary" onClick={addNewQuestion}>New Question</Button>
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

/* ======================== Inline Question Editor ======================== */

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
                  variant="danger"
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

                {/* ✅ Rich editor for QUESTION HTML */}
                <Form.Group className="mt-2">
                  <Form.Label>Question (HTML)</Form.Label>
                  <RichHtmlEditor
                    value={local.questionHtml || ""}
                    onChange={(html) => set("questionHtml", html)}
                    placeholder="Write your question, add images, tables, etc."
                    minHeight={220}
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
                  <div className="d-flex align-items-center gap-2 mb-2" key={i}>
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
                  </div>
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
                  <div className="d-flex align-items-center gap-2 mb-2" key={i}>
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
                  </div>
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
