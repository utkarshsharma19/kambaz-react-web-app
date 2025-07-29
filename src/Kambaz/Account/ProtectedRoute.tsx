import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  return currentUser ? children : <Navigate to="/Kambaz/Account/Signin" />;
}