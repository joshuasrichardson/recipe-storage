import React, { useState, MouseEventHandler, ReactElement } from "react";
import { Child } from "../types";
import {
  borderWidthSizes,
  disabledCheckBoxColor,
  mainCheckBoxColor,
  brightCheckBoxColor,
  lightTextColor,
  themeGreen,
} from "./styles";

type SRCheckBoxProps = {
  size?: "large" | "small";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  children?: Child;
};

const defaultProps: SRCheckBoxProps = {
  size: "large",
  type: "button",
  disabled: false,
  onClick: () => {},
  children: <></>,
};

const SRCheckBox: React.FC<SRCheckBoxProps> = (
  props: SRCheckBoxProps
): ReactElement => {
  props = { ...defaultProps, ...props };
  const [isHover, setHover] = useState(false);

  const general: React.CSSProperties = {
    color: lightTextColor,
    backgroundColor: props.disabled
      ? disabledCheckBoxColor
      : isHover
      ? brightCheckBoxColor
      : mainCheckBoxColor,
    fontWeight: "bold",
    borderRadius: "5px",
    borderWidth: borderWidthSizes["small"],
    borderStyle: "solid",
    borderColor: themeGreen,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const large: React.CSSProperties = {
    padding: "20px",
    width: "200px",
    maxWidth: "300px",
    margin: "12px",
  };

  const small: React.CSSProperties = {
    padding: "10px",
    width: "40px",
    maxWidth: "40px",
    height: "40px",
    maxHeight: "40px",
    margin: "5px",
  };

  const buttonStyle =
    props.size === "small"
      ? { ...general, ...small }
      : { ...general, ...large };

  return (
    <input
      type="checkbox"
      // style={buttonStyle}
      disabled={props.disabled}
      onClick={!props.disabled ? props.onClick : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  );
};

export default SRCheckBox;
