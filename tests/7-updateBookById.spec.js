const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');
const DataGenerator = require('../utils/dataGenerator');
const AllureAnnotations = require('../utils/allureAnnotations');

test.describe('Update Book Tests', () => {
  test('Verifies successful update of book information with proper input', async ({ apiClient }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Ensures a book can be updated correctly using valid data'),
      AllureAnnotations.addStory('As a user, I want to update existing book information'),
      AllureAnnotations.addSeverity('high'),
      ...AllureAnnotations.getCRUDAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('Updating book information....');
    
    // First create a book
    const createBookRequest = {
      title: 'Book to Update',
      author: 'Test Author',
      description: 'This book will be updated',
      price: 25.99
    };
    
    const createResponse = await apiClient.post(endpoints.CREATE_BOOK, createBookRequest, 201);
    const bookResponse = await createResponse.json();
    const bookId = bookResponse.id;
    
    Logger.trace(`Updating book ID: ${bookId}....`);
    
    const updateBookRequest = {
      title: DataGenerator.randomBookTitle(),
      author: DataGenerator.randomBookAuthor(),
      description: DataGenerator.randomBookDescription(),
      price: DataGenerator.randomBookPrice()
    };
    
    const endpoint = endpoints.UPDATE_BOOK.replace('{bookId}', bookId);
    const response = await apiClient.put(endpoint, updateBookRequest, 200);
    const updatedBookResponse = await response.json();
    
    // Validate response
    Assertions.assertEquals(updatedBookResponse.id, bookId, 'Validating book ID');
    Assertions.assertEquals(updatedBookResponse.title, updateBookRequest.title, 'Validating updated book title');
    Assertions.assertEquals(updatedBookResponse.author, updateBookRequest.author, 'Validating updated book author');
    Assertions.assertEquals(updatedBookResponse.description, updateBookRequest.description, 'Validating updated book description');
    Assertions.assertEquals(updatedBookResponse.price, updateBookRequest.price, 'Validating updated book price');
    
    // Validate headers
    const serverHeader = response.headers()['server'];
    const contentTypeHeader = response.headers()['content-type'];
    
    Assertions.assertEquals(serverHeader, 'uvicorn', 'Validating Server header');
    Assertions.assertEquals(contentTypeHeader, 'application/json', 'Validating Content-Type header');
    
    Logger.trace(`Successfully updated book with ID: ${bookId}!!!!`);
  });
  
  test('Verifies book update without authentication when auth is disabled', async ({ apiClient }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Ensures a book can be updated without authentication if disabled'),
      AllureAnnotations.addStory('As a system, I want to allow book updates without authentication when configured'),
      AllureAnnotations.addSeverity('medium'),
      ...AllureAnnotations.getCRUDAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('updating book without authentication....');
    
    // First create a book
    const createBookRequest = {
      title: 'Book to Update Without Auth',
      author: 'Test Author',
      description: 'This book will be updated without authentication',
      price: 35.99
    };
    
    const createResponse = await apiClient.post(endpoints.CREATE_BOOK, createBookRequest, 201);
    const bookResponse = await createResponse.json();
    const bookId = bookResponse.id;
    
    Logger.trace(`update book (authentication disabled)....`);
    
    const updateBookRequest = {
      title: DataGenerator.randomBookTitle(),
      author: DataGenerator.randomBookAuthor(),
      description: DataGenerator.randomBookDescription(),
      price: DataGenerator.randomBookPrice()
    };
    
    const endpoint = endpoints.UPDATE_BOOK.replace('{bookId}', bookId);
    const response = await apiClient.put(endpoint, updateBookRequest, 200);
    const updatedBookResponse = await response.json();
    
    // Validate response
    Assertions.assertEquals(updatedBookResponse.id, bookId, 'Validating book ID');
    Assertions.assertEquals(updatedBookResponse.title, updateBookRequest.title, 'Validating updated book title');
    
    Logger.trace('Book updated without authentication (authentication disabled)!!!!');
  });
  
  test('Verifies that updating a non-existent book fails', async ({ apiClient }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Ensures system does not allow updating a missing book'),
      AllureAnnotations.addStory('As a system, I want to return appropriate error for non-existent resources during update'),
      AllureAnnotations.addSeverity('medium'),
      ...AllureAnnotations.getCRUDAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('updating non-existent book....');
    
    const nonExistentId = 99999;
    const updateBookRequest = {
      title: DataGenerator.randomBookTitle(),
      author: DataGenerator.randomBookAuthor(),
      description: DataGenerator.randomBookDescription(),
      price: DataGenerator.randomBookPrice()
    };
    
    const endpoint = endpoints.UPDATE_BOOK.replace('{bookId}', nonExistentId);
    const response = await apiClient.put(endpoint, updateBookRequest, 404);
    const errorResponse = await response.json();
    
    Assertions.assertContains(errorResponse, 'detail', 'Validating error response');
    
    Logger.trace('Failed to update non-existent book!!!!');
  });
});
