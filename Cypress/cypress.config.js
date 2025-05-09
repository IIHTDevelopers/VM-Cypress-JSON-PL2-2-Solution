const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");
const customReporter = require("./custom-reporter");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Attach custom reporter
      customReporter(on);
      this.retries = 2,

      // Register tasks
      on("task", {
        deleteFile(filePath) {
          const fullPath = path.resolve(filePath);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            console.log(`Deleted: ${fullPath}`);
          } else {
            console.log(`File not found: ${fullPath}`);
          }
          return null;
        },
        findExcelFile() {
          const downloadsFolder = path.join(__dirname, "cypress", "downloads");
          const files = fs.readdirSync(downloadsFolder);
          return files.some(
            (file) => file.endsWith(".xlsx") || file.endsWith(".xls")
          );
        },
      });

      on("task", {
        fileExists(path) {
          return fs.existsSync(path);
        },
        deleteFile(path) {
          if (fs.existsSync(path)) {
            fs.unlinkSync(path);
          }
          return null;
        },
      });

      return config;
    },

    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    defaultCommandTimeout: 5000,
    watchForFileChanges: false,
  },

  viewportWidth: 1536,
  viewportHeight: 720,
});
