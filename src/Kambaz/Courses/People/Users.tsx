import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import PeopleTable from "../People/Table";
import * as client from "../../Account/client.ts";

export default function Users() {
  const { uid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

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

  const createNewUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    // re-apply current filters
    if (name) return filterUsersByName(name);
    if (role) return filterUsersByRole(role);
    setUsers((prev) => [...prev, user]);
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
      </select>

      <button onClick={createNewUser} className="float-end btn btn-danger wd-add-people">
        <FaPlus className="me-2" />
        Users
      </button>

      <div className="clearfix" />

      <PeopleTable users={users} refresh={fetchUsers} />
    </div>
  );
}
