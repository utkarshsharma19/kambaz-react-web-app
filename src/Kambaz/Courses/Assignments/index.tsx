import React from "react";
import { Link } from "react-router-dom";
import AssignmentEditor from "./Editor";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input
        placeholder="Search for Assignments"
        id="wd-search-assignment"
      />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>

      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total
        <button style={{ marginLeft: '0.5rem' }}>+</button>
      </h3>

      <ul id="wd-assignment-list">
      <li className="wd-assignment-list-item">
          <Link to="/Kambaz/Courses/1234/Assignments/123" className="wd-assignment-link">
            A1 – ENV + HTML
          </Link>
          <p style={{ marginTop: '0.5rem', marginLeft: '1rem' }}>
            Number of Modules | Not available till 6th May 2025 | Due by 20th May 2025 9:00pm
          </p>
        </li>
        <li className="wd-assignment-list-item">
          <Link to="/Kambaz/Courses/1234/Assignments/123" className="wd-assignment-link">
            A2 – ENV + HTML
          </Link>
          <p style={{ marginTop: '0.5rem', marginLeft: '1rem' }}>
            Number of Modules | Not available till 6th May 2025 | Due by 20th May 2025 9:00pm
          </p>
        </li>
        <li className="wd-assignment-list-item">
          <Link to="/Kambaz/Courses/1234/Assignments/123" className="wd-assignment-link">
            A3 – ENV + HTML
          </Link>
          <p style={{ marginTop: '0.5rem', marginLeft: '1rem' }}>
            Number of Modules | Not available till 6th May 2025 | Due by 20th May 2025 9:00pm
          </p>
        </li>
      </ul>
    </div>
  );
}
