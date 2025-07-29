import { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import * as db from "../Database";               // ← still used for assignments

/* ────────────────────────────────────────────────────────────── */

export default function Courses() {
  const { cid } = useParams();                   // course code (e.g. RS101)

  /* local state for assignments only */
  const [assignments, setAssignments] = useState<any[]>(
    db.assignments.filter((a: any) => a.course === cid)
  );

  /* current sub‑page (“home”, “modules”, “assignments”) */
  const pageName = useLocation().pathname.split("/")[4] ?? "home";

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
            <Route index element={<Navigate to="home" replace />} />

            <Route path="home"    element={<Home />} />
            <Route path="modules" element={<Modules />} />

            {/* assignments list + editor */}
            <Route
              path="assignments"
              element={
                <Assignments
                  assignments={assignments}
                  setAssignments={setAssignments}
                />
              }
            />
            <Route
              path="assignments/:assignmentId"
              element={
                <AssignmentEditor
                  assignments={assignments}
                  setAssignments={setAssignments}
                />
              }
            />

            {/* placeholder routes */}
            <Route path="piazza"   element={<h2>Piazza</h2>} />
            <Route path="zoom"     element={<h2>Zoom</h2>} />
            <Route path="quizzes"  element={<h2>Quizzes</h2>} />
            <Route path="people"   element={<h2>People</h2>} />
            <Route path="grades"   element={<h2>Grades</h2>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
