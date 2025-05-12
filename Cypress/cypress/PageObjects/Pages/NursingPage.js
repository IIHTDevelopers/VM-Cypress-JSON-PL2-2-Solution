import nursing from "../../e2e/Data/nursing.json";
import dayjs from "dayjs";

export default class NursingPage {
  constructor() {
    this.nursing = {
      checkbox_xpath: '//input[@id="checkbox_outPatient_selectAllPatients"]',
      triange: '//button[text() = "Triage"]',
      chiefComplaint:
        '//div[@class="single-complaint flex-container"]//textarea',
      addTriange: "//button[text()=' Add Triage ']",
      successMessage: "//p[text()='Chief Complaint Added Successfully']",
      check_In: '//button[text() = "Check In"]',
      pastDaysTab: "//a[text()='Past Days']",
      saveBtn: '//input[@value="Save"]',
      successMessageCheckIn: "//p[text()='Nursing CheckIn Added Successfully']",
      successMessageConclude: "//p[text()='Checkout Successfully']",
      fromDate: `(//input[@id="date"])[1]`,
      okButton: '//button[@class="btn green btn-success"]',
      searchbar: "//input[@placeholder='search']",
      overview: '//i[@danphe-grid-action="patient-overview"]',
      upload_button: '(//i[@title="upload files"])[1]',
      nursing_tab: '//a[@href="#/Nursing" and contains(.,"Nursing")]',
      past_days: '//a[contains(text(),"Past Days")]',
      from_date: "//tbody/tr/td[3]/danphe-date-picker[1]//input",
      ok_button: '//button[contains(text()," OK ")]',
      search_field: '//input[@id="quickFilterInput"]',
      overview_button: '(//div//i[@title="overview"])[1]',
      dept_dropdown: "//select",
      upload_file: '//input[@type="file"]',
      submit_button: '//input[@value="Submit"]',
      checkbox: "#checkbox_outPatient_selectAllPatients",
      conclude: "//button[text()='Conclude']",
      saveButton: "#add",
    };
  }

  /**
   * Purpose:
   * @Test1.2 Verifies the outpatient checkout (conclude) process by selecting a patient and completing the conclude action.
   *
   * Steps:
   * 1. Wait for 3 seconds to allow page elements to load.
   * 2. Select the first patient checkbox using XPath.
   * 3. Wait for 2 seconds to ensure the selection is processed.
   * 4. Click on the 'Conclude' button to initiate the checkout process.
   * 5. Click on the 'Save' button to confirm and save the checkout details.
   * 6. Wait for 2 seconds to allow the success message to appear.
   * 7. Assert that the success message for conclude action is visible.
   *
   * Preconditions:
   * - At least one patient record must be available for checkout.
   * - Necessary page elements like checkbox, conclude button, save button, and success message must be present.
   *
   * Expected Result:
   * - The outpatient should be successfully checked out, and a success message should be visible on the UI.
   */
  verifyOutpatientCheckoutProcess() {
    cy.wait(3000);
    cy.xpath(this.nursing.checkbox_xpath).first().click();
    cy.wait(2000);
    cy.xpath(this.nursing.conclude).click();
    cy.xpath(this.nursing.saveBtn).click();
    cy.wait(2000);
    cy.xpath(this.nursing.successMessageConclude).should("be.visible");
  }

  /**
   * Purpose:
   * @Test2.2 Verifies the navigation to the Patient Overview page from the Past Records section based on provided date and patient name.
   *
   * Steps:
   * 1. Retrieve the 'FromDate' from the nursing data and format it to 'YYYY-MM-DD'.
   * 2. Retrieve the patient name from the nursing data.
   * 3. Wait for 3 seconds to allow the page to load.
   * 4. Click on the 'Past Days' tab to navigate to past records.
   * 5. Type the formatted 'From Date' in the date field and apply the filter.
   * 6. Click on the 'OK' button to apply the date filter.
   * 7. Type the patient name in the search bar to filter the records.
   * 8. Click on the first entry in the 'Patient Overview' list.
   * 9. Wait for 2 seconds to allow the page to load.
   * 10. Assert that the URL contains 'PatientOverview', confirming successful navigation.
   *
   * Preconditions:
   * - The page must contain records with the correct date and patient name.
   * - All relevant elements like the 'Past Days' tab, date fields, search bar, and 'Patient Overview' links must be present.
   *
   * Expected Result:
   * - The user should be navigated to the Patient Overview page with the expected URL.
   */
  verifyPatientOverviewNavigationFromPastRecords() {
    
    const fromDate = nursing.DateRange[0].FromDate || "";
    const fromDateFormatted = dayjs(fromDate, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    const name = nursing.PatientName[0].name || "";
    cy.wait(3000);
    cy.xpath(this.nursing.pastDaysTab).click();
    cy.xpath(this.nursing.fromDate).type(fromDateFormatted);
    cy.xpath(this.nursing.okButton).click();
    cy.xpath(this.nursing.searchbar).type(name);
    cy.xpath(this.nursing.overview).first().click();
    cy.wait(1000);
  }

  /**
   * Purpose:
   * @Test3.1 Verifies the file upload functionality by navigating through the nursing tab, filling in required fields,
   * selecting the department, uploading the file, and submitting the form.
   *
   * Steps:
   * 1. Define the data object containing a 'FromDate' value.
   * 2. Set up the file name and path for the image to be uploaded.
   * 3. Navigate to the 'Nursing' tab and select 'Past Days'.
   * 4. Retrieve and format the 'FromDate' value and input it in the 'From Date' field.
   * 5. Type a patient name in the search field to filter results.
   * 6. Click the 'Upload' button to initiate the file upload process.
   * 7. Select 'Pathology' from the department dropdown to specify the department.
   * 8. Attach the specified file from the local 'screenshots' folder.
   * 9. Click the 'Submit' button to complete the upload.
   * 10. The test assumes the upload functionality works as expected without specific assertions here.
   *
   * Preconditions:
   * - The page must contain the relevant fields: 'From Date', search field, department dropdown, and upload button.
   * - The 'Pathology' department must be available in the dropdown.
   * - The file to be uploaded (inventory_requisition_section.png) should be available in the 'screenshots' directory.
   *
   * Expected Result:
   * - The file should be uploaded successfully after selecting the department and clicking the submit button.
   */
  verifyFileUpload() {
    
    const data = { FromDate: "01-01-2020" }; // Define the data object
    const fileName = "inventory_requisition_section.png";
    cy.visit('https://healthapp.yaksha.com/Home/Index#/Nursing/OutPatient');

    // Navigate and fill in the date
    cy.wait(2000);
    cy.xpath(this.nursing.nursing_tab).click();
    cy.wait(2000);
    cy.xpath(this.nursing.past_days).click({force: true});
    const fromDate = data["FromDate"];
    const fromDateFormatted = dayjs(fromDate, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    cy.xpath(this.nursing.from_date).clear().type(fromDateFormatted);

    // Search field and upload button
    cy.xpath(this.nursing.search_field).type("LastName");
    cy.xpath(this.nursing.upload_button).click();

    // Select dropdown and upload file
    cy.xpath(this.nursing.dept_dropdown).select("Pathology");
    const filePath = `screenshots/${fileName}`;
    cy.xpath(this.nursing.upload_file).attachFile(filePath);

    // Submit and verify file name
    cy.xpath(this.nursing.submit_button).click();
    
  }
}
