import React, { ReactElement } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
// @ts-ignore
import ServerFacade from "../api/ServerFacade.ts";
// @ts-ignore
import SRHeader from "../sr-ui/SRHeader.tsx";
// @ts-ignore
import { lightTextColor, themeGreen } from "../sr-ui/styles.ts";
import { User } from "../types";

export type NavParams = {
  user: User;
  setUser: (user: User) => void;
};

const Navigation: React.FC<NavParams> = ({
  user,
  setUser,
}: NavParams): ReactElement => {
  const navStyle: React.CSSProperties = {
    backgroundColor: themeGreen,
  };

  const logout = async (): Promise<void> => {
    if (user) {
      await ServerFacade.logout();
      setUser(null);
    }
  };

  return (
    <Navbar collapseOnSelect expand="sm" variant="dark" style={navStyle}>
      <Container aria-controls="responsive-navbar-nav">
        <Navbar.Brand href="/">
          <SRHeader color={lightTextColor}>
            {user !== null ? user.username : "Storage Recipe"}
          </SRHeader>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav id="responsive-navbar-nav" pull-right>
            {user && <Nav.Link href="/storage">Storage</Nav.Link>}
            {user && <Nav.Link href="/storage/history">History</Nav.Link>}
            <Nav.Link href="/recipes">Recipes</Nav.Link>
            <Nav.Link href="/login" onClick={logout}>
              {user ? "Logout" : "Login"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Toggle />
      </Container>
    </Navbar>
  );
};

export default Navigation;
