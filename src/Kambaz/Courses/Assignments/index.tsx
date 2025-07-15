import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { InputGroup, FormControl, Button, Badge } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaFileAlt, FaSearch, FaPlus, FaChevronDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { Link } from "react-router-dom";

export default function Assignments() {
  const [open, setOpen] = useState(true);
  const assignments = [
    { id: 123, title: "A1 – ENV + HTML", modules: "Multiple Modules", available: "May 6 at 12:00 am", due: "May 13 at 11:59 pm", points: 100 },
    { id: 124, title: "A2 – CSS Basics", modules: "Multiple Modules", available: "May 13 at 12:00 am", due: "May 20 at 11:59 pm", points: 100 },
    { id: 125, title: "A3 – JavaScript Intro", modules: "Multiple Modules", available: "May 20 at 12:00 am", due: "May 27 at 11:59 pm", points: 100 },
  ];

  return (
    <div id="wd-assignments">
      {/* Top bar */}
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

      <ListGroup className="rounded-0">
        {/* Header */}
        <ListGroup.Item
          action
          onClick={() => setOpen(!open)}
          className="d-flex justify-content-between align-items-center p-3 bg-light border"
        >
          <div className="d-flex align-items-center text-dark">
            <FaChevronDown className={`me-2 ${open ? "rotate-180" : ""}`} />
            <BsGripVertical className="me-2" />
            <span className="fw-bold">ASSIGNMENTS</span>
          </div>
          <div className="d-flex align-items-center">
            <Badge bg="light" text="dark" pill className="me-3">
              40% of Total
            </Badge>
            <FaPlus className="text-dark me-3 fs-5" style={{ cursor: "pointer" }} />
            <IoEllipsisVertical className="text-dark fs-5" style={{ cursor: "pointer" }} />
          </div>
        </ListGroup.Item>

        {/* Items */}
        {open && (
          <ListGroup className="rounded-0">
            {assignments.map((a) => (
              <ListGroup.Item
                key={a.id}
                className="d-flex flex-column p-3 border-0 border-start border-5 border-success"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <FaFileAlt className="me-2" />
                    <Link to={`${a.id}`} className="text-dark text-decoration-none fw-medium">
                      {a.title}
                    </Link>
                  </div>
                  {/* Green check + three dots */}
                  <div className="d-flex align-items-center">
                    <GreenCheckmark />
                    <IoEllipsisVertical className="fs-5 text-muted" />
                  </div>
                </div>
                <div className="ms-4 mt-1 small text-muted">
                  <span className="text-danger">{a.modules}</span> |
                  <strong> Not available until</strong> {a.available} |
                  <strong> Due</strong> {a.due} |
                  {a.points} pts
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </ListGroup>
    </div>
  );
}
