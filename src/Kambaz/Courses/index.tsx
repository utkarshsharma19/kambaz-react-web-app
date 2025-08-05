/*  src/Kambaz/Courses/index.tsx  */
import { useState } from "react";
import {
  Routes, Route, Navigate, useParams, useLocation
} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import CourseNavigation from "./Navigation";
import Home        from "./Home";
import Modules     from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";

/* ------------------------------------------------------------------ */

export default function Courses() {
  /* URL params */
  const { cid } = useParams();                       // course id
  const pageName = useLocation().pathname.split("/")[4] ?? "home";

  /* local state — assignments only */
  const [assignments, setAssignments] = useState<any[]>([]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger ms-2">
        {cid} &gt; {pageName.toUpperCase()}
      </h2>
      <hr />

      <div className="d-flex">
        {/* sidebar nav */}
        <div className="d-none d-md-block pe-md-4">
          <CourseNavigation />
        </div>

        {/* main content */}
        <div className="flex-fill">
          <Routes>
            {/* default → /home */}
            <Route index element={<Navigate to="home" replace />} />

            {/*  /Courses/:cid/home  */}
            <Route path="home"    element={<Home />} />

            {/*  /Courses/:cid/modules  */}
            <Route path="modules" element={<Modules />} />

            {/*  /Courses/:cid/assignments  */}
            <Route
              path="assignments"
              element={
                <Assignments
                  assignments={assignments}
                  setAssignments={setAssignments}
                />
              }
            />

            {/*  /Courses/:cid/assignments/123  */}
            <Route
              path="assignments/:assignmentId"
              element={
                <AssignmentEditor
                  assignments={assignments}
                  setAssignments={setAssignments}
                />
              }
            />

            {/* placeholders */}
            <Route path="piazza"   element={<h2>Piazza</h2>} />
            <Route path="zoom"     element={<h2>Zoom</h2>} />
            <Route path="quizzes"  element={<h2>Quizzes</h2>} />
            <Route path="people"   element={<h2>People</h2>} />
            <Route path="grades"   element={<h2>Grades</h2>} />

            {/* catch-all */}
            <Route path="*" element={<h2>Not found</h2>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
