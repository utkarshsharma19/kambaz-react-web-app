/*  src/Kambaz/Courses/Enrollments/client.ts  */
import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_HTTP_SERVER;

/** Single instance that always sends the session cookie */
const api = axios.create({
  baseURL: REMOTE_SERVER,
  withCredentials: true,   // ★ this puts connect.sid on every request
});

/* ---------- helpers ---------- */
export const enroll = async (courseId: string) =>
  (await api.post("/api/enrollments", { course: courseId })).data;

export const unenroll = async (courseId: string) =>
  (await api.delete(`/api/enrollments/${courseId}`)).data;

export const myEnrollments = async () =>
  (await api.get("/api/users/current/enrollments")).data;
