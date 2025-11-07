// Visualization Utilities for RBE Platform

// Color palettes for charts
export const colors = {
  primary: '#3B82F6',
  secondary: '#10B981',
  tertiary: '#8B5CF6',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#06B6D4',
  success: '#84CC16',

  // Resource-Based Economy themed colors
  rbe: {
    resources: '#00C49F',
    energy: '#FFB800',
    environment: '#10B981',
    social: '#3B82F6',
    cooperation: '#8B5CF6',
    automation: '#F59E0B',
  },

  // Status colors
  status: {
    implemented: '#10B981',
    inProgress: '#F59E0B',
    planned: '#95A5A6',
  },

  // Chart color palettes
  charts: {
    blue: ['#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'],
    green: ['#10B981', '#34D399', '#6EE7B7', '#D1FAE5'],
    purple: ['#8B5CF6', '#A78BFA', '#C4B5FD', '#EDE9FE'],
    rainbow: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'],
  },
};

// Format numbers for display
export const formatNumber = (num: number, decimals: number = 0): string => {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(decimals)}B`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(decimals)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(decimals)}K`;
  }
  return num.toFixed(decimals);
};

// Format percentages
export const formatPercentage = (num: number, decimals: number = 1): string => {
  return `${num.toFixed(decimals)}%`;
};

// Calculate percentage
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

// Generate gradient colors between two colors
export const generateGradient = (startColor: string, endColor: string, steps: number): string[] => {
  const start = hexToRgb(startColor);
  const end = hexToRgb(endColor);

  if (!start || !end) return [startColor];

  const colors: string[] = [];
  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1);
    const r = Math.round(start.r + ratio * (end.r - start.r));
    const g = Math.round(start.g + ratio * (end.g - start.g));
    const b = Math.round(start.b + ratio * (end.b - start.b));
    colors.push(`rgb(${r}, ${g}, ${b})`);
  }

  return colors;
};

// Convert hex to RGB
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Get color based on value and thresholds
export const getColorByValue = (
  value: number,
  thresholds: { min: number; max: number; color: string }[]
): string => {
  const threshold = thresholds.find((t) => value >= t.min && value <= t.max);
  return threshold ? threshold.color : colors.status.planned;
};

// Get status color
export const getStatusColor = (status: 'implemented' | 'in_progress' | 'planned'): string => {
  const statusMap = {
    implemented: colors.status.implemented,
    in_progress: colors.status.inProgress,
    planned: colors.status.planned,
  };
  return statusMap[status] || colors.status.planned;
};

// Calculate trend direction and color
export const getTrendIndicator = (
  current: number,
  previous: number
): { direction: 'up' | 'down' | 'neutral'; color: string; percentage: number } => {
  const diff = current - previous;
  const percentage = previous !== 0 ? (diff / previous) * 100 : 0;

  return {
    direction: diff > 0 ? 'up' : diff < 0 ? 'down' : 'neutral',
    color: diff > 0 ? colors.success : diff < 0 ? colors.danger : colors.status.planned,
    percentage: Math.abs(percentage),
  };
};

// Format date for charts
export const formatChartDate = (date: Date | string, format: 'short' | 'medium' | 'long' = 'short'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;

  switch (format) {
    case 'short':
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    case 'medium':
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    case 'long':
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    default:
      return d.toLocaleDateString();
  }
};

// Generate data for sparklines
export const generateSparklineData = (values: number[], labels?: string[]): any[] => {
  return values.map((value, index) => ({
    value,
    label: labels?.[index] || `Point ${index + 1}`,
  }));
};

// Calculate moving average for trend smoothing
export const calculateMovingAverage = (data: number[], window: number = 3): number[] => {
  const result: number[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i < window - 1) {
      result.push(data[i]);
    } else {
      const sum = data.slice(i - window + 1, i + 1).reduce((a, b) => a + b, 0);
      result.push(sum / window);
    }
  }
  return result;
};

// Group data by category
export const groupByCategory = <T extends Record<string, any>>(
  data: T[],
  categoryKey: keyof T
): Record<string, T[]> => {
  return data.reduce((acc, item) => {
    const category = String(item[categoryKey]);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};

// Calculate aggregate statistics
export const calculateStats = (values: number[]) => {
  if (values.length === 0) return null;

  const sorted = [...values].sort((a, b) => a - b);
  const sum = values.reduce((a, b) => a + b, 0);
  const mean = sum / values.length;

  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
    mean,
    median: sorted[Math.floor(sorted.length / 2)],
    sum,
    count: values.length,
  };
};

// Custom tooltip formatter
export const customTooltipFormatter = (value: any, name: string, props: any) => {
  if (typeof value === 'number') {
    return formatNumber(value, 1);
  }
  return value;
};

// Chart responsive sizes
export const chartSizes = {
  small: { width: '100%', height: 200 },
  medium: { width: '100%', height: 300 },
  large: { width: '100%', height: 400 },
  xlarge: { width: '100%', height: 500 },
};
