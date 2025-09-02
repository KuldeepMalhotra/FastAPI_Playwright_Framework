const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');
const DataGenerator = require('../utils/dataGenerator');

test.describe('Create Book Tests', () => {
  test('should create a new book successfully', async ({ apiClient, testData }) => {
    test.skip(!testData.accessToken, 'Skipping test as no access token available');
    
    Logger.trace('Creating a new book....');
    
    const createBookRequest = {
      title: DataGenerator.randomBookTitle(),
      author: DataGenerator.randomBookAuthor(),
      description: DataGenerator.randomBookDescription(),
      price: DataGenerator.randomBookPrice()
    };
    
    const headers = {
      'Authorization': `Bearer ${testData.accessToken}`
    };
    
    const response = await apiClient.post(endpoints.CREATE_BOOK, createBookRequest, 201, headers);
    const bookResponse = await response.json();
    
    // Store book ID for other tests
    testData.bookId = bookResponse.id;
    
    // Validate response
    Assertions.assertNotNull(bookResponse.id, 'Validating book ID is not null');
    Assertions.assertEquals(bookResponse.title, createBookRequest.title, 'Validating book title');
    Assertions.assertEquals(bookResponse.author, createBookRequest.author, 'Validating book author');
    Assertions.assertEquals(bookResponse.description, createBookRequest.description, 'Validating book description');
    Assertions.assertEquals(bookResponse.price, createBookRequest.price, 'Validating book price');
    
    // Validate headers
    const serverHeader = response.headers()['server'];
    const contentTypeHeader = response.headers()['content-type'];
    
    Assertions.assertEquals(serverHeader, 'uvicorn', 'Validating Server header');
    Assertions.assertEquals(contentTypeHeader, 'application/json', 'Validating Content-Type header');
    
    Logger.trace(`Successfully created book with ID: ${testData.bookId}!!!!`);
  });
  
  test('should create book without authentication (authentication disabled)', async ({ apiClient }) => {
    Logger.trace('Attempting to create book without authentication (authentication disabled)....');
    
    const createBookRequest = {
      title: DataGenerator.randomBookTitle(),
      author: DataGenerator.randomBookAuthor(),
      description: DataGenerator.randomBookDescription(),
      price: DataGenerator.randomBookPrice()
    };
    
    const response = await apiClient.post(endpoints.CREATE_BOOK, createBookRequest, 201);
    const bookResponse = await response.json();
    
    // Validate response
    Assertions.assertNotNull(bookResponse.id, 'Validating book ID is not null');
    Assertions.assertEquals(bookResponse.title, createBookRequest.title, 'Validating book title');
    Assertions.assertEquals(bookResponse.author, createBookRequest.author, 'Validating book author');
    Assertions.assertEquals(bookResponse.description, createBookRequest.description, 'Validating book description');
    Assertions.assertEquals(bookResponse.price, createBookRequest.price, 'Validating book price');
    
    Logger.trace('Book created without authentication as expected (authentication disabled)!!!!');
  });
});
