class MFAPage {
  submitMFACode(mfaCode: string) {
    cy.get("input#mfaCode").type(mfaCode);
    cy.get('button[type="submit"]').click();
  }
}

export const onMFAPage = new MFAPage();
