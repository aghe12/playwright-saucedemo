import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "../../support/pageFixture";
import SauceLoginPage from "../../pages/SauceLoginPage";

setDefaultTimeout(60 * 1000 * 2)
let sauceLoginPage: SauceLoginPage;

Given('User navigates to the Saucedemo login page', async function () {
    sauceLoginPage = new SauceLoginPage(fixture.page);
    await sauceLoginPage.navigateToSauceDemo();
});

When('User logs in with valid credentials', async function () {
    const { username, password } = fixture.testData;
    await sauceLoginPage.login(username, password);
});

Then('User should be redirected to the products page', async function () {
    await sauceLoginPage.verifySuccessfulLogin();
});

When('User logs in with username {string} and password {string}', async function (username: string, password: string) {
    await sauceLoginPage.login(username, password);
});

Then('User should see an error message containing {string}', async function (expectedError: string) {
    await sauceLoginPage.verifyErrorMessage(expectedError);
});

Then('The page should behave according to the {string} expectation', async function (userType: string) {
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
});
