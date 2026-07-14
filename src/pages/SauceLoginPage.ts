import { Page } from "@playwright/test";
import Assert from "../helper/wrapper/Assert";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrapper";

export default class SauceLoginPage {
  private base: PlaywrightWrapper;
  private assert: Assert;

  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
    this.assert = new Assert(page);
  }

  private Elements = {
    usernameInput: "#user-name",
    passwordInput: "#password",
    loginBtn: "#login-button",
    inventoryContainer: "#inventory_container",
    appLogo: ".app_logo",
    errorMessageContainer: "[data-test='error']",
  };

  async navigateToSauceDemo() {
    await this.base.goto("https://www.saucedemo.com/");
  }

  async login(username: string, password: string) {
    await this.base.waitAndFill(this.Elements.usernameInput, username);
    await this.base.waitAndFill(this.Elements.passwordInput, password);
    await this.base.waitAndClick(this.Elements.loginBtn);
  }

  async verifySuccessfulLogin() {
    await this.assert.assertElementVisible(this.Elements.appLogo);
    await this.assert.assertTextContains(this.Elements.appLogo, "Swag Labs");
    await this.assert.assertURLContains("inventory.html");
  }

  async verifyErrorMessage(expectedError: string) {
    const errorLocator = this.page.getByRole("heading", {
      name: expectedError,
    });
    await errorLocator.waitFor({ state: "visible" });
    if (!(await errorLocator.isVisible())) {
      throw new Error(
        `Expected error message "${expectedError}" was not visible.`,
      );
    }
  }

  async verifyProblemUserImages() {
    const imgSrc = await this.page
      .locator(".inventory_item_img img")
      .first()
      .getAttribute("src");
    if (!imgSrc?.includes("sl-404")) {
      throw new Error("Expected problem user dog image (sl-404) not found!");
    }
  }
}
