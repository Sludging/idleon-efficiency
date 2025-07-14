import { parseFormattedNumber } from '../../data/utility';
import { expectCalculationToMatch } from './calculation-helpers';

describe('parseFormattedNumber', () => {
  describe('number input', () => {
    it('should return the same number when input is already a number', () => {
      expect(parseFormattedNumber(42)).toBe(42);
      expect(parseFormattedNumber(0)).toBe(0);
      expect(parseFormattedNumber(1.5)).toBe(1.5);
      expect(parseFormattedNumber(1000000)).toBe(1000000);
    });
  });

  describe('basic number parsing', () => {
    it('should parse simple numbers', () => {
      expect(parseFormattedNumber('42')).toBe(42);
      expect(parseFormattedNumber('0')).toBe(0);
      expect(parseFormattedNumber('1.5')).toBe(1.5);
      expect(parseFormattedNumber('100.75')).toBe(100.75);
    });

    it('should handle decimal numbers', () => {
      expect(parseFormattedNumber('3.14159')).toBe(3.14159);
      expect(parseFormattedNumber('0.001')).toBe(0.001);
      expect(parseFormattedNumber('1000.5')).toBe(1000.5);
    });

    it('should handle zero and negative numbers', () => {
      expect(parseFormattedNumber('0')).toBe(0);
      expect(parseFormattedNumber('-5')).toBe(-5);
      expect(parseFormattedNumber('-1.5')).toBe(-1.5);
    });
  });

  describe('suffix parsing', () => {
    it('should parse K suffix (thousands)', () => {
      expect(parseFormattedNumber('1K')).toBe(1000);
      expect(parseFormattedNumber('10K')).toBe(10000);
      expect(parseFormattedNumber('1.5K')).toBe(1500);
      expect(parseFormattedNumber('0.5K')).toBe(500);
    });

    it('should parse M suffix (millions)', () => {
      expect(parseFormattedNumber('1M')).toBe(1000000);
      expect(parseFormattedNumber('10M')).toBe(10000000);
      expect(parseFormattedNumber('1.5M')).toBe(1500000);
      expect(parseFormattedNumber('0.1M')).toBe(100000);
    });

    it('should parse B suffix (billions)', () => {
      expect(parseFormattedNumber('1B')).toBe(1000000000);
      expect(parseFormattedNumber('10B')).toBe(10000000000);
      expect(parseFormattedNumber('1.5B')).toBe(1500000000);
      expect(parseFormattedNumber('0.01B')).toBe(10000000);
    });

    it('should parse T suffix (trillions)', () => {
      expect(parseFormattedNumber('1T')).toBe(1000000000000);
      expect(parseFormattedNumber('10T')).toBe(10000000000000);
      expect(parseFormattedNumber('1.5T')).toBe(1500000000000);
      expect(parseFormattedNumber('0.001T')).toBe(1000000000);
    });

    it('should parse Q suffix (quadrillions)', () => {
      expect(parseFormattedNumber('1Q')).toBe(1000000000000000);
      expect(parseFormattedNumber('10Q')).toBe(10000000000000000);
      expect(parseFormattedNumber('1.5Q')).toBe(1500000000000000);
    });

    it('should parse QQ suffix (quintillions)', () => {
      expect(parseFormattedNumber('1QQ')).toBe(1000000000000000000);
      expect(parseFormattedNumber('10QQ')).toBe(10000000000000000000);
      expect(parseFormattedNumber('1.5QQ')).toBe(1500000000000000000);
    });

    it('should parse QQQ suffix (sextillions)', () => {
      expect(parseFormattedNumber('1QQQ')).toBe(1000000000000000000000);
      expect(parseFormattedNumber('10QQQ')).toBe(10000000000000000000000);
      expect(parseFormattedNumber('1.5QQQ')).toBe(1500000000000000000000);
    });

    it('should parse scientific notation (E suffix)', () => {
      expect(parseFormattedNumber('1E15')).toBe(1000000000000000);
      expect(parseFormattedNumber('1.5E20')).toBe(150000000000000000000);

      // Use calculation helper for very large numbers
      expectCalculationToMatch(parseFormattedNumber('2.5E24'), 2500000000000000000000000, 1e-12);
      expectCalculationToMatch(parseFormattedNumber('1E30'), 1000000000000000000000000000000, 1e-12);
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle empty string by falling back to parseFloat', () => {
      expect(parseFormattedNumber('')).toBeNaN();
    });

    it('should handle whitespace by falling back to parseFloat', () => {
      expect(parseFormattedNumber('   ')).toBeNaN();
    });

    it('should handle invalid formats by falling back to parseFloat', () => {
      expect(parseFormattedNumber('invalid')).toBeNaN();
      expect(parseFormattedNumber('1.2.3')).toBe(1.2); // parseFloat stops at first invalid character
      expect(parseFormattedNumber('abc123')).toBeNaN();
    });

    it('should handle mixed case suffixes', () => {
      // Current implementation is case-sensitive, so these should fall back to parseFloat
      expect(parseFormattedNumber('1k')).toBe(1); // parseFloat stops at 'k'
      expect(parseFormattedNumber('1m')).toBe(1); // parseFloat stops at 'm'
      expect(parseFormattedNumber('1b')).toBe(1); // parseFloat stops at 'b'
      expect(parseFormattedNumber('1t')).toBe(1); // parseFloat stops at 't'
    });

    it('should handle scientific notation edge cases', () => {
      // Scientific notation should take precedence over regular suffixes
      expect(parseFormattedNumber('1E3')).toBe(1000); // Not 1 * 1000 (K), but 1 * 10^3
      expect(parseFormattedNumber('1.5E6')).toBe(1500000); // Not 1.5 * 1000000 (M), but 1.5 * 10^6
      
      // Invalid scientific notation should fall back to parseFloat
      expect(parseFormattedNumber('1E')).toBe(1); // parseFloat stops at 'E'
      expect(parseFormattedNumber('1Eabc')).toBe(1); // parseFloat stops at 'E'
    });

    it('should handle numbers without decimal parts', () => {
      expect(parseFormattedNumber('1K')).toBe(1000);
      expect(parseFormattedNumber('1M')).toBe(1000000);
      expect(parseFormattedNumber('1B')).toBe(1000000000);
    });

    it('should handle very large numbers', () => {
      expect(parseFormattedNumber('999QQQ')).toBe(999000000000000000000000);
      expect(parseFormattedNumber('1.5QQQ')).toBe(1500000000000000000000);
    });
  });
}); 
