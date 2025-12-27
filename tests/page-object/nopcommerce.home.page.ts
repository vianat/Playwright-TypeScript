import BasePage from "./base.page";
import {expect, Page} from "@playwright/test";

export default class HomePage extends BasePage{
    constructor(page: Page) {
        super(page);
    }
    get userNameInput(){return this.page.getByRole('textbox', {name: 'Email'});}
    get passwordInput(){return this.page.getByRole('textbox', {name: 'Password'});}
    get loginBtn(){return this.page.getByRole('button', {name: 'Log in'});}

    async loginToApp(url: string, userName: string, password: string) {
        await this.navigateTo(url);
        await this.typeInto(this.userNameInput, userName);
        await this.typeInto(this.passwordInput, password);
        await this.click(this.loginBtn);
        await expect(this.page).toHaveURL(`${url}/admin/`)
    }
}