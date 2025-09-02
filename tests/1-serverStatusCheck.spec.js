const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');
const AllureAnnotations = require('../utils/allureAnnotations');

test.describe('Health Check Tests', () => {
  test('validate server running status', async ({ apiClient }) => {
    // Add Allure annotations using utility
    const annotations = [
      AllureAnnotations.addDescription('Checks whether the BookStore API service is operational and responding as expected'),
      AllureAnnotations.addStory('As a system administrator, I want to verify the API service is healthy'),
      ...AllureAnnotations.getHealthCheckAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('Check server running status...');
    
    const response = await apiClient.get(endpoints.HEALTH, 200);
    const responseBody = await response.json();
    
    // Validate response body
    Assertions.assertEquals(responseBody.status, 'up', 'Validating status value');
    
    // Validate headers
    const serverHeader = response.headers()['server'];
    const contentTypeHeader = response.headers()['content-type'];
    
    Assertions.assertEquals(serverHeader, 'uvicorn', 'Validating Server header');
    Assertions.assertEquals(contentTypeHeader, 'application/json', 'Validating Content-Type header');
    
    Logger.trace('Server is up and Running!!!');
  });
});
