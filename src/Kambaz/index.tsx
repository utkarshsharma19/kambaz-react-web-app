import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import KambazNavigation from "./Navigation";
import Account from "./Account";
import Dashboard, { emptyCourse } from "./Dashboard";
import Courses from "./Courses";
import ProtectedRoute from "./Account/ProtectedRoute";
import * as db from "./Database";

export default function Kambaz() {
  /* shared local state for now */
  const [courses, setCourses] = useState<any[]>(db.courses ?? []);
  const [course,  setCourse]  = useState<any>(emptyCourse());

  const addNewCourse = () => {
    setCourses([...courses, { ...course, _id: uuidv4() }]);
    setCourse(emptyCourse());
  };
  const deleteCourse = (id: string) =>
    setCourses(courses.filter((c) => c._id !== id));
  const updateCourse = () => {
    setCourses(courses.map((c) => (c._id === course._id ? course : c)));
    setCourse(emptyCourse());
  };

  return (
    <Container fluid id="wd-kambaz">
      <Row className="d-flex align-items-start">
        <Col md="auto" className="d-none d-md-block">
          <KambazNavigation />
        </Col>

        <Col>
          <Routes>
            {/* default */}
            <Route index element={<Navigate to="Account" replace />} />

            {/* public account subtree */}
            <Route path="Account/*" element={<Account />} />

            {/* protected routes */}
            <Route
              path="Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={courses} />
                </ProtectedRoute>
              }
            />

            {/* public extras */}
            <Route path="Calendar" element={<h1>Calendar</h1>} />
            <Route path="Inbox"    element={<h1>Inbox</h1>} />

            {/* fallback */}
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}
