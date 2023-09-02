import React from "react";
import { render, act } from "@testing-library/react";
import NavBar from "../NavBar";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { testUser } from "../../../testUtils/mocks";

let container: HTMLElement = null;
let root = null;
let mockLogout = jest.fn();
let mockSetUser = jest.fn();

jest.mock("../../api/ServerFacade.ts", () => {
  return {
    logout: jest.fn().mockImplementation(() => mockLogout()),
  };
});

beforeEach(() => {
  mockSetUser = jest.fn();
  mockLogout = jest.fn();
  jest.mock("../../api/ServerFacade.ts", () => {
    return {
      logout: jest.fn().mockImplementation(() => mockLogout()),
    };
  });

  act(() => {
    container = document.createElement("div");
    root = createRoot(container);
  });
});

afterEach(() => {
  act(() => {
    root.unmount();
    container.remove();
  });
  container = null;
  root = null;
});

describe("NavBar", () => {
  it("renders Home, Recipes, and Login Links when the user is logged out", () => {
    const nav = render(
      <BrowserRouter>
        <NavBar user={null} />
      </BrowserRouter>,
      root
    );

    expect(mockLogout).not.toHaveBeenCalled();
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(nav.container).toMatchInlineSnapshot(`
<div>
  <nav
    class="navbar navbar-expand-sm navbar-dark"
    style="background-color: rgb(0, 56, 21);"
  >
    <div
      aria-controls="responsive-navbar-nav"
      class="container"
    >
      <a
        class="navbar-brand"
        href="/"
      >
        <h3
          id="logo-text"
          style="font-family: Architects Daughter; font-size: 22px; font-weight: normal; color: rgb(224, 214, 206); text-align: center; padding: 10px;"
        >
          Storage Recipe
        </h3>
      </a>
      <div
        class="justify-content-end navbar-collapse collapse"
      >
        <div
          class="navbar-nav"
          id="responsive-navbar-nav"
        >
          <a
            class="nav-link"
            data-rr-ui-event-key="/recipes"
            href="/recipes"
          >
            Recipes
          </a>
          <a
            class="nav-link"
            data-rr-ui-event-key="/login"
            href="/login"
          >
            Login
          </a>
        </div>
      </div>
      <button
        aria-label="Toggle navigation"
        class="navbar-toggler collapsed"
        type="button"
      >
        <span
          class="navbar-toggler-icon"
        />
      </button>
    </div>
  </nav>
</div>
`);
  });

  it("renders username and Home, Storage, History Recipes, and Login Links when the user is logged in", () => {
    const nav = render(
      <BrowserRouter>
        <NavBar user={testUser} />
      </BrowserRouter>,
      root
    );

    expect(mockLogout).not.toHaveBeenCalled();
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(nav.container).toMatchInlineSnapshot(`
<div>
  <nav
    class="navbar navbar-expand-sm navbar-dark"
    style="background-color: rgb(0, 56, 21);"
  >
    <div
      aria-controls="responsive-navbar-nav"
      class="container"
    >
      <a
        class="navbar-brand"
        href="/"
      >
        <h3
          id="logo-text"
          style="font-family: Architects Daughter; font-size: 22px; font-weight: normal; color: rgb(224, 214, 206); text-align: center; padding: 10px;"
        >
          testuser
        </h3>
      </a>
      <div
        class="justify-content-end navbar-collapse collapse"
      >
        <div
          class="navbar-nav"
          id="responsive-navbar-nav"
        >
          <a
            class="nav-link"
            data-rr-ui-event-key="/storage"
            href="/storage"
          >
            Storage
          </a>
          <a
            class="nav-link"
            data-rr-ui-event-key="/storage/history"
            href="/storage/history"
          >
            History
          </a>
          <a
            class="nav-link"
            data-rr-ui-event-key="/recipes"
            href="/recipes"
          >
            Recipes
          </a>
          <a
            class="nav-link"
            data-rr-ui-event-key="/login"
            href="/login"
          >
            Logout
          </a>
        </div>
      </div>
      <button
        aria-label="Toggle navigation"
        class="navbar-toggler collapsed"
        type="button"
      >
        <span
          class="navbar-toggler-icon"
        />
      </button>
    </div>
  </nav>
</div>
`);
  });

  it("logs out when the user is logged in and clicks Logout", () => {
    const nav = render(
      <BrowserRouter>
        <NavBar user={testUser} />
      </BrowserRouter>,
      root
    );

    act(() => {
      const link = nav.getByRole("link", { name: "Logout" });
      link.click();
    });
    expect(mockLogout).toHaveBeenCalled();
    // expect(mockSetUser).toHaveBeenCalledWith(null);
  });

  it("does not log out when the user is logged out and clicks Login", () => {
    const nav = render(
      <BrowserRouter>
        <NavBar user={null} />
      </BrowserRouter>,
      root
    );

    act(() => {
      const link = nav.getByRole("link", { name: "Login" });
      link.click();
    });
    expect(mockLogout).not.toHaveBeenCalled();
    expect(mockSetUser).not.toHaveBeenCalled();
  });
});
