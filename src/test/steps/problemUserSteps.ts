import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";
import { expect } from "@playwright/test";

let initialProductNames: string[] = [];

Given('User is logged in as problem_user', async function () {
    const loginPage = fixture.pages.sauceLoginPage;
    await loginPage.navigateToSauceDemo();
    await loginPage.login("problem_user", "secret_sauce");
    await loginPage.verifySuccessfulLogin();
});

Then('All product images should display the broken dog image', async function () {
    const sauceInventoryPage = fixture.pages.sauceInventoryPage;
    const imageSources = await sauceInventoryPage.getAllImageSources();
    
    for (const src of imageSources) {
        expect(src).toContain("sl-404");
    }
});

When('User attempts to filter products by {string}', async function (filterOption: string) {
    const sauceInventoryPage = fixture.pages.sauceInventoryPage;
    // Save the initial state before filtering
    initialProductNames = await sauceInventoryPage.getAllItemNames();
    
    await sauceInventoryPage.selectSortOption(filterOption);
});

Then('The product order should remain unchanged', async function () {
    const sauceInventoryPage = fixture.pages.sauceInventoryPage;
    const currentProductNames = await sauceInventoryPage.getAllItemNames();
    
    // Assert that the list didn't change despite applying the filter
    expect(currentProductNames).toEqual(initialProductNames);
});
