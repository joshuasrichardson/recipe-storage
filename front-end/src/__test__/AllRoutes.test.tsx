import React from "react";
import { render, act } from "@testing-library/react";
import AllRoutes from "../AllRoutes";
import { createRoot } from "react-dom/client";
import { testUser } from "../../testUtils/mocks";

let container: HTMLElement = null;
let root = null;

jest.mock("../components/Intro", () => () => "Intro");
jest.mock("../components/Nav", () => () => "Nav");
jest.mock("../components/Login", () => () => "Login");
jest.mock("../components/storage/Item", () => () => "Item");
jest.mock("../components/storage/Editor", () => () => "Editor");
jest.mock("../components/storage/Storage", () => () => "Storage");
jest.mock("../components/storage/StorageHistory", () => () => "StorageHistory");
jest.mock("../components/storage/AddItem", () => () => "AddItem");
jest.mock("../components/storage/DiffChecker", () => () => "DiffChecker");
jest.mock("../components/recipe/Recipes", () => () => "Recipes");

jest.mock("../api/ServerFacade.ts", () => {
  return {
    getItem: jest.fn(),
    getItemHistory: jest.fn(),
  };
});

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

describe("AllRoutes", () => {
  it("renders an Intro when the user is logged out", () => {
    const allRoutes = render(<AllRoutes user={null} />, root);

    expect(allRoutes.container).toMatchInlineSnapshot(`
<div>
  Nav
  Intro
</div>
`);
  });

  it("renders a storage page when the user is logged in", () => {
    const allRoutes = render(<AllRoutes user={testUser} />, root);

    expect(allRoutes.container).toMatchInlineSnapshot(`
<div>
  Nav
  Storage
</div>
`);
  });
});
