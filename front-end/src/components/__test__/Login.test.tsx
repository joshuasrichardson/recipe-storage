import React from "react";
import { render, act, RenderResult } from "@testing-library/react";
import Login from "../Login";
import { createRoot } from "react-dom/client";
import { newUser, testUser } from "../../../testUtils/mocks";
import { changeField } from "../../../testUtils/testFunctions";
import { LoginParams, RegisterParams } from "../../api/ServerFacade";

let container: HTMLElement = null;
let root = null;

let mockSetUser = jest.fn();
let mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  return { useNavigate: jest.fn().mockImplementation(() => mockNavigate) };
});

const serverErrorName = "GuyThatCausesServerError";

const mockLogin = ({
  username,
  password,
  onSuccess,
  onFailure,
}: LoginParams) => {
  if (!username || !password) {
    return onFailure("Must enter a username and password");
  }
  if (username === "testuser" && password === "correct") onSuccess(testUser);
  else {
    onFailure("Incorrect username or password");
  }
};

const mockRegister = ({
  username,
  password,
  password2,
  firstName,
  lastName,
  onSuccess,
  onFailure,
}: RegisterParams) => {
  if (username === serverErrorName) return onFailure("Unknown error occurred");
  if (!firstName || !lastName || !username || !password || !password2) {
    return onFailure("Must enter all information");
  }
  if (username === testUser.username) {
    return onFailure("User alerady exists");
  } else onSuccess(newUser);
};

jest.mock("../../api/ServerFacade.ts", () => {
  return {
    login: jest
      .fn()
      .mockImplementation(({ username, password, onSuccess, onFailure }) =>
        mockLogin({ username, password, onSuccess, onFailure })
      ),
    register: jest
      .fn()
      .mockImplementation(
        ({
          username,
          password,
          password2,
          firstName,
          lastName,
          onSuccess,
          onFailure,
          language,
        }) =>
          mockRegister({
            username,
            password,
            password2,
            firstName,
            lastName,
            onSuccess,
            onFailure,
            language,
          })
      ),
  };
});

beforeEach(() => {
  mockSetUser = jest.fn();
  mockNavigate = jest.fn();
  jest.mock("react-router-dom", () => {
    return { useNavigate: jest.fn().mockImplementation(() => mockNavigate) };
  });
  // setup a DOM element as a render target
  act(() => {
    container = document.createElement("div");
    root = createRoot(container);
  });
});

afterEach(() => {
  // cleanup on exiting
  act(() => {
    root.unmount();
    container.remove();
  });
  container = null;
  root = null;
});

const expectFailedWithMessage = (component: RenderResult, message: string) => {
  expect(mockSetUser).not.toHaveBeenCalled();
  expect(mockNavigate).not.toHaveBeenCalled();
  expect(component.getByText(message)).toBeInTheDocument();
};

describe("Login", () => {
  it("renders with a username and password field", () => {
    const loginPage = render(<Login hasAccount={true} />, root);
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(loginPage.getByText("Username")).toBeInTheDocument();
    expect(loginPage.getByText("Password")).toBeInTheDocument();
    expect(
      loginPage.getByText("Don't have an account? Click here to create one.")
    ).toBeInTheDocument();
    expect(loginPage.queryByText("First Name")).not.toBeInTheDocument();
    expect(loginPage.queryByText("Last Name")).not.toBeInTheDocument();
    expect(loginPage.queryByText("Confirm Password")).not.toBeInTheDocument();
    expect(
      loginPage.queryByText("Have an account? Click here to login.")
    ).not.toBeInTheDocument();
  });

  it("cannot login without a username", () => {
    const loginPage = render(<Login hasAccount={true} />, root);
    act(() => {
      loginPage.getByRole("button", { name: "Login" }).click();
    });
    const err = "Must enter a username and password";
    expectFailedWithMessage(loginPage, err);
    changeField(loginPage, "Username", testUser.username);
    act(() => {
      loginPage.getByRole("button", { name: "Login" }).click();
    });
    expectFailedWithMessage(loginPage, err);
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("can login with correct username and password", () => {
    const loginPage = render(<Login hasAccount={true} />, root);
    changeField(loginPage, "Username", testUser.username);
    changeField(loginPage, "Password", testUser.password);
    act(() => {
      loginPage.getByRole("button", { name: "Login" }).click();
    });
    expect(mockSetUser).toHaveBeenCalledWith(testUser);
    expect(mockNavigate).toHaveBeenCalledWith("/storage", { replace: true });
  });
});

describe("Register", () => {
  it("renders with all registration fields", () => {
    const registrationPage = render(<Login />, root);
    expect(registrationPage.getByText("First Name")).toBeInTheDocument();
    expect(registrationPage.getByText("Last Name")).toBeInTheDocument();
    expect(registrationPage.getByText("Username")).toBeInTheDocument();
    expect(registrationPage.getByText("Password")).toBeInTheDocument();
    expect(registrationPage.getByText("Confirm Password")).toBeInTheDocument();
    expect(
      registrationPage.getByText("Have an account? Click here to login.")
    ).toBeInTheDocument();
    expect(
      registrationPage.queryByText(
        "Don't have an account? Click here to create one."
      )
    ).not.toBeInTheDocument();
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("cannot register with missing fields", () => {
    const registerPage = render(<Login />, root);
    act(() => {
      registerPage.getByRole("button", { name: "Create" }).click();
    });
    const err = "Must enter all information";
    expect(registerPage.getByText(err)).toBeInTheDocument();
    // missing password confirmation
    const fieldNames = ["First Name", "Last Name", "Username", "Password"];
    for (let fieldName of fieldNames) {
      changeField(registerPage, fieldName, "anything");
      act(() => registerPage.getByRole("button", { name: "Create" }).click());
      expect(registerPage.getByText(err)).toBeInTheDocument();
    }
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("can register with all information filled in", () => {
    const registrationPage = render(<Login />, root);
    const registrationInfo = [
      { field: "First Name", value: newUser.firstName },
      { field: "Last Name", value: newUser.lastName },
      { field: "Username", value: newUser.username },
      { field: "Password", value: newUser.password },
      { field: "Confirm Password", value: newUser.password },
    ];
    for (let info of registrationInfo) {
      changeField(registrationPage, info.field, info.value);
    }
    const err = "Must enter all information";
    expect(registrationPage.queryByText(err)).not.toBeInTheDocument();
    act(() => registrationPage.getByRole("button", { name: "Create" }).click());
    expect(mockSetUser).toHaveBeenCalledWith(newUser);
    expect(mockNavigate).toHaveBeenCalledWith("/storage", { replace: true });
  });

  it("can handle unknown server errors", () => {
    const registrationPage = render(<Login />, root);
    changeField(registrationPage, "Username", serverErrorName);
    act(() => registrationPage.getByRole("button", { name: "Create" }).click());
    const err = "Unknown error occurred";
    expect(registrationPage.queryByText(err)).toBeInTheDocument();
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
