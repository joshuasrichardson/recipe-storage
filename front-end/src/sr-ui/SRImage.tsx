import React, { ReactElement } from "react";
// @ts-ignore
import { Child } from "../types.ts";
// @ts-ignore
import { borderWidthSizes, marginSizes, themeGreen } from "./styles.ts";

type SRImageProps = {
  src: string;
  label: string;
  children: Child;
};

const defaultProps: SRImageProps = {
  src: "",
  label: "",
  children: [<></>],
};

const SRImage: React.FC<SRImageProps> = (
  props: SRImageProps = defaultProps
): ReactElement => {
  const imageStyles: React.CSSProperties = {
    objectFit: "cover",
    borderRadius: "5px",
    margin: marginSizes["xsmall"],
    flex: "auto",
    border: "solid",
    borderWidth: borderWidthSizes["small"],
    borderColor: themeGreen,
    width: "200px",
    height: "200px",
  };

  return <img style={imageStyles} src={props.src} alt={props.label} />;
};

export default SRImage;
