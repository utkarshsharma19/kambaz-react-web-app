/*  src/Kambaz/Courses/Quizzes/client.ts  */
import axios from "axios";
import type { Attempt, AttemptAnswerPayload, Question, Quiz } from "./types";

const REMOTE_SERVER = import.meta.env.VITE_HTTP_SERVER;

/** Single instance that always sends the session cookie (same as Enrollments) */
const api = axios.create({
  baseURL: REMOTE_SERVER,
  withCredentials: true, // puts connect.sid on every request
});

/** Normalize array-style responses in case your API wraps payloads */
const asArray = <T,>(raw: any, key?: string): T[] => {
  if (Array.isArray(raw)) return raw as T[];
  if (key && Array.isArray(raw?.[key])) return raw[key] as T[];
  if (Array.isArray(raw?.data)) return raw.data as T[];
  return [];
};

/* ---------- quizzes ---------- */
export const listQuizzes = async (courseId: string): Promise<Quiz[]> => {
  const data = (await api.get(`/api/courses/${courseId}/quizzes`)).data;
  return asArray<Quiz>(data, "quizzes");
};

export const createQuiz = async (courseId: string, body: Partial<Quiz> = {}) =>
  (await api.post<Quiz>(`/api/courses/${courseId}/quizzes`, body)).data;

export const getQuiz = async (quizId: string) =>
  (await api.get<Quiz>(`/api/quizzes/${quizId}`)).data;

export const updateQuiz = async (quizId: string, body: Partial<Quiz>) =>
  (await api.put<Quiz>(`/api/quizzes/${quizId}`, body)).data;

export const deleteQuiz = async (quizId: string) =>
  (await api.delete(`/api/quizzes/${quizId}`)).data;

export const publishQuiz = async (quizId: string) =>
  (await api.post<Quiz>(`/api/quizzes/${quizId}/publish`)).data;

export const unpublishQuiz = async (quizId: string) =>
  (await api.post<Quiz>(`/api/quizzes/${quizId}/unpublish`)).data;

/* ---------- questions ---------- */
export const listQuestions = async (quizId: string): Promise<Question[]> => {
  const data = (await api.get(`/api/quizzes/${quizId}/questions`)).data;
  return asArray<Question>(data, "questions");
};

export const createQuestion = async (quizId: string, q: Partial<Question>) =>
  (await api.post<Question>(`/api/quizzes/${quizId}/questions`, q)).data;

export const updateQuestion = async (questionId: string, body: Partial<Question>) =>
  (await api.put<Question>(`/api/questions/${questionId}`, body)).data;

export const deleteQuestion = async (questionId: string) =>
  (await api.delete(`/api/questions/${questionId}`)).data;

/* ---------- attempts ---------- */
export const getLastAttempt = async (quizId: string) =>
  (await api.get<Attempt | null>(`/api/quizzes/${quizId}/attempts/me/last`)).data;

export const submitAttempt = async (quizId: string, answers: AttemptAnswerPayload[]) =>
  (await api.post<Attempt>(`/api/quizzes/${quizId}/attempts`, { answers })).data;
