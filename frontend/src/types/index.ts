// Core types for RBE Platform

export interface ResourceData {
  name: string;
  value: number;
  target: number;
  color: string;
}

export interface SocialMetric {
  subject: string;
  A: number;
  fullMark: number;
}

export interface AutomationData {
  month: string;
  manufacturing: number;
  agriculture: number;
  services: number;
  transportation: number;
}

export interface CircularCity {
  name: string;
  value: number;
  color: string;
}

export interface CooperationData {
  region: string;
  cooperation: number;
  resourceSharing: number;
  knowledgeExchange: number;
}

export interface PrincipleCategory {
  [category: string]: string[];
}

export interface CategoryProgress {
  category: string;
  implemented: number;
  inProgress: number;
  planned: number;
  total: number;
}

export interface MetricCardProps {
  title: string;
  value: number;
  target?: number;
  unit: string;
  color: string;
  trend?: number;
}

export interface PrincipleCategoryProps {
  category: string;
  principles: string[];
  progress?: CategoryProgress;
}

export type TabType = 'overview' | 'resources' | 'automation' | 'social' | 'environment' | 'principles';
export type RegionType = 'global' | 'americas' | 'europe' | 'asia' | 'africa' | 'oceania';
export type TimeRangeType = 'day' | 'week' | 'month' | 'year';

export interface AppState {
  activeTab: TabType;
  selectedRegion: RegionType;
  timeRange: TimeRangeType;
  expandedCategory: string | null;
  setActiveTab: (tab: TabType) => void;
  setSelectedRegion: (region: RegionType) => void;
  setTimeRange: (range: TimeRangeType) => void;
  setExpandedCategory: (category: string | null) => void;
}

export interface ResourceAllocation {
  sector: string;
  allocated: number;
  needed: number;
}

export interface QualityOfLifeIndicator {
  indicator: string;
  value: number;
}

export interface SustainabilityMetric {
  name: string;
  value: number;
  color: string;
}

export interface CybernationSystem {
  name: string;
  progress: number;
}

export interface LaborLiberation {
  name: string;
  percentage: number;
  type: 'routine' | 'creative' | 'education';
}
