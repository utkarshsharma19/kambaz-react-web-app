import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge, Button, Card, ListGroup, Spinner } from "react-bootstrap";
import * as api from "./client";
import { availabilityLabel, formatDateTime, sumPoints } from "./types";
import type { Attempt, Question, Quiz, User } from "./types";
import * as userClient from "../../Account/client";

export default function QuizDetails() {
  const { qid } = useParams();
  const navigate = useNavigate();
  const [me, setMe] = useState<User | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [lastAttempt, setLastAttempt] = useState<Attempt | null>(null);

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

  if (!quiz) return <Spinner animation="border" className="m-3" />;

  const isFaculty = me?.role === "FACULTY";
  const total = sumPoints(questions);

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3>
          {quiz.title}{" "}
          {quiz.published ? <Badge bg="success">Published</Badge> : <Badge bg="secondary">Unpublished</Badge>}
        </h3>
        <div className="d-flex gap-2">
          {isFaculty && <Button variant="outline-secondary" onClick={() => navigate("./preview")}>Preview</Button>}
          {isFaculty && <Button onClick={() => navigate("./edit")}>Edit</Button>}
        </div>
      </div>

      <Card className="mb-3">
        <Card.Body>
          <div
            className="mb-2"
            dangerouslySetInnerHTML={{ __html: quiz.description || "<em>No description</em>" }}
          />
          <ListGroup variant="flush">
            <ListGroup.Item>Type: <strong>{quiz.quizType.replaceAll("_", " ")}</strong></ListGroup.Item>
            <ListGroup.Item>Assignment Group: <strong>{quiz.assignmentGroup}</strong></ListGroup.Item>
            <ListGroup.Item>Shuffle Answers: <strong>{quiz.shuffleAnswers ? "Yes" : "No"}</strong></ListGroup.Item>
            <ListGroup.Item>Time Limit: <strong>{quiz.timeLimitMinutes} minutes</strong></ListGroup.Item>
            <ListGroup.Item>Multiple Attempts: <strong>{quiz.multipleAttempts ? `Yes (${quiz.attemptsAllowed})` : "No"}</strong></ListGroup.Item>
            <ListGroup.Item>One Question at a Time: <strong>{quiz.oneQuestionAtATime ? "Yes" : "No"}</strong></ListGroup.Item>
            <ListGroup.Item>Webcam Required: <strong>{quiz.webcamRequired ? "Yes" : "No"}</strong></ListGroup.Item>
            <ListGroup.Item>Lock After Answering: <strong>{quiz.lockAfterAnswering ? "Yes" : "No"}</strong></ListGroup.Item>
            <ListGroup.Item>Availability: <strong>{availabilityLabel(quiz)}</strong></ListGroup.Item>
            <ListGroup.Item>Due: <strong>{formatDateTime(quiz.due)}</strong></ListGroup.Item>
            <ListGroup.Item>Available From: <strong>{formatDateTime(quiz.availableFrom)}</strong></ListGroup.Item>
            <ListGroup.Item>Until: <strong>{formatDateTime(quiz.availableUntil)}</strong></ListGroup.Item>
            <ListGroup.Item>Points: <strong>{total}</strong> • Questions: <strong>{questions.length}</strong></ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      {me?.role === "STUDENT" && (
        <div className="d-flex align-items-center gap-3">
          {quiz.published ? (
            <Button onClick={() => navigate("./take")}>Start Quiz</Button>
          ) : (
            <Button disabled title="Quiz not published">Start Quiz</Button>
          )}
          {lastAttempt && (
            <span className="text-muted">Last score: <strong>{lastAttempt.score}</strong></span>
          )}
        </div>
      )}
    </div>
  );
}
