import React, { MouseEventHandler, ReactElement } from "react";
import Utils, { srDate } from "../utils/utils";
import SRFlex from "./SRFlex";
import SRText from "./SRText";
import { darkTextColor, themeGreen } from "./styles";
import { SRDate } from "../types";

type SRListViewProps = {
  key: string;
  name: string;
  nameColor: string;
  info?: string;
  date?: SRDate;
  dateFormatter?: (date: SRDate) => string;
  dateColor?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const defaultProps: SRListViewProps = {
  key: "default",
  name: "",
  nameColor: themeGreen,
  info: "",
  date: srDate(),
  dateFormatter: Utils.formatDate,
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
              <em>{props.info}</em>
            </div>
            <div style={dateStyle}>
              <em>{props.dateFormatter(props.date)}</em>
            </div>
          </SRFlex>
        </SRFlex>
      </SRFlex>
    </div>
  );
};

export default SRListView;
