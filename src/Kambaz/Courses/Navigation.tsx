import { Link, useLocation, useParams } from "react-router-dom";

export default function CourseNavigation() {
  /* course id comes from the route:  /Kambaz/Courses/:cid/... */
  const { cid = "" } = useParams<{ cid: string }>();
  const { pathname } = useLocation();

  /** list of tabs we want to show (label ⇢ sub‑route) */
  const tabs = [
    { label: "Home",        slug: "Home" },
    { label: "Modules",     slug: "Modules" },
    { label: "Piazza",      slug: "Piazza" },
    { label: "Zoom",        slug: "Zoom" },
    { label: "Assignments", slug: "Assignments" },
    { label: "Quizzes",     slug: "Quizzes" },
    { label: "Grades",      slug: "Grades" },
    { label: "People",      slug: "People" },
  ];

  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {tabs.map(({ label, slug }) => {
        const to = `/Kambaz/Courses/${cid}/${slug}`;
        const isActive = pathname.startsWith(to);          // precise match
        return (
          <Link
            key={slug}
            to={to}
            id={`wd-course-${slug.toLowerCase()}-link`}
            className={
              "list-group-item border-0 text-danger" +
              (isActive ? " bg-white" : "")
            }
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
