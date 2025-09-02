const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');
const DataGenerator = require('../utils/dataGenerator');

test.describe('User Signup Tests', () => {
  test('should create new user successfully', async ({ apiClient, testData }) => {
    Logger.trace('Creating Sign Up Request with Random Email ID and Random ID....');
    
    testData.newEmail = DataGenerator.randomEmail();
    testData.newId = DataGenerator.randomID();
    testData.newPwd = DataGenerator.randomPwd();
    
    const createUserSignupRequest = {
      id: testData.newId,
      email: testData.newEmail,
      password: testData.newPwd
    };
    
    Logger.trace(`Created Sign Up Request with random email as ${testData.newEmail} and random ID as ${testData.newId}!!!!`);
    
    Logger.trace('Creating a new user....');
    
    const response = await apiClient.post(endpoints.SIGNUP, createUserSignupRequest, 200);
    const messageResponse = await response.json();
    
    Assertions.assertEquals(messageResponse.message, 'User created successfully', 'Validating message value');
    
    // Validate headers
    const serverHeader = response.headers()['server'];
    const contentTypeHeader = response.headers()['content-type'];
    
    Assertions.assertEquals(serverHeader, 'uvicorn', 'Validating Server header');
    Assertions.assertEquals(contentTypeHeader, 'application/json', 'Validating Content-Type header');
    
    Logger.trace('Created a new user!!!!');
  });
  
  test('should not create user with existing email and id', async ({ apiClient, testData }) => {
    test.skip(!testData.newEmail, 'Skipping test as no user was created in previous test');
    
    const createUserSignupRequest = {
      id: testData.newId,
      email: testData.newEmail,
      password: testData.newPwd
    };
    
    Logger.trace('Adding an existing user....');
    
    const response = await apiClient.post(endpoints.SIGNUP, createUserSignupRequest, 400);
    const detailResponse = await response.json();
    
    Assertions.assertEquals(detailResponse.detail, 'Email already registered', 'Validating detail value');
    Logger.trace('Unable to add an existing user!!!!');
  });
});
