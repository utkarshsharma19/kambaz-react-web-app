import axios from "axios";

export const REMOTE_SERVER = import.meta.env.VITE_HTTP_SERVER; // e.g., "http://localhost:4000"
export const USERS_API     = `${REMOTE_SERVER}/api/users`;

const api = axios.create({
  baseURL: USERS_API,
  withCredentials: true,
});

/* ---------- auth ---------- */
export const signup   = (u: any) => api.post("/signup",  u).then(r => r.data);
export const signin   = (c: any) => api.post("/signin",  c).then(r => r.data);
export const signout  = ()       => api.post("/signout").then(r => r.data);
export const profile  = ()       => api.post("/profile").then(r => r.data);

/* ---------- users ---------- */
export const findAllUsers = () => api.get("").then(r => r.data);

export const findUsersByRole = (role: string) =>
  api.get("", { params: { role } }).then(r => r.data);

export const findUsersByPartialName = (name: string) =>
  api.get("", { params: { name } }).then(r => r.data);

export const findUserById = (id: string) =>
  api.get(`/${id}`).then(r => r.data);

export const createUser = (user: any) =>
  api.post("", user).then(r => r.data);

export const updateUser = (user: any) =>
  api.put(`/${user._id}`, user).then(r => r.data);

export const deleteUser = (userId: string) =>
  api.delete(`/${userId}`).then(r => r.data);

/* ---------- courses ---------- */
export const findMyCourses = () => api.get("/current/courses").then(r => r.data);
export const createCourse  = (course: any) =>
  api.post("/current/courses", course).then(r => r.data);

  export const findCoursesForUser = (userId: string) =>
  api.get(`/${userId}/courses`).then(r => r.data);

// enroll / unenroll via many-to-many endpoints
export const enrollIntoCourse = (userId: string, courseId: string) =>
  api.post(`/${userId}/courses/${courseId}`).then(r => r.data);

export const unenrollFromCourse = (userId: string, courseId: string) =>
  api.delete(`/${userId}/courses/${courseId}`).then(r => r.data);
