class MFAPage {
  typeCode(mfaCode?: string) {
    if(mfaCode){
    cy.get("input#mfaCode").type(mfaCode);
    }
  }
  submit() {
    cy.get('button[type="submit"]').click();
  }
  submitMFACode(mfaCode?: string) {
    this.typeCode(mfaCode);
    this.submit();
  }
}

export const onMFAPage = new MFAPage();
