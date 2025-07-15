import { Routes, Route, Navigate } from 'react-router-dom';
import { FaAlignJustify } from 'react-icons/fa';   // ← added
import CourseNavigation from './Navigation';

import Home from './Home';
import Modules from './Modules';
import Assignments from './Assignments';
import AssignmentEditor from './Assignments/Editor';
import PeopleTable from './People/Table';

export default function Courses() {
  return (
    <div id="wd-courses">
  
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        Course&nbsp;1234
      </h2>
      <hr />

    
      <div className="d-flex">
        {/* left nav (hidden on < md) */}
        <div className="d-none d-md-block pe-md-4">
          <CourseNavigation />
        </div>


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
