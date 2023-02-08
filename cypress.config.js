const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '7pgxis',
  
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportFileName: '[status]_[datetime]-[name]-report',
    reportPageTitle: 'Edix Matricula',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },

  e2e: {
    setupNodeEvents(on) {
    require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'https://edix.preunir.net',
    chromeWebSecurity: false,
    screenshotOnRunFailure: true,
  },
});
