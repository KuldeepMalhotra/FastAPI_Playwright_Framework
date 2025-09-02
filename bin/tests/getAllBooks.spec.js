const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');

test.describe('Get All Books Tests', () => {
  test('should get all books successfully', async ({ apiClient }) => {
    Logger.trace('Getting all books from the API....');
    
    const response = await apiClient.get(endpoints.GET_ALL_BOOKS, 200);
    const booksResponse = await response.json();
    
    // Validate response structure
    Assertions.assertNotNull(booksResponse, 'Validating response is not null');
    Assertions.assertTrue(Array.isArray(booksResponse), 'Validating response is an array');
    
    // Validate headers
    const serverHeader = response.headers()['server'];
    const contentTypeHeader = response.headers()['content-type'];
    
    Assertions.assertEquals(serverHeader, 'uvicorn', 'Validating Server header');
    Assertions.assertEquals(contentTypeHeader, 'application/json', 'Validating Content-Type header');
    
    Logger.trace(`Successfully retrieved ${booksResponse.length} books!!!!`);
  });
  
  test('should handle empty books list', async ({ apiClient }) => {
    Logger.trace('Checking if books list can be empty....');
    
    const response = await apiClient.get(endpoints.GET_ALL_BOOKS, 200);
    const booksResponse = await response.json();
    
    // The response should be an array (even if empty)
    Assertions.assertTrue(Array.isArray(booksResponse), 'Validating response is an array');
    
    Logger.trace('Books list handled correctly!!!!');
  });
});
