interface InfoBoxProps {
  mode: "hint" | "warning";
  children: React.ReactNode;
}

const InfoBox = ({ mode, children }: InfoBoxProps) => {
  if (mode === "hint") {
    return (
      <aside className="infobox infobox-hint ">
        <p>{children}</p>
      </aside>
    );
  }

  return (
    <aside className="infobox infobox-warning warning--medium">
      <p>{children}</p>
    </aside>
  );
};

export default InfoBox;
