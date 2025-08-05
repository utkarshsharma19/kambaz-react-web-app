/*  src/Kambaz/Courses/People/client.ts  */
import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_HTTP_SERVER;

/** one axios instance that ALWAYS sends the session cookie */
const api = axios.create({
  baseURL: REMOTE_SERVER,
  withCredentials: true,          // ← critical for 401-free requests
});

/* ---------- roster ---------- */
export const findUsersForCourse = async (courseId: string) =>
  (await api.get(`/api/courses/${courseId}/users`)).data;

/* ---------- faculty-only CRUD ---------- */
export const createUser = async (u: any) =>
  (await api.post("/api/users", u)).data;

export const updateUser = async (u: any) =>
  (await api.put(`/api/users/${u._id}`, u)).data;

export const deleteUser = async (uid: string) =>
  (await api.delete(`/api/users/${uid}`)).data;
