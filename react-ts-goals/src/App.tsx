import Header from "./components/Header";

import goalImage from "./assets/goals.jpg";
import { useState } from "react";
import CourseGoalList from "./components/CourseGoalList";
import { Goal } from "./types";
import NewGoal from "./components/NewGoal";

export default function App() {
  const [goals, setGoals] = useState<Goal[]>([]);

  function handleAddGoal(goal: string, summary: string) {
    const newGoal = { title: goal, description: summary, id: Math.random() };
    setGoals((prev) => [...prev, newGoal]);
  }

  function handleDeleteGoal(id: number) {
    setGoals((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <main>
      <Header image={{ src: goalImage, alt: "A list of goals" }}>
        <h1>Yout Course Goals</h1>
      </Header>
      <NewGoal onAddGoal={handleAddGoal} />

      <CourseGoalList goals={goals} onDelete={handleDeleteGoal} />
    </main>
  );
}
