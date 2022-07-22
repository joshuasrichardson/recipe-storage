import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import Login from "../Login";
import { createRoot } from "react-dom/client";

let container = null;
let root = null;

let mockSetUser = jest.fn();
let mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  return { useNavigate: jest.fn().mockImplementation(() => mockNavigate) };
});

const mockLogin = (username, password, onSuccess, onFailure) => {
  if (!username || !password) {
    return onFailure({
      response: { data: { message: "Must enter a username and password" } },
    });
  }
  if (username === "testuser" && password === "correct")
    onSuccess({
      firstName: "Test",
      lastName: "User",
      username: "testuser",
      password: "correct",
      role: "",
    });
  else {
    onFailure({
      response: { data: { message: "Incorrect username or password" } },
    });
  }
};

const mockRegister = (
  username,
  password,
  password2,
  firstName,
  lastName,
  onSuccess,
  onFailure
) => {
  if (!firstName || !lastName || !username || !password || !password2) {
    return onFailure({
      response: { data: { message: "Must enter all information" } },
    });
  }
  if (username === "testuser") {
    return onFailure({
      response: { data: { message: "User alerady exists" } },
    });
  } else
    onSuccess({
      firstName: "Test",
      lastName: "User",
      username: "testuser",
      password: "correct",
      role: "",
    });
};

jest.mock("../../api/ServerFacade", () => {
  return {
    login: jest
      .fn()
      .mockImplementation((username, password, onSuccess, onFailure) =>
        mockLogin(username, password, onSuccess, onFailure)
      ),
    register: jest
      .fn()
      .mockImplementation(
        (
          username,
          password,
          password2,
          firstName,
          lastName,
          onSuccess,
          onFailure
        ) =>
          mockRegister(
            username,
            password,
            password2,
            firstName,
            lastName,
            onSuccess,
            onFailure
          )
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

const changeField = (component, fieldName, value) => {
  act(() => {
    fireEvent.change(component.getByLabelText(fieldName), {
      target: { value: value },
    });
  });
};

const expectFailedWithMessage = (component, message) => {
  expect(mockSetUser).not.toHaveBeenCalled();
  expect(mockNavigate).not.toHaveBeenCalled();
  expect(component.getByText(message)).toBeInTheDocument();
};

describe("Login", () => {
  it("renders with a username and password field", () => {
    const loginPage = render(<Login hasAccount setUser={mockSetUser} />, root);
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(loginPage.getByText("Username:")).toBeInTheDocument();
    expect(loginPage.getByText("Password:")).toBeInTheDocument();
    expect(
      loginPage.getByText("Don't have an account? Click here to create one.")
    ).toBeInTheDocument();
    expect(loginPage.queryByText("First Name:")).not.toBeInTheDocument();
    expect(loginPage.queryByText("Last Name:")).not.toBeInTheDocument();
    expect(loginPage.queryByText("Confirm Password:")).not.toBeInTheDocument();
    expect(
      loginPage.queryByText("Have an account? Click here to login.")
    ).not.toBeInTheDocument();
  });

  it("cannot login without a username", () => {
    const loginPage = render(<Login hasAccount setUser={mockSetUser} />, root);
    act(() => {
      loginPage.getByRole("button", { name: "Login" }).click();
    });
    const err = "Must enter a username and password";
    expectFailedWithMessage(loginPage, err);
    changeField(loginPage, "Username:", "testuser");
    act(() => {
      loginPage.getByRole("button", { name: "Login" }).click();
    });
    expectFailedWithMessage(loginPage, err);
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("can login with correct username and password", () => {
    const loginPage = render(<Login hasAccount setUser={mockSetUser} />, root);
    changeField(loginPage, "Username:", "testuser");
    changeField(loginPage, "Password:", "correct");
    act(() => {
      loginPage.getByRole("button", { name: "Login" }).click();
    });
    expect(mockSetUser).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalled();
  });

  it("switches to register when the link is clicked", () => {
    const loginPage = render(<Login hasAccount setUser={mockSetUser} />, root);
    act(() => {
      loginPage
        .getByText("Don't have an account? Click here to create one.")
        .click();
    });
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });
});

describe("Register", () => {
  it("renders with all registration fields", () => {
    const registrationPage = render(<Login setUser={mockSetUser} />, root);
    expect(registrationPage.getByText("First Name:")).toBeInTheDocument();
    expect(registrationPage.getByText("Last Name:")).toBeInTheDocument();
    expect(registrationPage.getByText("Username:")).toBeInTheDocument();
    expect(registrationPage.getByText("Password:")).toBeInTheDocument();
    expect(registrationPage.getByText("Confirm Password:")).toBeInTheDocument();
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

  //   it("cannot register with missing fields", () => {
  //     const registerPage = render(<Login setUser={mockSetUser} />, root);
  //     act(() => {
  //       registerPage.getByTestId("login-button").click();
  //     });
  //     const err = "Must enter all information";
  //     expect(registerPage.getByText(err)).toBeInTheDocument();
  //     // missing password confirmation
  //     const fieldNames = ["First Name:", "Last Name:", "Username:", "Password:"];
  //     for (let fieldName in fieldNames) {
  //       changeField(registerPage, fieldName, "aaa");
  //       act(() => {
  //         registerPage.getByTestId("login-button").click();
  //       });
  //       expect(registerPage.getByText(err)).toBeInTheDocument();
  //     }
  //     expect(mockSetUser).not.toHaveBeenCalled();
  //     expect(mockNavigate).not.toHaveBeenCalled();
  //   });

  //   it("can register with all information filled in", () => {
  //     const registrationPage = render(<Login setUser={mockSetUser} />, root);
  //     act(() => {
  //       fireEvent.change(registrationPage.getByLabelText("Username:"), {
  //         target: { value: "newuser" },
  //       });
  //       fireEvent.change(registrationPage.getByLabelText("Password:"), {
  //         target: { value: "correct" },
  //       });
  //       registrationPage.getByRole("button", { name: "Create" }).click();
  //     });
  //     expect(mockSetUser).toHaveBeenCalled();
  //     expect(mockNavigate).toHaveBeenCalled();
  //   });

  it("switches to login when the link is clicked", () => {
    const registrationPage = render(<Login setUser={mockSetUser} />, root);
    act(() => {
      registrationPage
        .getByText("Have an account? Click here to login.")
        .click();
    });
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
