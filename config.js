require('dotenv').config();

const config = {
  env: process.env.ENV || 'local',
  
  qa: {
    url: process.env.QA_URL || 'http://127.0.0.1:8000/',
    email: process.env.QA_EMAIL || 'kuldeep@test.com',
    password: process.env.QA_PASSWORD || 'kuldeep@123'
  },
  
  dev: {
    url: process.env.DEV_URL || 'http://127.0.0.8001/',
    email: process.env.DEV_EMAIL || 'kuldeep@test.com',
    password: process.env.DEV_PASSWORD || 'kuldeep@1234'
  },
  
  prod: {
    url: process.env.PROD_URL || 'https://67afc96622a523c521947755f0679777.serveo.net',
    email: process.env.PROD_EMAIL || 'kuldeep@test.com',
    password: process.env.PROD_PASSWORD || 'kuldeep@12345'
  },
  
  local: {
    url: process.env.LOCAL_URL || 'http://127.0.0.1:8000/',
    email: process.env.LOCAL_EMAIL || 'kuldeep@test.com',
    password: process.env.LOCAL_PASSWORD || 'kuldeep@123'
  },
  
  get baseUrl() {
    return this[this.env].url;
  },
  
  get email() {
    return this[this.env].email;
  },
  
  get password() {
    return this[this.env].password;
  }
};

module.exports = config;
