#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up BookStore API Playwright Test Suite...\n');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Node.js version: ${nodeVersion}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js 16+ first.');
  process.exit(1);
}

// Check if npm is installed
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`✅ npm version: ${npmVersion}`);
} catch (error) {
  console.error('❌ npm is not installed. Please install npm first.');
  process.exit(1);
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install dependencies');
  process.exit(1);
}

// Install Playwright browsers
console.log('\n🌐 Installing Playwright browsers...');
try {
  execSync('npx playwright install --with-deps', { stdio: 'inherit' });
  console.log('✅ Playwright browsers installed successfully');
} catch (error) {
  console.error('❌ Failed to install Playwright browsers');
  process.exit(1);
}

// Create test-results directory
const testResultsDir = path.join(__dirname, '..', 'test-results');
if (!fs.existsSync(testResultsDir)) {
  fs.mkdirSync(testResultsDir, { recursive: true });
  console.log('✅ Created test-results directory');
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Update config.js with your API endpoints');
console.log('2. Set environment variables in .env file (optional)');
console.log('3. Run tests with: npm test');
console.log('4. View reports with: npm run report');
console.log('\n📚 For more information, see README.md');
