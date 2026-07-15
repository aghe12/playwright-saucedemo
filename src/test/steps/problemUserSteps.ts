import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";
import { expect } from "@playwright/test";

let initialProductNames: string[] = [];

Given('User is logged in as problem_user', async function () {
    fixture.logger.info("Logging in as problem_user");
    await fixture.subStepLogger?.info("Logging in as problem_user");
    const loginPage = fixture.pages.sauceLoginPage;
    await loginPage.navigateToSauceDemo();
    await loginPage.login("problem_user", "secret_sauce");
    await loginPage.verifySuccessfulLogin();
    await fixture.subStepLogger?.success("Logged in as problem_user complete");
});

Then('All product images should display the broken dog image', async function () {
    fixture.logger.info("Verifying all product images display the broken dog image");
    await fixture.subStepLogger?.info("Verifying all product images display the broken dog image");
    const sauceInventoryPage = fixture.pages.sauceInventoryPage;
    const imageSources = await sauceInventoryPage.getAllImageSources();
    
    for (const src of imageSources) {
        expect(src).toContain("sl-404");
    }
    await fixture.subStepLogger?.success("Verified all product images display the broken dog image complete");
});

When('User attempts to filter products by {string}', async function (filterOption: string) {
    fixture.logger.info(`Attempting to filter products by: ${filterOption}`);
    await fixture.subStepLogger?.info(`Attempting to filter products by: ${filterOption}`);
    const sauceInventoryPage = fixture.pages.sauceInventoryPage;
    // Save the initial state before filtering
    initialProductNames = await sauceInventoryPage.getAllItemNames();
    
    await sauceInventoryPage.selectSortOption(filterOption);
    await fixture.subStepLogger?.success(`Attempting to filter products by: ${filterOption} complete`);
});

Then('The product order should remain unchanged', async function () {
    fixture.logger.info("Verifying the product order remains unchanged");
    await fixture.subStepLogger?.info("Verifying the product order remains unchanged");
    const sauceInventoryPage = fixture.pages.sauceInventoryPage;
    const currentProductNames = await sauceInventoryPage.getAllItemNames();
    
    // Assert that the list didn't change despite applying the filter
    expect(currentProductNames).toEqual(initialProductNames);
    await fixture.subStepLogger?.success("Verifying the product order remains unchanged complete");
});
