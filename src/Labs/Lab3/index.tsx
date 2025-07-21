import Add from "./Add";
import BooleanVariables from "./BooleanVariables";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import Highlight from "./Highlight";
import IfElse from "./IfElse";
import Square from "./Square";
import TernaryOperator from "./TernaryOperator";
import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";

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


      </div>
  );}
  