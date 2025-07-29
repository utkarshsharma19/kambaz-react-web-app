import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();

  return (
    <ul className="list-group">
      {links.map((l) => (
        <Link
          key={l}
          to={`/Kambaz/Account/${l}`}
          className={`list-group-item ${pathname.includes(l) ? "active" : ""}`}
        >
          {l}
        </Link>
      ))}
    </ul>
  );
}
