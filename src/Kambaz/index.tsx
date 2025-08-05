/*  src/Kambaz/index.tsx  */
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import * as enrollClient from "./Courses/Enrollments/client";
import KambazNavigation from "./Navigation";
import Account          from "./Account";
import Dashboard        from "./Dashboard";
import Courses          from "./Courses";
import ProtectedRoute   from "./Account/ProtectedRoute";
import ProtectedCourseRoute from "./Account/ProtectedCourseRoute";
import Session          from "./Account/Session";

import * as courseClient  from "./Courses/client";  
import * as userClient  from "./Account/client";      // ← NEW: server API
    // ← NEW: server API
import { emptyCourse }  from "./Courses/reducer";     // draft helper
import { replaceEnrollments } from "./Courses/Modules/enrollmentReducer";

/* ------------------------------------------------------------------ */
export default function Kambaz() {
  /* ---------- state ---------- */
  const [courses, setCourses] = useState<any[]>([]);  // start empty
  const [course,  setCourse]  = useState<any>(emptyCourse());

  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const dispatch = useDispatch(); 
  /* ---------- sync courses with server ---------- */
  const loadMyCourses = async () => {
    if (!currentUser) { setCourses([]); return; }
    try   { setCourses(await userClient.findMyCourses()); }
    catch (e) { console.error("load courses:", e); }
  };
  useEffect(() => { loadMyCourses(); }, [currentUser]);

  /* ---------- local CRUD helpers (still client-side for now) ---------- */
  useEffect(() => {
    const load = async () => {
      if (!currentUser) {                // signed out → empty list
        dispatch(replaceEnrollments([]));
        return;
      }
      const list = await enrollClient.myEnrollments();
      dispatch(replaceEnrollments(list));
    };
    load();
  }, [currentUser, dispatch]);
  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([ ...courses, newCourse ]);
  };

  const deleteCourse = async (courseId: string) => {
    await courseClient.removeCourse(courseId);
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => (c._id === course._id ? course : c))
    );
  };


  /* ---------- render ---------- */
  return (
    <Session>
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

              {/* protected dashboard */}
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

              {/* protected courses subtree */}
              <Route element={<ProtectedCourseRoute />}>
                <Route
                  path="Courses/:cid/*"
                  element={
                    <ProtectedRoute>
                      <Courses courses={courses} />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* public extras */}
              <Route path="Calendar" element={<h1>Calendar</h1>} />
              <Route path="Inbox"    element={<h1>Inbox</h1>} />

              {/* fallback */}
              <Route path="*" element={<h1>Not found</h1>} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Session>
  );
}
