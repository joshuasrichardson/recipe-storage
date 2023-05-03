import React, { ReactElement } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useTranslation } from "react-i18next";
import Nav from "react-bootstrap/Nav";
// @ts-ignore
import SRHeader from "../sr-ui/SRHeader.tsx";
// @ts-ignore
import { lightTextColor, themeGreen } from "../sr-ui/styles.ts";
import { User } from "../types";

export type NavParams = {
  user: User;
};

const Navigation: React.FC<NavParams> = ({ user }: NavParams): ReactElement => {
  const { t } = useTranslation();

  const navStyle: React.CSSProperties = {
    backgroundColor: themeGreen,
  };

  return (
    <Navbar collapseOnSelect expand="sm" variant="dark" style={navStyle}>
      <Container aria-controls="responsive-navbar-nav">
        <Navbar.Brand href="/">
          <SRHeader id="logo-text" color={lightTextColor}>
            {!!user ? user.username : t("Storage Recipe")}
          </SRHeader>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav id="responsive-navbar-nav">
            {user && (
              <>
                <Nav.Link href="/profile">{t("Profile")}</Nav.Link>
                <Nav.Link href="/storage">{t("Storage")}</Nav.Link>
                <Nav.Link href="/storage/history">{t("History")}</Nav.Link>
              </>
            )}
            <Nav.Link href="/recipes">{t("Recipes")}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Toggle />
      </Container>
    </Navbar>
  );
};

export default Navigation;
