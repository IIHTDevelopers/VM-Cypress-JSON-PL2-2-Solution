import procurement from "../../e2e/Data/procurement.json";

export default class ProcurementPage {
  constructor() {
    this.procurement = {
      procurementLink: 'a[href="#/ProcurementMain"]',
      quotation: '(//a[@href="#/ProcurementMain/Quotation"])[2]',
      requestForQuotation: `//input[@value=" Request For Quotation"]`,
      requestForQuotationHeader: `//span[text()="Request For Quotation"]`,
      subjectField: '//input[@id="Subject"]',
      descriptioField: '//textarea[@id="Description"]',
      selectVendorDropdown: '//div[@class="cuppa-dropdown"]',
      itemToSelect: '//li[@class="item" and text()="Soap"]',
      quantity: '//input[@name="quantity"]',
      requestButton: "//input[@id='RequestButton']",
      itemNameField: "[formcontrolname='ItemId']",
    };
  }

  /**
   * Purpose:
   * @Test8.2 This method verifies the process of generating a Request for Quotation (RFQ) in the procurement section.
   * It includes entering the subject, description, selecting a vendor, entering item details, and submitting the request.
   *
   * Steps:
   * 1. Retrieve subject, description, item name, and quantity from procurement fields.
   * 2. Navigate to the quotation section.
   * 3. Fill in the necessary fields (subject, description, vendor selection, item name, quantity).
   * 4. Click the request button to submit the RFQ.
   *
   * Preconditions:
   * - The procurement fields and elements should be visible and accessible.
   *
   * Expected Result:
   * - The RFQ should be successfully generated with all the fields filled correctly.
   *
   * Error Handling:
   * - The method assumes the required fields are filled correctly and no error is expected.
   */
  verifyRequestForQuotationGeneration() {
    
    const subject = procurement.Fields[0].Subject || "";
    const description = procurement.Fields[1].Description || "";
    const itemName = procurement.Fields[2].ItemName || "";
    const quantity = procurement.Fields[3].Quantity || "";

    cy.wait(3000);
    cy.xpath(this.procurement.quotation).click();
    cy.xpath(this.procurement.requestForQuotation).click();
    cy.wait(3000);
    cy.xpath(this.procurement.subjectField).click().type(subject);
    cy.xpath(this.procurement.descriptioField).click().type(description);
    cy.wait(2000);
    cy.xpath(this.procurement.selectVendorDropdown).click();
    cy.xpath('//label[text()="Some Vendor"]').click();
    cy.get(this.procurement.itemNameField)
      .click()
      .type(itemName)
      .type("{enter}");
    cy.wait(2000);
    cy.xpath(this.procurement.quantity).clear().type(quantity);
    cy.xpath(this.procurement.requestButton).click();
    
  }
}
