import { useEffect, useState } from "react";
import ListGroup       from "react-bootstrap/ListGroup";
import FormControl     from "react-bootstrap/FormControl";
import { FaPlusCircle, FaTrash, FaPen } from "react-icons/fa";
import { TiDelete }    from "react-icons/ti";
import * as client     from "./client";

type Todo = {
  id: number | string;
  title: string;
  description?: string;
  completed: boolean;
  editing?: boolean;
  editingDesc?: boolean;
};

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  /* ───────── helpers ───────── */

  const fetchTodos = async () => {
    try {
      const data = await client.fetchTodos();
      setTodos(Array.isArray(data) ? data : []);
      setError(null);
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Could not fetch todos");
    }
  };

  const mergeIntoList = (incoming: Todo | Todo[]) =>
    setTodos(prev =>
      Array.isArray(incoming) ? incoming : [...prev, incoming]
    );

  const createNewTodo = async () => mergeIntoList(await client.createNewTodo());

  const postNewTodo = async () =>
    mergeIntoList(
      await client.postNewTodo({ title: "New Posted Todo", completed: false })
    );

  const removeTodo = async (todo: Todo) => {
    try {
      await client.removeTodo(todo);
      setTodos(prev => prev.filter(t => t.id !== todo.id));
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Remove failed");
    }
  };

  const deleteTodo = async (todo: Todo) => {
    try {
      await client.deleteTodo(todo);
      setTodos(prev => prev.filter(t => t.id !== todo.id));
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Delete failed");
    }
  };

  /* property-specific helpers (new spec routes) */
  const updateCompleted = async (todo: Todo, c: boolean) => {
    await client.updateTodoCompleted(todo, c);
    setTodos(prev =>
      prev.map(t => (t.id === todo.id ? { ...t, completed: c } : t))
    );
  };

  const updateDescription = async (todo: Todo, d: string) => {
    await client.updateTodoDescription(todo, d);
    setTodos(prev =>
      prev.map(t => (t.id === todo.id ? { ...t, description: d } : t))
    );
  };

  const updateTodo = async (todo: Todo) => {
    try {
      await client.updateTodo(todo);
      setTodos(prev => prev.map(t => (t.id === todo.id ? todo : t)));
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Update failed");
    }
  };

  const editTodo = (todo: Todo) =>
    setTodos(prev =>
      prev.map(t =>
        t.id === todo.id ? { ...t, editing: true, editingDesc: false } : t
      )
    );

  const editDesc = (todo: Todo) =>
    setTodos(prev =>
      prev.map(t =>
        t.id === todo.id ? { ...t, editingDesc: true, editing: false } : t
      )
    );

  /* ───────── lifecycle ───────── */

  useEffect(() => {
    fetchTodos();
  }, []);

  /* ───────── render ───────── */

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>

      <h4>
        Todos
        <FaPlusCircle
          onClick={createNewTodo}
          className="text-success float-end fs-3"
          role="button"
        />
      </h4>
      <FaPlusCircle
        onClick={postNewTodo}
        className="text-primary float-end fs-3 me-3"
        id="wd-post-todo"
        role="button"
      />

      <ListGroup>
        {todos.map(todo => (
          <ListGroup.Item key={todo.id}>
            <FaTrash
              onClick={() => removeTodo(todo)}
              className="text-danger float-end mt-1"
              id="wd-remove-todo"
              role="button"
            />
            <TiDelete
              onClick={() => deleteTodo(todo)}
              className="text-danger float-end me-2 fs-3"
              id="wd-delete-todo"
              role="button"
            />
            <FaPen
              onClick={() => editTodo(todo)}
              className="text-primary float-end me-2 mt-1"
              role="button"
            />
            <FaPen
              onClick={() => editDesc(todo)}
              className="text-secondary float-end me-2 mt-1"
              title="Edit description"
              role="button"
            />

            {/* checkbox uses new completed route */}
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={todo.completed}
              onChange={e => updateCompleted(todo, e.target.checked)}
            />

            {/* title edit (PUT) */}
            {!todo.editing ? (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            ) : (
              <FormControl
                className="w-50 d-inline-block"
                defaultValue={todo.title}
                onKeyDown={e =>
                  e.key === "Enter" && updateTodo({ ...todo, editing: false })
                }
                onChange={e => updateTodo({ ...todo, title: e.target.value })}
              />
            )}

            {/* description edit (GET route) */}
            {todo.editingDesc && (
              <FormControl
                className="w-75 mt-2"
                placeholder="Description"
                defaultValue={todo.description ?? ""}
                onKeyDown={e =>
                  e.key === "Enter" &&
                  updateDescription(todo, (e.target as HTMLInputElement).value)
                }
              />
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {error && (
        <div className="alert alert-danger my-3" role="alert">
          {error}
        </div>
      )}

      <hr />
    </div>
  );
}
