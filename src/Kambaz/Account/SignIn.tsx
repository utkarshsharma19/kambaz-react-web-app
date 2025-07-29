import { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as db from "../Database";

export default function Signin() {
  /* local form state */
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  /* redux + router helpers */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* on click “Sign in” */
  const signin = () => {
    const user = db.users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (!user) return;                 // invalid – stay on page

    dispatch(setCurrentUser(user));    // store in Redux
    navigate("/Kambaz/Dashboard");     // go to dashboard
  };

  return (
    <div id="wd-signin-screen" style={{ maxWidth: 320 }}>
      <h3>Sign in</h3>

      <FormControl
        id="wd-username"
        className="mb-2"
        placeholder="username"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />

      <FormControl
        id="wd-password"
        className="mb-2"
        placeholder="password"
        type="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />

      <Button id="wd-signin-btn" className="w-100 mb-2" onClick={signin}>
        Sign in
      </Button>

      <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}
