import {test} from "@playwright/test";
import HomePage from "../page-object/nopcommerce.home.page";
import CustList from "../page-object/nopcommerce.Customers.page";

test.describe("E2E Customer search", () => {
    test("E2E Login to nopcommerce app", async ({page}, testInfo) => {
        const homePage = new HomePage(page);
        const envConfig = testInfo.project.use as any;

        await homePage.loginToApp(
            "https://admin-demo.nopcommerce.com",
            process.env.USER_NAME,
            process.env.PASSWORD
        )

        //Customer search
        const USER_DATA = {
            firstName: "Alex",
            lastName: "Thomas",
        }
        const customerListPage = new CustList(page)
        await customerListPage.gotoCustomerListPage("https://admin-demo.nopcommerce.com/Admin/Customer/List")
        let customerNotFound = await customerListPage.searchAndConfirmUser(USER_DATA.firstName, USER_DATA.lastName)
        if(customerNotFound){
            console.log("Not found customer: ", customerNotFound)
        } else {
            console.log("found customer: ", customerNotFound)
        }
    })
})