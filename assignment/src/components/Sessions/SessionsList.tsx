import { type Session } from "../../types";
import SessionItem from "./SessionItem";

const SessionsList = ({ sessions }: { sessions: Session[] }) => {
  return (
    <ul id="sessions-list">
      {sessions.map((session) => (
        <li key={session.id}>
          <SessionItem session={session} />
        </li>
      ))}
    </ul>
  );
};

export default SessionsList;
