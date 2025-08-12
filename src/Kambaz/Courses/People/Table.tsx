import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "./Details";

type User = {
  _id: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  role?: "ADMIN" | "FACULTY" | "STUDENT" | "TA" | "USER";
};

export default function PeopleTable({
  users = [],
  refresh,
}: {
  users?: User[];
  refresh?: () => Promise<void> | void;
}) {
  return (
    <div id="wd-people-table">
      {/* Slide-over details panel */}
      <PeopleDetails refresh={refresh} />

      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: 40 }} />
            <th>Name</th>
            <th>Username / Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>
                <FaUserCircle className="fs-4 text-secondary" />
              </td>
              <td className="wd-full-name text-nowrap">
                <Link
                  to={`/Kambaz/Account/Users/${u._id}`}
                  className="text-decoration-none"
                >
                  <span className="wd-first-name">{u.firstName || ""}</span>{" "}
                  <span className="wd-last-name">{u.lastName || ""}</span>
                </Link>
              </td>
              <td>{u.username || u.email || "—"}</td>
              <td>{u.role || "—"}</td>
            </tr>
          ))}
          {!users.length && (
            <tr>
              <td colSpan={4} className="text-center text-muted">
                No users.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
