import lab from "../../e2e/Data/lab.json";
import dayjs from "dayjs";
export default class labsPage {
  constructor() {
    this.lab = {
      labLink: 'a[href="#/Lab"]',
      sampleCollection: '(//a[@href="#/Lab/Requisition"])[2]',
      fromDate: `(//input[@id="date"])[1]`,
      okButton: '//button[@class="btn green btn-success"]',
      requestingDept: "//span[text() = 'Requesting Dept.']",
      requestingDepthHamburgerIcon: '(//span[@ref="eMenu"]//span)[6]',
      requestingDeptDropdown: '//select[@id="filterType"]',
      requestingDeptOption:
        '//select[@id="filterType"]//option[@value="startsWith"]',
      headder: "//span[text()='Visit Type']",
      textField: '//input[@id="filterText"]',
    };
  }

  /**
   * Purpose:
   * @Test9.2 This method is used to verify table filtering functionality for a male ward by
   * applying date and department-based filters and checking the results in a table.
   *
   * Steps:
   * 1. Set up the from date and department name to be used for filtering.
   * 2. Navigate to the sample collection page.
   * 3. Apply date filtering by entering the "FromDate" and clicking the "OK" button.
   * 4. Hover over the requesting department field and select the desired department.
   * 5. Type the department name in the text field to filter the results.
   * 6. Check the "WardName" column in the table to ensure the department name is found.
   *
   * Preconditions:
   * - The lab link and sample collection section should be visible and accessible.
   *
   * Expected Result:
   * - The filtered results should display only the relevant entries based on the given date and department.
   *
   * Error Handling:
   * - If no patient is found with the given department name in the "WardName" column, an error is thrown.
   */
  verifyTableFilteringForMaleWard() {
    
    const fromDate = lab.DateRange[0].FromDate || "";
    const fromDateFormatted = dayjs(fromDate, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    const DeptName = lab.DeptName[0].Dept || "";
    cy.wait(2000);
    cy.wait(3000);
    cy.xpath(this.lab.sampleCollection).click();
    cy.wait(3000);
    cy.xpath(this.lab.fromDate).type(fromDateFormatted);
    cy.xpath(this.lab.okButton).click();
    cy.wait(2000);
    cy.xpath(this.lab.requestingDept).trigger("mouseover");
    cy.wait(2000);
    cy.xpath(this.lab.requestingDepthHamburgerIcon).click();
    cy.xpath(this.lab.requestingDeptDropdown).should("be.visible").select(2);
    cy.wait(2000);
    cy.xpath(this.lab.textField).type(DeptName);
    cy.xpath('//div[@role="gridcell" and @col-id="WardName"]').then(
      (elements) => {
        const resultText = elements
          .map((_, el) => Cypress.$(el).text().trim())
          .get();
        const matchFound = resultText.includes(DeptName.trim());
        if (matchFound) {
          console.log("Patient found in search results.");
        } else {
          throw new Error("Patient not found in search results.");
        }
      }
    );
    
  }
}
