const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');

test.describe('Health Check Tests', () => {
  test('should validate service health', async ({ apiClient }) => {
    Logger.trace('PreRequiste- Validating if Server is up and Running...');
    
    const response = await apiClient.get(endpoints.HEALTH, 200);
    const responseBody = await response.json();
    
    // Validate response body
    Assertions.assertEquals(responseBody.status, 'up', 'Validating status value');
    
    // Validate headers
    const serverHeader = response.headers()['server'];
    const contentTypeHeader = response.headers()['content-type'];
    
    Assertions.assertEquals(serverHeader, 'uvicorn', 'Validating Server header');
    Assertions.assertEquals(contentTypeHeader, 'application/json', 'Validating Content-Type header');
    
    Logger.trace('PreRequiste- Validated Server is up and Running!!!');
  });
});
