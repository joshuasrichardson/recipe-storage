import React, { MouseEventHandler, ReactElement } from "react";
// @ts-ignore
import SRImage from "./SRImage.tsx";
// @ts-ignore
import SRHeader from "./SRHeader.tsx";
// @ts-ignore
import { borderWidthSizes, paddingSizes } from "./styles.ts";
// @ts-ignore
import { Size, Child } from "../types.ts";
import {
  containerWidthSizes,
  marginSizes,
  themeGray,
  themeGreen, // @ts-ignore
} from "./styles.ts";

type Attribute = {
  key: string;
  value: string;
  color: string;
};

type SRBoxViewProps = {
  key: string;
  src?: string;
  label?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  attributes: Attribute[];
  direction?: "row" | "column";
  alignItems?: "flex-start" | "flex-end" | "center";
  children?: Child;
  padding?: Size;
  margin?: Size;
  marginVertical?: Size;
  marginHorizontal?: Size;
  maxWidth?: Size;
  link?: string;
};

const defaultProps: SRBoxViewProps = {
  key: "default",
  label: "",
  attributes: [],
  onClick: undefined,
  direction: "column",
  alignItems: "center",
  padding: "medium",
  children: <></>,
  marginVertical: "medium",
  marginHorizontal: "medium",
  maxWidth: "small",
};

const SRBoxView: React.FC<SRBoxViewProps> = (
  props: SRBoxViewProps
): ReactElement => {
  props = { ...defaultProps, ...props };

  const itemViewStyle: React.CSSProperties = {
    cursor: props.onClick ? "pointer" : "auto",
    display: "flex",
    flexDirection: props.direction,
    backgroundColor: themeGray,
    padding: paddingSizes[props.padding],
    borderRadius: "5px",
    alignItems: props.alignItems,
    marginTop: marginSizes[props.marginVertical],
    marginBottom: marginSizes[props.marginVertical],
    marginLeft: marginSizes[props.marginHorizontal],
    marginRight: marginSizes[props.marginHorizontal],
    borderWidth: borderWidthSizes["small"],
    borderStyle: "solid",
    borderColor: themeGreen,
    maxWidth: containerWidthSizes[props.maxWidth],
    width: containerWidthSizes[props.maxWidth],
  };

  const listItemStyle: React.CSSProperties = {
    listStyleType: "none",
  };

  const itemAttributes = () => {
    return props.attributes
      .filter((a: Attribute) => a.value)
      .map((a: Attribute) => (
        <li key={a.key} style={{ ...listItemStyle, color: a.color }}>
          {a.key + ": " + a.value}
        </li>
      ));
  };

  return (
    <div key={props.key} style={itemViewStyle} onClick={props.onClick}>
      {props.src && <SRImage src={props.src} alt={props.label} />}
      <SRHeader padding="xsmall">{props.label}</SRHeader>
      <ul style={{ paddingLeft: "none" }}>
        {itemAttributes()}
        {props.link && (
          <a href={props.link} target="_blank" rel="noreferrer">
            Click here to view full recipe!
          </a>
        )}
      </ul>
      {props.children}
    </div>
  );
};

export default SRBoxView;
