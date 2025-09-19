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
    cy.url().should("include", "/login");
    cy.contains("Invalid Credentials").should("be.visible");
  });

  it("LOGIN-003-should display error on valid username and invalid password", () => {
    onLoginPage.executeLogin(
      credentials.valid.username,
      credentials.invalid.password
    );
    cy.url().should("include", "/login");
    cy.contains("Invalid Credentials").should("be.visible");
  });

  it("LOGIN-004-should display error on invalid username and valid password", () => {
    onLoginPage.executeLogin(
      credentials.invalid.username,
      credentials.valid.password
    );
    cy.url().should("include", "/login");
    cy.contains("Invalid Credentials").should("be.visible");
  });

  it("LOGIN-005-should require password when only username is typed", () => {
    cy.url().then((currentUrl) => {
      cy.get("input#username").type(credentials.valid.username);
      cy.get('button[type="submit"]').click();
      cy.url().should("eq", currentUrl);
    });

    cy.get("input#password").shouldRequireField();
  });

  it("LOGIN-006-should require username when only password is typed", () => {
    cy.url().then((currentUrl) => {
      cy.get("input#password").type(credentials.valid.password);
      cy.get('button[type="submit"]').click();
      cy.url().should("eq", currentUrl);
    });

    cy.get("input#username").shouldRequireField();
  });

  it("LOGIN-007-should require both username and password when form is empty", () => {
    cy.url().then((currentUrl) => {
      cy.get('button[type="submit"]').click();
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
    cy.contains("Invalid MFA Code").should("be.visible");
  });

  it("MFA-003-should require MFA code", () => {
    onLoginPage.executeLogin(
      credentials.valid.username,
      credentials.valid.password
    );
    cy.url().should("include", "/mfa");
    cy.get("input#mfaCode").shouldRequireField();
  });

});