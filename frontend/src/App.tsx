import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [timeRange, setTimeRange] = useState('year');
  
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

  const principles = {
    resourceManagement: [
      "Earth's resources as common heritage",
      "Resource-based economy implementation",
      "Elimination of monetary system",
      "Scientific resource allocation",
      "Automation of labor",
      "Real-time inventory systems",
      "Durable goods production",
      "Circular economy design",
      "Waste-to-resource conversion",
      "Global resource monitoring"
    ],
    environment: [
      "Environmental restoration priority",
      "Carrying capacity adherence",
      "100% renewable energy",
      "Chemical-free agriculture",
      "Circular city design",
      "Green space integration",
      "Disaster-resistant structures",
      "Modular construction",
      "Closed-loop systems",
      "Automated monitoring"
    ],
    science: [
      "Scientific method application",
      "Evidence-based decisions",
      "Peer review systems",
      "Technical problem-solving",
      "AI-assisted management",
      "Continuous methodology updates",
      "Data-driven governance",
      "Systematic inquiry",
      "Verification protocols",
      "Machine decision-making"
    ],
    education: [
      "Universal free education",
      "Critical thinking focus",
      "Cooperation emphasis",
      "Environmental behavior studies",
      "Anti-elitism measures",
      "Change adaptation training",
      "Global consciousness",
      "Problem-solving skills",
      "Interconnected learning",
      "Innovation encouragement"
    ],
    social: [
      "Environmental behavior shaping",
      "Learned behavior recognition",
      "Destructive pattern elimination",
      "Empathy development",
      "Scientific governance",
      "Abundance society creation",
      "Border elimination",
      "Collective resource management",
      "Power balance maintenance",
      "Mutual interest alignment"
    ]
  };

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

  const PrincipleChecklist = ({ category, items }) => (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">{category}</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded-full ${Math.random() > 0.3 ? 'bg-green-500' : Math.random() > 0.5 ? 'bg-yellow-500' : 'bg-gray-300'}`} />
            <span className="text-sm text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );

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
                <strong>Jacque Fresco's Vision:</strong> "The future is not something that happens to us, but something we create."
                These 100 principles guide our transition to a resource-based economy.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PrincipleChecklist category="Resource Management (1-10)" items={principles.resourceManagement} />
              <PrincipleChecklist category="Environment & Sustainability (11-20)" items={principles.environment} />
              <PrincipleChecklist category="Science & Decision-Making (21-30)" items={principles.science} />
              <PrincipleChecklist category="Education & Development (31-40)" items={principles.education} />
              <PrincipleChecklist category="Social Organization (41-60)" items={principles.social} />
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Implementation Progress</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={[
                    { category: 'Resources', progress: 72 },
                    { category: 'Environment', progress: 68 },
                    { category: 'Science', progress: 81 },
                    { category: 'Education', progress: 75 },
                    { category: 'Social', progress: 62 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="progress" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Global Unity Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">156</div>
                  <div className="text-sm text-gray-600 mt-1">Nations Participating</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">89%</div>
                  <div className="text-sm text-gray-600 mt-1">Resource Sharing Agreement</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">2.1B</div>
                  <div className="text-sm text-gray-600 mt-1">People Connected</div>
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
                Based on The Venus Project principles by Jacque Fresco
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Working towards a sustainable, equitable civilization free from war, poverty, and unnecessary suffering
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Last Updated: {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
