import axios from "axios";

export const REMOTE_SERVER = import.meta.env.VITE_HTTP_SERVER;
export const USERS_API     = `${REMOTE_SERVER}/api/users`;

const api = axios.create({
  baseURL        : USERS_API,
  withCredentials: true
});

/* ---------- auth ---------- */
export const signup  = (u: any)          => api.post("/signup",  u).then(r => r.data);
export const signin  = (c: any)          => api.post("/signin",  c).then(r => r.data);
export const signout = ()                => api.post("/signout").then(r => r.data);
export const profile = ()                => api.post("/profile").then(r => r.data);

/* ---------- profile update ---------- */
export const updateUser = (u: any)       => api.put(`/${u._id}`, u).then(r => r.data);

/* ---------- enrolled courses ---------- */
export const findMyCourses = ()          => api.get("/current/courses").then(r => r.data);
export const createCourse = async (course: any) => {
    const { data } = await api.post(`${USERS_API}/current/courses`, course);
    return data;
  };
  
