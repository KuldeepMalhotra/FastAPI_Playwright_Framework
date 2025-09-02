#!/usr/bin/env node

/**
 * Script to run all Playwright tests and generate Allure report
 * Usage: node scripts/run-allure-tests.js
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting Allure Test Suite...\n');

try {
  // Step 1: Run all tests
  console.log('📋 Step 1: Running Playwright tests...');
  execSync('npx playwright test', { 
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..')
  });
  
  console.log('\n✅ Tests completed successfully!\n');
  
  // Step 2: Generate Allure report
  console.log('📊 Step 2: Generating Allure report...');
  execSync('npm run allure:generate', { 
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..')
  });
  
  console.log('\n✅ Allure report generated successfully!\n');
  
  // Step 3: Open Allure report
  console.log('🌐 Step 3: Opening Allure report...');
  console.log('📁 Report location: allure-report/index.html');
  console.log('🔗 You can also run: npm run allure:open');
  console.log('🌍 Or serve dynamically: npm run allure:serve\n');
  
  // Ask user if they want to open the report
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Would you like to open the Allure report now? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      try {
        execSync('npm run allure:open', { 
          stdio: 'inherit',
          cwd: path.resolve(__dirname, '..')
        });
      } catch (error) {
        console.log('❌ Failed to open report automatically. Please run: npm run allure:open');
      }
    } else {
      console.log('📋 To view the report later, run: npm run allure:open');
    }
    rl.close();
  });
  
} catch (error) {
  console.error('\n❌ Error during test execution:', error.message);
  console.log('\n💡 Troubleshooting tips:');
  console.log('   - Ensure your API server is running');
  console.log('   - Check that all dependencies are installed');
  console.log('   - Verify Playwright browsers are installed');
  console.log('   - Run: npm run install-browsers');
  process.exit(1);
}
