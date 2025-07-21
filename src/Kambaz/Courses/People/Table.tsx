import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import * as db from "../../Database";   // users & enrollments live here

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>();
  const { users, enrollments } = db;
  const alias: Record<string, string> = {
    "1234": "RS101",
    "2345": "RS102",
    // add more if you have them
  };
  const courseId = alias[cid] ?? cid; 

  /** users actually enrolled in this course */
  const people = users.filter((u: any) =>
    enrollments.some(
      (e: any) => e.user === u._id && e.course === courseId
    )
  );

  return (
    <div id="wd-people-table">
      <Table striped hover responsive className="align-middle">
        <thead className="table-secondary">
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>

        <tbody>
          {people.map((user: any) => (
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
            </tr>
          ))}

          {!people.length && (
            <tr>
              <td colSpan={6} className="text-center text-muted">
                No users enrolled in this course.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
