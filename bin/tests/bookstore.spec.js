const { test } = require('./fixtures');
const endpoints = require('../utils/endpoints');
const Assertions = require('../utils/assertions');
const Logger = require('../utils/logger');
const DataGenerator = require('../utils/dataGenerator');

test.describe('BookStore API Complete Test Suite', () => {
  test.describe.configure({ mode: 'serial' }); // Run tests sequentially to maintain state
  
  test('1. Health Check - should validate service health', async ({ apiClient }) => {
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
  
  test('2. User Signup - should create new user successfully', async ({ apiClient, testData }) => {
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
  
  test('3. User Signup - should not create user with existing email and id', async ({ apiClient, testData }) => {
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
  
  test('4. Login - should login and get access token', async ({ apiClient, testData }) => {
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
  
  test('5. Get All Books - should get all books successfully', async ({ apiClient }) => {
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
  
  test('6. Create Book - should create a new book successfully', async ({ apiClient, testData }) => {
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
  
  test('7. Get Book By ID - should get book by ID successfully', async ({ apiClient, testData }) => {
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
  
  test('8. Update Book - should update book successfully', async ({ apiClient, testData }) => {
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
  
  test('9. Delete Book - should delete book successfully', async ({ apiClient, testData }) => {
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
  
  test('10. Token Validation - should validate valid access token', async ({ apiClient, testData }) => {
    Logger.trace('Testing valid access token....');
    
    const headers = {
      'Authorization': `Bearer ${testData.accessToken}`
    };
    
    const response = await apiClient.get(endpoints.GET_ALL_BOOKS, 200);
    
    Assertions.assertEquals(response.status(), 200, 'Validating response status with valid token');
    
    Logger.trace('Valid access token works correctly!!!!');
  });
});
