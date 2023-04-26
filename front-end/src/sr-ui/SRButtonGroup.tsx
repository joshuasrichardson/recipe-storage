import React, { MouseEventHandler, ReactElement } from "react";
// @ts-ignore
import { Size } from "../types.js";
// @ts-ignore
import SRFlex from "./SRFlex.tsx";
// @ts-ignore
import SRButton from "./SRButton.tsx";

type SRButtonGroupProps = {
  buttonsProps: Array<{
    label: string;
    variant: "primary" | "secondary";
    onClick?: MouseEventHandler<HTMLButtonElement>;
  }>;
  label: string;
  size?: Size;
};

const SRButtonGroup: React.FC<SRButtonGroupProps> = (
  props: SRButtonGroupProps
): ReactElement => {
  const leftButtonStyle = { marginRight: 0, borderRadius: "5px 0 0 5px" };
  const middleButtonStyle = { marginLeft: 0, marginRight: 0, borderRadius: 0 };
  const rightButtonStyle = { marginLeft: 0, borderRadius: "0 5px 5px 0" };

  return (
    <>
      {props.label ? props.label : ""}
      <SRFlex justifyContent="center">
        {props.buttonsProps.map((button, index) => (
          <SRButton
            key={button.label + index}
            size={props.size}
            variant={button.variant}
            onClick={button.onClick}
            style={{
              ...(index === 0 && props.buttonsProps.length > 1
                ? leftButtonStyle
                : index === props.buttonsProps.length - 1 &&
                  props.buttonsProps.length > 1
                ? rightButtonStyle
                : props.buttonsProps.length === 1
                ? undefined
                : middleButtonStyle),
              width: undefined,
              maxWidth: `${100 / props.buttonsProps.length}%`,
            }}
          >
            {button.label}
          </SRButton>
        ))}
      </SRFlex>
    </>
  );
};

export default SRButtonGroup;
