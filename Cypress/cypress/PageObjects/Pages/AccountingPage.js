export default class AccountingPage {
  constructor() {
    this.buttons = {
      reportsButton: "//a[normalize-space(text())='Reports']",
      dailyTransactionBtn: "//i[normalize-space(text())='Daily Transaction']",
      loadBtn: "//button[normalize-space(text())='Load']",
      voucherLabel: "//span[normalize-space(text())='Voucher No']",
      settingsBtn: "//a[text()=' Settings ']",
      searchBar: "//input[@placeholder='search']",
      activateBtn: "//a[normalize-space(text())='Activate']",
      deactivateBtn: "//a[normalize-space(text())='Deactivate']",
      ledgerLocation: "//div[normalize-space(text())='BANK A/C #']",
      successMessage:
        "//p[normalize-space(text())='BANK A/C # is now activated.']",
      successMessage2:
        "//p[normalize-space(text())='BANK A/C # is now Deactivated.']",
    };
  }

  /**
   * Purpose:
   * @Test7.2 This function verifies the daily transaction report by navigating through the necessary UI elements,
   * selecting the correct year, loading the report, and validating the voucher label visibility.
   *
   * Steps:
   * 1. Click the "Reports" button to navigate to the reports section.
   * 2. Click the "Daily Transaction" button to view the daily transaction report.
   * 3. Select the year "2023" from the year dropdown to filter the report.
   * 4. Click the "Load" button to load the daily transaction report.
   * 5. Validate that the voucher label is visible after the report is loaded.
   *
   * Additional Info:
   * - This function ensures that the daily transaction report is loaded correctly and the voucher label is displayed.
   */
  verifyDailyTransaction() {
    cy.xpath(this.buttons.reportsButton).click();
    cy.xpath(this.buttons.dailyTransactionBtn).click();
    cy.get("select").select("2023");
    cy.xpath(this.buttons.loadBtn).click();
    cy.xpath(this.buttons.voucherLabel).should("be.visible");
  }

  /**
   * Purpose:
   * @Test4.2 Verifies the bank account activation process by navigating to the settings page,
   * searching for a bank account, and clicking the 'Activate' button to activate the bank account.
   *
   * Steps:
   * 1. Click on the 'Settings' button to navigate to the settings page.
   * 2. Wait for and interact with the search bar to search for the bank account.
   * 3. Ensure that the search bar is visible and clear any existing text.
   * 4. Type "BANK A/C #" into the search bar to find the relevant bank account.
   * 5. Verify that the ledger location for the bank account is visible.
   * 6. Verify that the 'Activate' button is visible and then click it to activate the bank account.
   * 7. Verify that the success message is displayed after the bank account is activated.
   *
   * Preconditions:
   * - The 'Settings' button must be available in the UI.
   * - The search bar, ledger location, 'Activate' button, and success message must be available and visible on the page.
   * - The bank account "BANK A/C #" must exist and be accessible through the search functionality.
   *
   * Expected Result:
   * - The bank account should be successfully activated, and a success message should be displayed.
   */
  verifyBankActivation() {
    cy.get('[href="#/Accounting"]').click();
    cy.wait(5000);
    cy.xpath(this.buttons.settingsBtn).click({ force: true });
    cy.wait(5000);
    cy.xpath(this.buttons.settingsBtn).click({ force: true });
    cy.xpath(this.buttons.searchBar).click().clear().type("BANK A/C #");
    cy.xpath(this.buttons.ledgerLocation).should("be.visible");

    cy.get("body").then(($body) => {
      if (
        $body.find('a[danphe-grid-action="activateDeactivateBasedOnStatus"]')
          .length > 0
      ) {
        cy.get('a[danphe-grid-action="activateDeactivateBasedOnStatus"]')
          .first()
          .click();
      }
    });

    cy.xpath(this.buttons.activateBtn).should("be.visible").click();
    cy.xpath(this.buttons.successMessage).should("be.visible");
  }

  /**
   * Purpose:
   * @Test5.2 Verifies the bank account deactivation process by navigating to the settings page,
   * searching for a bank account, and clicking the 'Deactivate' button to deactivate the bank account.
   *
   * Steps:
   * 1. Click on the 'Settings' button to navigate to the settings page.
   * 2. Wait for and interact with the search bar to search for the bank account.
   * 3. Ensure that the search bar is visible and clear any existing text.
   * 4. Type "BANK A/C #" into the search bar to find the relevant bank account.
   * 5. Verify that the ledger location for the bank account is visible.
   * 6. Verify that the 'Deactivate' button is visible and then click it to deactivate the bank account.
   * 7. Verify that the success message is displayed after the bank account is deactivated.
   *
   * Preconditions:
   * - The 'Settings' button must be available in the UI.
   * - The search bar, ledger location, 'Deactivate' button, and success message must be available and visible on the page.
   * - The bank account "BANK A/C #" must exist and be accessible through the search functionality.
   *
   * Expected Result:
   * - The bank account should be successfully deactivated, and a success message should be displayed.
   */
  verifyBankDeactivation() {
    cy.get('[href="#/Accounting"]').click();
    cy.wait(5000);
    cy.xpath(this.buttons.settingsBtn).click({ force: true });
    cy.wait(5000);
    cy.xpath(this.buttons.settingsBtn).click({ force: true });
    cy.xpath(this.buttons.searchBar).click().clear().type("BANK A/C #");
    cy.xpath(this.buttons.ledgerLocation).should("be.visible");

    cy.get("body").then(($body) => {
      if (
        $body.find('a[danphe-grid-action="activateDeactivateBasedOnStatus"]')
          .length > 0
      ) {
        cy.get('a[danphe-grid-action="activateDeactivateBasedOnStatus"]')
          .first()
          .click();
      }
    });

    cy.xpath(this.buttons.deactivateBtn).should("be.visible").click();
    cy.xpath(this.buttons.successMessage2).should("be.visible");
  }
}
