-- RBE Platform Seed Data
-- Migration: 002_seed_data.sql

-- Insert sample resources
INSERT INTO resources (category, subcategory, name, current_amount, unit, region, confidence_level) VALUES
('Water', 'Freshwater', 'Global Freshwater Reserves', 35000000, 'cubic kilometers', 'global', 0.95),
('Energy', 'Solar', 'Solar Energy Potential', 173000, 'terawatts', 'global', 0.90),
('Energy', 'Wind', 'Wind Energy Capacity', 840, 'gigawatts', 'global', 0.92),
('Energy', 'Geothermal', 'Geothermal Capacity', 15, 'gigawatts', 'global', 0.88),
('Food', 'Grain', 'Global Grain Production', 2800, 'million tonnes', 'global', 0.94),
('Food', 'Vegetables', 'Global Vegetable Production', 1100, 'million tonnes', 'global', 0.91),
('Materials', 'Recycled Steel', 'Steel Recycling Rate', 85, 'percentage', 'global', 0.93),
('Materials', 'Recycled Plastic', 'Plastic Recycling Rate', 9, 'percentage', 'global', 0.96);

-- Insert all 100 principles with initial status
INSERT INTO principles_implementation (principle_number, principle_text, category, status, progress_percentage, region) VALUES
-- Resource Management and Economics (1-10)
(1, 'Declare all of Earth''s resources as the common heritage of all people', 'Resource Management and Economics', 'planned', 15, 'global'),
(2, 'Base decisions on resource availability and carrying capacity', 'Resource Management and Economics', 'in_progress', 35, 'global'),
(3, 'Eliminate the monetary system', 'Resource Management and Economics', 'planned', 5, 'global'),
(4, 'Measure wealth by resources and productive capacity', 'Resource Management and Economics', 'in_progress', 25, 'global'),
(5, 'Use technology to create abundance for all', 'Resource Management and Economics', 'in_progress', 45, 'global'),
(6, 'Design production to meet human needs directly', 'Resource Management and Economics', 'in_progress', 40, 'global'),
(7, 'Apply scientific methods to resource allocation', 'Resource Management and Economics', 'in_progress', 50, 'global'),
(8, 'Automate all routine and monotonous labor', 'Resource Management and Economics', 'in_progress', 52, 'global'),
(9, 'Maintain real-time inventory systems', 'Resource Management and Economics', 'in_progress', 38, 'global'),
(10, 'Produce goods for maximum utility and durability', 'Resource Management and Economics', 'in_progress', 30, 'global'),

-- Environment and Sustainability (11-20)
(11, 'Prioritize environmental restoration and protection', 'Environment and Sustainability', 'in_progress', 55, 'global'),
(12, 'Design systems within Earth''s carrying capacity', 'Environment and Sustainability', 'in_progress', 42, 'global'),
(13, 'Use only clean, renewable energy sources', 'Environment and Sustainability', 'in_progress', 78, 'global'),
(14, 'Eliminate dangerous chemicals and pesticides', 'Environment and Sustainability', 'in_progress', 35, 'global'),
(15, 'Create circular cities for efficiency', 'Environment and Sustainability', 'planned', 12, 'global'),
(16, 'Integrate parks and green spaces', 'Environment and Sustainability', 'implemented', 68, 'global'),
(17, 'Build disaster-resistant structures', 'Environment and Sustainability', 'in_progress', 48, 'global'),
(18, 'Use prefabricated, modular construction', 'Environment and Sustainability', 'in_progress', 32, 'global'),
(19, 'Implement closed-loop systems', 'Environment and Sustainability', 'in_progress', 28, 'global'),
(20, 'Monitor environmental conditions automatically', 'Environment and Sustainability', 'in_progress', 62, 'global'),

