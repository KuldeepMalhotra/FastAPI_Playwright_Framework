const { test: base } = require('@playwright/test');
const ApiClient = require('../utils/apiClient');
const config = require('../config');

// Extend the base test with custom fixtures
const test = base.extend({
  apiClient: async ({}, use) => {
    const client = new ApiClient();
    await client.init();
    await use(client);
    await client.close();
  },
  
  baseURL: async ({}, use) => {
    await use(config.baseUrl);
  },
  
  testData: async ({}, use) => {
    // Create a shared test data object that persists across tests
    if (!global.sharedTestData) {
      global.sharedTestData = {
        newEmail: null,
        newId: null,
        newPwd: null,
        accessToken: null,
        bookId: null
      };
    }
    await use(global.sharedTestData);
  }
});

module.exports = { test };
