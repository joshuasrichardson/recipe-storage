import React, { ChangeEventHandler, ReactElement } from "react";

type SRDateInputProps = {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const defaultProps: SRDateInputProps = {
  label: "",
  value: "",
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
  };

  return (
    <div>
      <label style={labelStyle}>{props.label}</label>
      <input type="date" value={props.value} onChange={props.onChange}></input>
    </div>
  );
};

export default SRDateInput;
