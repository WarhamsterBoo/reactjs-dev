import "expect-puppeteer";

describe("App", () => {
  beforeEach(async () => {
    await page.goto("http://localhost:8080/#/login");
  });

  it("user should be able to login and logout", async () => {
    await expect(page).toMatch("Hello there!");
    await expect(page).toFill("input", "Bob");
    await expect(page).toClick("button", { text: "Start" });
    await expect(page).toMatch("Checking your identity");
    await expect(page).toMatch("Hello, Bob", { timeout: 10000 });
    await expect(page).toClick("button", { text: "Logout" });
    await expect(page).toMatch("Hello there!");
  });
});
