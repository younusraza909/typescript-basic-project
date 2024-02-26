import React, { createContext, useContext } from "react";

type Timer = {
  name: string;
  duration: number;
};

type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

type TimersContextValue = TimersState & {
  addTimer: () => void;
  startTimers: () => void;
  stopTimers: () => void;
};

const TimersContextProviderValue: TimersContextValue = {
  isRunning: true,
  timers: [],
  addTimer: () => {},
  startTimers: () => {},
  stopTimers: () => {},
};

const TimersContext = createContext<TimersContextValue | null>(null);

export const TimersContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <TimersContext.Provider value={{ ...TimersContextProviderValue }}>
      {children}
    </TimersContext.Provider>
  );
};

export const useTimerContext = () => {
  const ctx = useContext(TimersContext);

  if (!ctx) {
    throw new Error("Timer Context is null");
  }
  return ctx;
};
