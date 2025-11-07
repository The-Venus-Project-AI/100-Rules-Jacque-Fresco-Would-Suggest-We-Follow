import { describe, it, expect } from 'vitest';
import {
  formatNumber,
  formatPercentage,
  calculatePercentage,
  getStatusColor,
  getTrendIndicator,
  calculateStats,
  groupByCategory,
} from '../utils/visualization';

describe('Visualization Utilities', () => {
  describe('formatNumber', () => {
    it('formats billions correctly', () => {
      expect(formatNumber(1000000000)).toBe('1B');
      expect(formatNumber(1500000000)).toBe('2B');
      expect(formatNumber(1234567890, 2)).toBe('1.23B');
    });

    it('formats millions correctly', () => {
      expect(formatNumber(1000000)).toBe('1M');
      expect(formatNumber(1500000)).toBe('2M');
      expect(formatNumber(1234567, 2)).toBe('1.23M');
    });

    it('formats thousands correctly', () => {
      expect(formatNumber(1000)).toBe('1K');
      expect(formatNumber(1500)).toBe('2K');
      expect(formatNumber(1234, 2)).toBe('1.23K');
    });

    it('formats small numbers correctly', () => {
      expect(formatNumber(999)).toBe('999');
      expect(formatNumber(123, 2)).toBe('123.00');
    });
  });

  describe('formatPercentage', () => {
    it('formats percentages correctly', () => {
      expect(formatPercentage(50)).toBe('50.0%');
      expect(formatPercentage(33.333, 2)).toBe('33.33%');
      expect(formatPercentage(100, 0)).toBe('100%');
    });
  });

  describe('calculatePercentage', () => {
    it('calculates percentage correctly', () => {
      expect(calculatePercentage(50, 100)).toBe(50);
      expect(calculatePercentage(25, 100)).toBe(25);
      expect(calculatePercentage(1, 3)).toBeCloseTo(33.33, 1);
    });

    it('handles zero total', () => {
      expect(calculatePercentage(10, 0)).toBe(0);
    });
  });

  describe('getStatusColor', () => {
    it('returns correct colors for status', () => {
      expect(getStatusColor('implemented')).toBe('#10B981');
      expect(getStatusColor('in_progress')).toBe('#F59E0B');
      expect(getStatusColor('planned')).toBe('#95A5A6');
    });
  });

  describe('getTrendIndicator', () => {
    it('detects upward trend', () => {
      const trend = getTrendIndicator(120, 100);
      expect(trend.direction).toBe('up');
      expect(trend.percentage).toBe(20);
    });

    it('detects downward trend', () => {
      const trend = getTrendIndicator(80, 100);
      expect(trend.direction).toBe('down');
      expect(trend.percentage).toBe(20);
    });

    it('detects neutral trend', () => {
      const trend = getTrendIndicator(100, 100);
      expect(trend.direction).toBe('neutral');
      expect(trend.percentage).toBe(0);
    });
  });

  describe('calculateStats', () => {
    it('calculates statistics correctly', () => {
      const stats = calculateStats([1, 2, 3, 4, 5]);
      expect(stats).toEqual({
        min: 1,
        max: 5,
        mean: 3,
        median: 3,
        sum: 15,
        count: 5,
      });
    });

    it('handles single value', () => {
      const stats = calculateStats([42]);
      expect(stats).toEqual({
        min: 42,
        max: 42,
        mean: 42,
        median: 42,
        sum: 42,
        count: 1,
      });
    });

    it('returns null for empty array', () => {
      expect(calculateStats([])).toBeNull();
    });
  });

  describe('groupByCategory', () => {
    it('groups data by category correctly', () => {
      const data = [
        { id: 1, category: 'A', value: 10 },
        { id: 2, category: 'B', value: 20 },
        { id: 3, category: 'A', value: 30 },
        { id: 4, category: 'C', value: 40 },
      ];

      const grouped = groupByCategory(data, 'category');

      expect(grouped).toEqual({
        A: [
          { id: 1, category: 'A', value: 10 },
          { id: 3, category: 'A', value: 30 },
        ],
        B: [{ id: 2, category: 'B', value: 20 }],
        C: [{ id: 4, category: 'C', value: 40 }],
      });
    });

    it('handles empty array', () => {
      expect(groupByCategory([], 'category')).toEqual({});
    });
  });
});
