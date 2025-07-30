import {
  Row, Col, Card, Button, FormControl, Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setDraft, addCourse, updateCourse, deleteCourse,
} from "./Courses/reducer";
import { toggle } from "./Courses/Modules/enrollmentReducer";
import * as React from "react";

export default function Dashboard() {
  const dispatch = useDispatch();

  /* Redux */
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const { courses, draft } = useSelector((s: any) => s.coursesReducer);
  const { enrollments = [] } =
    useSelector((s: any) => s.enrollmentReducer ?? {});

  /* local UI */
  const [showAll, setShowAll] = React.useState(false);

  /* helpers */
  const isEnrolled = (courseId: string) =>
    !!currentUser &&
    enrollments.some((e: any) => e.user === currentUser._id && e.course === courseId);

  const visibleCourses = showAll
    ? courses
    : courses.filter((c) => isEnrolled(c._id));

  return (
    <div id="wd-dashboard" style={{ marginLeft: 35 }}>
      <h1 id="wd-dashboard-title" className="d-flex">
        Dashboard
        <Button
          variant={showAll ? "primary" : "outline-primary"}
          className="ms-auto"
          onClick={() => setShowAll(!showAll)}
        >
          Enrollments
        </Button>
      </h1>
      <hr />

      {/* course‑creation form (unchanged) */}
      {/* … */}

      <h2 className="text-start">
        {showAll ? "All Courses" : "My Courses"} ({visibleCourses.length})
      </h2>
      <hr />

      <Row xs={1} sm={2} md={3} lg={4} style={{ columnGap: 30, rowGap: 30 }}>
        {visibleCourses.map((c: any) => {
          const enrolled = isEnrolled(c._id);

          return (
            <Col key={c._id} style={{ maxWidth: 250 }}>
              <Card className="h-100">

                {/* image + title + description */}
                {enrolled ? (
                  <Link
                    to={`/Kambaz/Courses/${c._id}/Home`}
                    className="text-dark text-decoration-none"
                  >
                    <CardContent course={c} />
                  </Link>
                ) : (
                  <CardContent course={c} />
                )}

                {/* single row of action buttons */}
                <div className="d-flex flex-wrap gap-2 p-2">

                  {/* Go – blue */}
                  <Button
                    variant="primary"
                    size="sm"
                    as={enrolled ? Link : "button"}
                    to={enrolled ? `/Kambaz/Courses/${c._id}/Home` : undefined}
                  >
                    Go
                  </Button>

                  {/* Enroll / Unenroll – green / red */}
                  <Button
                    size="sm"
                    variant={enrolled ? "danger" : "success"}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!currentUser) return;
                      dispatch(toggle({ user: currentUser._id, course: c._id }));
                    }}
                  >
                    {enrolled ? "Unenroll" : "Enroll"}
                  </Button>

                  {/* Faculty‑only buttons */}
                  {currentUser?.role === "FACULTY" && (
                    <>
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(setDraft(c));
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(deleteCourse(c._id));
                        }}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

/* ---------- extracted for clarity ---------- */
function CardContent({ course }: { course: any }) {
  return (
    <>
      <Card.Img
        variant="top"
        src={course.image || "/images/reactjs.jpg"}
        style={{ height: 140, objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate">{course.name}</Card.Title>
        <Card.Text className="flex-grow-1 text-truncate">
          {course.description || "Course description not available."}
        </Card.Text>
      </Card.Body>
    </>
  );
}
