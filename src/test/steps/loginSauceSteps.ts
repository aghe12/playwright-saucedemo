import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";
import SauceLoginPage from "../../pages/SauceLoginPage";

setDefaultTimeout(60 * 1000 * 2)
let sauceLoginPage: SauceLoginPage;

Given('User navigates to the Saucedemo login page', async function () {
    fixture.logger.info("Navigating to Saucedemo login page");
    await fixture.subStepLogger?.info("Navigating to Saucedemo login page");
    sauceLoginPage = new SauceLoginPage(fixture.page);
    await sauceLoginPage.navigateToSauceDemo();
    await fixture.subStepLogger?.success("Navigated to Saucedemo login page");
});

When('User logs in with valid credentials', async function () {
    const { username, password } = fixture.testData;
    fixture.logger.info(`Logging in with valid credentials for user: ${username}`);
    await fixture.subStepLogger?.info(`Logging in with valid credentials for user: ${username}`);
    await sauceLoginPage.login(username, password);
    await fixture.subStepLogger?.success(`Logged in with valid credentials for user: ${username} complete`);
});

Then('User should be redirected to the products page', async function () {
    fixture.logger.info("Verifying redirection to products page");
    await fixture.subStepLogger?.info("Verifying redirection to products page");
    await sauceLoginPage.verifySuccessfulLogin();
    await fixture.subStepLogger?.success("Redirection to products page verified");
});

When('User logs in with username {string} and password {string}', async function (username: string, password: string) {
    fixture.logger.info(`Logging in with username: ${username}`);
    await fixture.subStepLogger?.info(`Logging in with username: ${username}`);
    await sauceLoginPage.login(username, password);
    await fixture.subStepLogger?.success(`Logging in with username: ${username} complete`);
});

Then('User should see an error message containing {string}', async function (expectedError: string) {
    fixture.logger.info(`Verifying error message containing: ${expectedError}`);
    await fixture.subStepLogger?.info(`Verifying error message containing: ${expectedError}`);
    await sauceLoginPage.verifyErrorMessage(expectedError);
    await fixture.subStepLogger?.success(`Error message containing: ${expectedError} verified`);
});

Then('The page should behave according to the {string} expectation', async function (userType: string) {
    fixture.logger.info(`Verifying page behaves according to ${userType} expectation`);
    await fixture.subStepLogger?.info(`Verifying page behaves according to ${userType} expectation`);
    switch (userType) {
        case 'normal':
        case 'delayed':
        case 'error':
        case 'visual_bug':
            await sauceLoginPage.verifySuccessfulLogin();
            break;
        case 'locked_out':
            await sauceLoginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
            break;
        case 'problem':
            await sauceLoginPage.verifySuccessfulLogin();
            await sauceLoginPage.verifyProblemUserImages();
            break;
        default:
            throw new Error(`Unknown user type: ${userType}`);
    }
    await fixture.subStepLogger?.success(`Page behaves according to ${userType} expectation complete`);
});
