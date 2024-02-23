import { Goal } from "../types";
import CourseGoal from "./CourseGoal";
import InfoBox from "./InfoBox";

type CourseGoalListProps = {
  goals: Goal[];
  onDelete: (id: number) => void;
};

const CourseGoalList = ({ goals, onDelete }: CourseGoalListProps) => {
  if (goals.length === 0) {
    return <InfoBox mode="hint">There are no goals added yet!</InfoBox>;
  }

  let InfoBoxWarning: React.ReactNode;

  if (goals.length >= 4) {
    InfoBoxWarning = (
      <InfoBox mode="warning" severity="high">
        You have added to much goals. Do'nt put too much on your plate!
      </InfoBox>
    );
  }
  return (
    <>
      {InfoBoxWarning}
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
    </>
  );
};

export default CourseGoalList;
