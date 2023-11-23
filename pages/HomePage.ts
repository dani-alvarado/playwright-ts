import { Locator, Page } from "@playwright/test";

import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  //Locators for Home Page
  // readonly locator: Locator

  readonly pageTitle: Locator;

  //constructor

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator("span", { hasText: "Automation" });
  }

  //methods for Home Page
}
