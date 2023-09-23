import React, { ReactElement } from "react";
import { Child } from "../types";

type SRFlexItemProps = {
  numItems: number;
  children: Child;
};

const defaultProps: SRFlexItemProps = {
  numItems: 1,
  children: <></>,
};

const SRFlexItem: React.FC<SRFlexItemProps> = (
  props: SRFlexItemProps
): ReactElement => {
  props = { ...defaultProps, ...props };
  const w: number = props.numItems === 1 ? 100 : 90 / props.numItems;
  const itemStyle: React.CSSProperties = {
    width: `${w}%`,
  };

  return <div style={itemStyle}>{props.children}</div>;
};

export default SRFlexItem;
