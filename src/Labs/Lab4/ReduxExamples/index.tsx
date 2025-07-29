import BooleanStateVariables from "../BooleanStateVariables";
import ChildStateComponent from "../ChildStateComponent";
import ClickEvent from "../ClickEvent";
import AddRedux from "./AddRedux/index";
import CounterRedux from "./CounterRedux/index";
import HelloRedux from "./HelloRedux/index";

export default function ReduxExamples() {
  return(
    <div>
      <h2>Redux Examples</h2>
      <HelloRedux />
      <CounterRedux/>
      <AddRedux/>
      <BooleanStateVariables/>
      <ChildStateComponent/>
      <ClickEvent/>
    </div>
  );
};
