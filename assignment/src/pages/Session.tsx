import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/ui/Button";

import { SESSIONS } from "../dummy-sessions";
import BookSession from "./BookSession";

export default function SessionPage() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const params = useParams<{ id: string }>();

  const sessionId = params.id;
  const loadedSession = SESSIONS.find((session) => session.id === sessionId);

  if (!loadedSession) {
    return (
      <main id="session-page">
        <p>No session found!</p>
      </main>
    );
  }

  function triggerModal() {
    setIsOpenModal((prev) => !prev);
  }

  return (
    <main id="session-page">
      {isOpenModal && (
        <BookSession onDone={triggerModal} session={loadedSession} />
      )}
      <article>
        <header>
          <img src={loadedSession.image} alt={loadedSession.title} />
          <div>
            <h2>{loadedSession.title}</h2>
            <time dateTime={new Date(loadedSession.date).toISOString()}>
              {new Date(loadedSession.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
            <p>
              <Button onClick={triggerModal}>Book Session</Button>
            </p>
          </div>
        </header>
        <p id="content">{loadedSession.description}</p>
      </article>
    </main>
  );
}
