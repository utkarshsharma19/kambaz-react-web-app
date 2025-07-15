import React from "react";
import { Form, Button } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";
export default function AssignmentEditor() {
  return (
    <Form id="wd-assignment-editor" className="p-4">
    {/* Assignment Name (label on top, left-aligned) */}
    <Form.Group controlId="wd-name" className="mb-3">
      <Form.Label className="text-start w-100">Assignment Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter assignment name"
      />
    </Form.Group>

      {/* Description */}
      <Form.Group controlId="wd-description" className="mb-3">
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Enter description"
        />
      </Form.Group>

      {/* Points */}
      <Form.Group as={Row} controlId="wd-points" className="mb-3 align-items-center">
  <Form.Label column sm={3}>
    Points
  </Form.Label>
  <Col sm={9}>
    <Form.Control type="number" placeholder="0" />
  </Col>
</Form.Group>

<Form.Group
      as={Row}
      controlId="wd-display-grade"
      className="mb-3 align-items-center"
    >
      <Form.Label column sm={3}>
        Assignment Group
      </Form.Label>
      <Col sm={9}>
        <Form.Select defaultValue="ASSIGNMENTS">
          <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          <option value="EXAMS">EXAMS</option>
        </Form.Select>
      </Col>
    </Form.Group>

    <Form.Group
      as={Row}
      controlId="wd-display-grade"
      className="mb-3 align-items-center"
    >
      <Form.Label column sm={3}>
        Display Grade As
      </Form.Label>
      <Col sm={9}>
        <Form.Select defaultValue="percentage">
          <option value="percentage">Percentage</option>
          <option value="grade">Grade</option>
        </Form.Select>
      </Col>
    </Form.Group>

      {/* Submission Type + Options */}
      <Row className="mb-4 align-items-start">
  {/* label on the left */}
  <Col md={3}>
    <Form.Label>Submission Type</Form.Label>
  </Col>

  {/* box on the right */}
  <Col md={9}>
    <div className="border p-3 rounded">
      <Form.Select defaultValue="online" className="mb-3">
        <option value="online">Online</option>
        <option value="onsite">Onsite</option>
      </Form.Select>

      <fieldset className="ps-3 border-start border-success">
        <legend className="small">Online entry options</legend>
        {[
          "Text Entry",
          "Website URL",
          "Media Recordings",
          "Student Annotation",
          "File Upload",
        ].map((opt) => (
          <Form.Check
            key={opt}
            type="checkbox"
            label={opt}
            className="mb-2"
          />
        ))}
      </fieldset>
    </div>
  </Col>
</Row>


      {/* Assign / Due / Available */}
      <Row className="mb-4 align-items-start">
  {/* “Assign” label */}
  <Col md={3}>
    <Form.Label>Assign</Form.Label>
  </Col>

  {/* Box containing all the assign-related fields */}
  <Col md={9}>
    <div className="border p-3 rounded">
      {/* Assign To */}
      <Form.Group controlId="wd-assign-to" className="mb-3">
        <Form.Label>Assign To</Form.Label>
        <Form.Select defaultValue="Everyone">
          <option>Everyone</option>
          <option>Utkarsh</option>
        </Form.Select>
      </Form.Group>

      {/* Due Date */}
      <Form.Group controlId="wd-due-date" className="mb-3">
        <Form.Label>Due Date</Form.Label>
        <Form.Control type="date" defaultValue="2025-07-14" />
      </Form.Group>

      {/* Available From & Until on same line */}
      <Row>
        <Form.Group as={Col} controlId="wd-available-from" className="mb-3">
          <Form.Label>Available From</Form.Label>
          <Form.Control type="date" defaultValue="2025-07-14" />
        </Form.Group>
        <Form.Group as={Col} controlId="wd-available-until" className="mb-3">
          <Form.Label>Available Until</Form.Label>
          <Form.Control type="date" defaultValue="2025-07-21" />
        </Form.Group>
      </Row>
    </div>
  </Col>
</Row>

      {/* Save Button */}
      
      <div className="d-flex justify-content-end mt-4">
  <Button variant="secondary" className="me-2">
    Cancel
  </Button>
  <Button variant="danger" type="submit">
    <FaSave className="me-2 text-white" />
    <span className="text-white">Save Assignment</span>
  </Button>
</div>
    </Form>
  );
}
