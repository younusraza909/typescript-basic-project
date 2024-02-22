// interface CourseGoalProps {
//   children: React.ReactNode;
//   title: string;
// }
import { PropsWithChildren } from "react";

// we have another type which is build in and comes with children props
// PropsWithChildren this wont require children props explicitly
type CourseGoalProps = PropsWithChildren<{
  title: string;
  id: number;
  onDelete: (id: number) => void;
}>;

const CourseGoal = ({ children, title, id, onDelete }: CourseGoalProps) => {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      <button onClick={() => onDelete(id)}>Delete</button>
    </article>
  );
};

export default CourseGoal;
