import loginData from "../../e2e/Data/ValidLogin.json";
class LoginPage {
  user = "#username_id";
  pass = "#password";
  signIn = "#login";
  errorMsg = "//div[contains(text(),'Invalid credentials !')]";
  admin = "//li[@class='dropdown dropdown-user']";
  logout = "//a[text() = ' Log Out ']";

  /**
   * This method logs in the user with valid credentials.
   *
   * @description This method performs the login operation using the provided valid credentials. It highlights the input
   *              fields for better visibility during interaction and fills the username and password fields. After submitting
   *              the login form by clicking the login button, it validates the success of the login process. The login is
   *              considered successful if there are no errors.
   */
  performLogin() {
    try {
      // Access login data from JSON
      const username = loginData.ValidLogin[0].ValidUserName;
      const password = loginData.ValidLogin[1].ValidPassword;

      // Fill username
      cy.get(this.user).clear().type(username);

      // Fill password
      cy.get(this.pass).clear().type(password);

      // Click sign-in button
      cy.get(this.signIn).click();

      // Verify successful login by checking if the 'admin' element is visible
      cy.xpath(this.admin).should("be.visible");
    } catch (e) {
      cy.log("Error during login:", e.message);
      throw e; // Rethrow the error for test failure
    }
  }
}
export default LoginPage;
