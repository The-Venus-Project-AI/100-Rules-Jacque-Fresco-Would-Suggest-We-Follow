import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [timeRange, setTimeRange] = useState('year');
  const [expandedCategory, setExpandedCategory] = useState(null);
  
  // Simulated data based on Venus Project principles
  const resourceData = [
    { name: 'Solar', value: 35, target: 100, color: '#FFB800' },
    { name: 'Wind', value: 25, target: 100, color: '#00C49F' },
    { name: 'Geothermal', value: 15, target: 100, color: '#FF6B6B' },
    { name: 'Hydro', value: 20, target: 100, color: '#4ECDC4' },
    { name: 'Fossil Fuels', value: 5, target: 0, color: '#95A5A6' }
  ];

  const socialMetrics = [
    { subject: 'Education Access', A: 85, fullMark: 100 },
    { subject: 'Healthcare', A: 78, fullMark: 100 },
    { subject: 'Housing Quality', A: 72, fullMark: 100 },
    { subject: 'Food Security', A: 88, fullMark: 100 },
    { subject: 'Clean Water', A: 91, fullMark: 100 },
    { subject: 'Technology Access', A: 67, fullMark: 100 }
  ];

  const automationProgress = [
    { month: 'Jan', manufacturing: 45, agriculture: 38, services: 25, transportation: 55 },
    { month: 'Feb', manufacturing: 48, agriculture: 40, services: 28, transportation: 58 },
    { month: 'Mar', manufacturing: 52, agriculture: 42, services: 32, transportation: 62 },
    { month: 'Apr', manufacturing: 55, agriculture: 45, services: 35, transportation: 65 },
    { month: 'May', manufacturing: 58, agriculture: 48, services: 38, transportation: 68 },
    { month: 'Jun', manufacturing: 62, agriculture: 52, services: 42, transportation: 72 }
  ];

  const circularCities = [
    { name: 'Planning', value: 15, color: '#8884d8' },
    { name: 'Construction', value: 8, color: '#82ca9d' },
    { name: 'Operational', value: 3, color: '#ffc658' },
    { name: 'Proposed', value: 24, color: '#ff7c7c' }
  ];

  const globalCooperation = [
    { region: 'Americas', cooperation: 72, resourceSharing: 68, knowledgeExchange: 85 },
    { region: 'Europe', cooperation: 88, resourceSharing: 82, knowledgeExchange: 92 },
    { region: 'Asia', cooperation: 65, resourceSharing: 70, knowledgeExchange: 78 },
    { region: 'Africa', cooperation: 58, resourceSharing: 52, knowledgeExchange: 65 },
    { region: 'Oceania', cooperation: 78, resourceSharing: 75, knowledgeExchange: 88 }
  ];

  // All 100 principles organized by category
  const allPrinciples = {
    "Resource Management and Economics (1-10)": [
      "1. Declare all of Earth's resources as the common heritage of all people",
      "2. Base decisions on resource availability and carrying capacity",
      "3. Eliminate the monetary system",
      "4. Measure wealth by resources and productive capacity",
      "5. Use technology to create abundance for all",
      "6. Design production to meet human needs directly",
      "7. Apply scientific methods to resource allocation",
      "8. Automate all routine and monotonous labor",
      "9. Maintain real-time inventory systems",
      "10. Produce goods for maximum utility and durability"
    ],
    "Environment and Sustainability (11-20)": [
      "11. Prioritize environmental restoration and protection",
      "12. Design systems within Earth's carrying capacity",
      "13. Use only clean, renewable energy sources",
      "14. Eliminate dangerous chemicals and pesticides",
      "15. Create circular cities for efficiency",
      "16. Integrate parks and green spaces",
      "17. Build disaster-resistant structures",
      "18. Use prefabricated, modular construction",
      "19. Implement closed-loop systems",
      "20. Monitor environmental conditions automatically"
    ],
    "Science and Decision-Making (21-30)": [
      "21. Apply scientific method to social systems",
      "22. Base decisions on research and experimentation",
      "23. Require verification and peer review",
      "24. Ask 'what do we have here?' and investigate",
      "25. Replace political ideologies with technical solutions",
      "26. Use AI to manage complex systems",
      "27. Eliminate financial influence in decisions",
      "28. Design systems serving all people equally",
      "29. Continuously update methodologies",
      "30. Assign more decision-making to machines"
    ],
    "Education and Human Development (31-40)": [
      "31. Make education free and accessible to all",
      "32. Teach critical thinking and scientific method",
      "33. Emphasize cooperation, creativity, individuality",
      "34. Provide information about environmental behavior shaping",
      "35. Eliminate all types of elitism",
      "36. Prepare people for continuous change",
      "37. Foster global consciousness",
      "38. Train problem-solvers, not soldiers",
      "39. Teach through demonstration and interconnection",
      "40. Encourage innovative thinking"
    ],
    "Human Behavior and Values (41-50)": [
      "41. Understand behavior as environmentally shaped",
      "42. Recognize greed and hatred as learned behaviors",
      "43. Change destructive behaviors by changing environment",
      "44. Reject notions of inherent good and evil",
      "45. Abandon myth of fixed individuality",
      "46. Accept abilities result from environment",
      "47. Understand violence stems from scarcity",
      "48. Celebrate being proven wrong as growth",
      "49. Base success on genuine beliefs",
      "50. Practice empathy through understanding"
    ],
    "Social Organization and Governance (51-60)": [
      "51. Replace political government with scientific management",
      "52. Remove police, military, prisons as unnecessary",
      "53. End wars by addressing root causes",
      "54. Abolish borders, create unified civilization",
      "55. Eliminate taxation through collective management",
      "56. Remove all forms of debt and servitude",
      "57. Make laws obsolete through design",
      "58. Establish values based on actual needs",
      "59. Ensure no group holds power over others",
      "60. Align individual and collective interests"
    ],
    "Technology and Innovation (61-70)": [
      "61. Use technology to generate abundance",
      "62. Implement cybernation of production",
      "63. Apply AI to improve decision-making",
      "64. Create interconnected sensor networks",
      "65. Develop automated inventory systems",
      "66. Design cities as evolving organisms",
      "67. Build elevated transportation systems",
      "68. Prefabricate buildings in factories",
      "69. Use 3D imaging and advanced construction",
      "70. Create self-erecting structures"
    ],
    "Resource Distribution and Access (71-80)": [
      "71. Provide universal access to all necessities",
      "72. Ensure highest standard of living for all",
      "73. Eliminate hunger, poverty, homelessness",
      "74. Make medical care universally available",
      "75. Provide mental stimulation with material needs",
      "76. Design systems where intelligence enriches all",
      "77. Recognize interdependence of safety",
      "78. Understand unmet needs create dangers",
      "79. Allocate resources efficiently without waste",
      "80. Eliminate hoarding through universal access"
    ],
    "Urban Design and Infrastructure (81-90)": [
      "81. Build circular cities with radial sectors",
      "82. Place central dome for core systems",
      "83. Surround cities with agricultural belts",
      "84. Create waterways for irrigation",
      "85. Designate outer perimeters for recreation",
      "86. Design varied residential architecture",
      "87. Build vertical cities to preserve land",
      "88. Include amenities within walking distance",
      "89. Incorporate exercise naturally in design",
      "90. Create safe recreational facilities"
    ],
    "Cooperation and Global Unity (91-100)": [
      "91. Work together to solve problems",
      "92. Function as single organism",
      "93. Share knowledge and innovations freely",
      "94. Bridge differences for environmental care",
      "95. Recognize universal human needs",
      "96. Accept different conclusions while meeting needs",
      "97. Practice cooperation from childhood",
      "98. Define humanity through caring",
      "99. Take responsibility for everyone's wellbeing",
      "100. Pledge allegiance to Earth and all inhabitants"
    ]
  };

  // Calculate progress for each category
  const categoryProgress = Object.keys(allPrinciples).map(category => {
    const implemented = Math.floor(Math.random() * 40 + 30); // Simulated progress
    const inProgress = Math.floor(Math.random() * 30 + 20);
    const planned = 100 - implemented - inProgress;
    return {
      category: category.split('(')[0].trim(),
      implemented,
      inProgress,
      planned,
      total: allPrinciples[category].length
    };
  });

  const MetricCard = ({ title, value, target, unit, color, trend }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {trend && (
          <span className={`text-xs px-2 py-1 rounded ${trend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold" style={{ color }}>{value}</span>
        <span className="text-gray-500 ml-1">{unit}</span>
      </div>
      {target && (
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{Math.round((value/target)*100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-500" 
              style={{ width: `${Math.min((value/target)*100, 100)}%`, backgroundColor: color }}
            />
          </div>
        </div>
      )}
    </div>
  );

  const PrincipleCategory = ({ category, principles, progress }) => {
    const isExpanded = expandedCategory === category;
    const getStatusColor = (index) => {
      const random = Math.random();
      if (random > 0.6) return 'bg-green-500'; // Implemented
      if (random > 0.3) return 'bg-yellow-500'; // In Progress
      return 'bg-gray-300'; // Planned
    };

    const getStatusText = (color) => {
      if (color === 'bg-green-500') return 'Implemented';
      if (color === 'bg-yellow-500') return 'In Progress';
      return 'Planned';
    };

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <button
          onClick={() => setExpandedCategory(isExpanded ? null : category)}
          className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
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
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </button>
        {isExpanded && (
          <div className="px-4 pb-4 border-t">
            <div className="space-y-2 mt-3">
              {principles.map((principle, index) => {
                const statusColor = getStatusColor(index);
                return (
                  <div key={index} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                    <div className={`w-4 h-4 rounded-full mt-0.5 flex-shrink-0 ${statusColor}`} />
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
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
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>View on GitHub</span>
              </a>
              <select 
                value={selectedRegion} 
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="global">Global</option>
                <option value="americas">Americas</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
                <option value="africa">Africa</option>
                <option value="oceania">Oceania</option>
              </select>
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
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

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {['overview', 'resources', 'automation', 'social', 'environment', 'principles'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard 
                title="Resource Efficiency" 
                value={87} 
                target={100} 
                unit="%" 
                color="#10B981" 
                trend={3.2}
              />
              <MetricCard 
                title="Renewable Energy" 
                value={78} 
                target={100} 
                unit="%" 
                color="#3B82F6" 
                trend={5.1}
              />
              <MetricCard 
                title="Global Cooperation" 
                value={72} 
                target={100} 
                unit="%" 
                color="#8B5CF6" 
                trend={2.8}
              />
              <MetricCard 
                title="Automation Level" 
                value={52} 
                target={100} 
                unit="%" 
                color="#F59E0B" 
                trend={4.5}
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Resource Distribution */}
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

              {/* Social Metrics Radar */}
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

            {/* Global Cooperation */}
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
        )}

        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <MetricCard title="Water Availability" value={92} target={100} unit="%" color="#06B6D4" trend={1.2} />
              <MetricCard title="Food Security" value={88} target={100} unit="%" color="#84CC16" trend={2.5} />
              <MetricCard title="Material Recycling" value={76} target={100} unit="%" color="#F97316" trend={3.8} />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Resource Allocation by Sector</h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={[
                  { sector: 'Housing', allocated: 95, needed: 100 },
                  { sector: 'Healthcare', allocated: 92, needed: 100 },
                  { sector: 'Education', allocated: 88, needed: 100 },
                  { sector: 'Transportation', allocated: 78, needed: 100 },
                  { sector: 'Recreation', allocated: 85, needed: 100 },
                  { sector: 'Research', allocated: 72, needed: 100 }
                ]}>
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
        )}

        {activeTab === 'automation' && (
          <div className="space-y-6">
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
                  {['Production Systems', 'Distribution Networks', 'Resource Monitoring', 'Decision Support', 'Maintenance Systems'].map((system, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{system}</span>
                        <span>{65 + idx * 8}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" 
                          style={{ width: `${65 + idx * 8}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Labor Liberation Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span className="text-sm">Routine Tasks Automated</span>
                    <span className="font-bold text-green-600">78%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <span className="text-sm">Creative Pursuits Enabled</span>
                    <span className="font-bold text-blue-600">62%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                    <span className="text-sm">Education & Research Focus</span>
                    <span className="font-bold text-purple-600">71%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MetricCard title="Education Access" value={85} target={100} unit="%" color="#3B82F6" trend={2.1} />
              <MetricCard title="Healthcare Coverage" value={78} target={100} unit="%" color="#10B981" trend={3.5} />
              <MetricCard title="Housing Quality" value={72} target={100} unit="%" color="#8B5CF6" trend={4.2} />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Quality of Life Indicators</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={[
                  { indicator: 'Life Satisfaction', value: 82 },
                  { indicator: 'Work-Life Balance', value: 88 },
                  { indicator: 'Community Engagement', value: 75 },
                  { indicator: 'Personal Development', value: 79 },
                  { indicator: 'Environmental Quality', value: 71 },
                  { indicator: 'Safety & Security', value: 91 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="indicator" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6">
                    {[82, 88, 75, 79, 71, 91].map((value, index) => (
                      <Cell key={`cell-${index}`} fill={value > 80 ? '#10B981' : value > 70 ? '#F59E0B' : '#EF4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'environment' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <MetricCard title="Carbon Neutrality" value={68} target={100} unit="%" color="#10B981" trend={6.2} />
              <MetricCard title="Biodiversity Index" value={74} target={100} unit="%" color="#06B6D4" trend={1.8} />
              <MetricCard title="Ocean Health" value={61} target={100} unit="%" color="#3B82F6" trend={2.5} />
              <MetricCard title="Forest Coverage" value={82} target={100} unit="%" color="#84CC16" trend={3.1} />
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
                  {[
                    { name: 'Renewable Energy Usage', value: 78, color: '#3B82F6' },
                    { name: 'Waste Recycling Rate', value: 85, color: '#10B981' },
                    { name: 'Water Conservation', value: 72, color: '#06B6D4' },
                    { name: 'Green Space Coverage', value: 65, color: '#84CC16' },
                    { name: 'Sustainable Agriculture', value: 69, color: '#F59E0B' }
                  ].map((metric, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{metric.name}</span>
                        <span style={{ color: metric.color }} className="font-semibold">{metric.value}%</span>
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
        )}

        {activeTab === 'principles' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-blue-800">
                <strong>100 Principles for a Resource-Based Economy:</strong> "The future is not something that happens to us, but something we create."
                These principles guide our transition to a sustainable, equitable civilization.
              </p>
              <a 
                href="https://github.com/The-Venus-Project-AI/100-Rules-Jacque-Fresco-Would-Suggest-We-Follow"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm mt-2"
              >
                <span>View complete documentation on GitHub</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* Progress Overview */}
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

            {/* All 100 Principles */}
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

            {/* Summary Stats */}
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
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">
                Based on the 100 principles for a Resource-Based Economy
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Working towards a sustainable, equitable civilization free from war, poverty, and unnecessary suffering
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/The-Venus-Project-AI/100-Rules-Jacque-Fresco-Would-Suggest-We-Follow"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                GitHub Repository
              </a>
              <span className="text-sm text-gray-500">
                Last Updated: {new Date().toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;