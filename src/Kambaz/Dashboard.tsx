import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import * as db from "./Database/index";

export default function Dashboard() {
  const courses = db.courses || [];

  return (
    <div id="wd-dashboard" style={{ marginLeft: 35 }}>
      <h1 id="wd-dashboard-title" className="text-start">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published" className="text-start">
        Published Courses ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses" style={{ marginLeft: 35 }}>
        <Row xs={1} sm={2} md={3} lg={4} style={{ columnGap: 30, rowGap: 30 }}>
          {courses.map((course) => (
            <Col key={course._id} style={{ maxWidth: 250 }}>
              <Card className="h-100">
                <Link
                  to={`/Kambaz/Courses/${course._id}/Home`}
                  className="text-decoration-none text-dark"
                >
                  <Card.Img
                    variant="top"
                    src="/images/reactjs.jpg"
                    style={{ height: 140, objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-truncate">{course.name}</Card.Title>
                    <Card.Text className="flex-grow-1 text-truncate">
                      {course.description || "Course description not available."}
                    </Card.Text>
                    <Button variant="primary" className="mt-auto">
                      Go
                    </Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
