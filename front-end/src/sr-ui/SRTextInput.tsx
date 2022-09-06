import React, { ChangeEventHandler, ReactElement } from "react";
// @ts-ignore
import { darkTextColor } from "./styles.ts";

type SRTextInputProps = {
  id?: string;
  label?: string;
  value?: string;
  placeholder: string;
  onChange: ChangeEventHandler;
  type?: string;
  textarea?: boolean;
  color?: string;
};

const defaultProps: SRTextInputProps = {
  label: "",
  value: "",
  placeholder: "",
  onChange: () => {},
  type: "text",
};

const SRTextInput: React.FC<SRTextInputProps> = (
  props: SRTextInputProps
): ReactElement => {
  props = { ...defaultProps, ...props };

  const labelStyle: React.CSSProperties = {
    display: "inline-block",
    marginTop: "10px",
    width: "100%",
    color: props.color || darkTextColor,
  };

  const inputField = (): ReactElement => {
    if (props.textarea) {
      return (
        <textarea
          id={props.id}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
        ></textarea>
      );
    } else {
      return (
        <input
          id={props.id}
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
        ></input>
      );
    }
  };

  return (
    <div>
      <label style={labelStyle} htmlFor={props.id}>
        {props.label}
      </label>
      {inputField()}
    </div>
  );
};

export default SRTextInput;
