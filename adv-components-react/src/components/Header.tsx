import { useTimerContext } from "../store/timers-context";
import Button from "./UI/Button";

export default function Header() {
  const { isRunning, stopTimers, startTimers, timers } = useTimerContext();

  return (
    <header>
      <h1>ReactTimer</h1>

      <Button
        disabled={timers.length === 0}
        onClick={() => {
          isRunning ? stopTimers() : startTimers();
        }}
      >
        {isRunning ? "Stop" : "Start"} Timers
      </Button>
    </header>
  );
}
