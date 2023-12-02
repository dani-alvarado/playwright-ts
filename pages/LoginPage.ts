import { Locator, Page, expect } from "@playwright/test";

import { BasePage } from "./BasePage";
import { LoginField, LoginButton } from "../helpers/LoginEnums";

export class LoginPage extends BasePage {
  readonly loginSubtitle: Locator;
  readonly registerSubtitle: Locator;
  readonly loginEmailField: Locator;
  readonly loginPasswordField: Locator;
  readonly loginButton: Locator;
  readonly registerNameField: Locator;
  readonly registerEmailField: Locator;
  readonly registerButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.loginSubtitle = page.getByText("Login to your account");
    this.registerSubtitle = page.getByText("New User Signup");
    this.loginEmailField = page.locator('["data-qa"="login-email"]');
    this.loginPasswordField = page.locator('["data-qa"="login-password"]');
    this.loginButton = page.locator('["data-qa"="login-button"]');
    this.registerNameField = page.locator('["data-qa"="signup-name"]');
    this.registerEmailField = page.locator('["data-qa"="signup-email"]');
    this.registerButton = page.locator('["data-qa"="signup-button"]');
    this.errorMessage = page.getByText("Your email or password is incorrect!");
  }

  /**
   * fillField
   */
  public async fillField(field: LoginField, content: string) {
    switch (field) {
      case LoginField.LOGIN_EMAIL:
        await this.loginEmailField.fill(content);
        break;
      case LoginField.LOGIN_PASSWORD:
        await this.loginPasswordField.fill(content);
        break;
      case LoginField.REGISTER_EMAIL:
        await this.registerEmailField.fill(content);
        break;
      case LoginField.REGISTER_NAME:
        await this.registerNameField.fill(content);
        break;

      default:
        console.error(
          `Invalid field: ${field}. Please use one of the supported fields.`
        );
        break;
    }
  }

  public async clickButton(button: LoginButton) {
    switch (button) {
      case LoginButton.LOGIN_BUTTON:
        await this.loginButton.click();
        break;
      case LoginButton.REGISTER_BUTTON:
        await this.registerButton.click();
        break;

      default:
        console.error(
          `Invalid button: ${button}. Please use one of the supported button.`
        );
        break;
    }
  }

  public async validateError() {
    expect(await this.errorMessage).toBeVisible();
  }
}
