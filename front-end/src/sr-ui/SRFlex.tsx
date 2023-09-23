import React, { ReactElement } from "react";
import { flexWidthSizes, marginSizes, paddingSizes } from "./styles";
import { Child, Size } from "../types";

type SRFlexProps = {
  direction?: "row" | "column";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch";
  padding?: Size;
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  width?: Size;
  children?: Child;
  justifyContent?:
    | "space-between"
    | "space-around"
    | "center"
    | "flex-start"
    | "flex-end";
  marginVertical?: Size;
  marginHorizontal?: Size;
  margin?: Size;
  style?: React.CSSProperties;
};

const defaultProps: SRFlexProps = {
  direction: "row",
  alignItems: "center",
  padding: "none",
  width: "max",
  wrap: "nowrap",
  children: [<></>],
  justifyContent: "space-between",
};

const SRFlex: React.FC<SRFlexProps> = (props: SRFlexProps): ReactElement => {
  props = { ...defaultProps, ...props };

  const flexStyle: React.CSSProperties = {
    margin: props.margin ? marginSizes[props.margin] : "auto",
    display: "flex",
    alignItems: props.alignItems,
    justifyContent: props.justifyContent,
    flexDirection: props.direction,
    width: flexWidthSizes[props.width],
    flexWrap: props.wrap,
    padding: paddingSizes[props.padding],
    marginTop: props.marginVertical
      ? marginSizes[props.marginVertical]
      : marginSizes[props.margin],
    marginBottom: props.marginVertical
      ? marginSizes[props.marginVertical]
      : marginSizes[props.margin],
    marginLeft: props.marginHorizontal
      ? marginSizes[props.marginHorizontal]
      : marginSizes[props.margin],
    marginRight: props.marginHorizontal
      ? marginSizes[props.marginHorizontal]
      : marginSizes[props.margin],
    ...props.style,
  };

  return <div style={flexStyle}>{props.children}</div>;
};

export default SRFlex;
