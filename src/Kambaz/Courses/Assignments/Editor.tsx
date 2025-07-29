import { useState, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

/* ────────────────────────────────────────────────────────────── */

export default function AssignmentEditor({
  assignments,
  setAssignments,
}: {
  assignments: any[];
  setAssignments: (a: any[]) => void;
}) {
  const { cid = "", assignmentId = "new" } = useParams();
  const navigate = useNavigate();

  const existing = assignments.find((a) => a._id === assignmentId);
  const blank = {
    _id: "new",
    course: cid,
    title: "",
    description: "",
    points: 0,
    due: "",
    availableFrom: "",
    availableUntil: "",
  };

  const [form, setForm] = useState(existing ?? blank);

  const save = (e: FormEvent) => {
    e.preventDefault();
    if (assignmentId === "new") {
      setAssignments([...assignments, { ...form, _id: uuidv4() }]);
    } else {
      setAssignments(assignments.map((a) => (a._id === form._id ? form : a)));
    }
    navigate("..");
  };

  return (
    <Form id="wd-assignment-editor" className="p-4" onSubmit={save}>
      <Form.Group className="mb-3">
        <Form.Label>Assignment Name</Form.Label>
        <Form.Control
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Points
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="number"
            value={form.points}
            onChange={(e) => setForm({ ...form, points: +e.target.value })}
          />
        </Col>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Due</Form.Label>
          <Form.Control
            type="date"
            value={form.due}
            onChange={(e) => setForm({ ...form, due: e.target.value })}
          />
        </Form.Group>
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Available From</Form.Label>
          <Form.Control
            type="date"
            value={form.availableFrom}
            onChange={(e) =>
              setForm({ ...form, availableFrom: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Available Until</Form.Label>
          <Form.Control
            type="date"
            value={form.availableUntil}
            onChange={(e) =>
              setForm({ ...form, availableUntil: e.target.value })
            }
          />
        </Form.Group>
      </Row>

      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={() => navigate("..")}>
          Cancel
        </Button>
        <Button type="submit" variant="danger">
          <FaSave className="me-2" />
          Save
        </Button>
      </div>
    </Form>
  );
}
