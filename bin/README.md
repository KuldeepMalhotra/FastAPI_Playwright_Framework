# BookStore API Test Suite - Playwright JavaScript

This project is a complete conversion of the original Java/TestNG BookStore API test suite to Playwright with JavaScript. It provides comprehensive API testing for a BookStore REST API with modern testing practices and excellent reporting.

## 🚀 Features

- **Complete API Test Coverage**: All CRUD operations for books and user management
- **Modern Testing Framework**: Built with Playwright for reliable and fast API testing
- **Comprehensive Assertions**: Custom assertion utilities for better test validation
- **Data Generation**: Random test data generation using Faker.js
- **Environment Configuration**: Support for multiple environments (QA, Dev, Prod)
- **Detailed Logging**: Comprehensive logging for debugging and reporting
- **HTML Reports**: Beautiful HTML test reports with Playwright's built-in reporter
- **Parallel Execution**: Tests can run in parallel for faster execution
- **State Management**: Shared test data across test cases

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn package manager
- Access to the BookStore API (local or remote)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RestAssureFastAPI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npm run install-browsers
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory or use the existing `config.js`:

```bash
# Environment Configuration
ENV=prod

# QA Environment
QA_URL=http://127.0.0.1:8000/
QA_EMAIL=kuldeep@test.com
QA_PASSWORD=kuldeep@123

# Dev Environment
DEV_URL=http://127.0.0.1:8001/
DEV_EMAIL=kuldeep@test.com
DEV_PASSWORD=kuldeep@123

# Production Environment
PROD_URL=https://67afc96622a523c521947755f0679777.serveo.net
PROD_EMAIL=pkuldeep@test.com
PROD_PASSWORD=kuldeep@123

# Default Base URL
BASE_URL=http://127.0.0.1:8000
```

### Playwright Configuration

The `playwright.config.js` file contains:
- Test directory configuration
- Browser settings
- Reporter configuration
- Base URL settings
- Screenshot and video capture settings

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests with UI
```bash
npm run test:ui
```

### Run Tests in Headed Mode
```bash
npm run test:headed
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### View Test Reports
```bash
npm run report
```

## 📁 Project Structure

```
RestAssureFastAPI/
├── tests/                          # Test files
│   ├── fixtures.js                 # Test fixtures and setup
│   ├── bookstore.spec.js           # Complete test suite
│   ├── healthCheck.spec.js         # Health check tests
│   ├── createUserSignup.spec.js    # User signup tests
│   ├── loginForAccessToken.spec.js # Login tests
│   ├── getAllBooks.spec.js         # Get all books tests
│   ├── createBook.spec.js          # Create book tests
│   ├── getBookById.spec.js         # Get book by ID tests
│   ├── updateBook.spec.js          # Update book tests
│   ├── deleteBook.spec.js          # Delete book tests
│   ├── incorrectJsonFormat.spec.js # Invalid JSON tests
│   └── tokenTest.spec.js           # Token validation tests
├── utils/                          # Utility files
│   ├── apiClient.js                # HTTP client for API requests
│   ├── assertions.js               # Custom assertion utilities
│   ├── dataGenerator.js            # Test data generation
│   ├── endpoints.js                # API endpoint definitions
│   └── logger.js                   # Logging utilities
├── config.js                       # Configuration file
├── package.json                    # Project dependencies
├── playwright.config.js            # Playwright configuration
└── README.md                       # This file
```

## 🔧 Test Utilities

### ApiClient
- Handles HTTP requests (GET, POST, PUT, DELETE)
- Automatic status code validation
- Header management
- Base URL configuration

### Assertions
- Custom assertion methods for better test readability
- Automatic logging of assertion results
- Integration with Playwright's expect

### DataGenerator
- Random email generation
- Random ID generation
- Random password generation
- Random book data generation

### Logger
- Structured logging with timestamps
- Different log levels (INFO, ERROR, WARN, DEBUG, TRACE)
- Environment-aware logging

## 📊 Test Coverage

The test suite covers:

1. **Health Check** - API service availability
2. **User Management** - Signup and duplicate user handling
3. **Authentication** - Login and token generation
4. **Book Operations** - CRUD operations for books
5. **Error Handling** - Invalid requests and edge cases
6. **Token Validation** - Authentication token verification

## 🚦 Test Execution Order

Tests are designed to run sequentially to maintain state:
1. Health Check
2. User Signup
3. Duplicate User Test
4. Login
5. Get All Books
6. Create Book
7. Get Book By ID
8. Update Book
9. Delete Book
10. Token Validation

## 📈 Reporting

Playwright provides multiple reporting options:
- **HTML Reports**: Beautiful, interactive HTML reports
- **JSON Reports**: Machine-readable test results
- **JUnit Reports**: CI/CD integration compatible
- **Console Output**: Real-time test execution logs

## 🔍 Debugging

### Debug Mode
```bash
npm run test:debug
```

### Console Logs
All tests include comprehensive logging using the Logger utility.

### Screenshots and Videos
Automatically captured on test failures for debugging.

## 🚀 CI/CD Integration

The project is ready for CI/CD integration with:
- JUnit XML reports
- JSON test results
- Environment variable support
- Headless execution support

## 📝 Migration Notes

This project was converted from:
- **Original**: Java + TestNG + Rest Assured
- **New**: JavaScript + Playwright + Node.js

### Key Changes:
- Replaced Java POJOs with JavaScript objects
- Converted TestNG annotations to Playwright test structure
- Replaced Rest Assured with Playwright's request API
- Converted Java assertions to Playwright expect statements
- Maintained the same test logic and validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include test logs and error messages

## 🔄 Updates

Keep dependencies updated:
```bash
npm update
npm audit fix
```


