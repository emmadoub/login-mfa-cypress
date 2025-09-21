/// <reference types="cypress" />
import { onLoginPage } from "../page-objects/loginPage";
import { onMFAPage } from "../page-objects/mfaPage";
import { credentials } from "../support/testData";

describe("Login Flow with MFA", () => {
  beforeEach(() => {
    cy.visit("/");
  });


  it("LOGIN-001-should navigate to MFA page on valid login", () => {
    onLoginPage.executeLogin(
      credentials.valid.username,
      credentials.valid.password
    );
    cy.url().should("include", "/mfa");
    cy.contains("MFA Verification").should("be.visible");
  });

  it("LOGIN-002-should display error on invalid username and password", () => {
    onLoginPage.executeLogin(
      credentials.invalid.username,
      credentials.invalid.password
    );
    cy.contains("Invalid Credentials. Please try again.").should("be.visible");
  });

  it("LOGIN-003-should display error on valid username and invalid password", () => {
    onLoginPage.executeLogin(
      credentials.valid.username,
      credentials.invalid.password
    );
    cy.contains("Invalid Credentials. Please try again.").should("be.visible");
  });

  it("LOGIN-004-should display error on invalid username and valid password", () => {
    onLoginPage.executeLogin(
      credentials.invalid.username,
      credentials.valid.password
    );
    cy.contains("Invalid Credentials. Please try again.").should("be.visible");
  });

  it("LOGIN-005-should require password when only username is typed", () => {
    cy.url().then((currentUrl) => {
      onLoginPage.executeLogin(credentials.valid.username)
      cy.url().should("eq", currentUrl);
    });

    cy.get("input#password").shouldRequireField();
  });

  it("LOGIN-006-should require username when only password is typed", () => {
    cy.url().then((currentUrl) => {
      onLoginPage.executeLogin(undefined, credentials.valid.password)
      cy.url().should("eq", currentUrl);
    });

    cy.get("input#username").shouldRequireField();
  });

  it("LOGIN-007-should require both username and password when form is empty", () => {
    cy.url().then((currentUrl) => {
      onLoginPage.executeLogin(undefined,undefined)
      cy.url().should("eq", currentUrl);
    });

    cy.get("input#username").shouldRequireField();
    cy.get("input#password").shouldRequireField();
  });


  it("MFA-001-should login successfully with valid MFA code", () => {
    onLoginPage.executeLogin(
      credentials.valid.username,
      credentials.valid.password
    );
    onMFAPage.submitMFACode(credentials.valid.mfaCode);
    cy.url().should("include", "/dashboard");
    cy.contains("Welcome to your dashboard").should("be.visible");
  });


  it("MFA-002-should display error on invalid MFA code", () => {
    onLoginPage.executeLogin(
      credentials.valid.username,
      credentials.valid.password
    );
    onMFAPage.submitMFACode(credentials.invalid.mfaCode);
    cy.contains("Invalid MFA Code. Please try again.").should("be.visible");
  });

  it("MFA-003-should require MFA code", () => {
    onLoginPage.executeLogin(
      credentials.valid.username,
      credentials.valid.password
    );
    onMFAPage.submitMFACode(undefined);
    cy.url().should("include", "/mfa");
    cy.get("input#mfaCode").shouldRequireField();
  });

});