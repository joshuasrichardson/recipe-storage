import React, { ChangeEventHandler, ReactElement } from "react";
// @ts-ignore
import { borderWidthSizes, themeGreen, themeGray } from "./styles.ts";

type SRTextInputProps = {
  id?: string;
  label?: string;
  value?: string | number;
  backgroundColor?: string;
  fillBackground?: boolean;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type?: string;
  textarea?: boolean;
  color?: string;
};

const defaultProps: SRTextInputProps = {
  label: "",
  value: "",
  placeholder: "",
  backgroundColor: "inherit",
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
    color: props.color || themeGreen,
    textShadow: "0px 0px 6px #f0e3d0, 0px 0px 6px #f0e3d0, 0px 0px 6px #f0e3d0",
    fontSize: "1.1em",
    textAlign: "left",
    paddingRight: "5px",
  };

  const inputStyle: React.CSSProperties = {
    padding: "5px",
    marginBottom: "5px",
    fontSize: "1.1em",
    width: "100%",
    backgroundColor: props.fillBackground ? themeGray : props.backgroundColor,
    border: "solid",
    borderRadius: "4px",
    borderWidth: borderWidthSizes["small"],
    borderColor: themeGreen,
  };

  const inputField = (): ReactElement => {
    if (props.textarea) {
      return (
        <textarea
          id={props.id}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          style={{ ...inputStyle, height: "200px", padding: "8px" }}
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
          style={inputStyle}
        ></input>
      );
    }
  };

  return (
    <div>
      {props.label && (
        <label style={labelStyle} htmlFor={props.id}>
          {props.label}
        </label>
      )}
      {inputField()}
    </div>
  );
};

export default SRTextInput;
