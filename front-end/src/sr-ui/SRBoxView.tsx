import React, { MouseEventHandler, ReactElement, useState } from "react";
import SRImage from "./SRImage";
import SRHeader from "./SRHeader";
import { borderWidthSizes, paddingSizes } from "./styles";
import { Size, Child, Attribute } from "../types";
import {
  containerWidthSizes,
  marginSizes,
  themeGray,
  themeGreen,
} from "./styles";
import SRFlex from "./SRFlex";
import SRCheckBox from "./SRCheckBox";
import SRButton from "./SRButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

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
  back?: () => void;
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
  back: () => null,
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

  const ItemAttr = ({ value, index }: { value: string; index: number }) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <SRFlex
        key={value + index}
        justifyContent="flex-start"
        alignItems="flex-start"
        marginVertical="medium"
        style={{ gap: 12 }}
      >
        {props.useCheckBoxes && (
          <SRCheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
        )}
        <li>{value}</li>
      </SRFlex>
    );
  };

  const ItemAttrList = ({ arr }: { arr: string[] }) => {
    return (
      <>
        {arr
          .filter((str) => !!str)
          .map((value: string, index: number) => (
            <ItemAttr key={value + index} value={value} index={index} />
          ))}
      </>
    );
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
                <ItemAttrList arr={a.value} />
              </ol>
            )) ||
              (typeof a.value === "object" && (
                <ul style={listItemStyle(useDefaultStyle, false)}>
                  <ItemAttrList arr={a.value} />
                </ul>
              )) ||
              a.value}
          </li>
        );
      });
  };

  return (
    <div key={props.key} style={itemViewStyle} onClick={props.onClick}>
      {!!props.back ? (
        <SRButton
          size="small"
          variant="secondary"
          style={{
            border: "none",
            margin: "0px auto -32px -8px",
            padding: 0,
          }}
          onClick={props.back}
        >
          <FontAwesomeIcon icon={solid("arrow-left")} />
        </SRButton>
      ) : (
        <></>
      )}
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