-- Science and Decision-Making (21-30)
(21, 'Apply scientific method to social systems', 'Science and Decision-Making', 'in_progress', 45, 'global'),
(22, 'Base decisions on research and experimentation', 'Science and Decision-Making', 'in_progress', 58, 'global'),
(23, 'Require verification and peer review', 'Science and Decision-Making', 'implemented', 75, 'global'),
(24, 'Ask "what do we have here?" and investigate', 'Science and Decision-Making', 'implemented', 70, 'global'),
(25, 'Replace political ideologies with technical solutions', 'Science and Decision-Making', 'planned', 18, 'global'),
(26, 'Use AI to manage complex systems', 'Science and Decision-Making', 'in_progress', 42, 'global'),
(27, 'Eliminate financial influence in decisions', 'Science and Decision-Making', 'planned', 10, 'global'),
(28, 'Design systems serving all people equally', 'Science and Decision-Making', 'in_progress', 38, 'global'),
(29, 'Continuously update methodologies', 'Science and Decision-Making', 'implemented', 82, 'global'),
(30, 'Assign more decision-making to machines', 'Science and Decision-Making', 'in_progress', 35, 'global'),

-- Education and Human Development (31-40)
(31, 'Make education free and accessible to all', 'Education and Human Development', 'in_progress', 65, 'global'),
(32, 'Teach critical thinking and scientific method', 'Education and Human Development', 'in_progress', 52, 'global'),
(33, 'Emphasize cooperation, creativity, individuality', 'Education and Human Development', 'in_progress', 48, 'global'),
(34, 'Provide information about environmental behavior shaping', 'Education and Human Development', 'in_progress', 42, 'global'),
(35, 'Eliminate all types of elitism', 'Education and Human Development', 'planned', 22, 'global'),
(36, 'Prepare people for continuous change', 'Education and Human Development', 'in_progress', 38, 'global'),
(37, 'Foster global consciousness', 'Education and Human Development', 'in_progress', 45, 'global'),
(38, 'Train problem-solvers, not soldiers', 'Education and Human Development', 'planned', 25, 'global'),
(39, 'Teach through demonstration and interconnection', 'Education and Human Development', 'in_progress', 55, 'global'),
(40, 'Encourage innovative thinking', 'Education and Human Development', 'in_progress', 62, 'global'),

-- Human Behavior and Values (41-50)
(41, 'Understand behavior as environmentally shaped', 'Human Behavior and Values', 'in_progress', 58, 'global'),
(42, 'Recognize greed and hatred as learned behaviors', 'Human Behavior and Values', 'in_progress', 45, 'global'),
(43, 'Change destructive behaviors by changing environment', 'Human Behavior and Values', 'in_progress', 38, 'global'),
(44, 'Reject notions of inherent good and evil', 'Human Behavior and Values', 'in_progress', 42, 'global'),
(45, 'Abandon myth of fixed individuality', 'Human Behavior and Values', 'in_progress', 35, 'global'),
(46, 'Accept abilities result from environment', 'Human Behavior and Values', 'in_progress', 48, 'global'),
(47, 'Understand violence stems from scarcity', 'Human Behavior and Values', 'in_progress', 52, 'global'),
(48, 'Celebrate being proven wrong as growth', 'Human Behavior and Values', 'in_progress', 40, 'global'),
(49, 'Base success on genuine beliefs', 'Human Behavior and Values', 'in_progress', 45, 'global'),
(50, 'Practice empathy through understanding', 'Human Behavior and Values', 'implemented', 68, 'global'),

-- Social Organization and Governance (51-60)
(51, 'Replace political government with scientific management', 'Social Organization and Governance', 'planned', 8, 'global'),
(52, 'Remove police, military, prisons as unnecessary', 'Social Organization and Governance', 'planned', 5, 'global'),
(53, 'End wars by addressing root causes', 'Social Organization and Governance', 'in_progress', 32, 'global'),
(54, 'Abolish borders, create unified civilization', 'Social Organization and Governance', 'planned', 12, 'global'),
(55, 'Eliminate taxation through collective management', 'Social Organization and Governance', 'planned', 8, 'global'),
(56, 'Remove all forms of debt and servitude', 'Social Organization and Governance', 'planned', 15, 'global'),
(57, 'Make laws obsolete through design', 'Social Organization and Governance', 'planned', 10, 'global'),
(58, 'Establish values based on actual needs', 'Social Organization and Governance', 'in_progress', 42, 'global'),
(59, 'Ensure no group holds power over others', 'Social Organization and Governance', 'in_progress', 35, 'global'),
(60, 'Align individual and collective interests', 'Social Organization and Governance', 'in_progress', 38, 'global'),

