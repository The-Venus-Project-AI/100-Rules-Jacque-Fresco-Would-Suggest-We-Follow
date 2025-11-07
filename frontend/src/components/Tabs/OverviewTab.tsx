import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { MetricCard } from '../Cards/MetricCard';
import { resourceData, socialMetrics, globalCooperation } from '../../utils/data';

export const OverviewTab = () => {
  return (
    <div className="space-y-6" role="tabpanel" id="overview-panel">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Resource Efficiency"
          value={87}
          target={100}
          unit="%"
          color="#10B981"
          trend={3.2}
        />
        <MetricCard title="Renewable Energy" value={78} target={100} unit="%" color="#3B82F6" trend={5.1} />
        <MetricCard
          title="Global Cooperation"
          value={72}
          target={100}
          unit="%"
          color="#8B5CF6"
          trend={2.8}
        />
        <MetricCard title="Automation Level" value={52} target={100} unit="%" color="#F59E0B" trend={4.5} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Energy Sources Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={resourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {resourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Social Well-being Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={socialMetrics}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Current" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Regional Cooperation Index</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={globalCooperation}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cooperation" fill="#3B82F6" />
            <Bar dataKey="resourceSharing" fill="#10B981" />
            <Bar dataKey="knowledgeExchange" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
