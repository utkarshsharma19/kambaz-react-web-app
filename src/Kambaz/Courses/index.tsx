import { Routes, Route, Navigate } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Home from "./index";            // maybe rename to CourseHome.tsx
import Modules from "./Modules/index";
import Assignments from "./Assignments/index";
import AssignmentEditor from "./Assignments/Editor";

export default function Courses() {
  return (
    <table id="wd-course-layout">
      <tr>
        <td valign="top">
          <CourseNavigation />
        </td>
        <td valign="top">
          <Routes>
        
            <Route path="/" element={<Navigate to="Home" replace />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h2>Assignments</h2>} />
            <Route path="Zoom" element={<h2>Quizzes</h2>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Quizzes" element={<h2>Piazza</h2>} />
            <Route path="People" element={<h2>Quizzes</h2>} />
            <Route path="Assignments/:assignmentId" element={<AssignmentEditor />} />
   
            {/* fallback if you want */}
            {/* <Route path="*" element={<CourseStatus />} /> */}
          </Routes>
          </td>
          
        
      </tr>
    </table>
  );
}
