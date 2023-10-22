import React, {
  useState,
  MouseEventHandler,
  ReactElement,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
} from "react";
import { Child } from "../types";
import {
  borderWidthSizes,
  disabledCheckBoxColor,
  mainCheckBoxColor,
  brightCheckBoxColor,
  lightTextColor,
  themeGreen,
} from "./styles";
import SRCheck from "./SRCheck";

type SRCheckBoxProps = {
  size?: "large" | "small";
  type?: "button" | "submit";
  disabled?: boolean;
  isChecked?: boolean;
  setIsChecked?: Dispatch<SetStateAction<boolean>>;
  children?: Child;
  style?: React.CSSProperties;
};

const defaultProps: SRCheckBoxProps = {
  size: "large",
  type: "button",
  disabled: false,
  isChecked: false,
  setIsChecked: () => {},
  children: <></>,
  style: {},
};

const SRCheckBox: React.FC<SRCheckBoxProps> = (
  props: SRCheckBoxProps
): ReactElement => {
  props = { ...defaultProps, ...props };
  const [isHover, setHover] = useState(false);

  const checkboxStyle: React.CSSProperties = {
    width: 24,
    height: 24,
    minWidth: 24,
    minHeight: 24,
    borderRadius: 4,
    color: lightTextColor,
    backgroundColor: props.isChecked ? themeGreen : lightTextColor,
    ...props.style,
    borderWidth: borderWidthSizes["small"],
    borderStyle: "solid",
    borderColor: themeGreen,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <button
      type="button"
      style={checkboxStyle}
      onClick={
        !props.disabled ? () => props.setIsChecked((prev) => !prev) : undefined
      }
    >
      <SRCheck />
    </button>
  );
};

export default SRCheckBox;
