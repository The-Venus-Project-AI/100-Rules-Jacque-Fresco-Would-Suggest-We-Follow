import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { MetricCard } from '../Cards/MetricCard';

const resourceAllocationData = [
  { sector: 'Housing', allocated: 95, needed: 100 },
  { sector: 'Healthcare', allocated: 92, needed: 100 },
  { sector: 'Education', allocated: 88, needed: 100 },
  { sector: 'Transportation', allocated: 78, needed: 100 },
  { sector: 'Recreation', allocated: 85, needed: 100 },
  { sector: 'Research', allocated: 72, needed: 100 },
];

export const ResourcesTab = () => {
  return (
    <div className="space-y-6" role="tabpanel" id="resources-panel">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <MetricCard title="Water Availability" value={92} target={100} unit="%" color="#06B6D4" trend={1.2} />
        <MetricCard title="Food Security" value={88} target={100} unit="%" color="#84CC16" trend={2.5} />
        <MetricCard
          title="Material Recycling"
          value={76}
          target={100}
          unit="%"
          color="#F97316"
          trend={3.8}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Resource Allocation by Sector</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={resourceAllocationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sector" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="allocated" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
            <Area type="monotone" dataKey="needed" stackId="2" stroke="#E5E7EB" fill="#E5E7EB" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
