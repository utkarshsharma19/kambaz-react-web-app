import {
  Row,
  Col,
  Card,
  Button,
  FormControl,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addCourse,
  updateCourse as updateCourseAction,
  deleteCourse,
  setDraft,
} from "./Courses/reducer";
import { toggle } from "./Courses/Modules/enrollmentReducer";
import { v4 as uuidv4 } from "uuid";
import * as React from "react";

/* ---------- draft helper ---------- */
const emptyCourse = () => ({
  _id: "0",
  name: "",
  number: "",
  startDate: "",
  endDate: "",
  image: "/images/reactjs.jpg",
  description: "",
});

/* ------------------------------------------------------------ */

export default function Dashboard() {
  const dispatch = useDispatch();

  /* ---------- Redux ---------- */
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const { courses } = useSelector((s: any) => s.coursesReducer);
  const { enrollments = [] } =
    useSelector((s: any) => s.enrollmentReducer ?? {});

  /* ---------- local UI ---------- */
  const [showAll, setShowAll] = React.useState(false);

  /* ---------- New / Edit draft ---------- */
  const [course, setCourse] = React.useState<any>(emptyCourse());

  /* ---------- handlers ---------- */
  const addNewCourse = () => {
    const newCourse = { ...course, _id: uuidv4() };
    dispatch(addCourse(newCourse));
    setCourse(emptyCourse());
  };

  const updateCourse = () => {
    if (course._id === "0") return; // nothing selected
    dispatch(setDraft(course))
    dispatch(updateCourseAction(course));
    setCourse(emptyCourse());
  };

  const selectCourse = (c: any) => {setCourse(c);
    dispatch(setDraft(c));}

  /* ---------- helpers ---------- */
  const isEnrolled = (courseId: string) =>
    !!currentUser &&
    enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === courseId
    );

  const visibleCourses = showAll
    ? courses
    : courses.filter((c: any) => isEnrolled(c._id));

  /* ------------------------------------------------------------ */

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

      {/* -------- New / Edit form -------- */}
      <h5 className="d-flex align-items-center">
        New&nbsp;Course
        <Button
          variant="warning"
          className="ms-auto me-2"
          id="wd-update-course-click"
          disabled={course._id === "0"}
          onClick={updateCourse}
        >
          Update
        </Button>
        <Button
          variant="primary"
          id="wd-add-new-course-click"
          onClick={addNewCourse}
        >
          Add
        </Button>
      </h5>

      <Form style={{ maxWidth: 400 }} className="mb-4">
        <FormControl
          className="mb-2"
          placeholder="Course name"
          value={course.name}
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <FormControl
          as="textarea"
          rows={3}
          placeholder="Description"
          value={course.description}
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        />
      </Form>
      <hr />

      {/* -------- courses grid -------- */}
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

                <div className="d-flex flex-wrap gap-2 p-2">
                  <Button
                    variant="primary"
                    size="sm"
                    as={enrolled ? Link : "button"}
                    to={
                      enrolled ? `/Kambaz/Courses/${c._id}/Home` : undefined
                    }
                  >
                    Go
                  </Button>

                  <Button
                    size="sm"
                    variant={enrolled ? "danger" : "success"}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!currentUser) return;
                      dispatch(
                        toggle({ user: currentUser._id, course: c._id })
                      );
                    }}
                  >
                    {enrolled ? "Unenroll" : "Enroll"}
                  </Button>

                  {currentUser?.role === "FACULTY" && (
                    <>
                      <Button
                        size="sm"
                        variant="warning"
                        id="wd-edit-course-click"
                        onClick={(e) => {
                          e.preventDefault();
                          selectCourse(c); // copy into form
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

/* ---------- card content ---------- */
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
