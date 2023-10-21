import React, { ReactElement } from "react";
import { Size, Child } from "../types";
import {
  borderWidthSizes,
  containerWidthSizes,
  isMobile,
  marginSizes,
  paddingSizes,
  themeGreen,
  translucentBackground,
} from "./styles";

type SRContainerProps = {
  maxWidth?: Size;
  padding?: Size;
  margin?: Size;
  borderWidth?: Size;
  backgroundColor?: string;
  children?: Child;
  style?: React.CSSProperties;
  onClick?: (event: MouseEvent) => void;
};

const defaultProps: SRContainerProps = {
  maxWidth: "max",
  padding: "large",
  margin: "medium",
  backgroundColor: translucentBackground,
  borderWidth: "large",
  onClick: () => {},
};

const SRContainer: React.FC<SRContainerProps> = (
  props: SRContainerProps
): ReactElement => {
  props = { ...defaultProps, ...props };

  const containerStyles: React.CSSProperties = {
    width: isMobile ? undefined : containerWidthSizes[props.maxWidth],
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
    ...props.style,
  };

  return <div style={containerStyles}>{props.children}</div>;
};

export default SRContainer;
