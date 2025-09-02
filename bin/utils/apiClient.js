const { request } = require('@playwright/test');
const config = require('../config');

class ApiClient {
  constructor() {
    this.baseURL = config.baseUrl;
    this.context = null;
  }
  
  async init() {
    this.context = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }
  
  async close() {
    if (this.context) {
      await this.context.dispose();
    }
  }
  
  async get(endpoint, expectedStatus = 200) {
    if (!this.context) await this.init();
    
    const response = await this.context.get(endpoint);
    
    if (response.status() !== expectedStatus) {
      throw new Error(`Expected status ${expectedStatus}, got ${response.status()}`);
    }
    
    return response;
  }
  
  async post(endpoint, body, expectedStatus = 200, headers = {}) {
    if (!this.context) await this.init();
    
    const response = await this.context.post(endpoint, {
      data: body,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });
    
    if (response.status() !== expectedStatus) {
      throw new Error(`Expected status ${expectedStatus}, got ${response.status()}`);
    }
    
    return response;
  }
  
  async put(endpoint, body, expectedStatus = 200, headers = {}) {
    if (!this.context) await this.init();
    
    const response = await this.context.put(endpoint, {
      data: body,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });
    
    if (response.status() !== expectedStatus) {
      throw new Error(`Expected status ${expectedStatus}, got ${response.status()}`);
    }
    
    return response;
  }
  
  async delete(endpoint, expectedStatus = 200, headers = {}) {
    if (!this.context) await this.init();
    
    const response = await this.context.delete(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });
    
    if (response.status() !== expectedStatus) {
      throw new Error(`Expected status ${expectedStatus}, got ${response.status()}`);
    }
    
    return response;
  }
}

module.exports = ApiClient;
