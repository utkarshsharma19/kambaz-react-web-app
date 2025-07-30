import { ListGroup, Button } from "react-bootstrap";   // <-- ADD

import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

interface Todo {
  id: string;
  title: string;
  done?: boolean;
}

export default function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useDispatch();

  return (
    <ListGroup.Item className="d-flex align-items-center">
      <Button
        variant="danger"
        size="sm"
        type="button"
        className="me-2"
        id="wd-delete-todo-click"
        onClick={() => dispatch(deleteTodo(todo.id))}
      >
        Delete
      </Button>

      <Button
        variant="warning"
        size="sm"
        type="button"
        className="me-3"
        id="wd-set-todo-click"
        onClick={() => dispatch(setTodo(todo))}
      >
        Edit
      </Button>

      {todo.title}
    </ListGroup.Item>
  );
}
