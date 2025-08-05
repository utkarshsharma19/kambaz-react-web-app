import { useState, FormEvent, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  Stack,
} from "react-bootstrap";
import { FaSave } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

import * as client from "./client";                 /* ← NEW */

export default function AssignmentEditor({
  assignments = [],
  setAssignments,
}: {
  assignments?: any[];
  setAssignments?: (a: any[]) => void;
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
    assignmentGroup: "",
    displayGradeAs: "",
    assignTo: "",
    onlineEntryOptions: [] as string[],
    due: "",
    availableFrom: "",
    availableUntil: "",
  };

  const [form, setForm] = useState(existing ?? blank);

  /* If user reloads deep-linked editor, fetch the assignment first */
  useEffect(() => {
    const load = async () => {
      if (existing || !cid || assignmentId === "new") return;
      const list = await client.findAssignmentsForCourse(cid);
      const found = list.find((a: any) => a._id === assignmentId);
      if (found) setForm(found);
    };
    load();
  }, [cid, assignmentId, existing]);

  const save = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (assignmentId === "new") {
        const draft = { ...form, _id: uuidv4() };
        const saved = await client.createAssignmentForCourse(cid, draft);
        setAssignments?.([...(assignments || []), saved]);
      } else {
        const saved = await client.updateAssignment(form);
        setAssignments?.(
          (assignments || []).map((a) => (a._id === saved._id ? saved : a))
        );
      }
      navigate("..");
    } catch (err) {
      console.error("save assignment:", err);
      alert("Could not save assignment – see console for details.");
    }
  };

  /* helper for checkbox set */
  const toggleOption = (opt: string) =>
    setForm((f) => {
      const present = f.onlineEntryOptions.includes(opt);
      return {
        ...f,
        onlineEntryOptions: present
          ? f.onlineEntryOptions.filter((o) => o !== opt)
          : [...f.onlineEntryOptions, opt],
      };
    });

  const onlineOptions = [
    "Text Entry",
    "Website URL",
    "Media Recordings",
    "Student Annotation",
    "File Upload",
  ];

  return (
    <Form id="wd-assignment-editor" className="p-4" onSubmit={save}>
      {/* ----- basic info ----- */}
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
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
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
            onChange={(e) =>
              setForm({ ...form, points: +e.target.value })
            }
          />
        </Col>
      </Form.Group>

      {/* ----- select fields ----- */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Assignment Group
        </Form.Label>
        <Col sm={9}>
          <Form.Select
            value={form.assignmentGroup}
            onChange={(e) =>
              setForm({ ...form, assignmentGroup: e.target.value })
            }
          >
            <option value="">Select group</option>
            <option>Homework</option>
            <option>Lab</option>
            <option>Project</option>
            <option>Quiz</option>
            <option>Exam</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-4">
        <Form.Label column sm={3}>
          Display Grade As
        </Form.Label>
        <Col sm={9}>
          <Form.Select
            value={form.displayGradeAs}
            onChange={(e) =>
              setForm({ ...form, displayGradeAs: e.target.value })
            }
          >
            <option value="">Select</option>
            <option>Percentage</option>
            <option>Points</option>
          </Form.Select>
        </Col>
      </Form.Group>

      {/* ----- submission type / online entry ----- */}
      <Row className="mb-4">
        <Col md={3}>
          <Form.Label>Submission Type</Form.Label>
        </Col>
        <Col md={9}>
          <div className="border p-3 rounded">
            <Form.Select disabled className="mb-3">
              <option value="online">Online</option>
            </Form.Select>

            <fieldset className="ps-3 border-start border-success">
              <legend className="small">Online entry options</legend>
              {onlineOptions.map((opt) => (
                <Form.Check
                  key={opt}
                  type="checkbox"
                  label={opt}
                  className="mb-2"
                  checked={form.onlineEntryOptions.includes(opt)}
                  onChange={() => toggleOption(opt)}
                />
              ))}
            </fieldset>
          </div>
        </Col>
      </Row>

      {/* ----- assign section ----- */}
      <Row className="mb-4">
        <Col md={3}>
          <Form.Label>Assign</Form.Label>
        </Col>
        <Col md={9}>
          <div className="border p-3 rounded">
            <Form.Group className="mb-3">
              <Form.Label>Assign To</Form.Label>
              <Form.Select
                value={form.assignTo}
                onChange={(e) =>
                  setForm({ ...form, assignTo: e.target.value })
                }
              >
                <option value="">Everyone</option>
                {form.assignTo && <option>{form.assignTo}</option>}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={form.due}
                onChange={(e) =>
                  setForm({ ...form, due: e.target.value })
                }
              />
            </Form.Group>

            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Available From</Form.Label>
                <Form.Control
                  type="date"
                  value={form.availableFrom}
                  onChange={(e) =>
                    setForm({ ...form, availableFrom: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Available Until</Form.Label>
                <Form.Control
                  type="date"
                  value={form.availableUntil}
                  onChange={(e) =>
                    setForm({ ...form, availableUntil: e.target.value })
                  }
                />
              </Form.Group>
            </Row>
          </div>
        </Col>
      </Row>

      {/* ----- action buttons ----- */}
      <Stack direction="horizontal" gap={2} className="justify-content-end">
        <Button
          variant="secondary"
          onClick={() => navigate("..")}
        >
          Cancel
        </Button>
        <Button type="submit" variant="danger">
          <FaSave className="me-2" />
          Save
        </Button>
      </Stack>
    </Form>
  );
}
