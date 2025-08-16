export type Role = "FACULTY" | "STUDENT" | string;

export type QuizType =
  | "GRADED_QUIZ"
  | "PRACTICE_QUIZ"
  | "GRADED_SURVEY"
  | "UNGRADED_SURVEY";

export interface Quiz {
  _id: string;
  course: string;
  title: string;
  description: string;
  published: boolean;
  due?: string; // ISO
  availableFrom?: string; // ISO
  availableUntil?: string; // ISO
  quizType: QuizType;
  assignmentGroup: "Quizzes" | "Exams" | "Assignments" | "Project";
  shuffleAnswers: boolean;
  timeLimitMinutes: number;
  multipleAttempts: boolean;
  attemptsAllowed: number;
  showCorrectAnswers: string;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockAfterAnswering: boolean;
  createdBy?: string;
}

export type QuestionType = "MCQ" | "TRUE_FALSE" | "FILL_BLANK";

export interface Choice {
  text: string;
  correct?: boolean;
}

export interface Question {
  _id: string;
  quiz: string;
  type: QuestionType;
  title: string;
  points: number;
  questionHtml: string;
  choices?: Choice[];            // MCQ
  correctBoolean?: boolean;      // TRUE_FALSE
  acceptableAnswers?: string[];  // FILL_BLANK
  order?: number;
}

export interface AttemptAnswerPayload {
  questionId: string;
  value: string | number | boolean;
}

export interface AttemptAnswer {
  question: string;        // question id
  value: string | number | boolean;
  isCorrect: boolean;
  pointsAwarded: number;
}

export interface Attempt {
  _id: string;
  quiz: string;
  user: string;
  attemptNumber: number;
  score: number;
  answers: AttemptAnswer[];
  startedAt?: string;
  submittedAt?: string;
}

export interface User {
  _id: string;
  username: string;
  role: Role;
}

export function iso(d?: string | Date) {
  if (!d) return undefined;
  return typeof d === "string" ? d : d.toISOString();
}

export function formatDateTime(d?: string) {
  if (!d) return "—";
  const dt = new Date(d);
  return `${dt.toLocaleDateString()} ${dt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

export function availabilityLabel(q: Quiz, now = new Date()) {
  const from = q.availableFrom ? new Date(q.availableFrom) : undefined;
  const until = q.availableUntil ? new Date(q.availableUntil) : undefined;
  if (until && now > until) return "Closed";
  if (from && now < from) return `Not available until ${from.toLocaleString()}`;
  return "Available";
}

export function sumPoints(questions: Question[]) {
  return questions.reduce((acc, q) => acc + (q.points || 0), 0);
}
