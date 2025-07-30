import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: "1", title: "Learn React", done: false },
    { id: "2", title: "Learn Node",  done: false },
  ],
  todo: { id: "", title: "" },   // ← draft always has id field
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({ ...action.payload, id: Date.now().toString() });
      state.todo = {  id: "", title: "" , done: false};
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
      state.todo = {  id: "", title: "" , done: false};
    },
    setTodo: (state, action) => {
      state.todo = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, setTodo } = todosSlice.actions;
export default todosSlice.reducer;
