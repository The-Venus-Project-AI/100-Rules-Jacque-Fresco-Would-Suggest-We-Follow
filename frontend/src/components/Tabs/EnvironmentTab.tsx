import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MetricCard } from '../Cards/MetricCard';
import { circularCities } from '../../utils/data';

const sustainabilityMetrics = [
  { name: 'Renewable Energy Usage', value: 78, color: '#3B82F6' },
  { name: 'Waste Recycling Rate', value: 85, color: '#10B981' },
  { name: 'Water Conservation', value: 72, color: '#06B6D4' },
  { name: 'Green Space Coverage', value: 65, color: '#84CC16' },
  { name: 'Sustainable Agriculture', value: 69, color: '#F59E0B' },
];

export const EnvironmentTab = () => {
  return (
    <div className="space-y-6" role="tabpanel" id="environment-panel">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Carbon Neutrality"
          value={68}
          target={100}
          unit="%"
          color="#10B981"
          trend={6.2}
        />
        <MetricCard
          title="Biodiversity Index"
          value={74}
          target={100}
          unit="%"
          color="#06B6D4"
          trend={1.8}
        />
        <MetricCard title="Ocean Health" value={61} target={100} unit="%" color="#3B82F6" trend={2.5} />
        <MetricCard
          title="Forest Coverage"
          value={82}
          target={100}
          unit="%"
          color="#84CC16"
          trend={3.1}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Circular Cities Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={circularCities}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {circularCities.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Sustainability Metrics</h3>
          <div className="space-y-3">
            {sustainabilityMetrics.map((metric, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{metric.name}</span>
                  <span style={{ color: metric.color }} className="font-semibold">
                    {metric.value}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ width: `${metric.value}%`, backgroundColor: metric.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
