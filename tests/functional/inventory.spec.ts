import { test, expect } from '@playwright/test';

test.describe("Inventory feature", () => {

    test.beforeEach('Login saucedemo', async ({page}) => {
        await page.goto('https://www.saucedemo.com');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await expect(page).toHaveURL(/.*\/inventory/);
    })

    test('Should confirm all prices are non-zero values', async ({page}) => {
        let allPrices = [];
        let productsElms = page.locator(".inventory_item");
        await expect(productsElms).toHaveCount(6)

        let totalProducts = await productsElms.count();

        for (let i = 0; i < totalProducts; i++) {
            let elNode = productsElms.nth(i);

            let productName = await elNode.locator(".inventory_item_name").innerText();
            let productPrice = await elNode.locator(".inventory_item_price").innerText();
            console.log(productName, productPrice);

            allPrices.push(productPrice)
        }
        let priceArrNum = allPrices.map((item) => parseFloat(item.replace("$", "")));
        let invalidPrice = priceArrNum.filter((item) => item <= 0);
        if (invalidPrice.length > 0) {
            console.log("zero value prices found: " + invalidPrice);
        } else {
            console.log("all prices are non-zero");
        }
        expect(invalidPrice).toHaveLength(0);

    });
})