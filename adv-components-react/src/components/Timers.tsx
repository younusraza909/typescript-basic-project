import { useTimerContext } from "../store/timers-context";
import Timer from "./Timer";

export default function Timers() {
  const { timers } = useTimerContext();
  return (
    <ul>
      {timers.map((t) => (
        <li key={t.name}>
          {" "}
          <Timer name={t.name} duration={t.duration} />
        </li>
      ))}
    </ul>
  );
}
