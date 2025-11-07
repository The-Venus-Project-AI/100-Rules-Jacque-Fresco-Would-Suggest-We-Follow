import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { automationProgress } from '../../utils/data';

const cybernationSystems = [
  { name: 'Production Systems', progress: 65 },
  { name: 'Distribution Networks', progress: 73 },
  { name: 'Resource Monitoring', progress: 81 },
  { name: 'Decision Support', progress: 89 },
  { name: 'Maintenance Systems', progress: 97 },
];

const laborLiberationData = [
  { name: 'Routine Tasks Automated', value: 78, color: 'green' },
  { name: 'Creative Pursuits Enabled', value: 62, color: 'blue' },
  { name: 'Education & Research Focus', value: 71, color: 'purple' },
];

export const AutomationTab = () => {
  return (
    <div className="space-y-6" role="tabpanel" id="automation-panel">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Automation Progress by Sector</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={automationProgress}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="manufacturing" stroke="#3B82F6" strokeWidth={2} />
            <Line type="monotone" dataKey="agriculture" stroke="#10B981" strokeWidth={2} />
            <Line type="monotone" dataKey="services" stroke="#F59E0B" strokeWidth={2} />
            <Line type="monotone" dataKey="transportation" stroke="#8B5CF6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Cybernation Implementation</h3>
          <div className="space-y-3">
            {cybernationSystems.map((system, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{system.name}</span>
                  <span>{system.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                    style={{ width: `${system.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Labor Liberation Status</h3>
          <div className="space-y-3">
            {laborLiberationData.map((item, idx) => (
              <div
                key={idx}
                className={`flex justify-between items-center p-3 bg-${item.color}-50 rounded`}
              >
                <span className="text-sm">{item.name}</span>
                <span className={`font-bold text-${item.color}-600`}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
