import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormControl, Button } from "react-bootstrap";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Profile() {
  
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const [profile, setProfile] = useState<any | null>(null);

  const dispatch = useDispatch();
  const navigate  = useNavigate();
    const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };


  /* redirect if not signed in */
  useEffect(() => {
    if (!currentUser) {
      navigate("/Kambaz/Account/Signin");
    } else {
      setProfile(currentUser);
    }
  }, [currentUser, navigate]);


  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };


  if (!profile) return null;          // prevents flicker / errors

  return (
    <div className="wd-profile-screen" style={{ maxWidth: 400 }}>
      <h3>Profile</h3>

      <FormControl
        id="wd-username"
        className="mb-2"
        defaultValue={profile.username}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
      />

      <FormControl
        id="wd-password"
        type="password"
        className="mb-2"
        defaultValue={profile.password}
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
      />

      <FormControl
        id="wd-firstname"
        className="mb-2"
        defaultValue={profile.firstName}
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
      />

      <FormControl
        id="wd-lastname"
        className="mb-2"
        defaultValue={profile.lastName}
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
      />

      <FormControl
        id="wd-dob"
        type="date"
        className="mb-2"
        defaultValue={profile.dob}
        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
      />

      <FormControl
        id="wd-email"
        className="mb-2"
        defaultValue={profile.email}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
      />

      <select
        id="wd-role"
        className="form-control mb-2"
        value={profile.role}
        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>

      <Button id="wd-signout-btn" className="w-100" onClick={signout}>
        Sign out
      </Button>
      <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
    </div>
  );
}
