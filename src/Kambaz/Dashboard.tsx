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
  setDraft,
  addCourse,
  updateCourse,
  deleteCourse,
  emptyCourse,
} from "./Courses/reducer";
import * as db from "./Database";               // for enrollments

export default function Dashboard() {
  const dispatch = useDispatch();

  /* from Redux */
  const { currentUser }   = useSelector((s: any) => s.accountReducer);
  const { courses, draft} = useSelector((s: any) => s.coursesReducer);
  const { enrollments }   = db;

  /* courses visible to current user */
  const userCourses = currentUser
    ? courses.filter((c: any) =>
        enrollments.some(
          (e) => e.user === currentUser._id && e.course === c._id
        )
      )
    : [];

  /* helpers */
  const editCourse = (c: any) => dispatch(setDraft(c));

  return (
    <div id="wd-dashboard" style={{ marginLeft: 35 }}>
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* form */}
      <h5 className="d-flex align-items-center">
        New Course
        <Button
          className="ms-auto"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addCourse())}
        >
          Add
        </Button>
        <Button
          variant="warning"
          className="me-2"
          id="wd-update-course-click"
          disabled={draft._id === "0"}
          onClick={() => dispatch(updateCourse())}
        >
          Update
        </Button>
      </h5>

      <Form style={{ maxWidth: 400 }} className="mb-4">
        <FormControl
          className="mb-2"
          placeholder="Course name"
          value={draft.name}
          onChange={(e) => dispatch(setDraft({ ...draft, name: e.target.value }))}
        />
        <FormControl
          as="textarea"
          rows={3}
          className="mb-2"
          placeholder="Description"
          value={draft.description}
          onChange={(e) =>
            dispatch(setDraft({ ...draft, description: e.target.value }))
          }
        />
      </Form>
      <hr />

      {/* grid */}
      <h2 className="text-start">
        Published Courses ({userCourses.length})
      </h2>
      <hr />

      <Row xs={1} sm={2} md={3} lg={4} style={{ columnGap: 30, rowGap: 30 }}>
        {userCourses.map((c: any) => (
          <Col key={c._id} style={{ maxWidth: 250 }}>
            <Card className="h-100">
              <Link
                to={`/Kambaz/Courses/${c._id}/Home`}
                className="text-dark text-decoration-none"
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
                  variant="danger"
                  className="flex-grow-1 rounded-0"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(deleteCourse(c._id));
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
