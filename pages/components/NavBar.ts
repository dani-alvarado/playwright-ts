import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../BasePage";
import { NavBarButton } from "../../helpers/NavBarButton";

export class NavBar extends BasePage {
  readonly logo: Locator;
  readonly homeButton: Locator;
  readonly productButton: Locator;
  readonly cartButton: Locator;
  readonly loginButton: Locator;
  readonly testCasesButton: Locator;
  readonly apiTestingButton: Locator;
  readonly contactButton: Locator;

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
  }

  /**
   * clickElement
   */
  public async clickElement(button: NavBarButton) {
    switch (button) {
      case NavBarButton.HOME:
        await this.homeButton.click();
        break;
      case NavBarButton.PRODUCTS:
        await this.productButton.click();
        break;
      case NavBarButton.CART:
        await this.cartButton.click();
        break;
      case NavBarButton.LOGIN:
        await this.loginButton.click();
        break;
      case NavBarButton.TEST_CASES:
        await this.testCasesButton.click();
        break;
      case NavBarButton.API_TESTING:
        await this.apiTestingButton.click();
        break;
      case NavBarButton.CONTACT:
        await this.contactButton.click();
        break;
      default:
        console.log("the button does not exist");
        break;
    }
  }

  public async verifyLogo() {
    expect(await this.logo).toBeVisible();
  }
}
