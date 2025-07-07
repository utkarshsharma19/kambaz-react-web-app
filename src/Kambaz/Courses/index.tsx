import { Routes, Route, Navigate } from "react-router-dom";
import CourseNavigation from "./Navigation";
           // maybe rename to CourseHome.tsx
import Modules from "./Modules/index";
import Assignments from "./Assignments/index";
import AssignmentEditor from "./Assignments/Editor";
import Home from "./Home/index";

export default function Courses() {
  return (

    <div id="wd-courses">
      <h2>Course 1234</h2>
      <hr />

    <table>
      <tr>
        <td valign="top">
          <CourseNavigation />
        </td>
        <td valign="top">
          <Routes>
        
            <Route path="/" element={<Navigate to="Home" replace />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h2>Piazza</h2>} />
            <Route path="Zoom" element={<h2>Zoom</h2>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Quizzes" element={<h2>Quizzes</h2>} />
            <Route path="People" element={<h2>People</h2>} />
            <Route path="Grades" element={<h2>Grades</h2>} />
            <Route path="Assignments/:assignmentId" element={<AssignmentEditor />} />
   
          </Routes>
          </td>
          
        
      </tr>
    </table>
    </div>
  );
}
