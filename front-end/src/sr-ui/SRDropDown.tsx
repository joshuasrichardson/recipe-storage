import React, { ChangeEventHandler, ReactElement } from "react";
// @ts-ignore
import { themeGreen } from "./styles.ts";

type SRDropDownProps = {
  label: string;
  listName: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  options: Array<string>;
};

const SRDropDown: React.FC<SRDropDownProps> = (
  props: SRDropDownProps
): ReactElement => {
  const labelStyle: React.CSSProperties = {
    display: "inline-block",
    marginTop: "10px",
    width: "100%",
    color: themeGreen,
    textShadow: "0px 0px 6px #f0e3d0, 0px 0px 6px #f0e3d0, 0px 0px 6px #f0e3d0",
  };

  return (
    <div>
      <label style={labelStyle}>{props.label}</label>
      <input
        list={props.listName}
        value={props.value}
        onChange={props.onChange}
      />
      <datalist id={props.listName}>{props.options}</datalist>
    </div>
  );
};

export default SRDropDown;
