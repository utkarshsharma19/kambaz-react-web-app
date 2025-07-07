import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>

      <label htmlFor="wd-username">Username: </label>
      <input
        defaultValue="alice"
        placeholder="username"
        className="wd-username"
        id="wd-username"
      /><br/>

      <label htmlFor="wd-password">Password: </label>
      <input
        defaultValue="123"
        placeholder="password"
        type="password"
        className="wd-password"
        id="wd-password"
      /><br/>

      <label htmlFor="wd-firstname">First Name: </label>
      <input
        defaultValue="Alice"
        placeholder="First Name"
        id="wd-firstname"
      /><br/>

      <label htmlFor="wd-lastname">Last Name: </label>
      <input
        defaultValue="Wonderland"
        placeholder="Last Name"
        id="wd-lastname"
      /><br/>

      <label htmlFor="wd-dob">Date of Birth: </label>
      <input
        defaultValue="2000-01-01"
        type="date"
        id="wd-dob"
      /><br/>

      <label htmlFor="wd-email">Email: </label>
      <input
        defaultValue="alice@wonderland"
        type="email"
        id="wd-email"
      /><br/>

      <label htmlFor="wd-role">Role: </label>
      <select defaultValue="FACULTY" id="wd-role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select><br/>

      <Link to="/Kambaz/Account/Signin">Sign out</Link>
    </div>
  );
}
