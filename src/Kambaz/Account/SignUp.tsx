// src/Kambaz/Account/Signup.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as client from "./client";          // ← your API wrapper
import { setCurrentUser } from "./reducer";

import Form              from "react-bootstrap/Form";
import Button            from "react-bootstrap/Button";
import Row               from "react-bootstrap/Row";
import Col               from "react-bootstrap/Col";

type User = {
  username   : string;
  password   : string;
  firstName  : string;
  lastName   : string;
  email      : string;
  dob        : string;      // ISO date (yyyy-mm-dd)
  role       : "STUDENT" | "TA" | "FACULTY" | "ADMIN";
  loginId    : string;
  section    : string;
};

const empty: User = {
  username : "",
  password : "",
  firstName: "",
  lastName : "",
  email    : "",
  dob      : "",
  role     : "STUDENT",
  loginId  : "",
  section  : ""
};

export default function Signup() {
  const [user, setUser] = useState<User>(empty);
  const [error, setError] = useState<string | null>(null);

  const navigate  = useNavigate();
  const dispatch  = useDispatch();

  const handleChange =
    (field: keyof User) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setUser({ ...user, [field]: e.target.value });

  const signup = async () => {
    try {
      const current = await client.signup(user);
      dispatch(setCurrentUser(current));
      navigate("/Kambaz/Account/Profile");
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Signup failed");
    }
  };

  return (
    <div className="wd-signup-screen container mt-4" style={{ maxWidth: 600 }}>
      <h2 className="mb-4">Create an account</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={user.username}
                onChange={handleChange("username")}
                placeholder="iron_man"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={user.password}
                onChange={handleChange("password")}
                placeholder="••••••"
                type="password"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>First name</Form.Label>
              <Form.Control
                value={user.firstName}
                onChange={handleChange("firstName")}
                placeholder="Tony"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                value={user.lastName}
                onChange={handleChange("lastName")}
                placeholder="Stark"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={user.email}
            onChange={handleChange("email")}
            placeholder="tony@stark.com"
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Date of birth</Form.Label>
              <Form.Control
                type="date"
                value={user.dob}
                onChange={handleChange("dob")}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select value={user.role} onChange={handleChange("role")}>
                <option value="STUDENT">Student</option>
                <option value="TA">Teaching Assistant</option>
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Admin</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Login ID</Form.Label>
              <Form.Control
                value={user.loginId}
                onChange={handleChange("loginId")}
                placeholder="001234561S"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Section</Form.Label>
              <Form.Control
                value={user.section}
                onChange={handleChange("section")}
                placeholder="S101"
              />
            </Form.Group>
          </Col>
        </Row>

        <Button
          className="w-100 mt-2"
          variant="primary"
          onClick={signup}
        >
          Sign up
        </Button>
      </Form>

      <p className="mt-3">
        Already have an account?{" "}
        <Link to="/Kambaz/Account/Signin">Sign in</Link>
      </p>
    </div>
  );
}
