import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Form,
  FormControl,
  Button,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import PeopleTable from "../People/Table";
import * as client from "../../Account/client.ts";

type DraftUser = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "STUDENT" | "TA" | "FACULTY" | "ADMIN" | "USER";
  section?: string;
  loginId?: string;
  totalActivity?: string;
  dob?: string;           // yyyy-mm-dd (UI)
  lastActivity?: string;  // yyyy-mm-dd (UI)
};

const emptyDraft: DraftUser = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  role: "USER",
  section: "",
  loginId: "",
  totalActivity: "",
  dob: "",
  lastActivity: "",
};

export default function Users() {
  const { uid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  // create-user modal state
  const [showCreate, setShowCreate] = useState(false);
  const [draft, setDraft] = useState<DraftUser>(emptyDraft);
  const [saving, setSaving] = useState(false);

  const fetchUsers = async () => {
    const data = await client.findAllUsers();
    setUsers(data);
  };

  const filterUsersByRole = async (r: string) => {
    setRole(r);
    if (r) {
      const data = await client.findUsersByRole(r);
      setUsers(data);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (n: string) => {
    setName(n);
    if (n) {
      const data = await client.findUsersByPartialName(n);
      setUsers(data);
    } else {
      if (role) {
        const data = await client.findUsersByRole(role);
        setUsers(data);
      } else {
        fetchUsers();
      }
    }
  };

  // OPEN create modal
  const openCreate = () => {
    setDraft(emptyDraft);
    setShowCreate(true);
  };

  // SAVE new user with full details
  const saveCreate = async () => {
    // minimal client-side validation
    if (!draft.username.trim() || !draft.password.trim()) {
      alert("Username and password are required.");
      return;
    }
    if (!draft.email.trim()) {
      alert("Email is required.");
      return;
    }

    setSaving(true);
    try {
      // Normalize dates for server (mongoose will cast ISO strings to Date)
      const payload: any = {
        ...draft,
        dob: draft.dob ? new Date(draft.dob).toISOString() : undefined,
        lastActivity: draft.lastActivity
          ? new Date(draft.lastActivity).toISOString()
          : undefined,
      };

      const user = await client.createUser(payload);

      // Re-apply current filters so list stays consistent
      if (name) await filterUsersByName(name);
      else if (role) await filterUsersByRole(role);
      else setUsers((prev) => [...prev, user]);

      setShowCreate(false);
      setDraft(emptyDraft);
    } catch (e: any) {
      console.error("Create user error:", e);
      alert(e?.response?.data?.message || "Could not create user");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h3>Users</h3>

      <FormControl
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name"
      />

      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
        <option value="USER">Users</option>
      </select>

      <button onClick={openCreate} className="float-end btn btn-danger wd-add-people">
        <FaPlus className="me-2" />
        Add User
      </button>

      <div className="clearfix" />

      <PeopleTable users={users} refresh={fetchUsers} />

      {/* ---------- Create User Modal ---------- */}
      <Modal show={showCreate} onHide={() => setShowCreate(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Username *</Form.Label>
                <Form.Control
                  value={draft.username}
                  onChange={(e) => setDraft({ ...draft, username: e.target.value })}
                  placeholder="e.g. jdoe"
                />
              </Col>
              <Col md={6}>
                <Form.Label>Password *</Form.Label>
                <Form.Control
                  type="password"
                  value={draft.password}
                  onChange={(e) => setDraft({ ...draft, password: e.target.value })}
                  placeholder="Choose a password"
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  value={draft.firstName}
                  onChange={(e) => setDraft({ ...draft, firstName: e.target.value })}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  value={draft.lastName}
                  onChange={(e) => setDraft({ ...draft, lastName: e.target.value })}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={8}>
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  value={draft.email}
                  onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                  placeholder="name@neu.edu"
                />
              </Col>
              <Col md={4}>
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={draft.role}
                  onChange={(e) =>
                    setDraft({ ...draft, role: e.target.value as DraftUser["role"] })
                  }
                >
                  <option value="USER">User</option>
                  <option value="STUDENT">Student</option>
                  <option value="TA">Assistant</option>
                  <option value="FACULTY">Faculty</option>
                  <option value="ADMIN">Admin</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Section</Form.Label>
                <Form.Control
                  value={draft.section}
                  onChange={(e) => setDraft({ ...draft, section: e.target.value })}
                  placeholder="e.g. S101"
                />
              </Col>
              <Col md={6}>
                <Form.Label>Login ID</Form.Label>
                <Form.Control
                  value={draft.loginId}
                  onChange={(e) => setDraft({ ...draft, loginId: e.target.value })}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>DOB</Form.Label>
                <Form.Control
                  type="date"
                  value={draft.dob}
                  onChange={(e) => setDraft({ ...draft, dob: e.target.value })}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Last Activity</Form.Label>
                <Form.Control
                  type="date"
                  value={draft.lastActivity}
                  onChange={(e) =>
                    setDraft({ ...draft, lastActivity: e.target.value })
                  }
                />
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Label>Total Activity</Form.Label>
                <Form.Control
                  value={draft.totalActivity}
                  onChange={(e) =>
                    setDraft({ ...draft, totalActivity: e.target.value })
                  }
                  placeholder="e.g. 12h"
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreate(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={saveCreate} disabled={saving}>
            {saving ? "Saving..." : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
