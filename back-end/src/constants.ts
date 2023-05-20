export enum ErrorMessage {
  MISSING_CREDS = "username and password are required",
  INCORRECT_CREDS = "username or password is incorrect",
  USER_EXISTS = "username already exists",
  USER_REQUIRED = "user is required",
  NOT_LOGGED_IN = "not logged in",
}

export const ONE_MONTH = 31 * 24 * 60 * 60 * 1000;
