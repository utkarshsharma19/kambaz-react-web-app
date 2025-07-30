import ClickEvent from "./ClickEvent";
import EventObject from "./EventObject";
import BooleanStateVariables from "./BooleanStateVariables";
import DateStateVariable from "./DateStateVariable";
import Counter from "./Counter";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import ArrayStateVariable from "./ArrayStateVariable";
import ChildStateComponent from "./ChildStateComponent";
import ObjectStateVariable from "./ObjectStateVariable";
import StringStateVariables from "./StringStateVariables";
import AddRedux from "./ReduxExamples/AddRedux";
import CounterRedux from "./ReduxExamples/CounterRedux";
import HelloRedux from "./ReduxExamples/HelloRedux";
import TodoList from "./ReduxExamples/todos/TodoList";   // <-- Redux version

export default function Lab4() {
  return (
    <div>

      <TodoList />


      <ClickEvent />
      <EventObject />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={() => alert("👍 theFunction ran")} />


      <BooleanStateVariables />
      <DateStateVariable />
      <Counter />
      <ParentStateComponent />
      <ArrayStateVariable />
      <ChildStateComponent />
      <ObjectStateVariable />
      <StringStateVariables />

      <AddRedux />
      <HelloRedux />
      <CounterRedux />
    </div>
  );
}
