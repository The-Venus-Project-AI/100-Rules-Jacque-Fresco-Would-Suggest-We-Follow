import type { MetricCardProps } from '../../types';

export const MetricCard = ({ title, value, target, unit, color, trend }: MetricCardProps) => (
  <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      {trend && (
        <span
          className={`text-xs px-2 py-1 rounded ${
            trend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div className="flex items-baseline">
      <span className="text-2xl font-bold" style={{ color }}>
        {value}
      </span>
      <span className="text-gray-500 ml-1">{unit}</span>
    </div>
    {target && (
      <div className="mt-2">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>{Math.round((value / target) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((value / target) * 100, 100)}%`, backgroundColor: color }}
          />
        </div>
      </div>
    )}
  </div>
);
