const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');
const config = require('../config');

test.describe('Login Tests', () => {
  test('should login and get access token', async ({ apiClient, testData }) => {
    Logger.trace('Creating a user to login with....');
    
    // First create a user with unique data
    const uniqueId = Math.floor(Math.random() * 100000);
    const uniqueEmail = `testuser${uniqueId}@example.com`;
    const signupRequest = {
      id: uniqueId,
      email: uniqueEmail,
      password: 'testpassword123'
    };
    
    const signupResponse = await apiClient.post(endpoints.SIGNUP, signupRequest, 200);
    const signupResult = await signupResponse.json();
    
    Logger.trace('Logging in to get access token....');
    
    const loginRequest = {
      email: signupRequest.email,
      password: signupRequest.password
    };
    
    const response = await apiClient.post(endpoints.LOGIN, loginRequest, 200);
    const loginResponse = await response.json();
    
    // Store access token for other tests
    testData.accessToken = loginResponse.access_token;
    
    Assertions.assertNotNull(testData.accessToken, 'Validating access token is not null');
    Assertions.assertContains(loginResponse, 'access_token', 'Validating response contains access_token');
    
    // Validate headers
    const serverHeader = response.headers()['server'];
    const contentTypeHeader = response.headers()['content-type'];
    
    Assertions.assertEquals(serverHeader, 'uvicorn', 'Validating Server header');
    Assertions.assertEquals(contentTypeHeader, 'application/json', 'Validating Content-Type header');
    
    Logger.trace('Successfully logged in and got access token!!!!');
  });
  
  test('should not login with invalid credentials', async ({ apiClient }) => {
    Logger.trace('Attempting login with invalid credentials....');
    
    const invalidLoginRequest = {
      email: 'invalid@email.com',
      password: 'wrongpassword'
    };
    
    const response = await apiClient.post(endpoints.LOGIN, invalidLoginRequest, 401);
    const errorResponse = await response.json();
    
    Assertions.assertContains(errorResponse, 'detail', 'Validating error response contains detail');
    
    Logger.trace('Login failed with invalid credentials as expected!!!!');
  });
});
