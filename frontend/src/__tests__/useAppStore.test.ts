import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAppStore } from '../store/useAppStore';

describe('useAppStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useAppStore());
    act(() => {
      result.current.setActiveTab('overview');
      result.current.setSelectedRegion('global');
      result.current.setTimeRange('year');
      result.current.setExpandedCategory(null);
    });
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useAppStore());

    expect(result.current.activeTab).toBe('overview');
    expect(result.current.selectedRegion).toBe('global');
    expect(result.current.timeRange).toBe('year');
    expect(result.current.expandedCategory).toBeNull();
  });

  it('updates active tab', () => {
    const { result } = renderHook(() => useAppStore());

    act(() => {
      result.current.setActiveTab('resources');
    });

    expect(result.current.activeTab).toBe('resources');
  });

  it('updates selected region', () => {
    const { result } = renderHook(() => useAppStore());

    act(() => {
      result.current.setSelectedRegion('americas');
    });

    expect(result.current.selectedRegion).toBe('americas');
  });

  it('updates time range', () => {
    const { result } = renderHook(() => useAppStore());

    act(() => {
      result.current.setTimeRange('month');
    });

    expect(result.current.timeRange).toBe('month');
  });

  it('updates expanded category', () => {
    const { result } = renderHook(() => useAppStore());

    act(() => {
      result.current.setExpandedCategory('Resource Management');
    });

    expect(result.current.expandedCategory).toBe('Resource Management');
  });

  it('can clear expanded category', () => {
    const { result } = renderHook(() => useAppStore());

    act(() => {
      result.current.setExpandedCategory('Test Category');
    });
    expect(result.current.expandedCategory).toBe('Test Category');

    act(() => {
      result.current.setExpandedCategory(null);
    });
    expect(result.current.expandedCategory).toBeNull();
  });
});
