import { useState } from "react";
import { NavLink } from "react-router-dom";
import UpcomingSessions from "./Sessions/UpcomingSessions";
import Button from "./ui/Button";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function triggerModal() {
    setIsModalOpen((prev) => !prev);
  }

  return (
    <header id="main-header">
      <h1>ReactMentoring</h1>
      {isModalOpen && <UpcomingSessions onClose={triggerModal} />}
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
            <Button onClick={triggerModal}>Upcoming Sessions</Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
