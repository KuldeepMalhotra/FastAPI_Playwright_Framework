const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');
const AllureAnnotations = require('../utils/allureAnnotations');

test.describe('Delete Book Tests', () => {
  test('Verifies a book can be deleted correctly', async ({ apiClient }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Checks that book deletion works as expected'),
      AllureAnnotations.addStory('As a user, I want to remove books from the system'),
      AllureAnnotations.addSeverity('high'),
      ...AllureAnnotations.getCRUDAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('deleting a book....');
    
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
    
    Logger.trace(`Book with ID: ${bookId} deleted!!!!`);
  });
  
  test('Verifies successful book deletion when authentication is turned off', async ({ apiClient }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Ensures system allows book deletion without authentication if disabled)'),
      AllureAnnotations.addStory('As a system, I want to allow book deletion without authentication when configured'),
      AllureAnnotations.addSeverity('medium'),
      ...AllureAnnotations.getCRUDAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('deleting book without authentication....');
    
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
    
    Logger.trace(`Trying to delete a book without authentication since auth is off....`);
    
    const endpoint = endpoints.DELETE_BOOK.replace('{bookId}', bookId);
    const response = await apiClient.delete(endpoint, 200);
    
    // Validate response status
    Assertions.assertEquals(response.status(), 200, 'Validating delete response status');
    
    Logger.trace('Book deleted (authentication disabled)!!!!');
  });
  
  test('Verifies deletion is rejected for a non-existent book', async ({ apiClient }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Validates error response when attempting to delete a non-existent book'),
      AllureAnnotations.addStory('As a system, I want to return appropriate error for non-existent resources during deletion'),
      AllureAnnotations.addSeverity('medium'),
      ...AllureAnnotations.getCRUDAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('deleting non-existing book....');
    
    const nonExistentId = 99999;
    
    const endpoint = endpoints.DELETE_BOOK.replace('{bookId}', nonExistentId);
    const response = await apiClient.delete(endpoint, 404);
    const errorResponse = await response.json();
    
    Assertions.assertContains(errorResponse, 'detail', 'Validating error response contains detail');
    
    Logger.trace('Failed to delete a non-existent book!!!!');
  });
});
