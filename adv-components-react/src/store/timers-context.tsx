import React, {
  createContext,
  ReducerState,
  useContext,
  useReducer,
} from "react";

export type Timer = {
  name: string;
  duration: number;
};

type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

type TimersContextValue = TimersState & {
  addTimer: (data: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

const TimersContext = createContext<TimersContextValue | null>(null);

const intialState: TimersState = {
  isRunning: false,
  timers: [],
};

type ADD_TIMER_ACTION = {
  type: "ADD_TIMER";
  payload: Timer;
};
type START_TIMERS_ACTION = {
  type: "START_TIMERS";
};
type END_TIMERS_ACTION = {
  type: "END_TIMERS";
};

const reducer = (
  state: TimersState,
  action: ADD_TIMER_ACTION | START_TIMERS_ACTION | END_TIMERS_ACTION
): TimersState => {
  switch (action.type) {
    case "ADD_TIMER":
      return { ...state, timers: [...state.timers, { ...action.payload }] };
    case "START_TIMERS":
      return { ...state, isRunning: true };
    case "END_TIMERS":
      return { ...state, isRunning: false };
  }
  return state;
};

export const TimersContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  const TimersContextProviderValue: TimersContextValue = {
    isRunning: false,
    timers: [],
    addTimer: (data: Timer) => {
      dispatch({
        type: "ADD_TIMER",
        payload: data,
      });
    },
    startTimers: () => {
      dispatch({
        type: "START_TIMERS",
      });
    },
    stopTimers: () => {
      dispatch({
        type: "END_TIMERS",
      });
    },
  };

  return (
    <TimersContext.Provider value={{ ...TimersContextProviderValue, ...state }}>
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
