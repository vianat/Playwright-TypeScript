import {expect, type Locator, type Page} from "@playwright/test";

export default class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async navigateTo(path: string) {
        await this.page.goto(path);
    }
    async click(el: Locator) {
        try {
            await expect(el).toBeVisible({timeout: 5000})
            await el.click();
        } catch (error){
            throw error;
        }
    }
    async typeInto(el: Locator, text: string) {
    }
}