import { Goal } from "../types";
import CourseGoal from "./CourseGoal";

type CourseGoalListProps = {
  goals: Goal[];
  onDelete: (id: number) => void;
};

const CourseGoalList = ({ goals, onDelete }: CourseGoalListProps) => {
  return (
    <ul>
      {goals &&
        goals.map((g) => (
          <li key={g.id}>
            <CourseGoal title={g.title} id={g.id} onDelete={onDelete}>
              <p>{g.description}</p>
            </CourseGoal>
          </li>
        ))}
    </ul>
  );
};

export default CourseGoalList;
