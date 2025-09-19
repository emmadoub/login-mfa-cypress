import { credentials } from "../support/testData";
import {
  loginPOSTRequest,
  mfaPOSTRequest,
  apiGETRequest,
} from "../support/apiHelpers";

describe("API Tests - Login & MFA", () => {
  it("API-001-should fail login with wrong credentials", () => {
    cy.request(loginPOSTRequest(credentials.invalid)).then((res) => {
      expect(res.headers["content-type"]).to.include("text/html"); // No JSON returned, only text
      expect(res.body).to.include("Invalid Credentials");
    });
  });

  it("API-002-should login successfully with correct credentials", () => {
    cy.request(loginPOSTRequest(credentials.valid)).then((res) => {
      expect(res.headers["content-type"]).to.include("text/html");
      expect(res.body).to.include("MFA Verification");
    });
  });

  it("API-003-should fail MFA with wrong code", () => {
    cy.request(loginPOSTRequest(credentials.valid))
      .then(() => {
        cy.request(mfaPOSTRequest(credentials.invalid.mfaCode));
      })
      .then((res) => {
        expect(res.headers["content-type"]).to.include("text/html");
        expect(res.body).to.include("Invalid MFA Code");
      });
  });

  it("API-004-should access dashboard after successful MFA", () => {
    cy.request(loginPOSTRequest(credentials.valid))
      .then(() => {
        cy.request(mfaPOSTRequest(credentials.valid.mfaCode));
      })
      .then((res) => {
        cy.request({
          method: "GET",
          url: "/dashboard",
          headers: { cookie: res.headers["set-cookie"] },
        }).then((dashboardRes) => {
          expect(res.headers["content-type"]).to.include("text/html");
          expect(dashboardRes.body).to.contain("Welcome to your dashboard!");
        });
      });
  });

  it("API-005-should deny access to MFA page directly through URL", () => {
    cy.request(apiGETRequest("/mfa", false)).then((res) => {
      expect(res.status).to.eq(301);
    });
  });
});
