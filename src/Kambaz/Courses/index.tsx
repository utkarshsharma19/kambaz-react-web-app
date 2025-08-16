// src/Kambaz/Courses/index.tsx
import { useState, useMemo } from "react";
import { Routes, Route, Navigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import EnrolledPeople from "./People/EnrolledPeople";
import QuizzesRoutes from "./Quizzes/index";

export default function Courses() {
  const { cid = "" } = useParams();
  const pageName = useLocation().pathname.split("/")[4] ?? "home";

  // pull courses from Redux
  const { courses = [] } = useSelector((s: any) => s.coursesReducer ?? {});

  // find current course by _id and build a friendly label
  const courseLabel = useMemo(() => {
    const course = courses.find((c: any) => c._id === cid);
    if (!course) return "Course"; // fallback for deep links before data loads
    const parts = [course.number, course.name].filter(Boolean);
    return parts.length ? parts.join(" ") : "Course";
  }, [cid, courses]);

  const [assignments, setAssignments] = useState<any[]>([]);

  // title-case the page name a bit nicer
  const prettyPage = pageName.replace(/-/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase());

  return (
    <div id="wd-courses">
      <h2 className="text-danger ms-2">
        {courseLabel} &gt; {prettyPage}
      </h2>
      <hr />

      <div className="d-flex">
        <div className="d-none d-md-block pe-md-4">
          <CourseNavigation />
        </div>

        <div className="flex-fill">
          <Routes>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="modules" element={<Modules />} />
            <Route
              path="assignments"
              element={<Assignments assignments={assignments} setAssignments={setAssignments} />}
            />
            <Route
              path="assignments/:assignmentId"
              element={<AssignmentEditor assignments={assignments} setAssignments={setAssignments} />}
            />
            <Route path="piazza"  element={<h2>Piazza</h2>} />
            <Route path="zoom"    element={<h2>Zoom</h2>} />
            <Route path="quizzes/*" element={<QuizzesRoutes/>} />
            <Route path="people"  element={<EnrolledPeople />} />
            <Route path="grades"  element={<h2>Grades</h2>} />
            <Route path="*" element={<h2>Not found</h2>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
