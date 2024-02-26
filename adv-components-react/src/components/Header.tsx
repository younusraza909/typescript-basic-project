import { useTimerContext } from "../store/timers-context";
import Button from "./UI/Button";

export default function Header() {
  const timersCtx = useTimerContext();
  return (
    <header>
      <h1>ReactTimer</h1>

      <Button>{timersCtx.isRunning ? "Stop" : "Start"} Timers</Button>
    </header>
  );
}
