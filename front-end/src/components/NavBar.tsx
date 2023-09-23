import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import SRHeader from "../sr-ui/SRHeader";
import { lightTextColor, themeGreen } from "../sr-ui/styles";
import { User } from "../types";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import NavBarLink from "./NavBarLink";

export interface NavBarParams {
  user: User;
}

const getInitialSelectedLink = (): string => {
  if (window.location.href.includes("/recipes")) return "/recipes";
  if (window.location.href.includes("/meal-planner")) return "/meal-planner";
  if (window.location.href.includes("/storage/history"))
    return "/storage/history";
  if (!window.location.href.includes("/profile")) return "/storage";
  return "";
};

const NavBar: React.FC<NavBarParams> = ({ user }): ReactElement => {
  const { t } = useTranslation();

  const [selectedLink, setSelectedLink] = useState<string>(
    getInitialSelectedLink()
  );

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
      <Link
        to={user ? "/profile" : "/"}
        style={{ textDecoration: "none" }}
        onClick={() => setSelectedLink("")}
      >
        <SRHeader
          id="logo-text"
          color={lightTextColor}
          style={{ marginBottom: 0 }}
        >
          {user ? user.username : t("Storage Recipe")}
        </SRHeader>
      </Link>
      <div style={{ display: "flex", gap: 16, marginRight: 8 }}>
        {user && (
          <>
            <NavBarLink
              to="/storage"
              icon={solid("warehouse")}
              selectedLink={selectedLink}
              setSelectedLink={setSelectedLink}
            />
            <NavBarLink
              to="/storage/history"
              icon={solid("history")}
              selectedLink={selectedLink}
              setSelectedLink={setSelectedLink}
            />
            <NavBarLink
              to="/meal-planner"
              icon={solid("calendar-alt")}
              selectedLink={selectedLink}
              setSelectedLink={setSelectedLink}
            />
          </>
        )}
        <NavBarLink
          to="/recipes"
          icon={solid("burger")}
          selectedLink={selectedLink}
          setSelectedLink={setSelectedLink}
        />
      </div>
    </div>
  );
};

export default NavBar;
