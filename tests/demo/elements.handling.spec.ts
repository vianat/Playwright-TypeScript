import { test, expect } from '@playwright/test';

test.describe("Make appointment", () => {
  test.beforeEach("Login with valid creds", async ({page}) => {
    await page.goto('/');
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    // button and link iteration
    // await page.getByRole("link", {name: "Make Appointment"}).click();
    await page.getByRole("link", {name: "Make Appointment"}).press("Enter");
    // await page.getByRole("link", {name: "Make Appointment"}).dblclick();
    // await page.getByRole("link", {name: "Make Appointment"}).click({button: "left"})
    // await page.getByRole("link", {name: "Make Appointment"}).click({button: "right"})
    // await page.getByRole("link", {name: "Make Appointment"}).click({button: "middle"})
    // await page.getByRole("link", {name: "Make Appointment"}).hover()
    // await page.getByRole("link", {name: "Make Appointment"}).click({timeout: 5000})


    await expect(page.getByText("Please login to make")).toBeVisible();

    // text area iteration
    await page.getByLabel("Username").fill("John Doe")
    await page.getByLabel("Username").clear()
    //slow typing
    await page.getByLabel("Username").pressSequentially("John Doe", {delay: 100})
    await page.getByLabel("Password").fill("ThisIsNotAPassword")
    await page.getByRole("button", {name: "Login"}).click();

    await expect(page.locator("h2")).toContainText("Make Appointment");
  })

  test('Make appointment with non-default values', async ({ page }) => {

    // dropdown iteration
    await expect(page.getByLabel('Facility')).toHaveValue("Tokyo CURA Healthcare Center");

    // select by option / label text / index
    await page.getByLabel('Facility').selectOption('Seoul CURA Healthcare Center');
    await page.getByLabel('Facility').selectOption({label: "Hongkong CURA Healthcare Center"});
    await page.getByLabel('Facility').selectOption({index: 0});

    // assert options count
    let facilityOptionsCount = page.getByLabel('Facility').locator('option');
    await expect(facilityOptionsCount).toHaveCount(3);

    // get all dropdown values
    let listOfDrpdwnElements = await page.getByLabel('Facility').all()
    let listOfOptions = []
    for (let el of listOfDrpdwnElements) {
      let elText = await el.textContent()
      if (elText){
        listOfOptions.push({text: elText});
      }
    }
    console.table(listOfOptions);


    // checkbox
    // assert default checkbox options selected
    await expect(page.getByText('Medicare')).toBeChecked();
    await expect(page.getByText('Medicaid')).not.toBeChecked();

    await page.getByText('Apply for hospital readmission').click();
    await page.getByText('Apply for hospital readmission').check();
    await page.getByText('Apply for hospital readmission').uncheck();

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
