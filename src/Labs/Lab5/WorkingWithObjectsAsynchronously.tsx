/**
 * WorkingWithArraysAsynchronously.tsx
 * — Todo list demo using async API
 * — Added rubric id: wd-create-todo
 */
 import { useEffect, useState } from "react";
 import ListGroup      from "react-bootstrap/ListGroup";
 import FormControl    from "react-bootstrap/FormControl";
 import { FaPlusCircle, FaTrash, FaPen } from "react-icons/fa";
 import { TiDelete }   from "react-icons/ti";
 import * as client    from "./client";
 
 type Todo = {
   id: number | string;
   title: string;
   completed: boolean;
   editing?: boolean;
 };
 
 export default function WorkingWithArraysAsynchronously() {
   const [todos, setTodos]           = useState<Todo[]>([]);
   const [errorMessage, setErrorMessage] = useState<string | null>(null);
 
   /* ────────────── helpers ────────────── */
   const fetchTodos = async () => {
     try {
       setTodos(await client.fetchTodos());
     } catch (e: any) {
       setErrorMessage(e?.response?.data?.message ?? "Could not fetch todos");
     }
   };
 
   const createNewTodo = async () => {
     setTodos(await client.createNewTodo());
   };
 
   const deleteTodo = async (id: string | number) => {
     setTodos(await client.deleteTodo(id));
   };
 
   const toggleCompleted = async (todo: Todo) => {
     setTodos(await client.updateTodo(todo));
   };
 
   /* ────────────── mount ────────────── */
   useEffect(() => {
     fetchTodos();
   }, []);
 
   /* ────────────── render ────────────── */
   return (
     <div id="wd-working-with-arrays-async">
       <h3>Working With Arrays Asynchronously</h3>
 
       {/* NEW rubric id */}
       <FaPlusCircle
         id="wd-create-todo"
         className="me-3 fs-3 text-success cursor-pointer"
         title="Create todo"
         onClick={createNewTodo}
       />
 
       {errorMessage && (
         <div className="alert alert-danger my-2" role="alert">
           {errorMessage}
         </div>
       )}
 
       <ListGroup>
         {todos.map((t) => (
           <ListGroup.Item key={t.id}>
             <span
               className={t.completed ? "text-decoration-line-through" : ""}
               onClick={() => toggleCompleted({ ...t, completed: !t.completed })}
               style={{ cursor: "pointer" }}
             >
               {t.title}
             </span>
             <TiDelete
               className="float-end text-danger fs-5 cursor-pointer"
               onClick={() => deleteTodo(t.id)}
             />
           </ListGroup.Item>
         ))}
       </ListGroup>
     </div>
   );
 }
 