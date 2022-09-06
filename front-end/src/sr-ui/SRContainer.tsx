import React, { ReactElement } from "react";
// @ts-ignore
import { Size, Child } from "../types.ts";
import {
  borderWidthSizes,
  containerWidthSizes,
  marginSizes,
  paddingSizes,
  themeGreen,
  translucentBackground, // @ts-ignore
} from "./styles.ts";

type SRContainerProps = {
  maxWidth?: Size;
  padding?: Size;
  margin?: Size;
  borderWidth?: Size;
  backgroundColor?: string;
  children?: Child;
};

const defaultProps: SRContainerProps = {
  maxWidth: "max",
  padding: "large",
  margin: "small",
  backgroundColor: translucentBackground,
  borderWidth: "large",
};

const SRContainer: React.FC<SRContainerProps> = (
  props: SRContainerProps
): ReactElement => {
  props = { ...defaultProps, ...props };

  const containerStyles: React.CSSProperties = {
    width:
      window.innerWidth > 600 ? containerWidthSizes[props.maxWidth] : undefined,
    maxWidth: containerWidthSizes[props.maxWidth],
    background: props.backgroundColor,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    margin: marginSizes[props.margin],
    padding: paddingSizes[props.padding],
    border: "solid",
    borderColor: themeGreen,
    borderWidth: borderWidthSizes[props.borderWidth],
  };

  return <div style={containerStyles}>{props.children}</div>;
};

export default SRContainer;
