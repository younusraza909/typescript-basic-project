import { type Session } from "../../types";
import Button from "../ui/Button";

const SessionItem = ({ session }: { session: Session }) => {
  return (
    <article className="session-item">
      <img src={session.image} alt={session.title} />
      <div className="session-data">
        <div>
          <h3>{session.title}</h3>
          <p>{session.summary}</p>
        </div>
        <p className="actions">
          <Button to={session.id}>Learn More</Button>
        </p>
      </div>
    </article>
  );
};

export default SessionItem;
