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
    class="page"
  >
    <div
      class="main-container"
    >
      <h1>
        Recipe Storage
      </h1>
      <p
        class="call-to-action"
      >
        Get started by viewing recipes, logging in, or creating your own account.
      </p>
      <div
        class="selections-container"
      >
        <a
          class="button-link"
          href="/recipes"
        >
          <button
            class="obvious"
          >
            See Recipes
          </button>
        </a>
        <a
          class="button-link"
          href="/login"
        >
          <button
            class="obvious"
          >
            Login
          </button>
        </a>
        <a
          class="button-link"
          href="/register"
        >
          <button
            class="obvious"
          >
            Create Account
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
