import CourseGoal from "./components/CourseGoal";
import Header from "./components/Header";

import goalImage from "./assets/goals.jpg";
import { useState } from "react";
import CourseGoalList from "./components/CourseGoalList";
import { Goal } from "./types";
import NewGoal from "./components/newGoal";

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

  function handleDeleteGoal(id: number) {
    setGoals((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <main>
      <Header image={{ src: goalImage, alt: "A list of goals" }}>
        <h1>Yout Course Goals</h1>
      </Header>
      <NewGoal />

      <CourseGoalList goals={goals} onDelete={handleDeleteGoal} />
    </main>
  );
}
