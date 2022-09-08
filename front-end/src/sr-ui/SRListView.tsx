import moment from "moment";
import { Moment } from "moment";
import React, { MouseEventHandler, ReactElement } from "react";
// @ts-ignore
import { formatDate } from "../utils/dateUtils.ts";
// @ts-ignore
import SRFlex from "./SRFlex.tsx";
// @ts-ignore
import SRText from "./SRText.tsx";
// @ts-ignore
import { darkTextColor, themeGreen } from "./styles.ts";

type SRListViewProps = {
  key: string;
  name: string;
  info?: string;
  date?: Moment;
  dateColor?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const defaultProps: SRListViewProps = {
  key: "default",
  name: "",
  info: "",
  date: moment(),
  dateColor: darkTextColor,
  onClick: () => {},
};

const SRListView: React.FC<SRListViewProps> = (
  props: SRListViewProps
): ReactElement => {
  props = { ...defaultProps, ...props };

  const divStyle: React.CSSProperties = {
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
          <SRText fontWeight={500} color={themeGreen}>
            {props.name}
          </SRText>
          <SRFlex>
            <div>
              <em>{props.info}</em>
            </div>
            <div style={dateStyle}>
              <em>{formatDate(props.date)}</em>
            </div>
          </SRFlex>
        </SRFlex>
      </SRFlex>
    </div>
  );
};

export default SRListView;
