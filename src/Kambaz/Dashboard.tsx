
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import blueCard from "../assets/blue_card.jpeg";
import greyCard from "../assets/Grey.jpg";
import teslaBot from "../assets/Tesla_Bot_2023.jpg";

export default function Dashboard() {
  const courses = [
    { id: "1234", title: "CS1234 React JS",       img: blueCard },
    { id: "1000", title: "CS1000 Node JS",        img: greyCard },
    { id: "2000", title: "CS2000 Spring Boot",    img: teslaBot },
    { id: "3000", title: "CS3000 Flutter",        img: blueCard },
    { id: "4000", title: "CS4000 Blockchain",     img:  greyCard },
    { id: "5000", title: "CS5000 AI",             img: blueCard },
    { id: "6000", title: "CS6000 Physics JS",     img:  greyCard },
    { id: "5700", title: "CS5700 Mathematics",    img:teslaBot },
  ];

  return (
    <div id="wd-dashboard" style={{ marginLeft: 35 }}>
      <h1 id="wd-dashboard-title" className="text-start">
        Dashboard
      </h1>
      <hr />

      <h2 id="wd-dashboard-published" className="text-start">
        Published Courses ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses" style={{ marginLeft: 35 }}>
        <Row xs={1} sm={2} md={3} lg={4} style={{ columnGap: 30, rowGap: 30 }}>
          {courses.map(({ id, title, img }) => (
            <Col key={id} style={{ maxWidth: 250 }}>
              <Card className="h-100">
                <Link
                  to={`/Kambaz/Courses/${id}/Home`}
                  className="text-decoration-none text-dark"
                >
                  <Card.Img
                    variant="top"
                    src={img}
                    style={{ height: 140, objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-truncate">{title}</Card.Title>
                    <Card.Text className="flex-grow-1 text-truncate">
                      Full Stack software developer
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
