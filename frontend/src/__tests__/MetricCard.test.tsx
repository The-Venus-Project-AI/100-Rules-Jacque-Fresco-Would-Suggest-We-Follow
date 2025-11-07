import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MetricCard } from '../components/Cards/MetricCard';

describe('MetricCard', () => {
  it('renders metric title and value', () => {
    render(
      <MetricCard
        title="Resource Efficiency"
        value={87}
        unit="%"
        color="#10B981"
      />
    );

    expect(screen.getByText('Resource Efficiency')).toBeInTheDocument();
    expect(screen.getByText('87')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('displays progress bar when target is provided', () => {
    render(
      <MetricCard
        title="Resource Efficiency"
        value={87}
        target={100}
        unit="%"
        color="#10B981"
      />
    );

    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('87%')).toBeInTheDocument();
  });

  it('displays trend indicator when provided', () => {
    render(
      <MetricCard
        title="Resource Efficiency"
        value={87}
        unit="%"
        color="#10B981"
        trend={3.2}
      />
    );

    expect(screen.getByText('↑ 3.2%')).toBeInTheDocument();
  });

  it('displays negative trend correctly', () => {
    render(
      <MetricCard
        title="Fossil Fuel Usage"
        value={5}
        unit="%"
        color="#95A5A6"
        trend={-2.5}
      />
    );

    expect(screen.getByText('↓ 2.5%')).toBeInTheDocument();
  });

  it('calculates progress percentage correctly', () => {
    render(
      <MetricCard
        title="Test Metric"
        value={75}
        target={100}
        unit="%"
        color="#3B82F6"
      />
    );

    expect(screen.getByText('75%')).toBeInTheDocument();
  });
});
