// Mock localStorage for Node.js test environment
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

// Global test configuration and custom matchers
expect.extend({
  toBeCloseToWithTolerance(received: number, expected: number, tolerance: number = 0.05) {
    const difference = Math.abs(received - expected) / Math.max(Math.abs(expected), 1);
    const pass = difference <= tolerance;
    
    if (pass) {
      return {
        message: () => `expected ${received} not to be close to ${expected} within ${tolerance * 100}%`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be close to ${expected} within ${tolerance * 100}%, but difference was ${(difference * 100).toFixed(2)}%`,
        pass: false,
      };
    }
  },
});

// Extend Jest matchers type
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeCloseToWithTolerance(expected: number, tolerance?: number): R;
    }
  }
}

// Make this file a module
export {}; 