import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from '../components/Layout/Navigation';

// Mock Zustand store
const mockSetActiveTab = vi.fn();

vi.mock('../store/useAppStore', () => ({
  useAppStore: vi.fn(() => ({
    activeTab: 'overview',
    setActiveTab: mockSetActiveTab,
  })),
}));

describe('Navigation', () => {
  beforeEach(() => {
    mockSetActiveTab.mockClear();
  });

  it('renders all navigation tabs', () => {
    render(<Navigation />);

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('Automation')).toBeInTheDocument();
    expect(screen.getByText('Social')).toBeInTheDocument();
    expect(screen.getByText('Environment')).toBeInTheDocument();
    expect(screen.getByText('Principles')).toBeInTheDocument();
  });

  it('highlights active tab', () => {
    render(<Navigation />);

    const overviewTab = screen.getByText('Overview').closest('button');
    expect(overviewTab).toHaveClass('border-blue-500', 'text-blue-600');
  });

  it('calls setActiveTab when tab is clicked', () => {
    render(<Navigation />);

    const resourcesTab = screen.getByText('Resources');
    fireEvent.click(resourcesTab);

    expect(mockSetActiveTab).toHaveBeenCalledWith('resources');
  });

  it('has proper ARIA attributes', () => {
    render(<Navigation />);

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(6);

    const overviewTab = screen.getByText('Overview').closest('button');
    expect(overviewTab).toHaveAttribute('aria-selected', 'true');
    expect(overviewTab).toHaveAttribute('aria-controls', 'overview-panel');
  });
});
