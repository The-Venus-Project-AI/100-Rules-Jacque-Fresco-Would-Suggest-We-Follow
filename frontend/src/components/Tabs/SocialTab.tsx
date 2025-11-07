import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MetricCard } from '../Cards/MetricCard';

const qualityOfLifeData = [
  { indicator: 'Life Satisfaction', value: 82 },
  { indicator: 'Work-Life Balance', value: 88 },
  { indicator: 'Community Engagement', value: 75 },
  { indicator: 'Personal Development', value: 79 },
  { indicator: 'Environmental Quality', value: 71 },
  { indicator: 'Safety & Security', value: 91 },
];

export const SocialTab = () => {
  return (
    <div className="space-y-6" role="tabpanel" id="social-panel">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Education Access" value={85} target={100} unit="%" color="#3B82F6" trend={2.1} />
        <MetricCard
          title="Healthcare Coverage"
          value={78}
          target={100}
          unit="%"
          color="#10B981"
          trend={3.5}
        />
        <MetricCard title="Housing Quality" value={72} target={100} unit="%" color="#8B5CF6" trend={4.2} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Quality of Life Indicators</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={qualityOfLifeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="indicator" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6">
              {qualityOfLifeData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.value > 80 ? '#10B981' : entry.value > 70 ? '#F59E0B' : '#EF4444'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
