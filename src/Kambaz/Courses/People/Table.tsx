import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  Button,
  Modal,
  Form,
  Stack,
} from "react-bootstrap";
import { FaUserCircle, FaTrash, FaPen, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

import * as peopleClient from "./client";
  

/* ────────────────────────────────────────────────────────────── */

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>();

  /* who am I? (to know if I’m faculty) */
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  /* roster state */
  const [people, setPeople] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  /* modal state */
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  /* alias hack you had in the original file */
  const alias: Record<string, string> = { "1234": "RS101", "2345": "RS102" };
  const courseId = alias[cid ?? ""] ?? cid;

  /* ───── fetch roster ───── */
  useEffect(() => {
    const load = async () => {
      if (!courseId) return;
      setLoading(true);
      try   { setPeople(await peopleClient.findUsersForCourse(courseId)); }
      catch (e) { console.error("load roster:", e); }
      finally   { setLoading(false); }
    };
    load();
  }, [courseId]);

  /* ───── CRUD helpers (faculty) ───── */
  const openModalFor = (user: any | null) => {
    setEditing(user);
    setShowModal(true);
  };

  const saveUser = async () => {
    try {
      if (editing._id) {
        const saved = await peopleClient.updateUser(editing);
        setPeople(people.map((p) => (p._id === saved._id ? saved : p)));
      } else {
        const saved = await peopleClient.createUser(editing);
        setPeople([...people, saved]);
      }
    } catch (e) {
      console.error("save user:", e);
    } finally {
      setShowModal(false);
    }
  };

  const removeUser = async (uid: string) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await peopleClient.deleteUser(uid);
      setPeople(people.filter((p) => p._id !== uid));
    } catch (e) {
      console.error("delete user:", e);
    }
  };

  /* ───── UI ───── */
  return (
    <div id="wd-people-table">
      {isFaculty && (
        <Button
          variant="danger"
          className="mb-3"
          onClick={() => openModalFor({ firstName: "", lastName: "", role: "STUDENT" })}
        >
          <FaPlus className="me-2" />
          Add User
        </Button>
      )}

      <Table striped hover responsive className="align-middle">
        <thead className="table-secondary">
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            {isFaculty && <th className="text-center">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {people.map((user) => (
            <tr key={user._id}>
              <td>
                <div className="d-flex align-items-center">
                  <FaUserCircle className="me-2 fs-4 text-secondary" />
                  {user.firstName} {user.lastName}
                </div>
              </td>
              <td>{user.loginId}</td>
              <td>{user.section}</td>
              <td>{user.role}</td>
              <td>{user.lastActivity}</td>
              <td>{user.totalActivity}</td>
              {isFaculty && (
                <td className="text-center">
                  <FaPen
                    className="me-3 text-warning"
                    style={{ cursor: "pointer" }}
                    onClick={() => openModalFor(user)}
                  />
                  <FaTrash
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeUser(user._id)}
                  />
                </td>
              )}
            </tr>
          ))}

          {!loading && !people.length && (
            <tr>
              <td colSpan={isFaculty ? 7 : 6} className="text-center text-muted">
                No users enrolled in this course.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* ─── Add / Edit modal ─────────────────────────────── */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editing?._id ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={editing?.firstName ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, firstName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={editing?.lastName ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, lastName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Login ID</Form.Label>
              <Form.Control
                value={editing?.loginId ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, loginId: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={editing?.role ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, role: e.target.value })
                }
              >
                <option value="">Select</option>
                <option>STUDENT</option>
                <option>FACULTY</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Stack direction="horizontal" gap={2} className="ms-auto">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={saveUser}>
              Save
            </Button>
          </Stack>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
