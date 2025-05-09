import pharmacy from "../../e2e/Data/pharmacy.json";

export default class PharmacyPage {
  constructor() {
    this.pharmacy = {
      pharmacyModule: 'a[href="#/Pharmacy"]',
      orderLink: '//a[contains(text(),"Order")]',
      addNewGoodReceiptButton:
        "//button[contains(text(),'Add New Good Receipt')]",
      goodReceiptModalTitle: `//span[contains(text(),"Add Good Receipt")]`,
      printReceiptButton: `//button[@id="saveGr"]`,
      addNewItemButton: `//button[@id="btn_AddNew"]`,
      itemNameField: `//input[@placeholder="Select an Item"]`,
      batchNoField: '//input[@id="txt_BatchNo"]',
      itemQtyField: '//input[@id="ItemQTy"]',
      rateField: '//input[@id="GRItemPrice"]',
      saveButton: '//button[@id="btn_Save"]',
      supplierNameField: '//input[@id="SupplierName"]',
      invoiceField: '//input[@id="InvoiceId"]',
      successMessage:
        '//p[contains(text(),"success")]/../p[text()="Goods Receipt is Generated and Saved."]',
      supplierName: '//input[@placeholder="select supplier"]',
      showDetails: '//button[text()=" Show Details "]',
      orderButton: '//a[normalize-space(text())="Order"]',
      exportButton: '//button[@title="Export To Excel"]',
    };
  }

  /**
   * Purpose:
   * @Test10.2 This method verifies the process of exporting data and downloading it in the pharmacy section.
   *
   * Steps:
   * 1. Click on the order button to navigate to the order section.
   * 2. Click on the export button to initiate the data export.
   * 3. Wait for 3 seconds to ensure the export process has completed.
   *
   * Preconditions:
   * - The order and export buttons should be visible and functional.
   *
   * Expected Result:
   * - The data should be successfully exported, and the download process should be triggered.
   *
   * Error Handling:
   * - The method assumes the buttons are accessible and clickable.
   */
  verifyExportAndDownload() {
    cy.visit('https://healthapp.yaksha.com/Home/Index#/Pharmacy/Order/GoodsReceiptList');
    cy.xpath(this.pharmacy.orderButton).click();
    cy.xpath(this.pharmacy.exportButton).click();
    cy.wait(3000);
    
  }
}
