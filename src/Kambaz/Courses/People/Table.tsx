import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
  const rows = [
    { first: "Tony",    last: "Stark",      id: "001234561S", section: "S101", role: "STUDENT", lastAct: "2020-10-01", total: "10:21:32" },
    { first: "Bruce",   last: "Wayne",      id: "001234562B", section: "S102", role: "STUDENT", lastAct: "2020-11-05", total: "05:12:10" },
    { first: "Steve",   last: "Rogers",     id: "001234563C", section: "S103", role: "STUDENT", lastAct: "2020-09-15", total: "12:00:00" },
    { first: "Natasha", last: "Romanoff",   id: "001234564N", section: "S104", role: "FACULTY", lastAct: "2020-12-20", total: "20:45:00" },
  ];

  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th className="align-middle">Name</th>
            <th className="align-middle">Login ID</th>
            <th className="align-middle">Section</th>
            <th className="align-middle">Role</th>
            <th className="align-middle">Last Activity</th>
            <th className="align-middle">Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((u) => (
            <tr key={u.id}>
              <td className="align-middle text-nowrap">
                <div className="d-flex align-items-center">
                  <FaUserCircle className="me-2 fs-4 text-secondary" />
                  <span className="wd-first-name">{u.first}</span>{" "}
                  <span className="wd-last-name">{u.last}</span>
                </div>
              </td>
              <td className="align-middle">{u.id}</td>
              <td className="align-middle">{u.section}</td>
              <td className="align-middle">{u.role}</td>
              <td className="align-middle">{u.lastAct}</td>
              <td className="align-middle">{u.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
