import {
  Routes, Route, Navigate, useParams, useLocation,
} from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid }      = useParams();
  const { pathname } = useLocation();
  const course       = courses.find((c) => c._id === cid);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course?.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />

      <div className="d-flex">
        {/* left nav */}
        <div className="d-none d-md-block pe-md-4">
          <CourseNavigation />
        </div>

        {/* right pane */}
        <div className="flex-fill">
          <Routes>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="modules" element={<Modules />} />
            <Route path="piazza" element={<h2>Piazza</h2>} />
            <Route path="zoom" element={<h2>Zoom</h2>} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="quizzes" element={<h2>Quizzes</h2>} />
            <Route path="people" element={<PeopleTable />} />
            <Route path="grades" element={<h2>Grades</h2>} />
            <Route
              path="assignments/:assignmentId"
              element={<AssignmentEditor />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
