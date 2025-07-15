import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import ListGroup from "react-bootstrap/ListGroup";

export default function KambazNavigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) =>
    currentPath.startsWith(path) ? "bg-white text-danger" : "text-white bg-black";

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 110, left: -5 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      {/* NEU Logo */}
      <ListGroup.Item
        id="wd-neu-link"
        action
        href="https://www.northeastern.edu/"
        target="_blank"
        className="bg-black border-0 text-center"
      >
        <img src="/images/NEU.png" width="75px" alt="NEU" />
      </ListGroup.Item>

      {/* Account */}
      <ListGroup.Item
        to="/Kambaz/Account"
        as={Link}
        className={`text-center border-0 ${isActive("/Kambaz/Account")}`}
      >
        <FaRegCircleUser className="fs-1" />
        <br />
        Account
      </ListGroup.Item>

      {/* Dashboard */}
      <ListGroup.Item
        to="/Kambaz/Dashboard"
        as={Link}
        className={`text-center border-0 ${isActive("/Kambaz/Dashboard")}`}
      >
        <AiOutlineDashboard className="fs-1 text-danger" />
        <br />
        Dashboard
      </ListGroup.Item>

      {/* Courses */}
      <ListGroup.Item
        to="/Kambaz/Courses"
        as={Link}
        className={`text-center border-0 ${isActive("/Kambaz/Courses")}`}
      >
        <LiaBookSolid className="fs-1 text-danger" />
        <br />
        Courses
      </ListGroup.Item>

      {/* Calendar */}
      <ListGroup.Item
        to="/Kambaz/Calendar"
        as={Link}
        className={`text-center border-0 ${isActive("/Kambaz/Calendar")}`}
      >
        <IoCalendarOutline className="fs-1 text-danger" />
        <br />
        Calendar
      </ListGroup.Item>

      {/* Inbox */}
      <ListGroup.Item
        to="/Kambaz/Inbox"
        as={Link}
        className={`text-center border-0 ${isActive("/Kambaz/Inbox")}`}
      >
        <FaInbox className="fs-1 text-danger" />
        <br />
        Inbox
      </ListGroup.Item>

      {/* Labs */}
      <ListGroup.Item
        to="/Labs"
        as={Link}
        className={`text-center border-0 ${isActive("/Labs")}`}
      >
        <LiaCogSolid className="fs-1 text-danger" />
        <br />
        Labs
      </ListGroup.Item>
    </ListGroup>
  );
}
