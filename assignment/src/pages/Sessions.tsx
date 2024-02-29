import SessionsList from "../components/Sessions/SessionsList";
import { SESSIONS } from "../dummy-sessions"; // normally, we would probably load that from a server

export default function SessionsPage() {
  return (
    <main id="sessions-page">
      <header>
        <h2>Available mentoring sessions</h2>
        <p>
          From an one-on-one introduction to React's basics all the way up to a
          deep dive into state mechanics - we got just the right session for
          you!
        </p>
      </header>
      {SESSIONS && SESSIONS.length > 0 && <SessionsList sessions={SESSIONS} />}
    </main>
  );
}
