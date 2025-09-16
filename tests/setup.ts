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
    
    if (pass) {
      return {
        message: () => `expected ${received} not to match live game value ${expected} within ${tolerance * 100}%`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to match live game value ${expected} within ${tolerance * 100}%, but difference was ${(difference * 100).toFixed(4)}%`,
        pass: false,
      };
    }
  },

  toMatchLiveGameWithDetails(received: number, expected: number, options: { tolerance?: number, context?: string, debugInfo?: any } = {}) {
    const { tolerance = 0.001, context = '', debugInfo = {} } = options;
    const difference = Math.abs(received - expected) / Math.max(Math.abs(expected), 1);
    const pass = difference <= tolerance;
    
    const formatLargeNumber = (num: number) => {
      if (Math.abs(num) >= 1e6) {
        return num.toExponential(3);
      }
      return num.toLocaleString();
    };
    
    if (pass) {
      // Success message with details
      const successMessage = [
        `✅ Live game validation passed${context ? ` (${context})` : ''}`,
        `   Domain result: ${formatLargeNumber(received)}`,
        `   Live game: ${formatLargeNumber(expected)}`,
        `   Difference: ${(difference * 100).toFixed(4)}% (within ${tolerance * 100}% tolerance)`,
        debugInfo.ratio ? `   Ratio: ${debugInfo.ratio}` : '',
        debugInfo.timestamp ? `   Extracted: ${debugInfo.timestamp}` : ''
      ].filter(Boolean).join('\n');
      
      console.log(successMessage);
      
      return {
        message: () => `expected ${received} not to match live game value ${expected}`,
        pass: true,
      };
    } else {
      // Failure message with detailed analysis
      const failureMessage = [
        `❌ Live game validation failed${context ? ` (${context})` : ''}`,
        `   Domain result: ${formatLargeNumber(received)}`,
        `   Live game: ${formatLargeNumber(expected)}`,
        `   Difference: ${(difference * 100).toFixed(4)}% (exceeds ${tolerance * 100}% tolerance)`,
        debugInfo.ratio ? `   Ratio: ${debugInfo.ratio}` : '',
        debugInfo.possibleCauses ? `   Possible causes: ${debugInfo.possibleCauses.join(', ')}` : '',
        debugInfo.timestamp ? `   Extracted: ${debugInfo.timestamp}` : ''
      ].filter(Boolean).join('\n');
      
      return {
        message: () => failureMessage,
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

// Test environment configuration
const isVerbose = process.env.JEST_VERBOSE === 'true' || process.argv.includes('--verbose');

// Helper for conditional logging
global.testLog = (message: string, level: 'info' | 'debug' | 'always' = 'info') => {
  if (level === 'always' || isVerbose) {
    console.log(message);
  }
};

// Helper for test setup logging
global.testSetup = (message: string) => {
  console.log(`🔧 ${message}`);
};

// Add type declarations for global helpers
declare global {
  var testLog: (message: string, level?: 'info' | 'debug' | 'always') => void;
  var testSetup: (message: string) => void;
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

