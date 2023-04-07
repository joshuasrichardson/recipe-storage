import React, { useState, MouseEventHandler, ReactElement } from "react";
// @ts-ignore
import { Child, Size } from "../types.ts";
import {
  borderWidthSizes,
  disabledButtonColor,
  mainButtonColor,
  brightButtonColor,
  lightTextColor,
  themeGreen, // @ts-ignore
} from "./styles.ts";

type SRButtonProps = {
  size?: Size;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: Child;
};

const defaultProps: SRButtonProps = {
  size: "large",
  type: "button",
  disabled: false,
  onClick: () => {},
  children: <></>,
};

const SRButton: React.FC<SRButtonProps> = (
  props: SRButtonProps
): ReactElement => {
  props = { ...defaultProps, ...props };
  const [isHover, setHover] = useState(false);

  const general: React.CSSProperties = {
    color: lightTextColor,
    backgroundColor: props.disabled
      ? disabledButtonColor
      : isHover
      ? brightButtonColor
      : mainButtonColor,
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
