import { useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { assignments } from "../../Database/index";

export default function AssignmentEditor() {
  const { assignmentId = "" } = useParams<{ assignmentId: string }>();
  const assignment =
    assignments.find((a) => a._id === assignmentId) ?? {
      title: "",
      description: "",
      points: 0,
      assignmentGroup: "",
      displayGradeAs: "",
      assignTo: "",
      due: "",
      availableFrom: "",
      availableUntil: "",
      onlineEntryOptions: [] as string[],
    };

  const onlineOptions = [
    "Text Entry",
    "Website URL",
    "Media Recordings",
    "Student Annotation",
    "File Upload",
  ];

  return (
    <Form id="wd-assignment-editor" className="p-4">

      <Form.Group controlId="wd-name" className="mb-3">
        <Form.Label className="text-start w-100">Assignment Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter assignment name"
          defaultValue={assignment.title}
        />
      </Form.Group>

      <Form.Group controlId="wd-description" className="mb-3">
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Enter description"
          defaultValue={assignment.description}
        />
      </Form.Group>

      <Form.Group as={Row} controlId="wd-points" className="mb-3 align-items-center">
        <Form.Label column sm={3}>
          Points
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="number" placeholder="0" defaultValue={assignment.points} />
        </Col>
      </Form.Group>

      <Form.Group
        as={Row}
        controlId="wd-assignment-group"
        className="mb-3 align-items-center"
      >
        <Form.Label column sm={3}>
          Assignment Group
        </Form.Label>
        <Col sm={9}>
          <Form.Select defaultValue={assignment.assignmentGroup}>
            <option value="">Select group</option>
            <option>Homework</option>
            <option>Lab</option>
            <option>Project</option>
            <option>Quiz</option>
            <option>Exam</option>
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
          <Form.Select defaultValue={assignment.displayGradeAs}>
            <option value="">Select</option>
            <option>Percentage</option>
            <option>Points</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Row className="mb-4 align-items-start">
        <Col md={3}>
          <Form.Label>Submission Type</Form.Label>
        </Col>
        <Col md={9}>
          <div className="border p-3 rounded">
            <Form.Select defaultValue="online" className="mb-3">
              <option value="online">Online</option>
              <option value="onsite">Onsite</option>
            </Form.Select>

            <fieldset className="ps-3 border-start border-success">
              <legend className="small">Online entry options</legend>
              {onlineOptions.map((opt) => (
                <Form.Check
                  key={opt}
                  type="checkbox"
                  label={opt}
                  className="mb-2"
                  defaultChecked={assignment.onlineEntryOptions.includes(opt)}
                />
              ))}
            </fieldset>
          </div>
        </Col>
      </Row>

      <Row className="mb-4 align-items-start">
        <Col md={3}>
          <Form.Label>Assign</Form.Label>
        </Col>
        <Col md={9}>
          <div className="border p-3 rounded">
            <Form.Group controlId="wd-assign-to" className="mb-3">
              <Form.Label>Assign To</Form.Label>
              <Form.Select defaultValue={assignment.assignTo}>
                <option>Everyone</option>
                <option>{assignment.assignTo}</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="wd-due-date" className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" defaultValue={assignment.due} />
            </Form.Group>

            <Row>
              <Form.Group as={Col} controlId="wd-available-from" className="mb-3">
                <Form.Label>Available From</Form.Label>
                <Form.Control type="date" defaultValue={assignment.availableFrom} />
              </Form.Group>
              <Form.Group as={Col} controlId="wd-available-until" className="mb-3">
                <Form.Label>Available Until</Form.Label>
                <Form.Control type="date" defaultValue={assignment.availableUntil} />
              </Form.Group>
            </Row>
          </div>
        </Col>
      </Row>

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
