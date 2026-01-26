/**
 * Test setup for live game validation tests
 */

// Mock localStorage for Node.js test environment
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

// Extended Jest matchers for live game testing
expect.extend({
  toMatchLiveGame(received: number, expected: number, tolerance: number = 0.001) {
    const difference = Math.abs(received - expected) / Math.max(Math.abs(expected), 1);
    const pass = difference <= tolerance;

    const formatNumber = (num: number) => {
      if (Math.abs(num) >= 1e6) {
        return num.toExponential(3);
      }
      return num.toLocaleString();
    };

    if (pass) {
      return {
        message: () => `expected ${received} not to match live game value ${expected} within ${tolerance * 100}%`,
        pass: true,
      };
    } else {
      // Clear, detailed error message - Jest will display this nicely
      return {
        message: () => [
          `Domain value doesn't match live game value:`,
          `  Expected: ${formatNumber(expected)}`,
          `  Received: ${formatNumber(received)}`,
          `  Difference: ${(difference * 100).toFixed(4)}%`,
          `  Tolerance: ${(tolerance * 100).toFixed(2)}%`,
        ].join('\n'),
        pass: false,
      };
    }
  },

  toMatchLiveGameWithDetails(received: number, expected: number, options: { tolerance?: number, context?: string, debugInfo?: any } = {}) {
    const { tolerance = 0.001, context = '', debugInfo = {} } = options;
    const difference = Math.abs(received - expected) / Math.max(Math.abs(expected), 1);
    const pass = difference <= tolerance;

    const formatNumber = (num: number) => {
      if (Math.abs(num) >= 1e6) {
        return num.toExponential(3);
      }
      return num.toLocaleString();
    };

    if (pass) {
      return {
        message: () => `expected ${received} not to match live game value ${expected}`,
        pass: true,
      };
    } else {
      // Detailed failure message for calculation tests
      const messageParts = [
        context ? `${context}:` : 'Domain value doesn\'t match live game value:',
        `  Expected: ${formatNumber(expected)}`,
        `  Received: ${formatNumber(received)}`,
        `  Difference: ${(difference * 100).toFixed(4)}%`,
        `  Tolerance: ${(tolerance * 100).toFixed(2)}%`,
      ];

      if (debugInfo.ratio) {
        messageParts.push(`  Ratio: ${debugInfo.ratio}`);
      }
      if (debugInfo.possibleCauses) {
        messageParts.push(`  Possible causes: ${debugInfo.possibleCauses.join(', ')}`);
      }
      if (debugInfo.timestamp) {
        messageParts.push(`  Extracted at: ${debugInfo.timestamp}`);
      }

      return {
        message: () => messageParts.join('\n'),
        pass: false,
      };
    }
  },
});

// Extend Jest matchers type
declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchLiveGame(expected: number, tolerance?: number): R;
      toMatchLiveGameWithDetails(expected: number, options?: { tolerance?: number, context?: string, debugInfo?: any }): R;
    }
  }
}

// Global test utilities
beforeEach(() => {
  // Clear localStorage mock before each test
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
});

// Export to make this a module
export {};

