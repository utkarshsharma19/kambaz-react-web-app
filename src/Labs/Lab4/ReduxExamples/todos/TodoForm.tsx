import { useDispatch, useSelector } from "react-redux";
import { ListGroup, Button, FormControl } from "react-bootstrap";
import { addTodo, updateTodo, setTodo } from "./todosReducer"; // ← matches file name

export default function TodoForm() {
  const dispatch = useDispatch();
  const todo = useSelector((state: any) => state.todos.todo);   // ← state.todos…

  return (
    <ListGroup.Item className="d-flex align-items-center gap-2">
      <FormControl
        value={todo.title}
        placeholder="New todo"
        onChange={(e) =>
          dispatch(setTodo({ ...todo, title: e.target.value }))
        }
      />

      <Button
        id="wd-add-todo-click"
        variant="primary"
        onClick={() => dispatch(addTodo(todo))}
      >
        Add
      </Button>

      <Button
        id="wd-update-todo-click"
        variant="secondary"
        onClick={() => dispatch(updateTodo(todo))}
      >
        Update
      </Button>
    </ListGroup.Item>
  );
}
