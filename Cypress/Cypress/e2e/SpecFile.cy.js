// Import the page object for interacting with elements
import LoginPage from "../PageObjects/Pages/LoginPage";
import LabPage from "../PageObjects/Pages/LabPage";
import CustomPage from "../PageObjects/Pages/CustomPage";
import SettingsPage from "../PageObjects/Pages/SettingsPage";
import SubstorePage from "../PageObjects/Pages/SubstorePage";
import PharmacyPage from "../PageObjects/Pages/PharmacyPage";
import MaternityPage from "../PageObjects/Pages/MaternityPage";
import ProcurementPage from "../PageObjects/Pages/ProcurementPage";
import NursingPage from "../PageObjects/Pages/NursingPage";
import UtilitiesPage from "../PageObjects/Pages/UtilitiesPage";
import AdtPage from "../PageObjects/Pages/AdtPage";
import AccountingPage from "../PageObjects/Pages/AccountingPage";
import DispensaryPage from "../PageObjects/Pages/DispensaryPage";

describe("Automation Suite for Yaksha Application", () => {
  // Create instance of the classes
  const loginPage = new LoginPage();
  const labPage = new LabPage();
  const customPage = new CustomPage();
  const procurementPage = new ProcurementPage();
  const settingsPage = new SettingsPage();
  const substorePage = new SubstorePage();
  const pharmacyPage = new PharmacyPage();
  const maternityPage = new MaternityPage();
  const nursingPage = new NursingPage();
  const utilitiesPage = new UtilitiesPage();
  const adtPage = new AdtPage();
  const dispensaryPage = new DispensaryPage();
  const accountingPage = new AccountingPage();
  // Set an acceptable load time in milliseconds
  const acceptableLoadTime = 1000;

  // Run before each test
  beforeEach(() => {
    cy.launchBrowser(); // Launch the browser
    cy.navigatingToBaseURL(); // Hit base URL

    // Login before each test
    loginPage.performLogin();
    cy.wait(3000);

    // Verify login was successful
    verifyUserIsLoggedin();
  });

  it("TS-1 Verify the main dispensary tooltip text", () => {
    dispensaryPage.hoveroverMainDispensary();
    verifytooltiptext();
  });

  it("TS-2 Verify Navigationto Patient Overview from Past Days Records", () => {
    customPage.navigateToCustomUrl("/Home/Index#/Nursing/OutPatient");
    nursingPage.verifyPatientOverviewNavigationFromPastRecords();
    verifypatientoverview();
  });

  it("TS-3 Verify File Upload for a Past Patient Record", () => {
    nursingPage.verifyFileUpload();
    verifyFileUpload();
  });

  it("TS-4 Verify Activation of BANK A/C # Ledger", function () {
    accountingPage.verifyBankActivation();
    cy.xpath(
      "//p[normalize-space(text())='BANK A/C # is now activated.']"
    ).should("be.visible");
  });

  it("TS-5 Verify Deactivation of BANK A/C # Ledger", function () {
    accountingPage.verifyBankDeactivation();
    cy.xpath(
      "//p[normalize-space(text())='BANK A/C # is now Deactivated.']"
    ).should("be.visible");
  });

  it("TS-6 Verify all sub-modules are displayed correctly after Clicking on the 'SubStore ' Module. ", () => {
    customPage.navigateToCustomUrl("/Home/Index#/WardSupply");
    cy.wait(2000);
    substorePage.verifySubModulesVisible();
    cy.xpath('//a[text()=" Inventory "]').should("be.visible");
    cy.wait(2000);
    cy.xpath('//a[contains(text(), " Pharmacy ")]').should("be.visible");
  });

  it("TS-7 Verify the tooltip and its text present on hover the mouse on 'Star'", () => {
    customPage.navigateToCustomUrl("/Home/Index#/Maternity/PatientList");
    maternityPage.verifyTooltipTextIsVisible().then((tooltipText) => {
      expect(tooltipText).to.eq("Remember this Date");
    });
  });

  it("TS-8 Verify Request for Quotation Generation", () => {
    customPage.navigateToCustomUrl(
      "/Home/Index#/ProcurementMain/PurchaseRequest/PurchaseRequestList"
    );
    cy.wait(2000);
    procurementPage.verifyRequestForQuotationGeneration();
    verifyrequestquatationsuccessmessage();
  });

  it("TS-9 Verify table filtering for 'Male Ward'", () => {
    customPage.navigateToCustomUrl("/Home/Index#/Lab/LabTypeSelection");
    cy.wait(2000);
    labPage.verifyTableFilteringForMaleWard();
    verifycellhasmaleward();
  });

  it("TS-10 Verify to export the order section data", function () {
    customPage.navigateToCustomUrl("/Home/Index#/Pharmacy/Dashboard");
    pharmacyPage.verifyExportAndDownload();
    verifyexceldownloaded();
  });

  it("TS-11 Verify Warning Popup for Mandatory Fields in Scheme Refund ", () => {
    customPage.navigateToCustomUrl("/Home/Index#/Utilities");
    utilitiesPage.verifyWarningPopupForMandatoryFieldsInSchemeRefund();
    verifyWarningPopupForMandatorySchemeRefund();
  });

  it("TS-12 Verify Price CategoryEnable/Disable", () => {
    customPage.navigateToCustomUrl("/Home/Index#/Settings");
    settingsPage.verifyPriceCategoryEnableDisable();
    verifyactivatemessage();
  });

  it("TS-13 Verify Navigation Between Different Tabs", () => {
    substorePage.verifyNavigation();
    verifyVisibility();
  });

  it("TS-14 Capture screenshot of Inventory Requisition section", () => {
    substorePage.captureScreenshotOfInventoryRequisitionSection();
    verifyCaptureScreenshot();
  });

  Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("ResizeObserver loop")) {
      return false;
    }
  });

  it("TS-15 Verify to navigate to each section which are present in the 'Inventory' sub-module", () => {
    adtPage.verifyInventorySubModuleNavigation();
    cy.xpath("//span[text()='Select doctor from the list.']").should("exist");
  });

  /**
   * ------------------------------------------------------Helper Methods----------------------------------------------------
   */

  function verifypatientoverview() {
    cy.url().should("include", "PatientOverview");
  }
  function verifyWarningPopupForMandatorySchemeRefund() {
    cy.xpath("//p[text()='Please fill all the mandatory fields.']").should(
      "be.visible"
    );
  }

  function verifyactivatemessage() {
    cy.xpath("//p[text()='Activated.']").should("be.visible");
  }


  function verifyexceldownloaded() {
    const fileName = getISTFileName(); // Generate today's date-based file name
    const filePath = `cypress/downloads/${fileName}.xls`; // Full path

    cy.task("findExcelFile", filePath).then((fileExists) => {
      expect(fileExists, "Excel file found").to.be.true;

      // Delete the file after verifying
      cy.task("deleteFile", filePath);
    });
  }

  function getISTFileName() {
    const now = new Date();

    // Convert to IST by adding 5.5 hours (19800 seconds)
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(now.getTime() + istOffset);

    // Format YYYY-MM-DD
    const yyyy = istDate.getFullYear();
    const mm = String(istDate.getMonth() + 1).padStart(2, "0");
    const dd = String(istDate.getDate()).padStart(2, "0");

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    return `PharmacyGoodReceiptLists_${formattedDate}.xls`;
  }

  function verifycellhasmaleward() {
    cy.xpath(
      '//div[@role="gridcell" and @col-id="WardName" and text()="Male Ward "]'
    ).should("be.visible");
  }

  function verifyrequestquatationsuccessmessage() {
    cy.xpath(
      "//p[contains(text(),'Request For Quotation is Generated and Saved')]"
    ).should("be.visible");
  }

  function verifyUserIsLoggedin() {
    // Verify successful login by checking if 'admin' element is visible
    cy.xpath('//li[@class="dropdown dropdown-user"]', { timeout: 20000 })
      .should("be.visible")
      .then(() => {
        cy.log("User is successfully logged in.");
      });
  }

  function verifyReportGeneration() {
    cy.get('div[col-id="CounterName"]').should("have.length.greaterThan", 1);
  }

  function verifyFileUpload() {
    cy.get(".main-message").should("have.text", " File Uploded");
  }

  function verifytooltiptext() {
    cy.xpath("(//span/i)[2]").realHover();
    cy.xpath("//div/h6")
      .should("be.visible")
      .and(
        "have.text",
        "You are currently in Main Dispensary dispensary. To change, you can always click here."
      );
  }

  function verifyVisibility() {
    cy.get('a[href="#/WardSupply/Inventory/Stock"]').should("be.visible");
    cy.xpath('//a[contains(text(),"Inventory Requisition")]').should(
      "be.visible"
    );
    cy.get('a[href="#/WardSupply/Inventory/Consumption"]').should("be.visible");
    cy.get('a[href="#/WardSupply/Inventory/Reports"]').should("be.visible");
    cy.get('a[href="#/WardSupply/Inventory/PatientConsumption"]').should(
      "be.visible"
    );
    cy.get('a[href="#/WardSupply/Inventory/Return"]').should("be.visible");
  }


  function verifyCaptureScreenshot() {
    const path1 =
      "cypress/screenshots/SpecFile.cy.js/inventory_requisition_section.png";
    const path2 = "cypress/screenshots/inventory_requisition_section.png";

    cy.task("fileExists", path1).then((exists1) => {
      if (exists1) {
        cy.readFile(path1).should("exist");
        cy.wait(2000);
        cy.task("deleteFile", path1);
      } else {
        cy.task("fileExists", path2).then((exists2) => {
          expect(exists2, "File exists in at least one location").to.be.true;
          if (exists2) {
            cy.readFile(path2).should("exist");
            cy.wait(2000);
            cy.task("deleteFile", path2);
          }
        });
      }
    });
  }
});