-- Technology and Innovation (61-70)
(61, 'Use technology to generate abundance', 'Technology and Innovation', 'in_progress', 55, 'global'),
(62, 'Implement cybernation of production', 'Technology and Innovation', 'in_progress', 42, 'global'),
(63, 'Apply AI to improve decision-making', 'Technology and Innovation', 'in_progress', 48, 'global'),
(64, 'Create interconnected sensor networks', 'Technology and Innovation', 'in_progress', 52, 'global'),
(65, 'Develop automated inventory systems', 'Technology and Innovation', 'in_progress', 45, 'global'),
(66, 'Design cities as evolving organisms', 'Technology and Innovation', 'planned', 15, 'global'),
(67, 'Build elevated transportation systems', 'Technology and Innovation', 'in_progress', 28, 'global'),
(68, 'Prefabricate buildings in factories', 'Technology and Innovation', 'in_progress', 35, 'global'),
(69, 'Use 3D imaging and advanced construction', 'Technology and Innovation', 'in_progress', 42, 'global'),
(70, 'Create self-erecting structures', 'Technology and Innovation', 'in_progress', 25, 'global'),

-- Resource Distribution and Access (71-80)
(71, 'Provide universal access to all necessities', 'Resource Distribution and Access', 'in_progress', 45, 'global'),
(72, 'Ensure highest standard of living for all', 'Resource Distribution and Access', 'in_progress', 38, 'global'),
(73, 'Eliminate hunger, poverty, homelessness', 'Resource Distribution and Access', 'in_progress', 42, 'global'),
(74, 'Make medical care universally available', 'Resource Distribution and Access', 'in_progress', 58, 'global'),
(75, 'Provide mental stimulation with material needs', 'Resource Distribution and Access', 'in_progress', 48, 'global'),
(76, 'Design systems where intelligence enriches all', 'Resource Distribution and Access', 'in_progress', 52, 'global'),
(77, 'Recognize interdependence of safety', 'Resource Distribution and Access', 'implemented', 65, 'global'),
(78, 'Understand unmet needs create dangers', 'Resource Distribution and Access', 'implemented', 70, 'global'),
(79, 'Allocate resources efficiently without waste', 'Resource Distribution and Access', 'in_progress', 45, 'global'),
(80, 'Eliminate hoarding through universal access', 'Resource Distribution and Access', 'planned', 22, 'global'),

-- Urban Design and Infrastructure (81-90)
(81, 'Build circular cities with radial sectors', 'Urban Design and Infrastructure', 'planned', 8, 'global'),
(82, 'Place central dome for core systems', 'Urban Design and Infrastructure', 'planned', 5, 'global'),
(83, 'Surround cities with agricultural belts', 'Urban Design and Infrastructure', 'in_progress', 25, 'global'),
(84, 'Create waterways for irrigation', 'Urban Design and Infrastructure', 'in_progress', 38, 'global'),
(85, 'Designate outer perimeters for recreation', 'Urban Design and Infrastructure', 'in_progress', 42, 'global'),
(86, 'Design varied residential architecture', 'Urban Design and Infrastructure', 'implemented', 72, 'global'),
(87, 'Build vertical cities to preserve land', 'Urban Design and Infrastructure', 'in_progress', 32, 'global'),
(88, 'Include amenities within walking distance', 'Urban Design and Infrastructure', 'in_progress', 48, 'global'),
(89, 'Incorporate exercise naturally in design', 'Urban Design and Infrastructure', 'in_progress', 45, 'global'),
(90, 'Create safe recreational facilities', 'Urban Design and Infrastructure', 'implemented', 68, 'global'),

