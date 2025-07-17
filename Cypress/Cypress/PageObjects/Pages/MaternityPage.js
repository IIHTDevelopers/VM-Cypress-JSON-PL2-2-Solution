import "cypress-real-events/support";

export default class MaternityPage {
  constructor() {
    this.maternity = {
      staricon: 'i[title="Remember this Date"]',
    };
  }

  /**
   * Purpose:
   * @Test7.2 Verifies that the tooltip text becomes visible when hovering over the star icon.
   *
   * Steps:
   * 1. Get the star icon element and ensure it exists on the page.
   * 2. Wait for 2.5 seconds to ensure any tooltip loading behavior completes.
   * 3. Use the realHover() function to simulate a hover action over the star icon.
   * 4. Extract the "title" attribute (the tooltip text) using invoke().
   * 5. Return the tooltip text for further validation or usage.
   *
   * Preconditions:
   * - The star icon element must exist and be visible on the page.
   *
   * Expected Result:
   * - The tooltip text is extracted successfully when the star icon is hovered over.
   */
  verifyTooltipTextIsVisible() {
    
    return cy.get(this.maternity.staricon)
      .should("exist")
      .wait(2500)
      .realHover()
      .invoke("attr", "title");
      
  }
  
}
