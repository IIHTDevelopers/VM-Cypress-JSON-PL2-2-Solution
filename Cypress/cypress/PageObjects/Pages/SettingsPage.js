import settings from "../../e2e/Data/settings.json";
export default class SettingsPage {
  constructor() {
    this.settings = {
      settingsLink: 'a[href="#/Settings"]',
      addButton: '//input[@id="Add"]',
      dynamicTemplates: '(//a[@href="#/Settings/DynamicTemplates"])[2]',
      addTemplateButton: '//a[@id="id_btn_template_newTemplate"]',
      templateName: '//input[@placeholder="template name"]',
      templateType: "//select[@id='TemplateTypeId']",
      templateCode: '//input[@placeholder="enter template code"]',
      textField: '//div[@id="cke_1_contents"]',
      moreButton: '(//a[@data-toggle="dropdown"])[5]',
      priceCategory: '(//a[@href="#/Settings/PriceCategory"])[2]',
      disableButton:
        '//a[@danphe-grid-action="deactivatePriceCategorySetting"]',
      deactivateMessage: "//p[text()='Deactivated.']",
      activateButton: '//a[@danphe-grid-action="activatePriceCategorySetting"]',
      activateMessage: "//p[text()='Activated.']",
    };
  }

  /**
   * @Test6
   * @description This method verifies the creation of dynamic templates in the Settings module.
   * It navigates to the Dynamic Templates submodule, fills out the template details including
   * template type, name, code, and text field, and ensures the template is added successfully.
   */

  verifyDynamicTemplates() {
    const textField = settings.Templates[0].TextField || "";
    const templateName = settings.Templates[1].TemplateName || "";
    const templateCode = settings.Templates[2].TemplateCode || "";
    const templateType = settings.Templates[3].TemplateType || "";
    cy.wait(2000);
    cy.get(this.settings.settingsLink).click();
    cy.wait(2000);
    cy.xpath(this.settings.dynamicTemplates).click();
    cy.wait(2000);
    cy.xpath(this.settings.addTemplateButton).click();
    cy.wait(2000);
    cy.xpath(this.settings.templateType).select(templateType);
    cy.wait(2000);
    cy.xpath(this.settings.templateName).type(templateName);
    cy.wait(2000);
    cy.xpath(this.settings.templateCode).type(templateCode);
    cy.wait(2000);
    cy.xpath(this.settings.textField).click().type(textField);
    cy.wait(2000);
    cy.xpath(this.settings.addButton).click();
  }

  /**
   * Purpose:
   * @Test12.2 This method verifies the functionality of enabling and disabling the price category
   * within the application settings, ensuring that the appropriate messages are shown
   * upon activation and deactivation.
   *
   * Steps:
   * 1. Click the "More" button to navigate to additional settings options.
   * 2. Click the "Price Category" option to open the price category settings.
   * 3. Click the "Disable" button to deactivate the price category.
   * 4. Verify that the deactivation message is displayed.
   * 5. Click the "Activate" button to re-enable the price category.
   * 6. Verify that the activation message is displayed.
   *
   * Preconditions:
   * - The "More" button, "Price Category" option, "Disable" and "Activate" buttons,
   *   and relevant messages should be visible and accessible.
   *
   * Expected Result:
   * - The appropriate deactivation and activation messages should be displayed when
   *   the price category is disabled and then enabled again.
   *
   * Error Handling:
   * - The method assumes the "More" button and settings options are correctly mapped and accessible.
   */
  verifyPriceCategoryEnableDisable() {
    
    cy.wait(2000);
    cy.xpath(this.settings.moreButton).click();
    cy.wait(2000);
    cy.xpath(this.settings.priceCategory).click();
    cy.wait(2000);
    cy.xpath(this.settings.disableButton).first().click();
    cy.wait(2000);
    cy.xpath(this.settings.deactivateMessage).should("be.visible");
    cy.wait(2000);
    cy.xpath(this.settings.activateButton).first().click();
    cy.wait(2000);
    cy.xpath(this.settings.activateMessage).should("be.visible");
    
  }
}
