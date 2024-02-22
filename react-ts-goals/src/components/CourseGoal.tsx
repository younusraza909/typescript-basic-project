// interface CourseGoalProps {
//   children: React.ReactNode;
//   title: string;
// }
import { PropsWithChildren } from "react";

// we have another type which is build in and comes with children props
// PropsWithChildren this wont require children props explicitly
type CourseGoalProps = PropsWithChildren<{ title: string }>;

const CourseGoal = ({ children, title }: CourseGoalProps) => {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      <button>delete</button>
    </article>
  );
};

export default CourseGoal;
