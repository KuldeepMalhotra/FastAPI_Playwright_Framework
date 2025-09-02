# FastAPI Playwright Framework - BookStore API Test Suite

This project is a complete conversion of the original Java/TestNG BookStore API test suite to Playwright with JavaScript. It provides comprehensive API testing for a BookStore REST API with modern testing practices and excellent reporting.

## 🚀 Features

- **Complete API Test Coverage**: All CRUD operations for books and user management
- **Modern Testing Framework**: Built with Playwright for reliable and fast API testing
- **Comprehensive Assertions**: Custom assertion utilities for better test validation
- **Data Generation**: Random test data generation using Faker.js
- **Environment Configuration**: Support for multiple environments (QA, Dev, Prod)
- **Detailed Logging**: Comprehensive logging for debugging and reporting
- **HTML Reports**: Beautiful HTML test reports with Playwright's built-in reporter
- **Sequential Execution**: Tests run sequentially with 1 worker for reliable state management
- **State Management**: Shared test data across test cases
- **Allure Reporting**: Enhanced test result visualization and analysis

## 📋 Prerequisites

- JavaScript (Node.js 16+)
- Playwright 1.40.0+
- npm or yarn package manager
- Access to the BookStore API (local or remote)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FastAPI_Playwright_Framework
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
ENV=qa

# QA Environment
QA_URL=http://127.0.0.1:8000/
QA_EMAIL=kuldeep@test.com
QA_PASSWORD=kuldeep@123

# Dev Environment
DEV_URL=http://127.0.0.1:1/
DEV_EMAIL=kuldeep@test.com
DEV_PASSWORD=kuldeep@1234


# Default Base URL
BASE_URL=http://127.0.0.1:8000
```

### Playwright Configuration

The `playwright.config.js` file contains:
- Test directory configuration
- Single worker execution for sequential test runs
- Browser settings
- Reporter configuration (HTML, JSON, JUnit, Allure)
- Base URL settings
- Screenshot and video capture settings
- Trace collection on retry

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

### Run Tests with Allure
```bash
# Run tests and generate Allure report
npm run test:allure

# Run tests with interactive Allure setup
npm run test:allure:full
```

## 📊 Allure Reporting

This project includes **Allure reporting** for enhanced test result visualization and analysis.

### Allure Commands
```bash
# Generate HTML report
npm run allure:generate

# Open generated report
npm run allure:open

# Serve report dynamically (auto-refresh)
npm run allure:serve

# Clean allure-results directory
rm -rf allure-results/*
```

### Allure Features
- **Rich Test Reports**: Beautiful HTML reports with detailed test information
- **Test Categories**: Automatic categorization of test results
- **Attachments**: Screenshots, videos, and other files
- **Environment Information**: Track test environment details
- **Trend Analysis**: Historical test execution data
- **Custom Annotations**: Enhanced test metadata and categorization

For detailed Allure documentation, see [ALLURE_README.md](./ALLURE_README.md).

### View Test Reports
```bash
npm run report
```

## 📁 Project Structure

```
FastAPI_Playwright_Framework/
├── tests/                          # Test files (sequentially ordered)
│   ├── fixtures.js                 # Test fixtures and setup
│   ├── 1-healthCheck.spec.js       # Health check tests
│   ├── 2-createUserSignUp.spec.js  # User signup tests
│   ├── 3-loginForAccessToken.spec.js # Login tests
│   ├── 4-getAllBooks.spec.js       # Get all books tests
│   ├── 5-CreateBook.spec.js        # Create book tests
│   ├── 6-getBookById.spec.js       # Get book by ID tests
│   ├── 7-updateBook.spec.js        # Update book tests
│   ├── 8-deleteBook.spec.js        # Delete book tests
│   ├── 9-tokenTest.spec.js         # Token validation tests
│   ├── 10-incorrectJsonFormat.spec.js # Invalid JSON tests
│   └── bookstore.spec.js           # Complete test suite
├── utils/                          # Utility files
│   ├── apiClient.js                # HTTP client for API requests
│   ├── assertions.js               # Custom assertion utilities
│   ├── dataGenerator.js            # Test data generation
│   ├── endpoints.js                # API endpoint definitions
│   ├── logger.js                   # Logging utilities
│   └── allureAnnotations.js        # Allure annotation utilities
├── allure-results/                 # Allure test results
├── allure-report/                  # Generated Allure reports
├── config.js                       # Configuration file
├── package.json                    # Project dependencies
├── playwright.config.js            # Playwright configuration
├── ALLURE_README.md                # Allure documentation
├── ALLURE_ANNOTATIONS_SUMMARY.md   # Allure annotations guide
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

### Allure Annotations
- Enhanced test metadata
- Custom test categories
- Rich test descriptions
- Environment tracking

## 📊 Test Coverage

The test suite covers:

1. **Health Check** - API service availability
2. **User Management** - Signup and duplicate user handling
3. **Authentication** - Login and token generation
4. **Book Operations** - CRUD operations for books
5. **Error Handling** - Invalid requests and edge cases
6. **Token Validation** - Authentication token verification

## 🚦 Test Execution Order

Tests are designed to run sequentially to maintain state with 1 worker:
1. Health Check
2. User Signup
3. Login
4. Get All Books
5. Create Book
6. Get Book By ID
7. Update Book
8. Delete Book
9. Token Validation
10. Invalid JSON Format Handling

**Note**: Tests run with `workers: 1` for reliable state management and sequential execution.

## 📈 Reporting

Playwright provides multiple reporting options:
- **HTML Reports**: Beautiful, interactive HTML reports
- **JSON Reports**: Machine-readable test results
- **JUnit Reports**: CI/CD integration compatible
- **Allure Reports**: Enhanced test visualization and analysis
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

### Trace Collection
Traces are collected on test retries for detailed debugging.

## 🚀 CI/CD Integration

The project is ready for CI/CD integration with:
- JUnit XML reports
- JSON test results
- Environment variable support
- Headless execution support
- Allure report generation

## 📄 License

This project is licensed under the MIT License.

## 🚨 Potential Issues & Solutions

### 1. Async/Await
- **Issue**: JavaScript requires async/await for HTTP requests
- **Solution**: Wrap all HTTP calls in async functions

### 2. Type Safety
- **Issue**: JavaScript lacks Java's type safety
- **Solution**: Use JSDoc comments or TypeScript for better type checking

### 3. Error Handling
- **Issue**: Different error handling patterns
- **Solution**: Use try-catch blocks and Playwright's built-in error handling

### 4. Test Order
- **Issue**: Playwright runs tests in parallel by default
- **Solution**: Use `test.describe.configure({ mode: 'serial' })` for sequential execution

## 📈 Performance Improvements

- Test execution time: ~15-25 seconds
- Memory usage: ~100-150MB
- Setup time: ~5-8 seconds

## 🔄 Updates

Keep dependencies updated:
```bash
npm update
npm audit fix
```

## 🧹 Maintenance

### Clean Allure Results
```bash
# Clean allure-results directory
rm -rf allure-results/*

# Clean allure-report directory
rm -rf allure-report/*
```

### Reset Test State
```bash
# Clean test results
rm -rf test-results/*
rm -rf playwright-report/*
```

### Browser Updates
```bash
npx playwright install
```

## 🆘 Support

For issues and questions:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include test logs and error messages
4. Use Playwright's debugging tools

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Node.js Documentation](https://nodejs.org/)
- [Faker.js Documentation](https://fakerjs.dev/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
