# Cypress Automation Framework

## Introduction
Cypress is a modern, fast, and reliable end-to-end testing framework for web applications. This README file provides detailed guidance on setting up and using the Cypress automation framework for your project.

---

## Prerequisites

Ensure you have the following installed:

1. **Node.js** (LTS version recommended)
2. **npm** (bundled with Node.js)
3. A compatible browser (e.g., Chrome, Firefox)

To verify installations, run:

```bash
node -v
npm -v
```

---

## Installation
Install all required npm packages for Playwright and other dependencies.
    ```npm install```
---

## Running Tests

### Open Cypress Test Runner

Run the following command to open the interactive Cypress Test Runner:

```bash
npx cypress open
```

### Run Tests in Headless Mode

Execute tests in headless mode:

```bash
npx cypress run
```