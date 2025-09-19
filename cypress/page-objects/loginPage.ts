class LoginPage {
  executeLogin(username: string, password: string) {
    cy.get("input#username").type(username);
    cy.get("input#password").type(password);
    cy.get('button[type="submit"]').click();
  }
}

export const onLoginPage = new LoginPage();
