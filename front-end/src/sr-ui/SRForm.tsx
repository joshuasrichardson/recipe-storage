import React, { ReactElement } from "react";
import { paddingSizes } from "./styles";
import { Child } from "../types";

type SRFormProps = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  padding?: string;
  children: Child;
};

const defaultProps: SRFormProps = {
  children: [<></>],
};

const SRForm: React.FC<SRFormProps> = (props: SRFormProps): ReactElement => {
  props = { ...defaultProps, ...props };
  const formStyle: React.CSSProperties = {
    display: "inline-block",
    marginTop: "10px",
    width: "100%",
    padding: props.padding ? paddingSizes[props.padding] : "0px",
  };

  return <div style={formStyle}>{props.children}</div>;
};

export default SRForm;
