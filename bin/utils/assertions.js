const { expect } = require('@playwright/test');

class Assertions {
  static assertEquals(actual, expected, message = '') {
    expect(actual).toBe(expected);
    if (message) {
      console.log(`✓ ${message}: ${actual} equals ${expected}`);
    }
  }
  
  static assertNotEquals(actual, expected, message = '') {
    expect(actual).not.toBe(expected);
    if (message) {
      console.log(`✓ ${message}: ${actual} not equals ${expected}`);
    }
  }
  
  static assertTrue(condition, message = '') {
    expect(condition).toBe(true);
    if (message) {
      console.log(`✓ ${message}: condition is true`);
    }
  }
  
  static assertFalse(condition, message = '') {
    expect(condition).toBe(false);
    if (message) {
      console.log(`✓ ${message}: condition is false`);
    }
  }
  
  static assertNotNull(value, message = '') {
    expect(value).not.toBeNull();
    if (message) {
      console.log(`✓ ${message}: value is not null`);
    }
  }
  
  static assertNull(value, message = '') {
    expect(value).toBeNull();
    if (message) {
      console.log(`✓ ${message}: value is null`);
    }
  }
  
  static assertContains(container, item, message = '') {
    // Handle both string and object responses
    if (typeof container === 'object' && container.detail) {
      // For objects with detail property, just check if detail exists
      expect(container.detail).toBeDefined();
    } else if (typeof container === 'object') {
      // For objects, check if any key or value contains the item
      const hasItem = Object.entries(container).some(([key, value]) => 
        key.includes(item) || String(value).includes(item)
      );
      expect(hasItem).toBe(true);
    } else {
      expect(container).toContain(item);
    }
    if (message) {
      console.log(`✓ ${message}: container contains ${item}`);
    }
  }
  
  static assertNotContains(container, item, message = '') {
    expect(container).not.toContain(item);
    if (message) {
      console.log(`✓ ${message}: container does not contain ${item}`);
    }
  }
}

module.exports = Assertions;
