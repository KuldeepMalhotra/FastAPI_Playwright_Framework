const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');
const config = require('../config');
const AllureAnnotations = require('../utils/allureAnnotations');

test.describe('Login Tests', () => {
  test('Verifies user can log in and obtain a valid access token', async ({ apiClient, testData }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Checks successful authentication and token generation'),
      AllureAnnotations.addStory('As a user, I want to login and receive an access token for authentication'),
      AllureAnnotations.addSeverity('high'),
      ...AllureAnnotations.getAuthAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('Login with valid credentials to generate access token....');
    
    // First create a user with unique data
    const uniqueId = Math.floor(Math.random() * 100000);
    const uniqueEmail = `testuser${uniqueId}@example.com`;
    const signupRequest = {
      id: uniqueId,
      email: uniqueEmail,
      password: 'password'
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
    
    Logger.trace('Access token generated successfully!!!!');
  });
  
  test('Verifies login is rejected with incorrect username or password', async ({ apiClient }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Confirms system denies access when invalid credentials are used'),
      AllureAnnotations.addStory('As a system, I want to reject login attempts with invalid credentials'),
      AllureAnnotations.addSeverity('medium'),
      ...AllureAnnotations.getAuthAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('Login with invalid credentials....');
    
    const invalidLoginRequest = {
      email: 'invalid@email.com',
      password: 'wrongpassword'
    };
    
    const response = await apiClient.post(endpoints.LOGIN, invalidLoginRequest, 401);
    const errorResponse = await response.json();
    
    Assertions.assertContains(errorResponse, 'detail', 'Validating error response contains detail');
    
    Logger.trace('Login failed. Try again with valid credentials!!!!');
  });
});
