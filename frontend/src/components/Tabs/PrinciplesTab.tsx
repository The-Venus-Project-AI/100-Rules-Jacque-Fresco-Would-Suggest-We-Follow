import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { PrincipleCategory } from '../Cards/PrincipleCategory';
import { allPrinciples, calculateCategoryProgress } from '../../utils/data';

const categoryProgress = calculateCategoryProgress();

export const PrinciplesTab = () => {
  return (
    <div className="space-y-6" role="tabpanel" id="principles-panel">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-sm text-blue-800">
          <strong>100 Principles for a Resource-Based Economy:</strong> "The future is not something that
          happens to us, but something we create." These principles guide our transition to a sustainable,
          equitable civilization.
        </p>
        <a
          href="https://github.com/The-Venus-Project-AI/100-Rules-Jacque-Fresco-Would-Suggest-We-Follow"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm mt-2"
        >
          <span>View complete documentation on GitHub</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Overall Implementation Progress</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryProgress}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" angle={-45} textAnchor="end" height={120} fontSize={12} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="implemented" stackId="a" fill="#10B981" />
            <Bar dataKey="inProgress" stackId="a" fill="#F59E0B" />
            <Bar dataKey="planned" stackId="a" fill="#E5E7EB" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">All 100 Principles by Category</h3>
        <div className="grid grid-cols-1 gap-4">
          {Object.entries(allPrinciples).map(([category, principles], idx) => (
            <PrincipleCategory
              key={category}
              category={category}
              principles={principles}
              progress={categoryProgress[idx]}
            />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Global Implementation Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-3xl font-bold text-green-600">42</div>
            <div className="text-sm text-gray-600 mt-1">Principles Implemented</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
            <div className="text-3xl font-bold text-yellow-600">31</div>
            <div className="text-sm text-gray-600 mt-1">In Progress</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
            <div className="text-3xl font-bold text-gray-600">27</div>
            <div className="text-sm text-gray-600 mt-1">Planned</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">73%</div>
            <div className="text-sm text-gray-600 mt-1">Overall Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
};
