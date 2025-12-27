import {test, expect} from "@playwright/test";
import TestData from "../../data/test-data.ts";

const data = TestData.makeApntmntData();
for (const appData of data) {
    console.log ('>> Test data: ${JSON.stringify(appData)}');

    test.describe("Make appointment", () => {
        test.beforeEach("Login with valid creds", async ({page}) => {
            await page.goto('/');
            await expect(page).toHaveTitle("CURA Healthcare Service");
            await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

            await page.getByRole("link", {name: "Make Appointment"}).click();
            await expect(page.getByText("Please login to make")).toBeVisible();

            await page.getByLabel("Username").fill("John Doe")
            await page.getByLabel("Password").fill("ThisIsNotAPassword")
            await page.getByRole("button", {name: "Login"}).click();

            // get login cookies
            const loginCookies = await page.context().cookies();
            process.env.LOGIN_COOKIES = JSON.stringify(loginCookies);

            await expect(page.locator("h2")).toContainText("Make Appointment");
        })

        test(`${appData.testId}: Make appointment with non-default values`, {annotation: {type: "Bug", description: "JIRA#234"}},  async ({ page , browserName }) => {

            // access the login cookies
            console.log(process.env.LOGIN_COOKIES);

            // skip this test for firefox
            test.skip(browserName === "firefox", "open bug id : 1234");

            await page.getByLabel('Facility').selectOption(appData.facility);
            await page.getByText('Apply for hospital readmission').click();
            await page.getByText(appData.hcp).click();
            await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
            await page.getByRole('textbox', { name: 'Visit Date (Required)' }).fill(appData.visitDt);
            await page.getByRole('textbox', { name: 'Visit Date (Required)' }).press("Enter");

            await page.getByRole('textbox', { name: 'Comment' }).click();
            await page.getByRole('textbox', { name: 'Comment' }).fill('text\nline');
            await page.getByRole('button', { name: 'Book Appointment' }).click();

            await expect(page.locator('h2')).toContainText('Appointment Confirmation');
            await expect(page.getByRole('link', { name: 'Go to Homepage' })).toBeVisible();
        });
    })
}