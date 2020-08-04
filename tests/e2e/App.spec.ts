import "expect-puppeteer";

describe('App', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:8080/login');
    });

    it('should', async () => {
        await expect(page).toMatch('Hello there!');
    });
});