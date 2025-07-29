import { Row, Col, Card, Button, FormControl, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as db from "./Database";              // ← brings in enrollments

/* a blank template for the “new course” form */
export const emptyCourse = () => ({
  _id: "0",
  name: "New Course",
  number: "New Number",
  startDate: "2023-09-10",
  endDate: "2023-12-15",
  image: "/images/reactjs.jpg",
  description: "New Description",
});

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (c: any) => void;
  addNewCourse: () => void;
  deleteCourse: (id: string) => void;
  updateCourse: () => void;
}) {
  /* signed‑in user comes from the Account reducer */
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const { enrollments } = db;

  /* only courses the user is enrolled in */
  const userCourses = currentUser
    ? courses.filter((c) =>
        enrollments.some(
          (e) => e.user === currentUser._id && e.course === c._id
        )
      )
    : [];

  /* copy a card into the form for editing */
  const editCourse = (c: any) => setCourse({ ...c });

  return (
    <div id="wd-dashboard" style={{ marginLeft: 35 }}>
      <h1 id="wd-dashboard-title" className="text-start">
        Dashboard
      </h1>
      <hr />

      {/* FORM */}
      <h5 className="d-flex align-items-center">
        New Course
        <Button className="ms-auto" id="wd-add-new-course-click" onClick={addNewCourse}>
          Add
        </Button>
        <Button
          className="me-2"
          variant="warning"
          id="wd-update-course-click"
          disabled={course._id === "0"}
          onClick={updateCourse}
        >
          Update
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
          className="mb-2"
          placeholder="Description"
          value={course.description}
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        />
      </Form>
      <hr />

      {/* GRID */}
      <h2 id="wd-dashboard-published" className="text-start">
        Published Courses ({userCourses.length})
      </h2>
      <hr />

      <Row
        xs={1}
        sm={2}
        md={3}
        lg={4}
        style={{ columnGap: 30, rowGap: 30, marginLeft: 35 }}
        id="wd-dashboard-courses"
      >
        {userCourses.map((c) => (
          <Col key={c._id} style={{ maxWidth: 250 }}>
            <Card className="h-100">
              <Link
                to={`/Kambaz/Courses/${c._id}/Home`}
                className="text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src={c.image || "/images/reactjs.jpg"}
                  style={{ height: 140, objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-truncate">{c.name}</Card.Title>
                  <Card.Text className="flex-grow-1 text-truncate">
                    {c.description || "Course description not available."}
                  </Card.Text>
                  <Button variant="primary" className="mt-auto">
                    Go
                  </Button>
                </Card.Body>
              </Link>

              <div className="d-flex">
                <Button
                  id="wd-edit-course-click"
                  variant="warning"
                  className="flex-grow-1 rounded-0"
                  onClick={(e) => {
                    e.preventDefault();
                    editCourse(c);
                  }}
                >
                  Edit
                </Button>
                <Button
                  id="wd-delete-course-click"
                  variant="danger"
                  className="flex-grow-1 rounded-0"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteCourse(c._id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
