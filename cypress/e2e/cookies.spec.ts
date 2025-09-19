import { credentials } from "../support/testData";
import { loginPOSTRequest, mfaPOSTRequest, apiGETRequest} from "../support/apiHelpers";

describe("Positive Cookie Tests", () => {
  beforeEach(() => {
    cy.request(loginPOSTRequest(credentials.valid)).then(() => {
      cy.request(mfaPOSTRequest(credentials.valid.mfaCode));
    });
  });

  it("COOKIE-001-should set session cookie after successful MFA", () => {
    cy.getCookie("session").should("exist");
  });

  it("COOKIE-002-session cookie should have HttpOnly flag", () => {
    cy.getCookie("session").should("have.property", "httpOnly", true);
  });

  it("COOKIE-003-session cookie should be sent over HTTPS", () => {
    cy.getCookie("session").should("have.property", "secure", true);
  });

  it("COOKIE-004-session cookie should have SameSite flag to mitigate CSRF", () => {
    cy.getCookie("session").should("have.property", "sameSite", "Lax");
  });

  it("COOKIE-005-should allow access to dashboard with valid session cookie", () => {
    cy.getCookie("session").then((cookie) => {
      cy.request({
        method: "GET",
        url: "/dashboard",
        headers: { Cookie: `${cookie?.name}=${cookie?.value}` },
      }).then((res) => {
        expect(res.body).to.include("Welcome to your dashboard!");
      });
    });
  });
});

describe("Negative Cookie Tests", () => {
  it("COOKIE-006-should deny access to dashboard without session cookie", () => {
    cy.request(apiGETRequest("/dashboard", false)).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body).to.include("Unauthorized");
    });
  });

  it("COOKIE-007-should deny access to dashboard with invalid session cookie", () => {
    cy.setCookie("session", "invalid_cookie_value");
    cy.request(apiGETRequest("/dashboard", false)).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body).to.include("Unauthorized");
    });
  });
});