-- Cooperation and Global Unity (91-100)
(91, 'Work together to solve problems', 'Cooperation and Global Unity', 'in_progress', 55, 'global'),
(92, 'Function as single organism', 'Cooperation and Global Unity', 'in_progress', 35, 'global'),
(93, 'Share knowledge and innovations freely', 'Cooperation and Global Unity', 'implemented', 78, 'global'),
(94, 'Bridge differences for environmental care', 'Cooperation and Global Unity', 'in_progress', 48, 'global'),
(95, 'Recognize universal human needs', 'Cooperation and Global Unity', 'implemented', 72, 'global'),
(96, 'Accept different conclusions while meeting needs', 'Cooperation and Global Unity', 'in_progress', 52, 'global'),
(97, 'Practice cooperation from childhood', 'Cooperation and Global Unity', 'in_progress', 45, 'global'),
(98, 'Define humanity through caring', 'Cooperation and Global Unity', 'implemented', 68, 'global'),
(99, 'Take responsibility for everyone''s wellbeing', 'Cooperation and Global Unity', 'in_progress', 42, 'global'),
(100, 'Pledge allegiance to Earth and all inhabitants', 'Cooperation and Global Unity', 'in_progress', 38, 'global');

-- Insert sample cooperation metrics
INSERT INTO cooperation_metrics (region_from, region_to, cooperation_type, metric_name, metric_value) VALUES
('Americas', 'Europe', 'resource_sharing', 'Joint Resource Projects', 72),
('Europe', 'Asia', 'knowledge_exchange', 'Research Collaborations', 88),
('Asia', 'Africa', 'technology_transfer', 'Tech Transfer Programs', 65),
('Africa', 'Oceania', 'resource_sharing', 'Resource Sharing Agreements', 58),
('Oceania', 'Americas', 'knowledge_exchange', 'Scientific Partnerships', 78);

-- Insert sample automation progress
INSERT INTO automation_progress (sector, subsector, automation_percentage, region) VALUES
('Manufacturing', 'Automotive', 85, 'global'),
('Manufacturing', 'Electronics', 78, 'global'),
('Agriculture', 'Crop Harvesting', 52, 'global'),
('Agriculture', 'Irrigation Systems', 68, 'global'),
('Transportation', 'Autonomous Vehicles', 35, 'global'),
('Services', 'Customer Service', 42, 'global'),
('Healthcare', 'Diagnostics', 55, 'global'),
('Education', 'Online Learning', 72, 'global');

-- Insert sample circular cities
INSERT INTO circular_cities (name, region, country, status, population_target, renewable_energy_percentage, waste_recycling_percentage) VALUES
('Venus City Alpha', 'Americas', 'United States', 'planning', 50000, 100, 95),
('Circular Singapore', 'Asia', 'Singapore', 'construction', 75000, 95, 90),
('EcoCity Copenhagen', 'Europe', 'Denmark', 'operational', 30000, 100, 92),
('Sustainable Cape Town', 'Africa', 'South Africa', 'planning', 60000, 90, 85),
('Green Melbourne', 'Oceania', 'Australia', 'planning', 45000, 95, 88);

-- Insert sample environmental metrics
INSERT INTO environmental_metrics (metric_name, metric_type, value, unit, region) VALUES
('Carbon Emissions', 'climate', 36000, 'million tonnes CO2', 'global'),
('Forest Coverage', 'biodiversity', 30.7, 'percentage', 'global'),
('Ocean pH Level', 'ocean_health', 8.05, 'pH', 'global'),
('Renewable Energy Share', 'energy', 29.5, 'percentage', 'global'),
('Biodiversity Index', 'biodiversity', 74.2, 'index_score', 'global');

-- Insert sample social metrics
INSERT INTO social_metrics (metric_name, category, value, region) VALUES
('Education Access', 'education', 85.3, 'global'),
('Healthcare Coverage', 'healthcare', 78.5, 'global'),
('Housing Quality Index', 'housing', 72.1, 'global'),
('Food Security Index', 'food', 88.4, 'global'),
('Life Satisfaction', 'quality_of_life', 7.2, 'global');
