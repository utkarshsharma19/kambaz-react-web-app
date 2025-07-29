import { Navigate, Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedCourseRoute() {
  const { cid } = useParams<{ cid: string }>();
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const { enrollments } = useSelector((s: any) => s.enrollmentReducer);

  const enrolled = !!currentUser && enrollments.some(
    (e: any) => e.user === currentUser._id && e.course === cid
  );

  return enrolled ? <Outlet /> : <Navigate to="/Kambaz/Dashboard" replace />;
}
