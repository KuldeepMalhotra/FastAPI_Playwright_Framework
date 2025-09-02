const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');
const DataGenerator = require('../utils/dataGenerator');
const AllureAnnotations = require('../utils/allureAnnotations');

test.describe('User Signup Tests', () => {
  test('Creating user with new email and id', async ({ apiClient, testData }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Checks successful registration when valid credentials are provided'),
      AllureAnnotations.addStory('As a new user, I want to create an account in the system'),
      AllureAnnotations.addSeverity('high'),
      ...AllureAnnotations.getAuthAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('Signning Up with email ID and password....');
    
    testData.newEmail = DataGenerator.randomEmail();
    testData.newId = DataGenerator.randomID();
    testData.newPwd = DataGenerator.randomPwd();
    
    const createUserSignupRequest = {
      id: testData.newId,
      email: testData.newEmail,
      password: testData.newPwd
    };
    
    Logger.trace(`User created with random email as ${testData.newEmail} and random ID as ${testData.newId}!!!!`);
    
    Logger.trace('Creating a new user....');
    
    const response = await apiClient.post(endpoints.SIGNUP, createUserSignupRequest, 200);
    const messageResponse = await response.json();
    
    Assertions.assertEquals(messageResponse.message, 'User created successfully', 'Validating message value');
    
    // Validate headers
    const serverHeader = response.headers()['server'];
    const contentTypeHeader = response.headers()['content-type'];
    
    Assertions.assertEquals(serverHeader, 'uvicorn', 'Validating Server header');
    Assertions.assertEquals(contentTypeHeader, 'application/json', 'Validating Content-Type header');
    
    Logger.trace('New user created!!!!');
  });
  
  test('Creating user with existing email and id', async ({ apiClient, testData }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Verifies error response when registering with already existing credentials'),
      AllureAnnotations.addStory('As a system, I want to prevent duplicate user registrations'),
      AllureAnnotations.addSeverity('medium'),
      ...AllureAnnotations.getAuthAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    test.skip(!testData.newEmail, 'Test skipped as prior user creation was unsuccessful');
    
    const createUserSignupRequest = {
      id: testData.newId,
      email: testData.newEmail,
      password: testData.newPwd
    };
    
    Logger.trace('Adding a user with existing email and id....');
    
    const response = await apiClient.post(endpoints.SIGNUP, createUserSignupRequest, 400);
    const detailResponse = await response.json();
    
    Assertions.assertEquals(detailResponse.detail, 'Email already registered', 'Validating detail value');
    Logger.trace('user is already registered with this email ID!!!');
  });
});
