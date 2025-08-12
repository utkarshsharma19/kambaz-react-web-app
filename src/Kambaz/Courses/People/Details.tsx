import { useEffect, useState, useMemo } from "react";
import { FaUserCircle, FaCheck } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { Form, Row, Col, Button } from "react-bootstrap";
import * as client from "../../Account/client";

export default function PeopleDetails({
  refresh,
}: {
  refresh?: () => Promise<void> | void;
}) {
  const { uid } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const fetchUser = async () => {
    if (!uid) return;
    const u = await client.findUserById(uid);
    setUser(u);
    // prepare form state with date strings for inputs
    setForm({
      ...u,
      dob: u?.dob ? new Date(u.dob).toISOString().slice(0, 10) : "",
      lastActivity: u?.lastActivity
        ? new Date(u.lastActivity).toISOString().slice(0, 10)
        : "",
    });
  };

  useEffect(() => {
    if (uid) fetchUser();
    // eslint-disable-next-line
  }, [uid]);

  const close = () => navigate(-1);

  const deleteUser = async (id: string) => {
    await client.deleteUser(id);
    if (refresh) await Promise.resolve(refresh());
    close();
  };

  const saveUser = async () => {
    if (!form) return;
    setSaving(true);
    try {
      const payload = {
        ...form,
        dob: form.dob ? new Date(form.dob).toISOString() : undefined,
        lastActivity: form.lastActivity
          ? new Date(form.lastActivity).toISOString()
          : undefined,
      };
      const saved = await client.updateUser(payload);
      setUser(saved);
      setEditing(false);
      if (refresh) await Promise.resolve(refresh());
      close(); // keep your original behavior of closing after save
    } catch (e: any) {
      console.error("Update user error:", e);
      alert(e?.response?.data?.message || "Could not update user");
    } finally {
      setSaving(false);
    }
  };

  if (!uid) return null;
  if (!form) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={close} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" />
      </button>

      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />

      <div className="text-danger fs-4 mb-2">
        {!editing && (
          <FaPencil
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit"
            role="button"
          />
        )}
        {editing && (
          <FaCheck
            onClick={saveUser}
            className="float-end fs-5 mt-2 me-2 wd-save"
            role="button"
          />
        )}
        {!editing ? (
          <div className="wd-name" onClick={() => setEditing(true)} role="button">
            {user?.firstName} {user?.lastName}
          </div>
        ) : (
          <div className="mb-2">
            <Row className="g-2">
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  className="wd-edit-firstname"
                  value={form.firstName ?? ""}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  className="wd-edit-lastname"
                  value={form.lastName ?? ""}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                />
              </Col>
            </Row>
          </div>
        )}
      </div>

      {/* Details form / display */}
      {!editing ? (
        <>
          <div className="mb-1"><b>Username:</b> <span className="wd-username">{user?.username}</span></div>
          <div className="mb-1"><b>Email:</b> <span className="wd-email">{user?.email}</span></div>
          <div className="mb-1"><b>Roles:</b> <span className="wd-roles">{user?.role}</span></div>
          <div className="mb-1"><b>Login ID:</b> <span className="wd-login-id">{user?.loginId}</span></div>
          <div className="mb-1"><b>Section:</b> <span className="wd-section">{user?.section}</span></div>
          <div className="mb-1"><b>DOB:</b> <span className="wd-dob">{form.dob || "-"}</span></div>
          <div className="mb-1"><b>Last Activity:</b> <span className="wd-last-activity">{form.lastActivity || "-"}</span></div>
          <div className="mb-1"><b>Total Activity:</b> <span className="wd-total-activity">{user?.totalActivity}</span></div>
        </>
      ) : (
        <Form className="mb-3">
          <Row className="g-2 mb-2">
            <Col xs={12}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={form.email ?? ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Col>
          </Row>

          <Row className="g-2 mb-2">
            <Col xs={6}>
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={form.role ?? "USER"}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="USER">User</option>
                <option value="STUDENT">Student</option>
                <option value="TA">Assistant</option>
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Admin</option>
              </Form.Select>
            </Col>
            <Col xs={6}>
              <Form.Label>Section</Form.Label>
              <Form.Control
                value={form.section ?? ""}
                onChange={(e) => setForm({ ...form, section: e.target.value })}
              />
            </Col>
          </Row>

          <Row className="g-2 mb-2">
            <Col xs={6}>
              <Form.Label>Login ID</Form.Label>
              <Form.Control
                value={form.loginId ?? ""}
                onChange={(e) => setForm({ ...form, loginId: e.target.value })}
              />
            </Col>
            <Col xs={6}>
              <Form.Label>Total Activity</Form.Label>
              <Form.Control
                value={form.totalActivity ?? ""}
                onChange={(e) => setForm({ ...form, totalActivity: e.target.value })}
              />
            </Col>
          </Row>

          <Row className="g-2">
            <Col xs={6}>
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="date"
                value={form.dob ?? ""}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
              />
            </Col>
            <Col xs={6}>
              <Form.Label>Last Activity</Form.Label>
              <Form.Control
                type="date"
                value={form.lastActivity ?? ""}
                onChange={(e) => setForm({ ...form, lastActivity: e.target.value })}
              />
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-3">
            <Button
              variant="secondary"
              className="me-2"
              onClick={() => {
                setEditing(false);
                setForm({
                  ...user,
                  dob: user?.dob ? new Date(user.dob).toISOString().slice(0, 10) : "",
                  lastActivity: user?.lastActivity
                    ? new Date(user.lastActivity).toISOString().slice(0, 10)
                    : "",
                });
              }}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={saveUser} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </Form>
      )}

      <hr />
      <div className="d-flex justify-content-between">
        <Button onClick={close} className="btn btn-secondary me-2 wd-cancel">
          Close
        </Button>
        <Button onClick={() => deleteUser(uid!)} className="btn btn-danger wd-delete">
          Delete
        </Button>
      </div>
    </div>
  );
}
