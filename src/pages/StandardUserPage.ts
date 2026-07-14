import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrapper";

export default class SauceInventoryPage {
    private base: PlaywrightWrapper;

    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        sortDropdown: ".product_sort_container",
        itemName: ".inventory_item_name",
        itemPrice: ".inventory_item_price",
    };

    async selectSortOption(optionValue: string) {
        await this.page.locator(this.Elements.sortDropdown).selectOption(optionValue);
    }

    async getAllItemNames(): Promise<string[]> {
        const items = this.page.locator(this.Elements.itemName);
        return await items.allTextContents();
    }

    async getAllItemPrices(): Promise<number[]> {
        const items = this.page.locator(this.Elements.itemPrice);
        const pricesText = await items.allTextContents();
        // Parse "$29.99" -> 29.99
        return pricesText.map(price => parseFloat(price.replace('$', '')));
    }

    async getAllImageSources(): Promise<(string | null)[]> {
        const images = this.page.locator('.inventory_item_img img');
        const count = await images.count();
        const sources: (string | null)[] = [];
        for (let i = 0; i < count; i++) {
            sources.push(await images.nth(i).getAttribute('src'));
        }
        return sources;
    }
}
