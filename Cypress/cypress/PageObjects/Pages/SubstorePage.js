import subStore from "../../e2e/Data/subStore.json";
const path = require("path");
export default class SubstorePage {
  constructor() {
    this.substore = {
      accounts: '//i[text()="Accounts"]',
      inventry: '//a[text()=" Inventory "]',
      subStoreLink: 'a[href="#/WardSupply"]',
      wardSupply: 'a[href="#/WardSupply"]',
      pharmacy: '//a[contains(text(), " Pharmacy ")]',
      inventory: '//a[contains(text(), " Inventory ")]',
      inventoryRequisition: '//a[contains(text(),"Inventory Requisition")]',
      consumption: 'a[href="#/WardSupply/Inventory/Consumption"]',
      reports: 'a[href="#/WardSupply/Inventory/Reports"]',
      patientConsumption: 'a[href="#/WardSupply/Inventory/PatientConsumption"]',
      return: 'a[href="#/WardSupply/Inventory/Return"]',
      stock: 'a[href="#/WardSupply/Inventory/Stock"]',
    };
  }

  /**
   * Purpose:
   * @Test6.2 Verifies that the submodules (accounts, inventory, and pharmacy) are visible by clicking on each and waiting for them to load.
   *
   * Steps:
   * 1. Wait for 2 seconds to ensure the page is ready for interaction.
   * 2. Click on the 'Accounts' submodule and wait for the page to load.
   * 3. Click on the 'Inventory' submodule and wait for the page to load.
   * 4. Click on the 'Pharmacy' submodule and wait for the page to load.
   *
   * Preconditions:
   * - The submodules (Accounts, Inventory, and Pharmacy) must be visible and clickable on the page.
   *
   * Expected Result:
   * - Each submodule (Accounts, Inventory, and Pharmacy) should be navigated to successfully.
   * - The waiting periods ensure that each submodule is fully loaded before interacting with the next.
   */
  verifySubModulesVisible() {
    
    cy.wait(2000);
    cy.xpath(this.substore.accounts).click();
    cy.wait(2000);
    cy.xpath(this.substore.inventry).click();
    cy.wait(2000);
    cy.xpath(this.substore.pharmacy).click();
    
  }

  /**
   * Purpose:
   * @Test13 This method verifies the navigation functionality through various sections of the application.
   * It ensures that clicking on different menu items scrolls into view and correctly navigates
   * the user to the respective sections within the substore.
   *
   * Steps:
   * 1. Scroll into view and click on the "SubStore" link.
   * 2. Wait for 1 second for the page to load or settle.
   * 3. Click on the "Accounts" report.
   * 4. Scroll into view and click on the "Stock" section.
   * 5. Wait for 1 second before the next action.
   * 6. Scroll into view and click on the "Inventory Requisition" section.
   * 7. Wait for 1 second before the next action.
   * 8. Scroll into view and click on the "Consumption" section.
   * 9. Wait for 1 second before the next action.
   * 10. Scroll into view and click on the "Reports" section.
   * 11. Wait for 1 second before the next action.
   * 12. Scroll into view and click on the "Patient Consumption" section.
   * 13. Wait for 1 second before the next action.
   * 14. Scroll into view and click on the "Return" section.
   *
   * Preconditions:
   * - The menu items and sections should be visible and clickable.
   *
   * Expected Result:
   * - The user should be able to click through each section and navigate to the respective pages.
   * - There should be a brief wait between clicks to allow content to load or settle.
   *
   * Error Handling:
   * - Assumes that the elements and XPath values provided are correctly mapped and accessible.
   */
  verifyNavigation() {
    
    cy.get(this.substore.subStoreLink).scrollIntoView().click();
    cy.wait(1000); // Wait for 1 second

    cy.xpath('//span[@class="report-name"]/i[text()="Accounts"]').click();

    cy.get(this.substore.stock).scrollIntoView().click();
    cy.wait(1000); // Wait for 1 second

    // cy.get(this.substore.accounts).scrollIntoView().click();
    cy.wait(1000); // Wait for 1 second

    cy.xpath(this.substore.inventoryRequisition).scrollIntoView().click();
    cy.wait(1000); // Wait for 1 second

    cy.get(this.substore.consumption).scrollIntoView().click();
    cy.wait(1000); // Wait for 1 second

    cy.get(this.substore.reports).scrollIntoView().click();
    cy.wait(1000); // Wait for 1 second

    cy.get(this.substore.patientConsumption).scrollIntoView().click();
    cy.wait(1000); // Wait for 1 second

    cy.get(this.substore.return).scrollIntoView().click();
    cy.wait(1000); // Wait for 1 second
    
  }

  /**
   * Purpose:
   * @Test14 This method navigates through the substore menu and captures a screenshot of the Inventory Requisition section.
   * The screenshot will be taken for the entire page, ensuring that all visible elements are included.
   *
   * Steps:
   * 1. Click on the "SubStore" link to begin navigation.
   * 2. Click on the "Accounts" section.
   * 3. Click on the "Inventory" section.
   * 4. Click on the "Inventory Requisition" section to open it.
   * 5. Capture a screenshot of the Inventory Requisition section, including the full page.
   *
   * Preconditions:
   * - The menu items and sections should be visible and accessible.
   *
   * Expected Result:
   * - A screenshot of the "Inventory Requisition" section will be captured and saved with the specified path.
   *
   * Error Handling:
   * - Assumes that all elements and paths are correctly mapped and accessible.
   */
  captureScreenshotOfInventoryRequisitionSection() {
    
    cy.get(this.substore.subStoreLink).click();
    cy.xpath(this.substore.accounts).click();
    cy.xpath(this.substore.inventory).click();
    cy.xpath(this.substore.inventoryRequisition).click();

    // Capture the screenshot of the inventory requisition section
    const screenshotPath = "inventory_requisition_section";

    cy.screenshot(screenshotPath, {
      capture: "fullPage",
    });
    
  }
}
