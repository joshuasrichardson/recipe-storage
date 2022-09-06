import React, { ReactElement } from "react";
// @ts-ignore
import { Child, Size } from "../types.ts";
// @ts-ignore
import { fontSizes, marginSizes, paddingSizes } from "./styles.ts";

type SRTextProps = {
  style?: React.CSSProperties;
  color?: string;
  children?: Child;
  fontWeight?: number;
  fontSize?: Size;
  padding?: Size;
  margin?: Size;
};

const defaultProps: SRTextProps = {
  children: <></>,
  fontSize: "medium",
  padding: "none",
  margin: "none",
};

const SRText: React.FC<SRTextProps> = (props: SRTextProps): ReactElement => {
  props = { ...defaultProps, ...props };

  const textStyles: React.CSSProperties = {
    ...defaultProps,
    ...props.style,
    fontWeight: props.fontWeight,
    color: props.color,
    textShadow: "0px 0px 6px #f0e3d0, 0px 0px 6px #f0e3d0, 0px 0px 6px #f0e3d0",
    fontSize: fontSizes[props.fontSize],
    padding: paddingSizes[props.padding],
    margin: marginSizes[props.margin],
  };

  return <p style={textStyles}>{props.children}</p>;
};

export default SRText;
