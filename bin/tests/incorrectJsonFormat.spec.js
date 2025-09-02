const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');

test.describe('Incorrect JSON Format Tests', () => {
  test('should handle malformed JSON in signup request', async ({ apiClient }) => {
    Logger.trace('Testing signup with malformed JSON....');
    
    // This test would need to be implemented differently in Playwright
    // as it handles JSON parsing automatically
    // We'll test with invalid data structure instead
    
    const invalidSignupRequest = {
      // Missing required fields
      email: 'test@example.com'
      // Missing id and password
    };
    
    const response = await apiClient.post(endpoints.SIGNUP, invalidSignupRequest, 422);
    const errorResponse = await response.json();
    
    Assertions.assertContains(errorResponse, 'detail', 'Validating error response contains detail');
    
    Logger.trace('Correctly handled invalid signup request!!!!');
  });
  
  test('should handle malformed JSON in login request', async ({ apiClient }) => {
    Logger.trace('Testing login with malformed JSON....');
    
    const invalidLoginRequest = {
      // Missing password
      email: 'test@example.com'
    };
    
    const response = await apiClient.post(endpoints.LOGIN, invalidLoginRequest, 422);
    const errorResponse = await response.json();
    
    Assertions.assertContains(errorResponse, 'detail', 'Validating error response contains detail');
    
    Logger.trace('Correctly handled invalid login request!!!!');
  });
  
  test('should handle malformed JSON in book creation', async ({ apiClient, testData }) => {
    test.skip(!testData.accessToken, 'Skipping test as no access token available');
    
    Logger.trace('Testing book creation with malformed JSON....');
    
    const invalidBookRequest = {
      // Missing required fields
      title: 'Test Book'
      // Missing author, description, price
    };
    
    const headers = {
      'Authorization': `Bearer ${testData.accessToken}`
    };
    
    const response = await apiClient.post(endpoints.CREATE_BOOK, invalidBookRequest, 422, headers);
    const errorResponse = await response.json();
    
    Assertions.assertContains(errorResponse, 'detail', 'Validating error response contains detail');
    
    Logger.trace('Correctly handled invalid book creation request!!!!');
  });
});
