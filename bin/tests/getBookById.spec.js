const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');

test.describe('Get Book By ID Tests', () => {
  test('should get book by ID successfully', async ({ apiClient, testData }) => {
    test.skip(!testData.bookId, 'Skipping test as no book ID available');
    
    Logger.trace(`Getting book with ID: ${testData.bookId}....`);
    
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
  
  test('should return 404 for non-existent book ID', async ({ apiClient }) => {
    Logger.trace('Attempting to get non-existent book....');
    
    const nonExistentId = 99999;
    const endpoint = endpoints.GET_BOOK.replace('{bookId}', nonExistentId);
    
    const response = await apiClient.get(endpoint, 404);
    const errorResponse = await response.json();
    
    Assertions.assertContains(errorResponse, 'detail', 'Validating error response contains detail');
    
    Logger.trace('Correctly returned 404 for non-existent book!!!!');
  });
  
  test('should handle invalid book ID format', async ({ apiClient }) => {
    Logger.trace('Attempting to get book with invalid ID format....');
    
    const invalidId = 'invalid-id';
    const endpoint = endpoints.GET_BOOK.replace('{bookId}', invalidId);
    
    const response = await apiClient.get(endpoint, 422);
    const errorResponse = await response.json();
    
    Assertions.assertContains(errorResponse, 'detail', 'Validating error response contains detail');
    
    Logger.trace('Correctly handled invalid book ID format!!!!');
  });
});
