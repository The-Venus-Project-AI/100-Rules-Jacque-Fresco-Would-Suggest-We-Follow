import { useAppStore } from '../../store/useAppStore';

export const Header = () => {
  const { selectedRegion, setSelectedRegion, timeRange, setTimeRange } = useAppStore();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Venus Project World Management System</h1>
            <p className="text-sm text-gray-600">Resource-Based Economy Global Dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/The-Venus-Project-AI/100-Rules-Jacque-Fresco-Would-Suggest-We-Follow"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm"
              aria-label="View source code on GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>View on GitHub</span>
            </a>
            <label htmlFor="region-select" className="sr-only">
              Select Region
            </label>
            <select
              id="region-select"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="global">Global</option>
              <option value="americas">Americas</option>
              <option value="europe">Europe</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="oceania">Oceania</option>
            </select>
            <label htmlFor="time-range-select" className="sr-only">
              Select Time Range
            </label>
            <select
              id="time-range-select"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="day">24 Hours</option>
              <option value="week">7 Days</option>
              <option value="month">30 Days</option>
              <option value="year">1 Year</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
