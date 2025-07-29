import { configureStore } from "@reduxjs/toolkit";
import addReducer from "../Lab4/ReduxExamples/AddRedux/addReducer";
import counterReducer from "../Lab4/ReduxExamples/CounterRedux/counterReducer";

import helloReducer from "../Lab4/ReduxExamples/HelloRedux/helloReducer";
import todosReducer from "../Lab4/ReduxExamples/todos/todosReducer";
const store = configureStore({
  reducer: { helloReducer,
counterReducer, addReducer, todos: todosReducer }});
export default store;