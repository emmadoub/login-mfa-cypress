import { UserCredentials } from "./testData";

export function loginPOSTRequest(user: UserCredentials, failOnStatusCode = true) {
  return {
    method: "POST",
    url: "/login",
    form: true,
    body: { username: user.username, password: user.password },
    failOnStatusCode,
  };
}

export function mfaPOSTRequest(code: string, failOnStatusCode = true) {
  return {
    method: "POST",
    url: "/mfa",
    form: true,
    body: { mfaCode: code },
    failOnStatusCode,
  };
}

export function apiGETRequest(url: string, failOnStatusCode = true) {
  return {
    method: "GET",
    url: url,
    failOnStatusCode,
  };
}
