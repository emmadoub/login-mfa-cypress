## Overview

This repository includes both manual testing documentation and Cypress automation tests for an application’s login and MFA flow.

## Project Structure

```
qa-engineer-assignment/
├── cypress/            *Cypress automation tests*
├── docs/               *Documentation & manual testing*
│   └── TestCases_BugReport.xlsx
├── README.md            *Notes*

```
## Running the Automation Tests

- ### Automation covers:

  - Login (valid and invalid)

  - MFA (valid/invalid codes)

  - Cookies (session handling, flags)

  - API access control


## Manual Testing

Manual testing is documented in the following file:

docs/QA_Assignment_TestCases_BugReport.xlsx

This Excel file includes:

- Test scenarios for both manual and automation tests (Login, MFA, Cookies, API)

- Results: Passed, Failed, Passed with Issues

- Identified bugs with severity, steps to reproduce, expected and actual results


## Bugs Identified


Key findings during testing (full details in Excel):

- **MFA page accessible without login (UI + API)**

- **Session cookie missing security flags (Secure, SameSite)**

- **Plain text error handling on login and MFA failures**

- **Username with leading/trailing spaces not handled**

- **MFA accepts non-numeric input**

