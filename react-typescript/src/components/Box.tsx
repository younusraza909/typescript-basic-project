type PropsType = {
  heading: string;
  children: React.ReactNode;
};

const Box = ({ heading, children }: PropsType) => {
  return (
    <div>
      <h1>{heading}</h1>
      {children}
    </div>
  );
};

export default Box;
