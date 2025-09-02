const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');
const DataGenerator = require('../utils/dataGenerator');

test.describe('Update Book Tests', () => {
  test('should update book successfully', async ({ apiClient }) => {
    Logger.trace('Creating a book to update....');
    
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
    
    Logger.trace(`Updating book with ID: ${bookId}....`);
    
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
  
  test('should update book without authentication (authentication disabled)', async ({ apiClient }) => {
    Logger.trace('Creating a book to update without authentication....');
    
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
    
    Logger.trace(`Attempting to update book without authentication (authentication disabled)....`);
    
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
  
  test('should not update non-existent book', async ({ apiClient }) => {
    Logger.trace('Attempting to update non-existent book....');
    
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
    
    Assertions.assertContains(errorResponse, 'detail', 'Validating error response contains detail');
    
    Logger.trace('Correctly failed to update non-existent book!!!!');
  });
});
