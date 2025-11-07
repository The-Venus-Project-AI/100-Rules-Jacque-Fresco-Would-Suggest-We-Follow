import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../components/Layout/Header';

// Mock Zustand store
vi.mock('../store/useAppStore', () => ({
  useAppStore: vi.fn(() => ({
    selectedRegion: 'global',
    setSelectedRegion: vi.fn(),
    timeRange: 'year',
    setTimeRange: vi.fn(),
  })),
}));

describe('Header', () => {
  it('renders header with title and subtitle', () => {
    render(<Header />);

    expect(screen.getByText('Venus Project World Management System')).toBeInTheDocument();
    expect(screen.getByText('Resource-Based Economy Global Dashboard')).toBeInTheDocument();
  });

  it('renders GitHub link', () => {
    render(<Header />);

    const githubLink = screen.getByText('View on GitHub').closest('a');
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/The-Venus-Project-AI/100-Rules-Jacque-Fresco-Would-Suggest-We-Follow'
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders region selector with options', () => {
    render(<Header />);

    const regionSelect = screen.getByLabelText('Select Region');
    expect(regionSelect).toBeInTheDocument();

    // Check if all region options are present
    expect(screen.getByText('Global')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByText('Europe')).toBeInTheDocument();
    expect(screen.getByText('Asia')).toBeInTheDocument();
    expect(screen.getByText('Africa')).toBeInTheDocument();
    expect(screen.getByText('Oceania')).toBeInTheDocument();
  });

  it('renders time range selector with options', () => {
    render(<Header />);

    const timeRangeSelect = screen.getByLabelText('Select Time Range');
    expect(timeRangeSelect).toBeInTheDocument();

    // Check if all time range options are present
    expect(screen.getByText('24 Hours')).toBeInTheDocument();
    expect(screen.getByText('7 Days')).toBeInTheDocument();
    expect(screen.getByText('30 Days')).toBeInTheDocument();
    expect(screen.getByText('1 Year')).toBeInTheDocument();
  });
});
