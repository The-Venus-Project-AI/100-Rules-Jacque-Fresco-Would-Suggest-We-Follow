import type {
  ResourceData,
  SocialMetric,
  AutomationData,
  CircularCity,
  CooperationData,
  PrincipleCategory,
} from '../types';

export const resourceData: ResourceData[] = [
  { name: 'Solar', value: 35, target: 100, color: '#FFB800' },
  { name: 'Wind', value: 25, target: 100, color: '#00C49F' },
  { name: 'Geothermal', value: 15, target: 100, color: '#FF6B6B' },
  { name: 'Hydro', value: 20, target: 100, color: '#4ECDC4' },
  { name: 'Fossil Fuels', value: 5, target: 0, color: '#95A5A6' },
];

export const socialMetrics: SocialMetric[] = [
  { subject: 'Education Access', A: 85, fullMark: 100 },
  { subject: 'Healthcare', A: 78, fullMark: 100 },
  { subject: 'Housing Quality', A: 72, fullMark: 100 },
  { subject: 'Food Security', A: 88, fullMark: 100 },
  { subject: 'Clean Water', A: 91, fullMark: 100 },
  { subject: 'Technology Access', A: 67, fullMark: 100 },
];

export const automationProgress: AutomationData[] = [
  { month: 'Jan', manufacturing: 45, agriculture: 38, services: 25, transportation: 55 },
  { month: 'Feb', manufacturing: 48, agriculture: 40, services: 28, transportation: 58 },
  { month: 'Mar', manufacturing: 52, agriculture: 42, services: 32, transportation: 62 },
  { month: 'Apr', manufacturing: 55, agriculture: 45, services: 35, transportation: 65 },
  { month: 'May', manufacturing: 58, agriculture: 48, services: 38, transportation: 68 },
  { month: 'Jun', manufacturing: 62, agriculture: 52, services: 42, transportation: 72 },
];

export const circularCities: CircularCity[] = [
  { name: 'Planning', value: 15, color: '#8884d8' },
  { name: 'Construction', value: 8, color: '#82ca9d' },
  { name: 'Operational', value: 3, color: '#ffc658' },
  { name: 'Proposed', value: 24, color: '#ff7c7c' },
];

export const globalCooperation: CooperationData[] = [
  { region: 'Americas', cooperation: 72, resourceSharing: 68, knowledgeExchange: 85 },
  { region: 'Europe', cooperation: 88, resourceSharing: 82, knowledgeExchange: 92 },
  { region: 'Asia', cooperation: 65, resourceSharing: 70, knowledgeExchange: 78 },
  { region: 'Africa', cooperation: 58, resourceSharing: 52, knowledgeExchange: 65 },
  { region: 'Oceania', cooperation: 78, resourceSharing: 75, knowledgeExchange: 88 },
];

export const allPrinciples: PrincipleCategory = {
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
    "10. Produce goods for maximum utility and durability",
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
    "20. Monitor environmental conditions automatically",
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
    "30. Assign more decision-making to machines",
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
    "40. Encourage innovative thinking",
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
    "50. Practice empathy through understanding",
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
    "60. Align individual and collective interests",
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
    "70. Create self-erecting structures",
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
    "80. Eliminate hoarding through universal access",
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
    "90. Create safe recreational facilities",
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
    "100. Pledge allegiance to Earth and all inhabitants",
  ],
};

export const calculateCategoryProgress = () => {
  return Object.keys(allPrinciples).map((category) => {
    const implemented = Math.floor(Math.random() * 40 + 30);
    const inProgress = Math.floor(Math.random() * 30 + 20);
    const planned = 100 - implemented - inProgress;
    return {
      category: category.split('(')[0].trim(),
      implemented,
      inProgress,
      planned,
      total: allPrinciples[category].length,
    };
  });
};
