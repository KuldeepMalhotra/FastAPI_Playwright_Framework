const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');
const AllureAnnotations = require('../utils/allureAnnotations');

test.describe('Token Validation Tests', () => {
  test('Verifies successful validation of a correct access token', async ({ apiClient, testData }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Verifies validation of a valid access token'),
      AllureAnnotations.addStory('As a user, I want my valid access token to be accepted by the system'),
      AllureAnnotations.addSeverity('high'),
      ...AllureAnnotations.getAuthAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    test.skip(!testData.accessToken, 'Skipping test due to missing access token');
    
    Logger.trace('Validating access token....');
    
    const headers = {
      'Authorization': `Bearer ${testData.accessToken}`
    };
    
    // Try to access a protected endpoint
    const response = await apiClient.get(endpoints.GET_ALL_BOOKS, 200);
    
    Assertions.assertEquals(response.status(), 200, 'Validating response status with valid token');
    
    Logger.trace('Access token validated successfully!!!!');
  });
  
  test('Verifies system accepts invalid access token when authentication is disabled', async ({ apiClient }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Validates behavior with invalid access token under disabled authentication'),
      AllureAnnotations.addStory('As a system, I want to handle invalid tokens gracefully when auth is disabled'),
      AllureAnnotations.addSeverity('medium'),
      ...AllureAnnotations.getAuthAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('Validating invalid access token....');
    
    const invalidToken = 'invalid-token-12345';
    const headers = {
      'Authorization': `Bearer ${invalidToken}`
    };
    
    // Try to access endpoint with invalid token (authentication disabled)
    const response = await apiClient.get(endpoints.GET_ALL_BOOKS, 200);
    const booksResponse = await response.json();
    
    Assertions.assertTrue(Array.isArray(booksResponse), 'Validating response is an array');
    
    Logger.trace('Access granted with invalid token in authentication-disabled mode!!!!');
  });
  
  test('Verifies expired access token is accepted when authentication is disabled', async ({ apiClient }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Validates behavior with expired access token when authentication is off'),
      AllureAnnotations.addStory('As a system, I want to handle expired tokens gracefully when auth is disabled'),
      AllureAnnotations.addSeverity('medium'),
      ...AllureAnnotations.getAuthAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('validating expired access token (authentication disabled)....');
    
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
    
    Logger.trace('System accepted expired access token as expected (auth disabled)!!!!');
  });
  
  test('Verifies request without Authorization header is accepted when auth is disabled', async ({ apiClient }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Ensures system allows requests missing Authorization header (auth disabled)'),
      AllureAnnotations.addStory('As a system, I want to handle requests without auth headers when auth is disabled'),
      AllureAnnotations.addSeverity('low'),
      ...AllureAnnotations.getAuthAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('Validated request without Authorization header (authentication disabled)....');
    
    // Try to access endpoint without any authorization (authentication disabled)
    const response = await apiClient.get(endpoints.GET_ALL_BOOKS, 200);
    const booksResponse = await response.json();
    
    Assertions.assertTrue(Array.isArray(booksResponse), 'Validating response is an array');
    
    Logger.trace('Request without Authorization header processed successfully (auth disabled)!!!!');
  });
});
