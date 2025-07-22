import MapFunction from "../Lab2/MapFunction";
import Add from "./Add";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import AddPathParameters from "./AddPathParameters";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import ArrowFunctions from "./ArrowFunctions";
import BooleanVariables from "./BooleanVariables";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import Destructing from "./Destructing";
import DestructingImports from "./DestructingImports";
import FilterFunction from "./FilterFunction";
import FindFunction from "./FindFunction";
import ForLoops from "./ForLoops";
import Highlight from "./Highlight";
import House from "./House";
import IfElse from "./IfElse";
import ImpliedReturn from "./ImpliedReturn";
import JsonStringify from "./JsonStringify";
import LegacyFunctions from "./LegacyFunctions";
import PathParameters from "./PathParameters";
import SimpleArrays from "./SimpleArrays";
import Spreading from "./Spreading";
import Square from "./Square";
import Styles from "./Styles";
import TemplateLiterals from "./TemplateLiterals";
import TernaryOperator from "./TernaryOperator";
import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import * as Math from './Math'; 
import FindIndex from "./FindIndex";
import TodoList from "./todos/TodoList";

export default function Lab3() {
  console.log('Hello World!');

    return (
      <div>
        <h2>Lab 3</h2>
        <VariablesAndConstants/>
        <VariableTypes/>
        <IfElse/>
        <TernaryOperator/>
        <BooleanVariables/>
        <ConditionalOutputIfElse/>
        <ConditionalOutputInline/>
        <Add a={3} b={4} />
        <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
     </Highlight>
      <hr />
      <TemplateLiterals/>
      <PathParameters/>
      <JsonStringify/>
      <ImpliedReturn/>

  <h2>Using MyMath Module</h2>
  <p>6 + 4 = {Math.add(6, 4)}</p>
  <p>9 - 2 = {Math.subtract(9, 2)}</p>
  <p>3 × 7 = {Math.multiply(3, 7)}</p>
  <p>12 ÷ 4 = {Math.divide(12, 4)}</p>

      <LegacyFunctions/>
      <SimpleArrays/>
      <Spreading/>
      <Styles/>
      <House/>
      <ForLoops/>
      <FindIndex/>
      <FindFunction/>
      <FilterFunction/>
      <DestructingImports/>
      <Destructing/>
      <ConditionalOutputIfElse/>
      <ConditionalOutputInline/>
      <BooleanVariables/>
      <ArrowFunctions/>
      <ArrayIndexAndLength/>
      <AddPathParameters/>
      <AddingAndRemovingToFromArrays/>
      <MapFunction/>
      <TodoList/>
      </div>
  );}
  