import { configureStore } from "@reduxjs/toolkit";
import addReducer from "../Lab4/ReduxExamples/AddRedux/addReducer";
import counterReducer from "../Lab4/ReduxExamples/CounterRedux/counterReducer";

import helloReducer from "../Lab4/ReduxExamples/HelloRedux/helloReducer";
import todosReducer from "../Lab4/ReduxExamples/todos/todosReducer";
import modulesReducer from "../../Kambaz/Courses/Modules/reducer"
import accountReducer from "../../Kambaz/Account/reducer"
import coursesReducer from "../../Kambaz/Courses/reducer";
// import enrollmentsReducer from "../../Kambaz/Courses/enrollmentReducer";
const store = configureStore({
  reducer: { helloReducer,
counterReducer, addReducer, todos: todosReducer,   modulesReducer, accountReducer,     coursesReducer}});
export default store;