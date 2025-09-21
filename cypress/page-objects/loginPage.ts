class LoginPage {
  typeUsername(username?: string) {
    if (username) {
      cy.get("#username").type(username);
    }
  }

  typePassword(password?: string) {
    if (password) {
      cy.get("#password").type(password);
    }
  }

  submit() {
    cy.get('button[type="submit"]').click();
  }

  executeLogin(username?: string, password?: string) {
    this.typeUsername(username);
    this.typePassword(password);
    this.submit();
  }
}

export const onLoginPage = new LoginPage();
