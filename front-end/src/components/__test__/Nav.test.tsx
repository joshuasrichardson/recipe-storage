import React from "react";
import { render, act } from "@testing-library/react";
import Nav from "../Nav";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { testUser } from "../../../testUtils/mocks";
import { User } from "../../types";

let container: HTMLElement = null;
let root = null;
let mockLogout = jest.fn();
let mockSetUser = jest.fn();

jest.mock("../ConditionalLink", () => ({ to }) => <div>{to}</div>);
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

describe("Nav", () => {
  it("renders Home, Recipes, and Login Links when the user is logged out", () => {
    const nav = render(
      <BrowserRouter>
        <Nav user={null} setUser={mockSetUser} />
      </BrowserRouter>,
      root
    );

    expect(mockLogout).not.toHaveBeenCalled();
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(nav.container).toMatchInlineSnapshot(`
<div>
  <div
    class="Nav"
  >
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark"
    >
      <div
        class="container-fluid nav-links"
      >
        <a
          class="navbar-brand logo"
          href="/"
        >
          Storage Recipe
        </a>
        <h4
          class="navbar-brand username"
        />
        <button
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          class="navbar-toggler"
          data-bs-target="#navbarSupportedContent"
          data-bs-toggle="collapse"
          type="button"
        >
          <span
            class="navbar-toggler-icon"
          />
        </button>
        <div
          class="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul
            class="navbar-nav mb-2 mb-lg-0"
          >
            <li>
              <div>
                /storage
              </div>
            </li>
            <li>
              <div>
                /storage/history
              </div>
            </li>
            <li>
              <a
                class="nav-link"
                href="/recipes"
              >
                Recipes
              </a>
            </li>
            <li>
              <a
                class="nav-link"
                href="/login"
              >
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</div>
`);
  });

  it("renders username and Home, Storage, History Recipes, and Login Links when the user is logged in", () => {
    const nav = render(
      <BrowserRouter>
        <Nav user={testUser} setUser={mockSetUser} />
      </BrowserRouter>,
      root
    );

    expect(mockLogout).not.toHaveBeenCalled();
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(nav.container).toMatchInlineSnapshot(`
<div>
  <div
    class="Nav"
  >
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark"
    >
      <div
        class="container-fluid nav-links"
      >
        <a
          class="navbar-brand logo"
          href="/"
        >
          Storage Recipe
        </a>
        <h4
          class="navbar-brand username"
        >
          testuser
        </h4>
        <button
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          class="navbar-toggler"
          data-bs-target="#navbarSupportedContent"
          data-bs-toggle="collapse"
          type="button"
        >
          <span
            class="navbar-toggler-icon"
          />
        </button>
        <div
          class="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul
            class="navbar-nav mb-2 mb-lg-0"
          >
            <li>
              <div>
                /storage
              </div>
            </li>
            <li>
              <div>
                /storage/history
              </div>
            </li>
            <li>
              <a
                class="nav-link"
                href="/recipes"
              >
                Recipes
              </a>
            </li>
            <li>
              <a
                class="nav-link"
                href="/login"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</div>
`);
  });

  it("logs out when the user is logged in and clicks Logout", () => {
    const nav = render(
      <BrowserRouter>
        <Nav user={testUser} setUser={mockSetUser} />
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
        <Nav user={null} setUser={mockSetUser} />
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
