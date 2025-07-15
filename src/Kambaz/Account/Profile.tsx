import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-4">
      <h3>Profile</h3>

      <Form>
        <Form.Group controlId="wd-username" className="mb-2">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            defaultValue="alice"
            placeholder="username"
          />
        </Form.Group>

        <Form.Group controlId="wd-password" className="mb-2">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            defaultValue="123"
            placeholder="password"
          />
        </Form.Group>

        <Form.Group controlId="wd-firstname" className="mb-2">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            defaultValue="Alice"
            placeholder="First Name"
          />
        </Form.Group>

        <Form.Group controlId="wd-lastname" className="mb-2">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            defaultValue="Wonderland"
            placeholder="Last Name"
          />
        </Form.Group>

        <Form.Group controlId="wd-dob" className="mb-2">
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control
            type="date"
            defaultValue="2000-01-01"
          />
        </Form.Group>

        <Form.Group controlId="wd-email" className="mb-2">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            defaultValue="alice@wonderland"
            placeholder="email"
          />
        </Form.Group>

        <Form.Group controlId="wd-role" className="mb-3">
          <Form.Label>Role:</Form.Label>
          <Form.Select defaultValue="FACULTY">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>
        </Form.Group>
      </Form>

      <Link
  id="wd-signout-btn"
  to="/Kambaz/Account/Signin"
  className="btn btn-danger text-white w-100"
>
  Sign out
</Link>
    </div>
  );
}
