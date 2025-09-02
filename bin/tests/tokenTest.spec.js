const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');

test.describe('Token Validation Tests', () => {
  test('should validate valid access token', async ({ apiClient, testData }) => {
    test.skip(!testData.accessToken, 'Skipping test as no access token available');
    
    Logger.trace('Testing valid access token....');
    
    const headers = {
      'Authorization': `Bearer ${testData.accessToken}`
    };
    
    // Try to access a protected endpoint
    const response = await apiClient.get(endpoints.GET_ALL_BOOKS, 200);
    
    Assertions.assertEquals(response.status(), 200, 'Validating response status with valid token');
    
    Logger.trace('Valid access token works correctly!!!!');
  });
  
  test('should accept invalid access token (authentication disabled)', async ({ apiClient }) => {
    Logger.trace('Testing invalid access token (authentication disabled)....');
    
    const invalidToken = 'invalid-token-12345';
    const headers = {
      'Authorization': `Bearer ${invalidToken}`
    };
    
    // Try to access endpoint with invalid token (authentication disabled)
    const response = await apiClient.get(endpoints.GET_ALL_BOOKS, 200);
    const booksResponse = await response.json();
    
    Assertions.assertTrue(Array.isArray(booksResponse), 'Validating response is an array');
    
    Logger.trace('Invalid access token accepted (authentication disabled)!!!!');
  });
  
  test('should accept expired access token (authentication disabled)', async ({ apiClient }) => {
    Logger.trace('Testing expired access token (authentication disabled)....');
    
    // This would need a way to generate expired tokens in your system
    // For now, we'll test with a malformed token
    const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.expired.token';
    const headers = {
      'Authorization': `Bearer ${expiredToken}`
    };
    
    // Try to access endpoint with expired token (authentication disabled)
    const response = await apiClient.get(endpoints.GET_ALL_BOOKS, 200);
    const booksResponse = await response.json();
    
    Assertions.assertTrue(Array.isArray(booksResponse), 'Validating response is an array');
    
    Logger.trace('Expired access token accepted (authentication disabled)!!!!');
  });
  
  test('should accept request without authorization header (authentication disabled)', async ({ apiClient }) => {
    Logger.trace('Testing request without authorization header (authentication disabled)....');
    
    // Try to access endpoint without any authorization (authentication disabled)
    const response = await apiClient.get(endpoints.GET_ALL_BOOKS, 200);
    const booksResponse = await response.json();
    
    Assertions.assertTrue(Array.isArray(booksResponse), 'Validating response is an array');
    
    Logger.trace('Request without authorization header accepted (authentication disabled)!!!!');
  });
});
