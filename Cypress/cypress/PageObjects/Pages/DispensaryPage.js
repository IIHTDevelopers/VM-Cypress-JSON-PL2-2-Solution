import testData from "../../e2e/Data/PatientName.json";

export default class DispensaryPage {
  constructor() {
    this.dispensaryPage = {
      dispensarylink: '[href="#/Dispensary"]',
      signout: "(//span/i)[2]",
    };
  }

  /**
   * Purpose:
   * @Test11 This method verifies tooltip message is displayed on dispensary signout button.
   *
   * Steps:
   * 1. Navigate to the Dispensary link in the application.
   * 2. Hover over the SignOut button
   * 3. Verify the presence of a tooltip text when hovering over the SignOut button.
   *
   * Preconditions:
   * - The Dispensary tab elements must be visible and interactable.
   *
   * Expected Result:
   * - The method verifies that an tooltip occures over the signout button.
   */
  hoveroverMainDispensary() {
    cy.wait(5000);
    cy.get(this.dispensaryPage.dispensarylink).click();
    cy.wait(10000);
    cy.xpath(this.dispensaryPage.signout).trigger('mouseover');
  }
}
