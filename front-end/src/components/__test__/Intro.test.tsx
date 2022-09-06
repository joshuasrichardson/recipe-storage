import React from "react";
import { render, act } from "@testing-library/react";
import Intro from "../Intro";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { testUser } from "../../../testUtils/mocks";

let container: HTMLElement = null;
let root = null;

jest.mock("../storage/Storage", () => () => "Storage");

beforeEach(() => {
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

describe("Intro", () => {
  it("renders an intro and links when the user is logged out", () => {
    const intro = render(
      <BrowserRouter>
        <Intro />
      </BrowserRouter>,
      root
    );

    expect(intro.container).toMatchInlineSnapshot(`
<div>
  <div
    style="margin: auto; display: flex; align-items: flex-start; justify-content: center; flex-direction: column; width: 100%; flex-wrap: wrap; padding: 0px;"
  >
    <div
      style="width: 520px; max-width: 520px; display: flex; align-items: center; flex-direction: column; margin: 60px; padding: 15px; border: solid; border-color: #003815; border-width: 3px;"
    >
      <h3
        style="font-family: Architects Daughter; font-size: 48px; font-weight: bold; color: rgb(0, 56, 21); text-align: center; padding: 20px; border-bottom: 1px solid;"
      >
        Storage Recipe
      </h3>
      <h3
        style="font-family: Architects Daughter; font-size: 22px; font-weight: normal; color: rgb(0, 56, 21); text-align: center; padding: 10px;"
      >
        The recipe for better storage management
      </h3>
      <p
        style="font-size: 20px; padding: 10px; margin: 20px; text-shadow: 0px 0px 6px #f0e3d0, 0px 0px 6px #f0e3d0, 0px 0px 6px #f0e3d0;"
      >
        Get started by viewing recipes, logging in, or creating your own account.
      </p>
      <div
        style="margin: auto; display: flex; align-items: center; justify-content: space-around; flex-direction: row; width: 100%; flex-wrap: wrap; padding: 0px;"
      >
        <a
          href="/login"
          style="text-decoration: none;"
        >
          <button
            style="color: rgb(224, 214, 206); background-color: rgb(139, 0, 0); font-weight: bold; border-radius: 5px; border-width: 1.5px; border-style: solid; border-color: #003815; display: flex; align-items: center; justify-content: center; padding: 20px; width: 200px; max-width: 300px; margin: 12px;"
            type="button"
          >
            Login
          </button>
        </a>
        <a
          href="/register"
          style="text-decoration: none;"
        >
          <button
            style="color: rgb(224, 214, 206); background-color: rgb(139, 0, 0); font-weight: bold; border-radius: 5px; border-width: 1.5px; border-style: solid; border-color: #003815; display: flex; align-items: center; justify-content: center; padding: 20px; width: 200px; max-width: 300px; margin: 12px;"
            type="button"
          >
            Create Account
          </button>
        </a>
        <a
          href="/recipes"
          style="text-decoration: none;"
        >
          <button
            style="color: rgb(224, 214, 206); background-color: rgb(139, 0, 0); font-weight: bold; border-radius: 5px; border-width: 1.5px; border-style: solid; border-color: #003815; display: flex; align-items: center; justify-content: center; padding: 20px; width: 200px; max-width: 300px; margin: 12px;"
            type="button"
          >
            See Recipes
          </button>
        </a>
      </div>
    </div>
  </div>
</div>
`);
  });

  it("renders a storage page when the user is logged in", () => {
    const intro = render(
      <BrowserRouter>
        <Intro user={testUser} />
      </BrowserRouter>,
      root
    );

    expect(intro.container).toMatchInlineSnapshot(`
<div>
  Storage
</div>
`);
  });
});
