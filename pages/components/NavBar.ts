import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../BasePage";
import { NavBarButton } from "../../helpers/NavBarEnums";

export class NavBar extends BasePage {
  readonly logo: Locator;
  readonly homeButton: Locator;
  readonly productButton: Locator;
  readonly cartButton: Locator;
  readonly loginButton: Locator;
  readonly testCasesButton: Locator;
  readonly apiTestingButton: Locator;
  readonly contactButton: Locator;
  private readonly buttonActions: Record<NavBarButton, () => Promise<void>>;

  constructor(page: Page) {
    super(page);
    this.logo = page.getByAltText("Website for automation practice");
    this.homeButton = page.locator("a", { hasText: "Home" });
    this.productButton = page.locator("a", { hasText: "Products" });
    this.cartButton = page.locator("a", { hasText: "Cart" });
    this.loginButton = page.locator("a", { hasText: "Login" });
    this.testCasesButton = page.locator("a", { hasText: "Test Cases" });
    this.apiTestingButton = page.locator("a", { hasText: "Api Testing" });
    this.contactButton = page.locator("a", { hasText: "Contact" });

    this.buttonActions = {
      [NavBarButton.HOME]: async () => await this.homeButton.click(),
      [NavBarButton.PRODUCTS]: async () => await this.productButton.click(),
      [NavBarButton.CART]: async () => await this.cartButton.click(),
      [NavBarButton.LOGIN]: async () => await this.loginButton.click(),
      [NavBarButton.TEST_CASES]: async () => await this.testCasesButton.click(),
      [NavBarButton.API_TESTING]: async () =>
        await this.apiTestingButton.click(),
      [NavBarButton.CONTACT]: async () => await this.contactButton.click(),
    };
  }

  /**
   * clickElement
   */
  public async clickElement(button: NavBarButton) {
    const buttonAction = this.buttonActions[button];
    if (buttonAction) {
      await buttonAction();
    } else {
      console.error(
        `Invalid button: ${button.toString()}. Please use one of the supported button.`
      );
    }
  }

  public async verifyLogo() {
    expect(await this.logo).toBeVisible();
  }
}
