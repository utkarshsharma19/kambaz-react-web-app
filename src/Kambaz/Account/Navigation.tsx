import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

export default function AccountNavigation() {
  return (
    <ListGroup id="wd-account-navigation" className="list-group fs-5 rounded-0">
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Account/Signin"
        action
        className="border-0"
      >
        Signin
      </ListGroup.Item>
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Account/Signup"
        action
        className="border-0"
      >
        Signup
      </ListGroup.Item>
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Account/Profile"
        action
        className="border-0"
      >
        Profile
      </ListGroup.Item>
    </ListGroup>
  );
}
