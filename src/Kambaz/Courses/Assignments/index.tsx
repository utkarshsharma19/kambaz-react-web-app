import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ListGroup,
  InputGroup,
  FormControl,
  Button,
  Badge,
} from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import {
  FaFileAlt,
  FaSearch,
  FaPlus,
  FaChevronDown,
  FaTrash,
} from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";

import * as client from "./client";                 /* ← NEW */

export default function Assignments({
  assignments = [],                                 /* still allowed */
  setAssignments,
}: {
  assignments?: any[];
  setAssignments?: (a: any[]) => void;
}) {
  const { cid = "" } = useParams();
  const [open, setOpen] = useState(true);

  /* local copy (so the component also works if parent doesn't pass props) */
  const [list, setList] = useState<any[]>(assignments);
  const navigate = useNavigate();

  /* ───── load from server once ───── */
  useEffect(() => {
    const load = async () => {
      if (!cid) return;
      try {
        const data = await client.findAssignmentsForCourse(cid);
        setList(data);
        setAssignments?.(data);                     // keep parent in sync
      } catch (e) {
        console.error("load assignments:", e);
      }
    };
    load();
  }, [cid]);                                       // reload if course changes

  const courseAssignments = list.filter((a) => a.course === cid);

  /* ───── helpers ───── */
  const remove = async (id: string) => {
    if (!window.confirm("Delete this assignment?")) return;
    try {
      await client.deleteAssignment(id);
      const newList = list.filter((a) => a._id !== id);
      setList(newList);
      setAssignments?.(newList);
    } catch (e) {
      console.error("delete assignment:", e);
    }
  };

  return (
    <div id="wd-assignments">
      {/* top bar */}
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
        <Button variant="danger" onClick={() => navigate("new")}>
          + Assignment
        </Button>
      </div>

      {/* header */}
      <ListGroup className="rounded-0">
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
          <Badge
            bg="transparent"
            text="dark"
            pill
            className="me-3 border border-1 border-dark fw-normal"
          >
            40% of Total
          </Badge>
        </ListGroup.Item>

        {/* list */}
        {open && (
          <ListGroup className="rounded-0">
            {courseAssignments.map((a) => (
              <ListGroup.Item
                key={a._id}
                className="d-flex flex-column p-3 border-0 border-start border-5 border-success"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <FaFileAlt className="me-2" />
                    <Link
                      to={a._id}
                      className="text-dark text-decoration-none fw-medium"
                    >
                      {a.title}
                    </Link>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaTrash
                      className="text-danger me-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => remove(a._id)}
                    />
                    <GreenCheckmark />
                    <IoEllipsisVertical className="fs-5 text-muted" />
                  </div>
                </div>
                <div className="ms-4 mt-1 small text-muted">
                  Due {a.due || "TBD"} | {a.points || 0} pts
                </div>
              </ListGroup.Item>
            ))}

            {!courseAssignments.length && (
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
