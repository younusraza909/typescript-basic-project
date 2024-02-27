import { useEffect, useRef, useState } from "react";
import { Timer as TimerProps, useTimerContext } from "../store/timers-context";
import Container from "./UI/Container";

export default function Timer({ name, duration }: TimerProps) {
  const interval = useRef<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(duration * 1000);

  const { isRunning } = useTimerContext();

  if (remainingTime <= 0 && interval.current) {
    clearInterval(interval.current);
  }

  useEffect(() => {
    let timer: number;
    if (isRunning) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 50);
      }, 50);
      interval.current = timer;
    } else if (interval.current) {
      clearInterval(interval.current);
    }

    return () => {
      if (interval.current) {
        return clearInterval(interval.current);
      }
    };
  }, [isRunning]);

  const formattedTime = (remainingTime / 1000).toFixed(2);

  return (
    <Container as="article">
      <h2>{name}</h2>
      <progress max={duration * 1000} value={remainingTime} />
      <p>{formattedTime}</p>
    </Container>
  );
}
