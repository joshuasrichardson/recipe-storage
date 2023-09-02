import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import SRHeader from "../sr-ui/SRHeader";
import { lightTextColor, themeGreen } from "../sr-ui/styles";
import { User } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";

export type NavParams = {
  user: User;
};

const NavBar: React.FC<NavParams> = ({ user }: NavParams): ReactElement => {
  const { t } = useTranslation();

  const navStyle: React.CSSProperties = {
    backgroundColor: themeGreen,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 16px",
  };

  return (
    <div style={navStyle}>
      <div>
        <Link to={user ? "/profile" : "/"} style={{ textDecoration: "none" }}>
          <SRHeader
            id="logo-text"
            color={lightTextColor}
            style={{ marginBottom: 0 }}
          >
            {user ? user.username : t("Storage Recipe")}
          </SRHeader>
        </Link>
      </div>
      <div style={{ display: "flex", gap: 24, marginRight: 8 }}>
        {user && (
          <>
            <Link to="/storage">
              <FontAwesomeIcon
                icon={solid("warehouse")}
                style={{ color: lightTextColor }}
              />
            </Link>
            <Link to="/storage/history">
              <FontAwesomeIcon
                icon={solid("history")}
                style={{ color: lightTextColor }}
              />
            </Link>
          </>
        )}
        <Link to="/recipes">
          <FontAwesomeIcon
            icon={solid("burger")}
            style={{ color: lightTextColor }}
          />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
