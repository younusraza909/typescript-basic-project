import { NavLink } from "react-router-dom";
import Button from "./ui/Button";

const Header = () => {
  return (
    <header id="main-header">
      <p>ReactMentoring</p>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
              end
            >
              Our Mission
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sessions"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Browse Sessions
            </NavLink>
          </li>
          <li>
            <Button>Upcoming Sessions</Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
