export interface UserCredentials {
  username: string;
  password: string;
  mfaCode: string;
}

type CredentialType = "valid" | "invalid";

export const credentials: Record<CredentialType, UserCredentials> = {
  valid: { username: "QA_Engineer", password: "FooBar42", mfaCode: "1337" },
  invalid: { username: "wrongUser", password: "wrongPass", mfaCode: "0000" }
};
