import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Size } from "../types";
import SRButton from "./SRButton";
import { Child } from "../types";

type ButtonLinkProps = {
  to: string;
  size?: Size;
  disabled?: boolean;
  children?: Child;
};

const defaultProps: ButtonLinkProps = {
  to: "",
  size: "large",
  disabled: false,
};

const SRButtonLink: React.FC<ButtonLinkProps> = (
  props: ButtonLinkProps
): ReactElement => {
  props = { ...defaultProps, ...props };

  const buttonLinkStyle: React.CSSProperties = {
    textDecoration: "none",
  };

  return (
    <Link to={!props.disabled && props.to} style={buttonLinkStyle}>
      <SRButton size={props.size} disabled={props.disabled}>
        {props.children}
      </SRButton>
    </Link>
  );
};

export default SRButtonLink;
