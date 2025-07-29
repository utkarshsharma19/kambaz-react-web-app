// import { useSelector } from "react-redux";

import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ChildStateComponent from "./ChildStateComponent";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import EventObject from "./EventObject";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import AddRedux from "./ReduxExamples/AddRedux/index";
import CounterRedux from "./ReduxExamples/CounterRedux/index";
import HelloRedux from "./ReduxExamples/HelloRedux/index";
import TodoForm from "./ReduxExamples/todos/TodoForm";
import StringStateVariables from "./StringStateVariables";

export default function Lab4() {
  // const { todos } = useSelector((state: any) => state.todosReducer);
  return (
    <div>

<ClickEvent/>
<EventObject/>
<BooleanStateVariables/>
<DateStateVariable/>
<Counter/>
<ParentStateComponent/>
<PassingDataOnEvent/>
<PassingFunctions/>
<ArrayStateVariable/>
<ChildStateComponent/>
<TodoForm/>
<ObjectStateVariable/>
<StringStateVariables/>
<AddRedux/>
<HelloRedux/>
<CounterRedux/>




    </div>);}