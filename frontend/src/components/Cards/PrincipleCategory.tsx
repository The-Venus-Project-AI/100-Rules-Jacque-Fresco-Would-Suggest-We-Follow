import type { PrincipleCategoryProps } from '../../types';
import { useAppStore } from '../../store/useAppStore';

export const PrincipleCategory = ({ category, principles, progress }: PrincipleCategoryProps) => {
  const { expandedCategory, setExpandedCategory } = useAppStore();
  const isExpanded = expandedCategory === category;

  const getStatusColor = (index: number) => {
    const random = Math.random();
    if (random > 0.6) return 'bg-green-500';
    if (random > 0.3) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  const getStatusText = (color: string) => {
    if (color === 'bg-green-500') return 'Implemented';
    if (color === 'bg-yellow-500') return 'In Progress';
    return 'Planned';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => setExpandedCategory(isExpanded ? null : category)}
        className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={isExpanded}
        aria-controls={`principles-${category}`}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2 text-xs">
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                {progress?.implemented || 0}%
              </span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                {progress?.inProgress || 0}%
              </span>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>
      {isExpanded && (
        <div id={`principles-${category}`} className="px-4 pb-4 border-t">
          <div className="space-y-2 mt-3">
            {principles.map((principle, index) => {
              const statusColor = getStatusColor(index);
              return (
                <div key={index} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                  <div
                    className={`w-4 h-4 rounded-full mt-0.5 flex-shrink-0 ${statusColor}`}
                    role="img"
                    aria-label={getStatusText(statusColor)}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{principle}</p>
                    <span className="text-xs text-gray-500">{getStatusText(statusColor)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
