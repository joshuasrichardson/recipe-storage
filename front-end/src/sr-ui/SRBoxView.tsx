import React, { MouseEventHandler, ReactElement } from "react";
// @ts-ignore
import SRImage from "./SRImage.tsx";
// @ts-ignore
import SRHeader from "./SRHeader.tsx";
// @ts-ignore
import { borderWidthSizes, paddingSizes } from "./styles.ts";
// @ts-ignore
import { Size, Child, Attribute } from "../types.ts";
import {
  containerWidthSizes,
  marginSizes,
  themeGray,
  themeGreen, // @ts-ignore
} from "./styles.ts";
// @ts-ignore
import SRFlex from "./SRFlex.tsx";
// @ts-ignore
import SRCheckBox from "./SRCheckBox.tsx";

type SRBoxViewProps = {
  key: string;
  src?: string;
  label?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  titleSize?: Size;
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
  useCheckBoxes?: boolean;
};

const defaultProps: SRBoxViewProps = {
  key: "default",
  label: "",
  titleSize: "medium",
  attributes: [],
  onClick: undefined,
  direction: "column",
  alignItems: "center",
  padding: "medium",
  children: <></>,
  marginVertical: "medium",
  marginHorizontal: "medium",
  maxWidth: "small",
  useCheckBoxes: false,
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

  const listStyle: React.CSSProperties = {
    listStyleType: "none",
    paddingLeft: 0,
  };

  const listItemStyle = (
    useDefaultStyle: boolean,
    ol: boolean
  ): React.CSSProperties => {
    return {
      listStyleType: useDefaultStyle ? (ol ? undefined : "square") : "none",
      paddingLeft: useDefaultStyle ? undefined : 14,
    };
  };

  const shouldUseDefaultListStyle = (val: string[]): boolean => {
    for (let i = 0; i < val.length; i++) {
      if (!val[i].includes(`${i + 1}`) && !val[i].includes("-")) return true;
    }
    return false;
  };

  const itemAttrLI = (arr: string[]) => {
    return arr
      .filter((str) => !!str)
      .map((val: string, index: number) => (
        <SRFlex key={val + index} justifyContent="flex-start">
          {props.useCheckBoxes && <SRCheckBox />}
          <li>{val}</li>
        </SRFlex>
      ));
  };

  const itemAttributes = () => {
    return props.attributes
      .filter(
        (a: Attribute) =>
          a?.value &&
          (typeof a.value !== "object" || (a.value.length && a.value[0]))
      )
      .map((a: Attribute) => {
        const useDefaultStyle =
          typeof a.value === "object"
            ? !props.useCheckBoxes && shouldUseDefaultListStyle(a.value)
            : false;
        return (
          <li key={a.key} style={{ color: a.color }}>
            <strong>{a.key + ": "}</strong>
            {(typeof a.value === "object" && a.ol && (
              <ol style={listItemStyle(useDefaultStyle, true)}>
                {itemAttrLI(a.value)}
              </ol>
            )) ||
              (typeof a.value === "object" && (
                <ul style={listItemStyle(useDefaultStyle, false)}>
                  {itemAttrLI(a.value)}
                </ul>
              )) ||
              a.value}
          </li>
        );
      });
  };

  return (
    <div key={props.key} style={itemViewStyle} onClick={props.onClick}>
      {props.src && <SRImage src={props.src} label={props.label} />}
      <SRHeader padding="xsmall" size={props.titleSize}>
        {props.label}
      </SRHeader>
      <ul style={listStyle}>
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
