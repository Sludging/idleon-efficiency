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

const BASELINE_RELATIVE_TOLERANCE = 5e-7;

// Extended Jest matchers for live game testing
expect.extend({
  toMatchLiveGame(received: number, expected: number, tolerance: number = 0) {
    const difference = Math.abs(received - expected) / Math.max(Math.abs(expected), 1);
    const effectiveTolerance = Math.max(tolerance, BASELINE_RELATIVE_TOLERANCE);
    const pass = difference <= effectiveTolerance;

    if (pass) {
      return {
        message: () => `expected ${received} not to match live game value ${expected} within ${effectiveTolerance * 100}% (configured: ${tolerance * 100}%, baseline: ${BASELINE_RELATIVE_TOLERANCE * 100}%)`,
        pass: true,
      };
    } else {
      // Clear, detailed error message - Jest will display this nicely
      return {
        message: () => [
          `Domain value doesn't match live game value:`,
          `  Expected: ${expected}`,
          `  Received: ${received}`,
          `  Signed delta (received - expected): ${received - expected}`,
          `  Difference: ${difference * 100}%`,
          `  Effective tolerance: ${effectiveTolerance * 100}% (configured: ${tolerance * 100}%, baseline: ${BASELINE_RELATIVE_TOLERANCE * 100}%)`,
        ].join('\n'),
        pass: false,
      };
    }
  },

  toMatchLiveGameWithDetails(received: number, expected: number, options: { tolerance?: number, context?: string, debugInfo?: any } = {}) {
    const { tolerance = 0, context = '', debugInfo = {} } = options;
    const difference = Math.abs(received - expected) / Math.max(Math.abs(expected), 1);
    const effectiveTolerance = Math.max(tolerance, BASELINE_RELATIVE_TOLERANCE);
    const pass = difference <= effectiveTolerance;

    if (pass) {
      return {
        message: () => `expected ${received} not to match live game value ${expected} within ${effectiveTolerance * 100}% (configured: ${tolerance * 100}%, baseline: ${BASELINE_RELATIVE_TOLERANCE * 100}%)`,
        pass: true,
      };
    } else {
      // Detailed failure message for calculation tests
      const messageParts = [
        context ? `${context}:` : 'Domain value doesn\'t match live game value:',
        `  Expected: ${expected}`,
        `  Received: ${received}`,
        `  Signed delta (received - expected): ${received - expected}`,
        `  Difference: ${difference * 100}%`,
        `  Effective tolerance: ${effectiveTolerance * 100}% (configured: ${tolerance * 100}%, baseline: ${BASELINE_RELATIVE_TOLERANCE * 100}%)`,
      ];

      if (debugInfo.ratio) {
        messageParts.push(`  Ratio: ${debugInfo.ratio}`);
      }
      if (debugInfo.possibleCauses) {
        messageParts.push(`  Possible causes: ${debugInfo.possibleCauses.join(', ')}`);
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

