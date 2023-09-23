import React, { ChangeEventHandler, ReactElement } from "react";
import { borderWidthSizes, themeGreen, themeGray } from "./styles";

type SRDateInputProps = {
  label: string;
  value: string;
  backgroundColor?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  fillBackground?: boolean;
};

const defaultProps: SRDateInputProps = {
  label: "",
  value: "",
  backgroundColor: "inherit",
  onChange: () => {},
};

const SRDateInput: React.FC<SRDateInputProps> = (
  props: SRDateInputProps
): ReactElement => {
  props = { ...defaultProps, ...props };

  const labelStyle: React.CSSProperties = {
    display: "inline-block",
    marginTop: "10px",
    width: "100%",
    color: themeGreen,
    textShadow: "0px 0px 6px #f0e3d0, 0px 0px 6px #f0e3d0, 0px 0px 6px #f0e3d0",
    fontSize: "1.1em",
    textAlign: "left",
    paddingRight: "5px",
  };

  const inputStyle: React.CSSProperties = {
    padding: "5px",
    fontSize: "1.1em",
    width: "100%",
    backgroundColor: props.fillBackground ? themeGray : props.backgroundColor,
    border: "solid",
    borderRadius: "4px",
    borderWidth: borderWidthSizes["small"],
    borderColor: themeGreen,
  };

  return (
    <div>
      <label style={labelStyle}>{props.label}</label>
      <input
        style={inputStyle}
        type="date"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default SRDateInput;
