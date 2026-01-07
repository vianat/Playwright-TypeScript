import {test} from "@playwright/test";
import HomePage from "../page-object/nopcommerce.home.page";

test("Login to nopcommerce app", async ({page}, testInfo) => {
    const homePage = new HomePage(page);
    const envConfig = testInfo.project.use as any;

    await homePage.loginToApp(
        "https://admin-demo.nopcommerce.com",
        process.env.USER_NAME,
        process.env.PASSWORD
    )
})