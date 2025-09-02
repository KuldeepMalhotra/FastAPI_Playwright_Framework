const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');
const AllureAnnotations = require('../utils/allureAnnotations');

test.describe('Get Book By ID Tests', () => {
  test('Validates successful API response when retrieving a book by ID', async ({ apiClient, testData }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Ensures a specific book can be fetched successfully using its ID'),
      AllureAnnotations.addStory('As a user, I want to view details of a specific book'),
      AllureAnnotations.addSeverity('medium'),
      ...AllureAnnotations.getCRUDAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    test.skip(!testData.bookId, 'Skipping test as no book ID available');
    
    Logger.trace(`Book with ID: ${testData.bookId}....`);
    
    const endpoint = endpoints.GET_BOOK.replace('{bookId}', testData.bookId);
    const response = await apiClient.get(endpoint, 200);
    const bookResponse = await response.json();
    
    // Validate response
    Assertions.assertEquals(bookResponse.id, testData.bookId, 'Validating book ID');
    Assertions.assertNotNull(bookResponse.title, 'Validating book title is not null');
    Assertions.assertNotNull(bookResponse.author, 'Validating book author is not null');
    Assertions.assertNotNull(bookResponse.description, 'Validating book description is not null');
    Assertions.assertNotNull(bookResponse.price, 'Validating book price is not null');
    
    // Validate headers
    const serverHeader = response.headers()['server'];
    const contentTypeHeader = response.headers()['content-type'];
    
    Assertions.assertEquals(serverHeader, 'uvicorn', 'Validating Server header');
    Assertions.assertEquals(contentTypeHeader, 'application/json', 'Validating Content-Type header');
    
    Logger.trace(`Successfully retrieved book with ID: ${testData.bookId}!!!!`);
  });
  
  test('Validates error handling for requests with non-existent book IDs', async ({ apiClient }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Verifies 404 response for a non-existent book ID'),
      AllureAnnotations.addStory('As a system, I want to return appropriate error for non-existent resources'),
      AllureAnnotations.addSeverity('medium'),
      ...AllureAnnotations.getCRUDAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('Trying to fetch details of a non-existent book....');
    
    const nonExistentId = 99999;
    const endpoint = endpoints.GET_BOOK.replace('{bookId}', nonExistentId);
    
    const response = await apiClient.get(endpoint, 404);
    const errorResponse = await response.json();
    
    Assertions.assertContains(errorResponse, 'detail', 'Validating error response contains detail');
    
    Logger.trace('Returned 404 as expected for non-existent book!!!!');
  });
  
  test('Validates proper error handling when book ID format is invalid', async ({ apiClient }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Validates proper error handling when book ID format is invalid'),
      AllureAnnotations.addStory('As a system, I want to validate input format and return appropriate errors'),
      AllureAnnotations.addSeverity('low'),
      ...AllureAnnotations.getCRUDAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('Trying to fetch book details with invalid ID structure....');
    
    const invalidId = 'invalid-id';
    const endpoint = endpoints.GET_BOOK.replace('{bookId}', invalidId);
    
    const response = await apiClient.get(endpoint, 422);
    const errorResponse = await response.json();
    
    Assertions.assertContains(errorResponse, 'detail', 'Validating error response contains detail');
    
    Logger.trace('Invalid book ID format handled as expected!!!!');
  });
});
