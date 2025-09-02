const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');
const DataGenerator = require('../utils/dataGenerator');
const AllureAnnotations = require('../utils/allureAnnotations');

test.describe('BookStore API Complete Test Suite', () => {
  test.describe.configure({ mode: 'serial' }); // Run tests sequentially to maintain state
  
  test('Ensures the BookStore API is healthy and functioning correctly', async ({ apiClient }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Comprehensive health check to validate BookStore API service status'),
      AllureAnnotations.addStory('As a system administrator, I want to verify the API service is healthy before running tests'),
      AllureAnnotations.addSeverity('critical'),
      ...AllureAnnotations.getHealthCheckAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('PreRequiste- Validating if Server is up and Running...');
    
    const response = await apiClient.get(endpoints.HEALTH, 200);
    const responseBody = await response.json();
    
    Assertions.assertEquals(responseBody.status, 'up', 'Validating status value');
    
    const serverHeader = response.headers()['server'];
    const contentTypeHeader = response.headers()['content-type'];
    
    Assertions.assertEquals(serverHeader, 'uvicorn', 'Validating Server header');
    Assertions.assertEquals(contentTypeHeader, 'application/json', 'Validating Content-Type header');
    
    Logger.trace('PreRequiste- Validated Server is up and Running!!!');
  });
  
  test('Ensures user registration works with correct input data', async ({ apiClient, testData }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Tests user registration functionality with valid data'),
      AllureAnnotations.addStory('As a new user, I want to create an account in the BookStore system'),
      AllureAnnotations.addSeverity('high'),
      ...AllureAnnotations.getAuthAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('Creating Sign Up Request with Random Email ID and Random ID....');
    
    testData.newEmail = DataGenerator.randomEmail();
    testData.newId = DataGenerator.randomID();
    testData.newPwd = DataGenerator.randomPwd();
    
    const createUserSignupRequest = {
      id: testData.newId,
      email: testData.newEmail,
      password: testData.newPwd
    };
    
    Logger.trace(`Created Sign Up Request with random email as ${testData.newEmail} and random ID as ${testData.newId}!!!!`);
    
    Logger.trace('Creating a new user....');
    
    const response = await apiClient.post(endpoints.SIGNUP, createUserSignupRequest, 200);
    const messageResponse = await response.json();
    
    Assertions.assertEquals(messageResponse.message, 'User created successfully', 'Validating message value');
    
    const serverHeader = response.headers()['server'];
    const contentTypeHeader = response.headers()['content-type'];
    
    Assertions.assertEquals(serverHeader, 'uvicorn', 'Validating Server header');
    Assertions.assertEquals(contentTypeHeader, 'application/json', 'Validating Content-Type header');
    
    Logger.trace('Created a new user!!!!');
  });
  
  test('Ensures the system prevents user creation with duplicate credentials', async ({ apiClient, testData }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Tests duplicate user prevention with existing credentials'),
      AllureAnnotations.addStory('As a system, I want to prevent duplicate user registrations'),
      AllureAnnotations.addSeverity('medium'),
      ...AllureAnnotations.getAuthAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('Adding an existing user....');
    
    const createUserSignupRequest = {
      id: testData.newId,
      email: testData.newEmail,
      password: testData.newPwd
    };
    
    const response = await apiClient.post(endpoints.SIGNUP, createUserSignupRequest, 400);
    const detailResponse = await response.json();
    
    Assertions.assertEquals(detailResponse.detail, 'Email already registered', 'Validating detail value');
    Logger.trace('Unable to add an existing user!!!!');
  });
  
  test('Ensures user can log in and obtain a valid access token', async ({ apiClient, testData }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Tests user authentication and access token generation'),
      AllureAnnotations.addStory('As a user, I want to login and receive an access token for authentication'),
      AllureAnnotations.addSeverity('high'),
      ...AllureAnnotations.getAuthAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('Logging in to get access token....');
    
    const loginRequest = {
      email: testData.newEmail,
      password: testData.newPwd
    };
    
    const response = await apiClient.post(endpoints.LOGIN, loginRequest, 200);
    const loginResponse = await response.json();
    
    testData.accessToken = loginResponse.access_token;
    
    Assertions.assertNotNull(testData.accessToken, 'Validating access token is not null');
    Assertions.assertContains(loginResponse, 'access_token', 'Validating response contains access_token');
    
    const serverHeader = response.headers()['server'];
    const contentTypeHeader = response.headers()['content-type'];
    
    Assertions.assertEquals(serverHeader, 'uvicorn', 'Validating Server header');
    Assertions.assertEquals(contentTypeHeader, 'application/json', 'Validating Content-Type header');
    
    Logger.trace('Successfully logged in and got access token!!!!');
  });
  
  test('Ensures the system returns the complete list of books', async ({ apiClient }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Tests retrieval of all available books from the system'),
      AllureAnnotations.addStory('As a user, I want to view all available books in the BookStore'),
      AllureAnnotations.addSeverity('medium'),
      ...AllureAnnotations.getCRUDAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('Getting all books from the API....');
    
    const response = await apiClient.get(endpoints.GET_ALL_BOOKS, 200);
    const booksResponse = await response.json();
    
    Assertions.assertNotNull(booksResponse, 'Validating response is not null');
    Assertions.assertTrue(Array.isArray(booksResponse), 'Validating response is an array');
    
    const serverHeader = response.headers()['server'];
    const contentTypeHeader = response.headers()['content-type'];
    
    Assertions.assertEquals(serverHeader, 'uvicorn', 'Validating Server header');
    Assertions.assertEquals(contentTypeHeader, 'application/json', 'Validating Content-Type header');
    
    Logger.trace(`Successfully retrieved ${booksResponse.length} books!!!!`);
  });
  
  test('Ensures a book can be created successfully when authenticated with valid input', async ({ apiClient, testData }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Tests creation of a new book in the system'),
      AllureAnnotations.addStory('As a user, I want to add a new book to the BookStore'),
      AllureAnnotations.addSeverity('high'),
      ...AllureAnnotations.getCRUDAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
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
    
    testData.bookId = bookResponse.id;
    
    Assertions.assertNotNull(bookResponse.id, 'Validating book ID is not null');
    Assertions.assertEquals(bookResponse.title, createBookRequest.title, 'Validating book title');
    Assertions.assertEquals(bookResponse.author, createBookRequest.author, 'Validating book author');
    Assertions.assertEquals(bookResponse.description, createBookRequest.description, 'Validating book description');
    Assertions.assertEquals(bookResponse.price, createBookRequest.price, 'Validating book price');
    
    const serverHeader = response.headers()['server'];
    const contentTypeHeader = response.headers()['content-type'];
    
    Assertions.assertEquals(serverHeader, 'uvicorn', 'Validating Server header');
    Assertions.assertEquals(contentTypeHeader, 'application/json', 'Validating Content-Type header');
    
    Logger.trace(`Successfully created book with ID: ${testData.bookId}!!!!`);
  });
  
  test('Ensures a specific book can be fetched successfully using its ID', async ({ apiClient, testData }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Tests retrieval of a specific book by its ID'),
      AllureAnnotations.addStory('As a user, I want to view details of a specific book in the BookStore'),
      AllureAnnotations.addSeverity('medium'),
      ...AllureAnnotations.getCRUDAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace(`Getting book with ID: ${testData.bookId}....`);
    
    const endpoint = endpoints.GET_BOOK.replace('{bookId}', testData.bookId);
    const response = await apiClient.get(endpoint, 200);
    const bookResponse = await response.json();
    
    Assertions.assertEquals(bookResponse.id, testData.bookId, 'Validating book ID');
    Assertions.assertNotNull(bookResponse.title, 'Validating book title is not null');
    Assertions.assertNotNull(bookResponse.author, 'Validating book author is not null');
    Assertions.assertNotNull(bookResponse.description, 'Validating book description is not null');
    Assertions.assertNotNull(bookResponse.price, 'Validating book price is not null');
    
    const serverHeader = response.headers()['server'];
    const contentTypeHeader = response.headers()['content-type'];
    
    Assertions.assertEquals(serverHeader, 'uvicorn', 'Validating Server header');
    Assertions.assertEquals(contentTypeHeader, 'application/json', 'Validating Content-Type header');
    
    Logger.trace(`Successfully retrieved book with ID: ${testData.bookId}!!!!`);
  });
  
  test('Ensures a book can be updated correctly using valid data', async ({ apiClient, testData }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Tests updating of an existing book in the system'),
      AllureAnnotations.addStory('As a user, I want to modify the details of a specific book in the BookStore'),
      AllureAnnotations.addSeverity('high'),
      ...AllureAnnotations.getCRUDAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace(`Updating book with ID: ${testData.bookId}....`);
    
    const updateBookRequest = {
      title: DataGenerator.randomBookTitle(),
      author: DataGenerator.randomBookAuthor(),
      description: DataGenerator.randomBookDescription(),
      price: DataGenerator.randomBookPrice()
    };
    
    const headers = {
      'Authorization': `Bearer ${testData.accessToken}`
    };
    
    const endpoint = endpoints.UPDATE_BOOK.replace('{bookId}', testData.bookId);
    const response = await apiClient.put(endpoint, updateBookRequest, 200, headers);
    const bookResponse = await response.json();
    
    Assertions.assertEquals(bookResponse.id, testData.bookId, 'Validating book ID');
    Assertions.assertEquals(bookResponse.title, updateBookRequest.title, 'Validating updated book title');
    Assertions.assertEquals(bookResponse.author, updateBookRequest.author, 'Validating updated book author');
    Assertions.assertEquals(bookResponse.description, updateBookRequest.description, 'Validating updated book description');
    Assertions.assertEquals(bookResponse.price, updateBookRequest.price, 'Validating updated book price');
    
    const serverHeader = response.headers()['server'];
    const contentTypeHeader = response.headers()['content-type'];
    
    Assertions.assertEquals(serverHeader, 'uvicorn', 'Validating Server header');
    Assertions.assertEquals(contentTypeHeader, 'application/json', 'Validating Content-Type header');
    
    Logger.trace(`Successfully updated book with ID: ${testData.bookId}!!!!`);
  });
  
  test('Ensures a book can be deleted correctly', async ({ apiClient, testData }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Tests deletion of an existing book from the system'),
      AllureAnnotations.addStory('As a user, I want to remove a specific book from the BookStore'),
      AllureAnnotations.addSeverity('high'),
      ...AllureAnnotations.getCRUDAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace(`Deleting book with ID: ${testData.bookId}....`);
    
    const headers = {
      'Authorization': `Bearer ${testData.accessToken}`
    };
    
    const endpoint = endpoints.DELETE_BOOK.replace('{bookId}', testData.bookId);
    const response = await apiClient.delete(endpoint, 200, headers);
    
    Assertions.assertEquals(response.status(), 200, 'Validating delete response status');
    
    const serverHeader = response.headers()['server'];
    Assertions.assertEquals(serverHeader, 'uvicorn', 'Validating Server header');
    
    Logger.trace(`Successfully deleted book with ID: ${testData.bookId}!!!!`);
  });
  
  test('Ensures system accepts a valid access token', async ({ apiClient, testData }) => {
    // Add Allure annotations
    const annotations = [
      AllureAnnotations.addDescription('Tests token validation by accessing protected resources'),
      AllureAnnotations.addStory('As a user, I want to ensure my access token is valid and can access protected endpoints'),
      AllureAnnotations.addSeverity('medium'),
      ...AllureAnnotations.getAuthAnnotations()
    ];
    
    annotations.forEach(annotation => {
      test.info().annotations.push(annotation);
    });
    
    Logger.trace('Testing valid access token....');
    
    const headers = {
      'Authorization': `Bearer ${testData.accessToken}`
    };
    
    const response = await apiClient.get(endpoints.GET_ALL_BOOKS, 200);
    
    Assertions.assertEquals(response.status(), 200, 'Validating response status with valid token');
    
    Logger.trace('Valid access token works correctly!!!!');
  });
});
