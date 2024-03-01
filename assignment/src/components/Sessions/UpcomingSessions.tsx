import { useEffect, useRef } from "react";
import { useSessionContext } from "../../store/session";
import Button from "../ui/Button";
import Modal, { type ModalHandle } from "../ui/Modal";
import UpcomingSession from "./UpcomingSession";

type UpcomingSessionsProps = {
  onClose: () => void;
};

const UpcomingSessions = ({ onClose }: UpcomingSessionsProps) => {
  const modal = useRef<ModalHandle>(null);
  const sessionsCtx = useSessionContext();

  useEffect(() => {
    if (modal.current) {
      modal.current.open();
    }
  }, []);

  const hasSessions = sessionsCtx.upcomingSessions.length > 0;

  function handleCancelSession(id: string) {
    sessionsCtx.cancelSession(id);
  }

  return (
    <Modal ref={modal} onClose={onClose}>
      <h2>Upcoming Sessions</h2>
      {hasSessions && (
        <ul>
          {sessionsCtx.upcomingSessions.map((session) => (
            <li key={session.id}>
              <UpcomingSession
                session={session}
                onCancel={() => handleCancelSession(session.id)}
              />
            </li>
          ))}
        </ul>
      )}
      {!hasSessions && <p>No upcoming sessions.</p>}
      <p className="actions">
        <Button onClick={onClose}>Close</Button>
      </p>
    </Modal>
  );
};

export default UpcomingSessions;
