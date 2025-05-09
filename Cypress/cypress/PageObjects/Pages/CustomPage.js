export default class CustomPage {
  /**
   * Purpose:
   * @Test2.1 @Test6.1 @Test7.1 @Test8.1 @Test9.1 @Test10.1 @Test11.1 @Test12.1 Navigates the browser to a full URL constructed by combining a base URL and a relative path.
   *
   * Parameters:
   * @param {string} relativePath - The path to be appended to the base URL (e.g., "/appointments", "/login").
   *
   * Steps:
   * 1. Define the base URL of the application.
   * 2. Concatenate the base URL and the relative path to form the full URL.
   * 3. Visit the full URL using Cypress's `cy.visit()`.
   * 4. Wait for 2 seconds to allow the page to load properly.
   * 5. Log the full URL to the browser console for debugging purposes.
   *
   * Preconditions:
   * - The relative path must start with a '/' or be a valid URL segment.
   * - The base URL must be correct and accessible.
   */
  navigateToCustomUrl(relativePath) {
    const baseUrl = "https://healthapp.yaksha.com";
    const fullUrl = `${baseUrl}${relativePath}`;
    cy.visit(fullUrl);
    cy.wait(2000);
    console.log(`Navigated to: ${fullUrl}`);
  }
}
