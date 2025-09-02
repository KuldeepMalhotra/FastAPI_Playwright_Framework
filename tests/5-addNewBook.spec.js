const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');
const DataGenerator = require('../utils/dataGenerator');
const AllureAnnotations = require('../utils/allureAnnotations');

test.describe('Add New Book Tests', () => {
  test('Verifies a book can be created successfully when authenticated with valid input', async ({ apiClient, testData }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Checks successful book creation using valid details and authentication'),
      AllureAnnotations.addStory('As a user, I want to create a new book in the system'),
      AllureAnnotations.addSeverity('high'),
      ...AllureAnnotations.getCRUDAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    test.skip(!testData.accessToken, 'Skipping this test due to missing access token');
    
    Logger.trace('Adding a new book....');
    
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
  
  test('Verifies system allows book creation when authentication is disabled', async ({ apiClient }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Verifies book creation is possible without authentication when it is disabled'),
      AllureAnnotations.addStory('As a system, I want to allow book creation without authentication when configured'),
      AllureAnnotations.addSeverity('medium'),
      ...AllureAnnotations.getCRUDAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('Tries to create a book without authentication (auth disabled scenario)....');
    
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
    
    Logger.trace('Book successfully created without authentication (auth disabled scenario)!!!!');
  });
});
