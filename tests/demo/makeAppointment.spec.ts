import {test, expect} from "@playwright/test";

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

        await expect(page.locator("h2")).toContainText("Make Appointment");
    })

    test('Make appointment with non-default values', {annotation: {type: "Bug", description: "JIRA#234"}},  async ({ page , browserName }) => {

        // skip this test for firefox
        test.skip(browserName === "firefox", "open bug id : 1234");

        await page.getByLabel('Facility').selectOption('Seoul CURA Healthcare Center');
        await page.getByText('Apply for hospital readmission').click();
        await page.getByText('Medicaid').click();
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
        await page.getByRole('cell', { name: '31' }).click();
        await page.getByRole('textbox', { name: 'Comment' }).click();
        await page.getByRole('textbox', { name: 'Comment' }).fill('text\nline');
        await page.getByRole('button', { name: 'Book Appointment' }).click();

        await expect(page.locator('h2')).toContainText('Appointment Confirmation');
        await expect(page.getByRole('link', { name: 'Go to Homepage' })).toBeVisible();
    });
})