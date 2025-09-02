# Allure Reporting Integration - FastAPI Playwright Framework

This project now includes Allure reporting for enhanced test result visualization and analysis.

## What is Allure?

Allure is a flexible, lightweight multi-language test reporting tool that provides detailed test reports with rich visualizations. It helps teams understand test results better and provides insights into test execution.

## Features

- **Rich Test Reports**: Beautiful HTML reports with detailed test information
- **Test Categories**: Automatic categorization of test results (passed, failed, skipped, broken)
- **Attachments**: Screenshots, videos, and other files attached to test results
- **Environment Information**: Track test environment details
- **Trend Analysis**: Historical test execution data
- **Integration**: Works seamlessly with Playwright

## Installation

The required packages are already installed:

```bash
npm install --save-dev allure-playwright allure-commandline
```

## Usage

### Running Tests with Allure

1. **Run tests and generate Allure results:**
   ```bash
   npm run test:allure
   ```

2. **Run tests only (results will be generated):**
   ```bash
   npm test
   ```

### Viewing Allure Reports

1. **Generate HTML report:**
   ```bash
   npm run allure:generate
   ```

2. **Open generated report:**
   ```bash
   npm run allure:open
   ```

3. **Serve report dynamically (recommended for development):**
   ```bash
   npm run allure:serve
   ```

## Available Scripts

- `npm run test:allure` - Run tests and generate Allure report
- `npm run allure:generate` - Generate HTML report from results
- `npm run allure:open` - Open generated HTML report
- `npm run allure:serve` - Serve report dynamically (auto-refresh)

## Report Structure

The Allure report includes:

- **Overview**: Summary of test execution
- **Categories**: Test result categorization
- **Suites**: Test suite organization
- **Timeline**: Test execution timeline
- **Trends**: Historical test execution data
- **Attachments**: Screenshots, videos, and other files

## Configuration

### Allure Properties (`allure.properties`)

- `allure.results.directory`: Directory for test results
- `allure.report.directory`: Directory for generated reports
- `allure.report.title`: Custom report title
- `allure.environment`: Environment information

### Categories (`allure-categories.json`)

Custom categories for organizing test results:
- Ignored tests (skipped)
- Product defects (failed)
- Test defects (broken)
- Warnings (unknown)

## Integration with Playwright

The Allure reporter is configured in `playwright.config.js`:

```javascript
reporter: [
  ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ['json', { outputFile: 'test-results/results.json' }],
  ['junit', { outputFile: 'test-results/results.xml' }],
  ['allure-playwright', { outputFolder: 'allure-results' }]
],
```

## Best Practices

1. **Run tests first**: Always run tests before generating reports
2. **Use serve mode**: Use `allure:serve` for development (auto-refresh)
3. **Clean results**: The `--clean` flag removes old results automatically
4. **Version control**: Results and reports are excluded from git (see `.gitignore`)

## Troubleshooting

### Common Issues

1. **No results generated**: Ensure tests have run successfully
2. **Report not opening**: Check if `allure-commandline` is properly installed
3. **Permission errors**: Use local installation instead of global

### Commands for Debugging

```bash
# Check if Allure is working
npx allure --version

# List available commands
npx allure --help

# Generate report with verbose output
npx allure generate allure-results --clean --verbose
```

## CI/CD Integration

For continuous integration, you can:

1. Run tests: `npm test`
2. Generate report: `npm run allure:generate`
3. Archive report: `allure-report/` directory
4. Serve report: Use a web server to host the generated HTML

## Additional Resources

- [Allure Documentation](https://docs.qameta.io/allure/)
- [Allure Playwright Integration](https://github.com/allure-framework/allure-js/tree/master/packages/allure-playwright)
- [Playwright Test Reporters](https://playwright.dev/docs/test-reporters)
