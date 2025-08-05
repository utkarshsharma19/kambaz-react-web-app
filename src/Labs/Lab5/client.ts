// src/Labs/Lab5/client.ts
import axios, { AxiosError } from "axios";

const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER as string;

/* ------------- Types ---------------------------------------------------- */

export interface ApiTodo {
  id: string | number;
  title: string;
  completed: boolean;
  [key: string]: any;            // for description, due, etc.
}

/* ------------- Helpers -------------------------------------------------- */

const safeGet = async <T>(url: string) => {
  try {
    const { data } = await axios.get<T>(url);
    return data;
  } catch (e) {
    throw (e as AxiosError)?.response ?? e;
  }
};

const safePost = async <T>(url: string, payload: unknown) => {
  try {
    const { data } = await axios.post<T>(url, payload);
    return data;
  } catch (e) {
    throw (e as AxiosError)?.response ?? e;
  }
};

const safeDelete = async <T>(url: string) => {
  try {
    const { data } = await axios.delete<T>(url);
    return data;
  } catch (e) {
    throw (e as AxiosError)?.response ?? e;
  }
};

const safePut = async <T>(url: string, payload: unknown) => {
  try {
    const { data } = await axios.put<T>(url, payload);
    return data;
  } catch (e) {
    throw (e as AxiosError)?.response ?? e;
  }
};

/* ------------- Routes --------------------------------------------------- */

export const fetchWelcomeMessage = () =>
  safeGet<string>(`${HTTP_SERVER}/lab5/welcome`);

/* Assignment routes */
const ASSIGNMENT_API = `${HTTP_SERVER}/lab5/assignment`;

export const fetchAssignment = () => safeGet(ASSIGNMENT_API);

export const updateTitle = (title: string) =>
  safeGet(`${ASSIGNMENT_API}/title/${encodeURIComponent(title)}`);

/* Todos routes */
const TODOS_API = `${HTTP_SERVER}/lab5/todos`;

export const fetchTodos = () => safeGet<ApiTodo[]>(TODOS_API);

export const createNewTodo = () => safeGet<ApiTodo[]>(`${TODOS_API}/create`);

export const removeTodo = (todo: ApiTodo) =>
  safeGet<ApiTodo[]>(`${TODOS_API}/${todo.id}/delete`);

export const postNewTodo = (todo: Partial<ApiTodo>) =>
  safePost<ApiTodo>(TODOS_API, todo);

export const deleteTodo = (todo: ApiTodo) =>
  safeDelete(`${TODOS_API}/${todo.id}`);

/* optional PUT helper used by your async component */
export const updateTodo = (todo: ApiTodo) =>
  safePut<ApiTodo>(`${TODOS_API}/${todo.id}`, todo);
