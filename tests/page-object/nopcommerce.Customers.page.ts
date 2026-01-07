import BasePage from "./base.page";
import {expect, Page} from "@playwright/test";

export default class CustList extends BasePage{
    constructor(page: Page) {
        super(page);
    }
    get firstNameInput(){return this.page.getByRole('textbox', {name: 'First name'})}
    get lastNameInput(){return this.page.getByRole('textbox', {name: 'Last name'})}
    get searchBtn(){return this.page.getByRole('button', {name: 'Search'})}
    get noDataAvailableCell(){return this.page.locator("[id=search-customers]")}


    async gotoCustomerListPage(custListPage: string) {
        await this.navigateTo(custListPage);
    }
    async searchAndConfirmUser(firstName: string, lastName: string): Promise<boolean> {
        await this.typeInto(this.firstNameInput, firstName);
        await this.typeInto(this.lastNameInput, lastName);
        await this.click(this.searchBtn);

        await this.page.waitForTimeout(1500)
        let customerNotFound = await this.noDataAvailableCell.isVisible()
        return customerNotFound;
    }
}