import React, { ReactElement } from "react";
import { borderWidthSizes, marginSizes, themeGreen } from "./styles";

type SRImageProps = {
  src: string;
  label: string;
};

const defaultProps: SRImageProps = {
  src: "",
  label: "",
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
