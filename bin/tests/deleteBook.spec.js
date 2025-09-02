const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');

test.describe('Delete Book Tests', () => {
  test('should delete book successfully', async ({ apiClient }) => {
    Logger.trace('Creating a book to delete....');
    
    // First create a book
    const createBookRequest = {
      title: 'Book to Delete',
      author: 'Test Author',
      description: 'This book will be deleted',
      price: 19.99
    };
    
    const createResponse = await apiClient.post(endpoints.CREATE_BOOK, createBookRequest, 201);
    const bookResponse = await createResponse.json();
    const bookId = bookResponse.id;
    
    Logger.trace(`Deleting book with ID: ${bookId}....`);
    
    const endpoint = endpoints.DELETE_BOOK.replace('{bookId}', bookId);
    const response = await apiClient.delete(endpoint, 200);
    
    // Validate response status
    Assertions.assertEquals(response.status(), 200, 'Validating delete response status');
    
    // Validate headers
    const serverHeader = response.headers()['server'];
    
    Assertions.assertEquals(serverHeader, 'uvicorn', 'Validating Server header');
    
    Logger.trace(`Successfully deleted book with ID: ${bookId}!!!!`);
  });
  
  test('should delete book without authentication (authentication disabled)', async ({ apiClient }) => {
    Logger.trace('Creating a book to delete without authentication....');
    
    // First create a book
    const createBookRequest = {
      title: 'Book to Delete Without Auth',
      author: 'Test Author',
      description: 'This book will be deleted without authentication',
      price: 29.99
    };
    
    const createResponse = await apiClient.post(endpoints.CREATE_BOOK, createBookRequest, 201);
    const bookResponse = await createResponse.json();
    const bookId = bookResponse.id;
    
    Logger.trace(`Attempting to delete book without authentication (authentication disabled)....`);
    
    const endpoint = endpoints.DELETE_BOOK.replace('{bookId}', bookId);
    const response = await apiClient.delete(endpoint, 200);
    
    // Validate response status
    Assertions.assertEquals(response.status(), 200, 'Validating delete response status');
    
    Logger.trace('Book deleted without authentication (authentication disabled)!!!!');
  });
  
  test('should not delete non-existent book', async ({ apiClient }) => {
    Logger.trace('Attempting to delete non-existent book....');
    
    const nonExistentId = 99999;
    
    const endpoint = endpoints.DELETE_BOOK.replace('{bookId}', nonExistentId);
    const response = await apiClient.delete(endpoint, 404);
    const errorResponse = await response.json();
    
    Assertions.assertContains(errorResponse, 'detail', 'Validating error response contains detail');
    
    Logger.trace('Correctly failed to delete non-existent book!!!!');
  });
});
