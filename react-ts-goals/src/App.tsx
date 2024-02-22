import CourseGoal from "./components/CourseGoal";
import Header from "./components/Header";

import goalImage from "./assets/goals.jpg";
import { useState } from "react";

type Goal = {
  description: string;
  title: string;
  id: number;
};

export default function App() {
  const [goals, setGoals] = useState<Goal[]>([]);

  function handleAddGoal() {
    setGoals((prev) => [
      ...prev,
      {
        description: "Learn from ground up",
        title: "Learn React + TS",
        id: Math.random(),
      },
    ]);
  }

  return (
    <main>
      <Header image={{ src: goalImage, alt: "A list of goals" }}>
        <h1>Yout Course Goals</h1>
      </Header>
      <button onClick={handleAddGoal}>Add Goal</button>
      <ul>
        {goals &&
          goals.map((g) => (
            <li key={g.id}>
              <CourseGoal title={g.title}>
                <p>{g.description}</p>
              </CourseGoal>
            </li>
          ))}
      </ul>
    </main>
  );
}
