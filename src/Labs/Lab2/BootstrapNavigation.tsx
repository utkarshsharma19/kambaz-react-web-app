import { Nav, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function BootstrapNavigation() {
  return (
    <>
      {/* Navigation Tabs */}
      <section id="wd-css-navigating-with-tabs" className="mb-4">
        <h2>Tabs</h2>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link as={Link} to="/Labs/Lab2/Active">
              Active
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/Labs/Lab2/Link1">
              Link 1
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/Labs/Lab2/Link2">
              Link 2
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/Labs/Lab2/Disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </section>

      {/* Card Example */}
      <section id="wd-css-navigating-with-cards">
        <h2>Cards</h2>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="/src/assets/Grey.jpg" />
          <Card.Body>
            <Card.Title>Stacking Starship</Card.Title>
            <Card.Text>
              Stacking the most powerful rocket in history. Mars or bust!
            </Card.Text>
            <Button variant="primary">Boldly Go</Button>
          </Card.Body>
        </Card>
      </section>
    </>
  );
}
