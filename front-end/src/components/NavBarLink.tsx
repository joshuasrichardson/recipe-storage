import React, { ReactElement } from "react";
import { lightTextColor, themeGreen } from "../sr-ui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type NavBarLinkParams = {
  to: string;
  icon: IconProp;
  selectedLink: string;
  setSelectedLink: React.Dispatch<React.SetStateAction<string>>;
};

const NavBarLink: React.FC<NavBarLinkParams> = ({
  to,
  icon,
  selectedLink,
  setSelectedLink,
}): ReactElement => {
  const isSelected = selectedLink === to;

  return (
    <Link to={to} onClick={() => setSelectedLink(to)}>
      <FontAwesomeIcon
        icon={icon}
        style={{
          color: lightTextColor,
          padding: 8,
          border: `solid 1px ${isSelected ? lightTextColor : themeGreen}`,
          borderRadius: 4,
        }}
      />
    </Link>
  );
};

export default NavBarLink;
