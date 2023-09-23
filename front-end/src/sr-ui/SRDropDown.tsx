import React, { ChangeEventHandler, ReactElement } from "react";
import { Size, Child } from "../types";
import { borderWidthSizes, marginSizes, themeGray, themeGreen } from "./styles";

type SRDropDownProps = {
  label: string;
  listName: string;
  value: string;
  fixedOptions?: boolean;
  backgroundColor?: string;
  fillBackground?: boolean;
  marginBottom?: Size;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  children?: Child;
};

const defaultProps: SRDropDownProps = {
  label: "",
  listName: "",
  backgroundColor: "inherit",
  marginBottom: "none",
  value: "",
  onChange: () => {},
};

const SRDropDown: React.FC<SRDropDownProps> = (
  props: SRDropDownProps
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
    marginBottom: marginSizes[props.marginBottom],
  };

  if (props.fixedOptions) {
    return (
      <>
        <label style={labelStyle}>{props.label}</label>
        <select
          id={props.listName}
          value={props.value}
          onChange={props.onChange}
          style={inputStyle}
        >
          {props.children}
        </select>
      </>
    );
  } else {
    return (
      <div>
        <label style={labelStyle}>{props.label}</label>
        <input
          list={props.listName}
          value={props.value}
          onChange={props.onChange}
          style={inputStyle}
        />
        <datalist id={props.listName}>{props.children}</datalist>
      </div>
    );
  }
};

export default SRDropDown;
