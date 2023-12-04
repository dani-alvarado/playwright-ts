import { test } from "@playwright/test";
import { NavBar } from "../../pages/components/NavBar";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { NavBarButton } from "../../helpers/NavBarEnums";
import { LoginButton, LoginField } from "../../helpers/LoginEnums";

test.describe("Register/Login", () => {
  test.only("User should be able to register through the UI", async ({
    page,
  }) => {
    const navBar = new NavBar(page);
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.navigateToHomePage();
    await navBar.clickElement(NavBarButton.LOGIN);
    await loginPage.fillField(LoginField.LOGIN_EMAIL, "test@test.test");
    await loginPage.fillField(LoginField.LOGIN_PASSWORD, "test123");
    await loginPage.clickButton(LoginButton.LOGIN_BUTTON);
    await loginPage.validateError();
  });
});
