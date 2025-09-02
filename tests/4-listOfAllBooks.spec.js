const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');
const AllureAnnotations = require('../utils/allureAnnotations');

test.describe('All Books Tests', () => {
  test('Verifies successful retrieval of all books', async ({ apiClient }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Checks that all books can be fetched successfully'),
      AllureAnnotations.addStory('As a user, I want to view all available books in the system'),
      AllureAnnotations.addSeverity('medium'),
      ...AllureAnnotations.getCRUDAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('Validates API response for retrieving all available books....');
    
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
  
  test('Verifies that an empty list of books is processed correctly', async ({ apiClient }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Ensures API returns a valid response when no books are available'),
      AllureAnnotations.addStory('As a system, I want to handle cases where no books exist'),
      AllureAnnotations.addSeverity('low'),
      ...AllureAnnotations.getCRUDAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('Validates proper handling of scenarios with no books....');
    
    const response = await apiClient.get(endpoints.GET_ALL_BOOKS, 200);
    const booksResponse = await response.json();
    
    // The response should be an array (even if empty)
    Assertions.assertTrue(Array.isArray(booksResponse), 'Validating response is an array');
    
    Logger.trace('Books list is processed correctly!!!!');
  });
});
