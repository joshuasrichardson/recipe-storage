import React, { MouseEventHandler, ReactElement } from "react";
import SRFlex from "./SRFlex";
import SRText from "./SRText";
import { darkTextColor, themeGreen } from "./styles";

type SRListViewProps = {
  name: string;
  nameColor: string;
  leftAlignedInfo?: string;
  rightAlignedInfo?: string;
  dateColor?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const defaultProps: SRListViewProps = {
  name: "",
  nameColor: themeGreen,
  leftAlignedInfo: "",
  rightAlignedInfo: "",
  dateColor: darkTextColor,
  onClick: () => {},
};

const SRListView: React.FC<SRListViewProps> = (
  props: SRListViewProps
): ReactElement => {
  props = { ...defaultProps, ...props };

  const divStyle: React.CSSProperties = {
    cursor: "pointer",
    borderTop: "solid",
    borderWidth: "1px",
    borderColor: themeGreen,
    width: "100%",
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
  };

  const dateStyle: React.CSSProperties = {
    color: props.dateColor,
  };

  return (
    <div style={divStyle} onClick={props.onClick}>
      <SRFlex justifyContent="center" padding="small">
        <SRFlex direction="column" alignItems="flex-start">
          <SRText fontWeight={500} color={props.nameColor}>
            {props.name}
          </SRText>
          <SRFlex>
            <div>
              <em>{props.leftAlignedInfo}</em>
            </div>
            <div style={dateStyle}>
              <em>{props.rightAlignedInfo}</em>
            </div>
          </SRFlex>
        </SRFlex>
      </SRFlex>
    </div>
  );
};

export default SRListView;
