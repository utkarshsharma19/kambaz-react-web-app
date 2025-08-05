import axios, { AxiosError } from "axios";

const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER as string;

/* ------------- Types ---------------------------------------------------- */

export interface ApiTodo {
  id: string | number;
  title: string;
  description?: string;
  completed: boolean;
  [key: string]: any;            // for score, due, etc.
}

/* ------------- Helpers -------------------------------------------------- */

const safeGet = async <T>(url: string) => {
  try {
    const { data } = await axios.get<T>(url, { withCredentials: true });
    return data;
  } catch (e) {
    throw (e as AxiosError)?.response ?? e;
  }
};



const safePost = async <T>(url: string, payload: unknown) => {
  try {
    const { data } = await axios.post<T>(url, payload, {
      withCredentials: true,
    });
    return data;
  } catch (e) {
    throw (e as AxiosError)?.response ?? e;
  }
};

const safeDelete = async <T>(url: string) => {
  try {
    const { data } = await axios.delete<T>(url, { withCredentials: true });
    return data;
  } catch (e) {
    throw (e as AxiosError)?.response ?? e;
  }
};

const safePut = async <T>(url: string, payload: unknown) => {
  try {
    const { data } = await axios.put<T>(url, payload, {
      withCredentials: true,
    });
    return data;
  } catch (e) {
    throw (e as AxiosError)?.response ?? e;
  }
};

/* ------------- Routes --------------------------------------------------- */

/* Welcome */
export const fetchWelcomeMessage = () =>
  safeGet<string>(`${HTTP_SERVER}/lab5/welcome`);

/* ---------------- Assignment ---------------- */
const ASSIGNMENT_API = `${HTTP_SERVER}/lab5/assignment`;

export const fetchAssignment   = ()          => safeGet(ASSIGNMENT_API);
export const updateTitle       = (t: string) => safeGet(`${ASSIGNMENT_API}/title/${encodeURIComponent(t)}`);
export const fetchAssignmentTitle = ()          => safeGet<string>(`${ASSIGNMENT_API}/title`); 
export const updateScore       = (s: number) => safeGet(`${ASSIGNMENT_API}/score/${s}`);
export const updateCompleted   = (c: boolean)=> safeGet(`${ASSIGNMENT_API}/completed/${c}`);

/* ---------------- Module -------------------- */
const MODULE_API = `${HTTP_SERVER}/lab5/module`;

export const fetchModule       = ()          => safeGet(MODULE_API);

export const fetchModuleName   = ()          => safeGet(`${MODULE_API}/name`);
export const updateModuleName  = (n: string) => safeGet(`${MODULE_API}/name/${encodeURIComponent(n)}`);
export const updateModuleDesc  = (d: string) => safeGet(`${MODULE_API}/description/${encodeURIComponent(d)}`);

/* ---------------- Todos --------------------- */
const TODOS_API = `${HTTP_SERVER}/lab5/todos`;

export const fetchTodos          = () => safeGet<ApiTodo[]>(TODOS_API);
export const createNewTodo       = () => safeGet<ApiTodo[]>(`${TODOS_API}/create`);
export const postNewTodo         = (t: Partial<ApiTodo>) => safePost<ApiTodo>(TODOS_API, t);
export const removeTodo          = (todo: ApiTodo) => safeGet<ApiTodo[]>(`${TODOS_API}/${todo.id}/delete`);
export const deleteTodo          = (todo: ApiTodo) => safeDelete(`${TODOS_API}/${todo.id}`);
export const updateTodo          = (todo: ApiTodo) => safePut<ApiTodo>(`${TODOS_API}/${todo.id}`, todo);

export const updateTodoCompleted   = (todo: ApiTodo, c: boolean) =>
  safeGet<ApiTodo[]>(`${TODOS_API}/${todo.id}/completed/${c}`);

export const updateTodoDescription = (todo: ApiTodo, d: string) =>
  safeGet<ApiTodo[]>(`${TODOS_API}/${todo.id}/description/${encodeURIComponent(d)}`);

