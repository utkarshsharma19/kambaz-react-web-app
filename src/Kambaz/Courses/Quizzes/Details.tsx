import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge, Button, Card, ListGroup, Spinner, Row, Col } from "react-bootstrap";
import * as api from "./client";
import { availabilityLabel, formatDateTime, sumPoints } from "./types";
import type { Attempt, Question, Quiz, User } from "./types";
import * as userClient from "../../Account/client";

// minimal shape for mapping assigned student IDs -> names
type Student = {
  _id: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
};

export default function QuizDetails() {
  const { qid } = useParams();
  const navigate = useNavigate();
  const [me, setMe] = useState<User | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [lastAttempt, setLastAttempt] = useState<Attempt | null>(null);

  // for "Assign To" display
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    (async () => {
      try { setMe(await userClient.profile()); } catch {}
      if (!qid) return;
      const q = await api.getQuiz(qid);
      setQuiz(q);
      const qs = await api.listQuestions(qid);
      setQuestions(qs);
      try { setLastAttempt(await api.getLastAttempt(qid)); } catch {}
    })();
  }, [qid]);

  // If this quiz targets specific students, fetch the student list so we can show names (best-effort)
  useEffect(() => {
    (async () => {
      const scope = (quiz as any)?.assignScope as "EVERYONE" | "SOME" | undefined;
      if (scope !== "SOME") return;
      try {
        const res = await fetch("/api/users?role=STUDENT", { credentials: "include" });
        const data = await res.json();
        setStudents(Array.isArray(data) ? data : []);
      } catch {
        setStudents([]);
      }
    })();
  }, [quiz]);

  if (!quiz) return <Spinner animation="border" className="m-3" />;

  const isFaculty = me?.role === "FACULTY";
  const total = sumPoints(questions);

  // Published + within availability window
  const now = new Date();
  const hasStart = !!quiz.availableFrom;
  const hasEnd = !!quiz.availableUntil;
  const withinWindow =
    hasStart &&
    hasEnd &&
    now >= new Date(quiz.availableFrom as string) &&
    now <= new Date(quiz.availableUntil as string);

  // Attempts exhaustion (best-effort)
  const lastNum = (lastAttempt as any)?.attemptNumber as number | undefined;
  const attemptsExhausted =
    (!quiz.multipleAttempts && !!lastAttempt) ||
    (quiz.multipleAttempts &&
      typeof lastNum === "number" &&
      typeof quiz.attemptsAllowed === "number" &&
      lastNum >= quiz.attemptsAllowed);

  const canStart = withinWindow && !!quiz.published && !attemptsExhausted;

  // Date strings
  const dueStr = formatDateTime(quiz.due);
  const fromStr = formatDateTime(quiz.availableFrom);
  const untilStr = formatDateTime(quiz.availableUntil);

  // Assign-to display
  const assignScope = ((quiz as any)?.assignScope as "EVERYONE" | "SOME" | undefined) ?? "EVERYONE";
  const assignedToIds: string[] = ((quiz as any)?.assignedTo as string[]) || [];
  const nameFor = (u: Student) =>
    [u.firstName, u.lastName].filter(Boolean).join(" ") || u.username || u.email || u._id;

  const assignedStudents = students.filter((s) => assignedToIds.includes(s._id));
  const assignValue =
    assignScope === "SOME"
      ? (assignedStudents.length
          ? assignedStudents.map(nameFor).join(", ")
          : (assignedToIds.length ? `${assignedToIds.length} selected` : "Specific students"))
      : "Everyone";

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3>
          {quiz.title}{" "}
          {quiz.published ? (
            <Badge bg="success">Published</Badge>
          ) : (
            <Badge bg="secondary">Unpublished</Badge>
          )}
        </h3>
        <div className="d-flex gap-2">
          {isFaculty && (
            <Button variant="outline-secondary" onClick={() => navigate("./preview")}>
              Preview
            </Button>
          )}
          {isFaculty && <Button onClick={() => navigate("./edit")}>Edit</Button>}
        </div>
      </div>

      <Card className="mb-3">
        <Card.Body>
          <div
            className="mb-2"
            dangerouslySetInnerHTML={{
              __html: quiz.description || "<em>No description</em>",
            }}
          />

          <ListGroup variant="flush">
            <ListGroup.Item>
              Type: <strong>{quiz.quizType.replaceAll("_", " ")}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              Assignment Group: <strong>{quiz.assignmentGroup}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              Shuffle Answers: <strong>{quiz.shuffleAnswers ? "Yes" : "No"}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              Time Limit: <strong>{quiz.timeLimitMinutes} minutes</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              Multiple Attempts:{" "}
              <strong>{quiz.multipleAttempts ? `Yes (${quiz.attemptsAllowed})` : "No"}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              One Question at a Time: <strong>{quiz.oneQuestionAtATime ? "Yes" : "No"}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              Webcam Required: <strong>{quiz.webcamRequired ? "Yes" : "No"}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              Lock After Answering: <strong>{quiz.lockAfterAnswering ? "Yes" : "No"}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              Availability: <strong>{availabilityLabel(quiz)}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              Points: <strong>{total}</strong> • Questions: <strong>{questions.length}</strong>
            </ListGroup.Item>
          </ListGroup>

          {/* ---- Combined bottom section: single bordered box with 4 fields ---- */}
          <div className="border-top mt-3 pt-3">
            <div className="p-3 border rounded">
              <Row className="g-3">
                <Col sm={12} md={3}>
                  <div className="text-muted text-uppercase small">Due</div>
                  <hr className="my-2" />
                  <div className="fw-semibold">{dueStr || "—"}</div>
                </Col>
                <Col sm={12} md={3}>
                  <div className="text-muted text-uppercase small">Available From</div>
                  <hr className="my-2" />
                  <div className="fw-semibold">{fromStr || "—"}</div>
                </Col>
                <Col sm={12} md={3}>
                  <div className="text-muted text-uppercase small">Until</div>
                  <hr className="my-2" />
                  <div className="fw-semibold">{untilStr || "—"}</div>
                </Col>
                <Col sm={12} md={3}>
                  <div className="text-muted text-uppercase small">Assign To</div>
                  <hr className="my-2" />
                  <div className="fw-semibold">{assignValue}</div>
                </Col>
              </Row>
            </div>
          </div>
        </Card.Body>
      </Card>

      {me?.role === "STUDENT" && (
        <div className="d-flex align-items-center gap-3">
          {canStart && (
            <Button onClick={() => navigate("./take")}>
              Start Quiz
            </Button>
          )}
          {lastAttempt && (
            <span className="text-muted">
              Last score: <strong>{(lastAttempt as any).score}</strong>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
