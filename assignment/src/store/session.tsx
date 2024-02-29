import React, { createContext, useContext, useReducer } from "react";
import { SESSIONS } from "../dummy-sessions";
import { type Session } from "../types";

type SessionsState = { upcomingSessions: Session[] };

type SessionContextValue = SessionsState & {
  bookSession: (session: Session) => void;
  cancelSession: (sessionId: string) => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

const intialState: SessionsState = {
  upcomingSessions: [],
};

type BOOK_SESSION = {
  type: "BOOK_SESSION";
  payload: Session;
};

type CANCEL_SESSION = {
  type: "CANCEL_SESSION";
  payload: string;
};

function sessionsReducer(
  state: SessionsState,
  action: BOOK_SESSION | CANCEL_SESSION
) {
  if (action.type === "BOOK_SESSION") {
    if (
      state.upcomingSessions.some((session) => session.id === action.payload.id)
    ) {
      return state;
    }
    return {
      upcomingSessions: state.upcomingSessions.concat(action.payload),
    };
  }

  if (action.type === "CANCEL_SESSION") {
    return {
      upcomingSessions: state.upcomingSessions.filter(
        (session) => session.id !== action.payload
      ),
    };
  }

  return state;
}

export const SessionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(sessionsReducer, intialState);

  function bookSession(session: Session) {
    dispatch({ type: "BOOK_SESSION", payload: session });
  }

  function cancelSession(sessionId: string) {
    dispatch({ type: "CANCEL_SESSION", payload: sessionId });
  }

  const ctxValue = {
    upcomingSessions: state.upcomingSessions,
    bookSession,
    cancelSession,
  };

  return (
    <SessionContext.Provider value={ctxValue}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  const ctx = useContext(SessionContext);

  if (!ctx) {
    throw new Error("Session Context is null");
  }

  return ctx;
};
