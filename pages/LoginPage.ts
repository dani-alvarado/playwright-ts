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

  private readonly fieldLocators: Record<LoginField, Locator>;
  private readonly buttonActions: Record<LoginButton, () => Promise<void>>;

  constructor(page: Page) {
    super(page);
    this.loginSubtitle = page.getByText("Login to your account");
    this.registerSubtitle = page.getByText("New User Signup");
    this.loginEmailField = page.locator('[data-qa="login-email"]');
    this.loginPasswordField = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.registerNameField = page.locator('[data-qa="signup-name"]');
    this.registerEmailField = page.locator('[data-qa="signup-email"]');
    this.registerButton = page.locator('[data-qa="signup-button"]');
    this.errorMessage = page.getByText("Your email or password is incorrect!");

    this.fieldLocators = {
      [LoginField.LOGIN_EMAIL]: this.loginEmailField,
      [LoginField.LOGIN_PASSWORD]: this.loginPasswordField,
      [LoginField.REGISTER_EMAIL]: this.registerEmailField,
      [LoginField.REGISTER_NAME]: this.registerNameField,
    };

    this.buttonActions = {
      [LoginButton.LOGIN_BUTTON]: async () => await this.loginButton.click(),
      [LoginButton.REGISTER_BUTTON]: async () =>
        await this.registerButton.click(),
    };
  }

  /**
   * fillField
   */
  public async fillField(field: LoginField, content: string) {
    const fieldLocator = this.fieldLocators[field];
    if (fieldLocator) {
      await fieldLocator.fill(content);
    } else {
      console.error(
        `Invalid field: ${field.toString}. Please use one of the supported fields.`
      );
    }
  }

  public async clickButton(button: LoginButton) {
    const buttonAction = this.buttonActions[button];
    if (buttonAction) {
      await buttonAction();
    } else {
      console.error(
        `Invalid button: ${button}. Please use one of the supported button.`
      );
    }
  }

  public async validateError() {
    await expect(this.errorMessage).toBeVisible();
  }
}
