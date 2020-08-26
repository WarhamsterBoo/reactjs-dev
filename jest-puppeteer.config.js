module.exports = {
  launch: {
    headless: true,
  },
  browser: "chromium",
  server: {
    command: "npm run start-e2e",
    port: 8080,
    debug: true,
    launchTimeout: 30000,
  },
};
