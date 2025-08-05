import Lab1   from "./Lab1/index";
import Lab2   from "./Lab2/index";
import Lab3   from "./Lab3/index";
import TOC    from "../TOC";
import { Routes, Route, Navigate } from "react-router-dom";
import Lab4 from "./Lab4/index";
import Lab5 from "./Lab5/index";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      <TOC />
      <Routes>
        <Route path="/"      element={<Navigate to="Lab1" replace />} />
        <Route path="Lab1"   element={<Lab1 />} />
        <Route path="Lab2/*" element={<Lab2 />} />
        <Route path="Lab3/*" element={<Lab3 />} />
        <Route path="Lab4/*" element={<Lab4 />} />
        <Route path="Lab5/*" element={<Lab5 />} />


      </Routes>
    </div>
  );
}