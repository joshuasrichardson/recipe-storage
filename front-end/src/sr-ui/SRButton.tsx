import React, { useState, MouseEventHandler, ReactElement } from "react";
import { Child, Size } from "../types";
import {
  borderWidthSizes,
  disabledButtonColor,
  mainButtonColor,
  brightButtonColor,
  lightTextColor,
  themeGreen,
  secondaryButtonColor,
  brightSecondaryButtonColor,
  disabledSecondaryButtonColor,
} from "./styles";

type SRButtonProps = {
  size?: Size;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: Child;
  style?: React.CSSProperties;
  variant?: "primary" | "secondary";
};

const defaultProps: SRButtonProps = {
  size: "large",
  type: "button",
  disabled: false,
  onClick: () => {},
  children: <></>,
  variant: "primary",
};

const SRButton: React.FC<SRButtonProps> = (
  props: SRButtonProps
): ReactElement => {
  props = { ...defaultProps, ...props };
  const [isHover, setHover] = useState(false);

  const regularButtonColor =
    props.variant === "primary" ? mainButtonColor : secondaryButtonColor;
  const hoveredButtonColor =
    props.variant === "primary"
      ? brightButtonColor
      : brightSecondaryButtonColor;
  const blockedButtonColor =
    props.variant === "primary"
      ? disabledButtonColor
      : disabledSecondaryButtonColor;
  const textColor = props.variant === "primary" ? lightTextColor : themeGreen;

  const general: React.CSSProperties = {
    color: textColor,
    backgroundColor: props.disabled
      ? blockedButtonColor
      : isHover
      ? hoveredButtonColor
      : regularButtonColor,
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
      ? { ...general, ...small, ...props.style }
      : { ...general, ...large, ...props.style };

  return (
    <button
      name={`${props.children}`}
      style={buttonStyle}
      type={props.type}
      disabled={props.disabled}
      onClick={!props.disabled ? props.onClick : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {props.children}
    </button>
  );
};

export default SRButton;
