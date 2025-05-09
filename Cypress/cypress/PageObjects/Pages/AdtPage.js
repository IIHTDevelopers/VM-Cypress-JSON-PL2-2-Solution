import testData from "../../e2e/Data/PatientName.json";

export default class AdtPage {
  constructor() {
    this.ADT = {
      ADTLink: '[href="#/ADTMain"]',
      searchBar: "#quickFilterInput",
      hospitalSearchBar: "#id_input_search_using_hospital_no",
      patientName: "//div[@role='gridcell' and @col-id='ShortName'][1]",
      patientCode: "//div[@role='gridcell' and @col-id='PatientCode'][1]",
      admittedPatient: "//a[contains(text(),'Admitted Patients')]",
      searchbar: "//input[@id='quickFilterInput']",
      elipsis: "(//button[contains(text(),'...')])[1]",
      change_doctor:
        "//div[@class='dropdown open']//a[@danphe-grid-action='changedr']",
      update_button: "//button[normalize-space()='Update']",
      select_doctor_error: "//span[text()='Select doctor from the list.']",
    };
  }

  /**
   * Purpose:
   * @Test15 This method verifies navigation within the Inventory Submodule by interacting with the ADT (Admission, Discharge, Transfer) section,
   * searching for a patient, changing the assigned doctor, and verifying that an error message is displayed.
   *
   * Steps:
   * 1. Navigate to the ADT link in the application.
   * 2. Click on a specific record labeled "New-1".
   * 3. Click on the first option from the popup to select an admitted patient.
   * 4. Search for a patient by name using the search bar.
   * 5. Open the options menu (ellipsis), select "Change Doctor" and click to change the doctor.
   * 6. Click on the update button to apply the changes.
   * 7. Verify that an error message for selecting a doctor is displayed.
   *
   * Preconditions:
   * - The ADT section and required elements (like search bar, buttons, and error message) must be visible and interactable.
   *
   * Expected Result:
   * - The method verifies that an error message appears after attempting to change the doctor.
   */
  verifyInventorySubModuleNavigation() {
    
    const patientName = testData.PatientNames[1].Patient2;
    cy.get(this.ADT.ADTLink).click({force: true});
    cy.wait(2000);
    cy.xpath("//h5[text()='New-1 ']").click({force: true});
    // Click on first option from popup
    cy.xpath(this.ADT.admittedPatient).click({force: true});
    cy.xpath(this.ADT.searchbar).clear().type(patientName);

    cy.xpath(this.ADT.elipsis).click({force: true});
    cy.xpath(this.ADT.change_doctor).scrollIntoView().should('be.visible').click({ force: true });

    cy.xpath(this.ADT.update_button).click({force: true});

    return cy.xpath(this.ADT.select_doctor_error).should("be.visible");
    
  }
}
