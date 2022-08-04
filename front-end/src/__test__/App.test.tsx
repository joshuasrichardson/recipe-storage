import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
// @ts-ignore
import App from "../App";
import { testUser as mockUser } from "../../testUtils/mocks";
import { User } from "../types";

const mockGetLoggedInUser: jest.Mock<User, []> = jest
  .fn()
  .mockImplementation(() => mockUser);

jest.mock("../api/ServerFacade.ts", () => {
  return {
    getLoggedInUser: jest.fn().mockImplementation(() => mockGetLoggedInUser),
  };
});

jest.mock("../AllRoutes", () => () => "AllRoutes");

jest.mock("../components/Toaster", () => () => "Toaster");

test("renders app", async () => {
  let result: RenderResult;
  await act(async () => {
    result = render(<App />);
  });
  expect(mockGetLoggedInUser).toHaveBeenCalled();
  expect(result.container).toMatchInlineSnapshot(`
<div>
  <div
    class="App"
  >
    AllRoutes
    Toaster
  </div>
</div>
`);
});
