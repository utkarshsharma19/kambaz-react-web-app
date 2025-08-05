import axios from "axios";

const REMOTE_SERVER   = import.meta.env.VITE_HTTP_SERVER;
const api = axios.create({ baseURL: REMOTE_SERVER, withCredentials: true });

export const findAssignmentsForCourse = async (courseId: string) =>
  (await api.get(`/api/courses/${courseId}/assignments`)).data;

export const createAssignmentForCourse = async (courseId: string, a: any) =>
  (await api.post(`/api/courses/${courseId}/assignments`, a)).data;

export const updateAssignment = async (a: any) =>
  (await api.put(`/api/assignments/${a._id}`, a)).data;

export const deleteAssignment = async (aid: string) =>
  (await api.delete(`/api/assignments/${aid}`)).data;