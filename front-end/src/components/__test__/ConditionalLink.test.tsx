import React from "react";
import { render, act } from "@testing-library/react";
import ConditionalLink from "../ConditionalLink";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

let container: HTMLElement = null;
let root = null;

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

describe("ConditionalLink", () => {
  it("renders a link when the condition is true", () => {
    const link = render(
      <BrowserRouter>
        <ConditionalLink to="/storage" classN="nav-link" condition={true} />
      </BrowserRouter>,
      root
    );

    expect(link.container).toMatchInlineSnapshot(`
<div>
  <a
    class="nav-link"
    href="/storage"
  />
</div>
`);
  });

  it("does not render a link when the condition is false", () => {
    const link = render(
      <BrowserRouter>
        <ConditionalLink to="/storage" classN="nav-link" condition={false} />
      </BrowserRouter>,
      root
    );

    expect(link.container).toMatchInlineSnapshot(`<div />`);
  });

  it("renders a link with children when the condition is true with children", () => {
    const link = render(
      <BrowserRouter>
        <ConditionalLink
          children={<div>Child</div>}
          to="/storage"
          classN="nav-link"
          condition={true}
        />
      </BrowserRouter>,
      root
    );

    expect(link.container).toMatchInlineSnapshot(`
<div>
  <a
    class="nav-link"
    href="/storage"
  >
    <div>
      Child
    </div>
  </a>
</div>
`);
  });

  it("does not render a link but does render children when the condition is false and has children", () => {
    const link = render(
      <BrowserRouter>
        <ConditionalLink
          children={<div>Child</div>}
          to="/storage"
          classN="nav-link"
          condition={false}
        />
      </BrowserRouter>,
      root
    );

    expect(link.container).toMatchInlineSnapshot(`
<div>
  <div>
    Child
  </div>
</div>
`);
  });
});
