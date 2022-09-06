import React, { ReactElement, useEffect } from "react";
import WebFont from "webfontloader";
// @ts-ignore
import { Child, Size } from "../types.ts";
// @ts-ignore
import { headerSizes, paddingSizes, themeGreen } from "./styles.ts";

type SRHeaderProps = {
  size?: Size;
  padding?: Size;
  underlined?: boolean;
  children: Child;
};

const defaultProps: SRHeaderProps = {
  size: "medium",
  padding: "medium",
  underlined: false,
  children: "",
};

const SRHeader: React.FC<SRHeaderProps> = (
  props: SRHeaderProps
): ReactElement => {
  props = { ...defaultProps, ...props };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Architects Daughter"],
      },
    });
  }, []);

  const headerStyle: React.CSSProperties = {
    fontFamily: "Architects Daughter",
    fontSize: headerSizes[props.size],
    fontWeight: props.size === "xlarge" ? "bold" : "normal",
    color: themeGreen,
    textAlign: "center",
    padding: paddingSizes[props.padding],
    borderBottom: props.underlined ? "1px solid" : "none",
  };

  return <h3 style={headerStyle}>{props.children}</h3>;
};

export default SRHeader;
