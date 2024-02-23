import { PropsWithChildren } from "react";

type hintBoxProps = {
  mode: "hint";
};

type warningBoxProps = {
  mode: "warning";
  severity: "low" | "medium" | "high";
};

type InfoBoxProps = PropsWithChildren<hintBoxProps | warningBoxProps>;

const InfoBox = (props: InfoBoxProps) => {
  const { mode, children } = props;

  if (mode === "hint") {
    return (
      <aside className="infobox infobox-hint ">
        <p>{children}</p>
      </aside>
    );
  }
  const { severity } = props;
  return (
    <aside className={`infobox infobox-warning warning--${severity}`}>
      <p>{children}</p>
    </aside>
  );
};

export default InfoBox;
