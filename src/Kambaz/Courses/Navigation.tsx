import { Link, useLocation } from "react-router-dom";

export default function CourseNavigation() {
  const { pathname } = useLocation();

  const links = [
    { label: "Home", path: "/Kambaz/Courses/1234/Home", id: "wd-course-home-link" },
    { label: "Modules", path: "/Kambaz/Courses/1234/Modules", id: "wd-course-modules-link" },
    { label: "Piazza", path: "/Kambaz/Courses/1234/Piazza", id: "wd-course-piazza-link" },
    { label: "Zoom", path: "/Kambaz/Courses/1234/Zoom", id: "wd-course-zoom-link" },
    { label: "Assignments", path: "/Kambaz/Courses/1234/Assignments", id: "wd-course-assignments-link" },
    { label: "Quizzes", path: "/Kambaz/Courses/1234/Quizzes", id: "wd-course-quizzes-link" },
    { label: "Grades", path: "/Kambaz/Courses/1234/Grades", id: "wd-course-grades-link" },
    { label: "People", path: "/Kambaz/Courses/1234/People", id: "wd-course-people-link" },
  ];

  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => {
        const isActive = pathname.includes(link.label);
        return (
          <Link
            key={link.path}
            to={link.path}
            id={link.id}
            className={`list-group-item border border-0 text-danger ${isActive ? "bg-white" : ""}`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
