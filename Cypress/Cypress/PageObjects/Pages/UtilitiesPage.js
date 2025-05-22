export default class UtilitiesPage {
  constructor() {
    this.utilities = {
      schmeRefundButton: '(//a[@href="#/Utilities/SchemeRefund"])[2]',
      newSchemeRefundEntryButton: '//a[@class="btn green btn-success"]',
      saveButton: '//button[@id="savebutton"]',
      warningMessage: "//p[text()='Please fill all the mandatory fields.']",
    };
  }

  /**
   * Purpose:
   * @Test11.2 This method verifies the behavior of the application when mandatory fields are not filled
   * while creating a new scheme refund, ensuring that a warning message is displayed.
   *
   * Steps:
   * 1. Click the "Scheme Refund" button to navigate to the scheme refund section.
   * 2. Click on a specific scheme (e.g., "New-1").
   * 3. Click the "New Scheme Refund Entry" button to start a new entry.
   * 4. Click the "Save" button to attempt saving without filling mandatory fields.
   * 5. Verify that a warning message is displayed, indicating the missing mandatory fields.
   *
   * Preconditions:
   * - The "Scheme Refund" button, specific scheme, "New Scheme Refund Entry" button,
   *   and "Save" button should be visible and functional.
   * - Mandatory fields should not be filled before attempting to save.
   *
   * Expected Result:
   * - A warning message should appear, notifying the user of mandatory fields that need to be filled.
   *
   * Error Handling:
   * - The method assumes that the relevant buttons and messages are accessible and correctly mapped.
   */
  verifyWarningPopupForMandatoryFieldsInSchemeRefund() {
    
    cy.xpath(this.utilities.schmeRefundButton).click();
    cy.xpath("//h5[text()='New-1 ']").click();
    cy.xpath(this.utilities.newSchemeRefundEntryButton).click();
    cy.xpath(this.utilities.saveButton).click();
    
  }
}
