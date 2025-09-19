export {}; // <- makes this file an external module

// Extend Cypress Chainable interface for TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      shouldRequireField(): Chainable<void>;
    }
  }
}

Cypress.Commands.add(
  "shouldRequireField",
  { prevSubject: "element" },
  (subject) => {
    const input = subject[0] as HTMLInputElement;

    expect(input.checkValidity()).to.be.false;
    expect(input.validationMessage).to.not.be.empty;
  }
);
