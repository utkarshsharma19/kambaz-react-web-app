import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import { ListGroup, InputGroup, FormControl, Button, Badge } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaFileAlt, FaSearch, FaPlus, FaChevronDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";

import GreenCheckmark from "../Modules/GreenCheckmark";
import { assignments } from "../../Database/index";

/* ─────────────────────────────────────────────────────────────────── */

export default function Assignments() {
  const alias: Record<string,string> = {
    "1234": "RS101",
    "2345": "RS102",
    
  }
  const { cid = "" } = useParams<{ cid: string }>();     // “RS101” etc.
  const [open, setOpen] = useState(true);

  /** OPTIONAL: map legacy numeric course IDs to real codes */
  
  
  const courseId = alias[cid] ?? cid;

  /** pull only the rows that match this course */
  const assignment = assignments
    .filter((row) => row.course === courseId)
    .map((row) => ({
      id: row._id,
      title: row.title,
      // ▸ provide defaults for fields that aren’t in the JSON
      modules: "Multiple Modules",
      available: "TBD",      // or ""
      due: "TBD",
      points: 100,
    }));

  /* ───────────── UI ───────────── */
  return (
    <div id="wd-assignments">
      {/* top search + buttons */}
      <div className="d-flex align-items-center mb-3">
        <InputGroup style={{ width: 250 }} className="me-auto">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <FormControl placeholder="Search Assignments" />
        </InputGroup>
        <Button variant="secondary" className="text-dark me-2">
          + Group
        </Button>
        <Button variant="danger">+ Assignment</Button>
      </div>

      {/* header row */}
      <ListGroup className="rounded-0">
        <ListGroup.Item
          action
          onClick={() => setOpen((o) => !o)}
          className="d-flex justify-content-between align-items-center p-3 bg-light border"
        >
          <div className="d-flex align-items-center text-dark">
            <FaChevronDown className={`me-2 ${open ? "rotate-180" : ""}`} />
            <BsGripVertical className="me-2" />
            <span className="fw-bold">ASSIGNMENTS</span>
          </div>
          <div className="d-flex align-items-center">
            <Badge bg="light" text="dark" pill className="me-3">
              {assignment.length * 10}% of Total
            </Badge>
            <FaPlus className="text-dark me-3 fs-5" style={{ cursor: "pointer" }} />
            <IoEllipsisVertical className="text-dark fs-5" style={{ cursor: "pointer" }} />
          </div>
        </ListGroup.Item>

        {/* list items */}
        {open && (
          <ListGroup className="rounded-0">
            {assignment.map((a) => (
              <ListGroup.Item
                key={a.id}
                className="d-flex flex-column p-3 border-0 border-start border-5 border-success"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <FaFileAlt className="me-2" />
                    <Link
                      to={`${a.id}`}
                      className="text-dark text-decoration-none fw-medium"
                    >
                      {a.title}
                    </Link>
                  </div>
                  <div className="d-flex align-items-center">
                    <GreenCheckmark />
                    <IoEllipsisVertical className="fs-5 text-muted" />
                  </div>
                </div>
                <div className="ms-4 mt-1 small text-muted">
                  <span className="text-danger">{a.modules}</span> |{" "}
                  <strong>Not available until</strong> {a.available} |{" "}
                  <strong>Due</strong> {a.due} | {a.points} pts
                </div>
              </ListGroup.Item>
            ))}

            {!assignment.length && (
              <ListGroup.Item className="text-center text-muted">
                No assignments for this course.
              </ListGroup.Item>
            )}
          </ListGroup>
        )}
      </ListGroup>
    </div>
  );
}
