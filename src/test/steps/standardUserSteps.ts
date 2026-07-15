import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";
import SauceLoginPage from "../../pages/SauceLoginPage";
import { expect } from "@playwright/test";

Given('User is logged in as standard_user', async function () {
    fixture.logger.info("Logging in as standard_user");
    await fixture.subStepLogger?.info("Logging in as standard_user");
    const loginPage = fixture.pages.sauceLoginPage;
    await loginPage.navigateToSauceDemo();
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.verifySuccessfulLogin();
    await fixture.subStepLogger?.success("Logged in as standard_user complete");
});

When('User selects the filter option {string}', async function (filterOption: string) {
    fixture.logger.info(`Selecting filter option: ${filterOption}`);
    await fixture.subStepLogger?.info(`Selecting filter option: ${filterOption}`);
    const inventoryPage = fixture.pages.sauceInventoryPage;
    await inventoryPage.selectSortOption(filterOption);
    await fixture.subStepLogger?.success(`Selecting filter option: ${filterOption} complete`);
});

Then('The products should be sorted by {string}', async function (sortType: string) {
    fixture.logger.info(`Verifying products are sorted by: ${sortType}`);
    await fixture.subStepLogger?.info(`Verifying products are sorted by: ${sortType}`);
    const inventoryPage = fixture.pages.sauceInventoryPage;

    if (sortType.includes('Name')) {
        const actualNames = await inventoryPage.getAllItemNames();
        const expectedNames = [...actualNames];

        if (sortType === 'Name A-Z') {
            expectedNames.sort();
        } else if (sortType === 'Name Z-A') {
            expectedNames.sort().reverse();
        }

        expect(actualNames).toEqual(expectedNames);
    } else if (sortType.includes('Price')) {
        const actualPrices = await inventoryPage.getAllItemPrices();
        const expectedPrices = [...actualPrices];

        if (sortType === 'Price Low-High') {
            expectedPrices.sort((a, b) => a - b);
        } else if (sortType === 'Price High-Low') {
            expectedPrices.sort((a, b) => b - a);
        }

        expect(actualPrices).toEqual(expectedPrices);
    } else {
        throw new Error(`Unknown sort type: ${sortType}`);
    }
    await fixture.subStepLogger?.success(`Verifying products are sorted by: ${sortType} complete`);
});
