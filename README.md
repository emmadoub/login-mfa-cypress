# VODA.ai -- QA Engineer assignment solution

## Overview

This repository contains my solution for the VODA.ai QA Engineer Assignment.
It includes both manual testing documentation and Cypress automation tests for the application’s login and MFA flow.

## Project Structure

qa-engineer-assignment/
├── cypress/            *Cypress automation tests*
├── src/                *Application under test*
├── docs/               *Documentation & manual testing*
│   └── QA_Assignment_TestCases_BugReport.xlsx
├── README.md            *Assignment description (provided)*
└── README_SOLUTION.md   *This file – my solution notes*

## Running the Application

1. **Clone the Repository:**
   ```bash
   git clone [repository_url]
   ```
2. **Install the dependencies**
   ```bash
   npm install
   ```
3. **Run the application**
   ```bash
   npx tsc
   npm start
   ```
The application will run on http://localhost:3000.

## Running the Automation Tests

- ### To run Cypress tests:

    - **Open Cypress Test Runner:**
   ```bash
   npx cypress open
   ```

    - **Run headless tests**
   ```bash
   npx cypress run
   ```

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


# VODA.ai -- QA Engineer assignment


## Introduction

Welcome to the VODA.ai testing assignment. This task is designed to evaluate your skills in both manual and automated testing, as well as your ability to write tests in JavaScript/TypeScript and collaborate using Git.

## Task Overview

You will be working with a simple Node.js application that includes a login flow and a basic Multi-Factor Authentication (MFA) step. The task is divided into two main parts: manual testing and automation testing.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone [repository_url]
   cd qa-assignment
   ```
2. **Install the dependencies**
   ```bash
   npm install
   ```
3. **Run the application**
   ```bash
   npx tsc
   npm start
   ```
The application will run on http://localhost:3000.

## Assignment Tasks

### 1. Manual Testing

- **Test Scenarios:**
  - Test the login page with various input combinations (valid and invalid credentials).
  - Test the MFA step with correct and incorrect MFA codes.
  - Test the navigation to an authenticated page that requires a valid session cookie.
  - Identify any edge cases and document them.

- **Deliverables:**
  - Create a detailed test plan that includes as many as possible test cases covering different scenarios (valid/invalid inputs, edge cases, and cookie-based authentication).
  - Report any bugs you identify, including steps to reproduce, expected results, and actual results.

### 2. Automation Testing

- **Task:**
  - Automate the login, MFA, and authenticated page access scenarios using a testing framework of your choice (e.g., Cypress, Selenium, Playwright).
  - Ensure that your automation script covers both positive and negative test cases.

- **Deliverables:**
  - Provide the code of automation tests and instructions on how to run them.
  - Ensure your code is well-commented and follows best practices.

## Evaluation Criteria

- **Completeness:** Did you cover all required scenarios in both manual and automated testing?
- **Technical Skill:** Is the automation code well-structured, efficient, and maintainable?
- **Attention to Detail:** Are the test cases comprehensive and well-documented?
- **Communication:** Are the reports and documentation clear and thorough?

## Submission

- Once you’ve completed the assignment, you can send your solution to thanos@voda.ai & nik@voda.ai or create a git repository and share it with same emails.
- Please ensure all your deliverables are included in your solution, along with any additional documentation if needed.

## Additional Information

If you have any questions or need further clarification, feel free to reach out.

Good luck, and we look forward to reviewing your work!
