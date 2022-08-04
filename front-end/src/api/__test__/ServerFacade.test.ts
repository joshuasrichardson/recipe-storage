import { User } from "../../types";
import ServerFacade, { LoginParams, RegisterParams } from "../ServerFacade";
import { testUser as mockUser, newUser } from "../../../testUtils/mocks";

let mockSuccess: (user: User) => void;
let mockFailure: (err: string) => void;

type PostResponse = {
  data: {
    user: User;
  };
};

type GetResponse = {
  data: {
    user: User;
  };
};

type ErrorResponse = {
  response: {
    data: {
      message: string;
    };
  };
};

const loginErrorMessage: string = "Username or password is incorrect.";
const loginFailResponse: ErrorResponse = {
  response: { data: { message: loginErrorMessage } },
};

const unknownErrorMessage: string = "Unknown error occurred";
const missingInfoErrorMessage: string = "Must enter a username and password";
const missingRegisterInfoErrorMessage: string =
  "Must enter a username, password, and name";
const mismatchedPasswordErrorMessage = "Passwords do not match";

const mockPost = (url: string, request: any): PostResponse | ErrorResponse => {
  if (url.includes("/api/users/login")) {
    if (
      request.username === mockUser.username &&
      request.password === mockUser.password
    ) {
      return { data: { user: mockUser } };
    } else if (request.username === "Wrong" && request.password === "Info") {
      throw loginFailResponse;
    }
    return null;
  }
  if (url.includes("/api/users")) {
    if (request.username === mockUser.username) throw loginFailResponse;
    else if (
      request.username === newUser.username &&
      request.password === newUser.password
    ) {
      return { data: { user: newUser } };
    }
    throw "Error";
  } else return null;
};

const mockGet = (url: string, request: any): GetResponse | ErrorResponse => {
  if (url.includes("/api/users")) return { data: { user: mockUser } };
};

const mockDelete = jest.fn();

jest.mock("axios", () => {
  return {
    post: jest
      .fn()
      .mockImplementation((url, request) => mockPost(url, request)),
    get: jest.fn().mockImplementation((url, request) => mockGet(url, request)),
    delete: jest.fn().mockImplementation(() => mockDelete()),
  };
});

describe("ServerFacade", () => {
  beforeEach(() => {
    mockSuccess = jest.fn();
    mockFailure = jest.fn();
  });

  describe("login", () => {
    it("should login and return a user when correct credentials are provided", async () => {
      const loginParams: LoginParams = {
        username: mockUser.username,
        password: mockUser.password,
        onSuccess: mockSuccess,
        onFailure: mockFailure,
      };

      await ServerFacade.login(loginParams);

      expect(mockSuccess).toHaveBeenCalledWith(mockUser);
      expect(mockFailure).not.toHaveBeenCalled();
    });

    it("should return an error when the server has issues", async () => {
      const loginParams: LoginParams = {
        username: "Server Will",
        password: "Fail",
        onSuccess: mockSuccess,
        onFailure: mockFailure,
      };

      await ServerFacade.login(loginParams);

      expect(mockFailure).toHaveBeenCalledWith(unknownErrorMessage);
      expect(mockSuccess).not.toHaveBeenCalled();
    });

    it("should return an error when the login information is invalid", async () => {
      const loginParams: LoginParams = {
        username: "Wrong",
        password: "Info",
        onSuccess: mockSuccess,
        onFailure: mockFailure,
      };

      await ServerFacade.login(loginParams);

      expect(mockFailure).toHaveBeenCalledWith(loginErrorMessage);
      expect(mockSuccess).not.toHaveBeenCalled();
    });

    it("should return an error when a field is missing", async () => {
      const loginParams: LoginParams = {
        username: "Guy that forgot password",
        password: null,
        onSuccess: mockSuccess,
        onFailure: mockFailure,
      };

      await ServerFacade.login(loginParams);

      expect(mockFailure).toHaveBeenCalledWith(missingInfoErrorMessage);
      expect(mockSuccess).not.toHaveBeenCalled();
    });
  });

  describe("register", () => {
    it("should register and return a user when correct credentials are provided", async () => {
      const registerParams: RegisterParams = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        password: newUser.password,
        password2: newUser.password,
        onSuccess: mockSuccess,
        onFailure: mockFailure,
      };

      await ServerFacade.register(registerParams);

      expect(mockSuccess).toHaveBeenCalledWith(newUser);
      expect(mockFailure).not.toHaveBeenCalled();
    });

    it("should return an error when the server has issues", async () => {
      const registerParams: RegisterParams = {
        firstName: "Server Error Guy",
        lastName: "Server Error Guy",
        username: "Server Error Guy",
        password: "Server Error Guy",
        password2: "Server Error Guy",
        onSuccess: mockSuccess,
        onFailure: mockFailure,
      };

      await ServerFacade.register(registerParams);

      expect(mockFailure).toHaveBeenCalledWith(unknownErrorMessage);
      expect(mockSuccess).not.toHaveBeenCalled();
    });

    it("should return an error when the user already exists", async () => {
      const registerParams: RegisterParams = {
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        username: mockUser.username,
        password: mockUser.password,
        password2: mockUser.password,
        onSuccess: mockSuccess,
        onFailure: mockFailure,
      };

      await ServerFacade.register(registerParams);

      expect(mockFailure).toHaveBeenCalledWith(loginErrorMessage);
      expect(mockSuccess).not.toHaveBeenCalled();
    });

    it("should return an error when a field is missing", async () => {
      const registerParams: RegisterParams = {
        firstName: "Guy that forgot username",
        lastName: newUser.lastName,
        username: null,
        password: newUser.password,
        password2: newUser.password,
        onSuccess: mockSuccess,
        onFailure: mockFailure,
      };

      await ServerFacade.register(registerParams);

      expect(mockFailure).toHaveBeenCalledWith(missingRegisterInfoErrorMessage);
      expect(mockSuccess).not.toHaveBeenCalled();
    });

    it("should return an error when passwords don't match", async () => {
      const registerParams: RegisterParams = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        password: newUser.password,
        password2: "Different Password",
        onSuccess: mockSuccess,
        onFailure: mockFailure,
      };

      await ServerFacade.register(registerParams);

      expect(mockFailure).toHaveBeenCalledWith(mismatchedPasswordErrorMessage);
      expect(mockSuccess).not.toHaveBeenCalled();
    });
  });

  describe("getLoggedInUser", () => {
    it("calls backend to get logged in user", async () => {
      const user = await ServerFacade.getLoggedInUser();
      expect(user).toBe(mockUser);
    });
  });

  describe("logout", () => {
    it("calls backend to logout", async () => {
      await ServerFacade.logout();
      expect(mockDelete).toHaveBeenCalled();
    });
  });
});
