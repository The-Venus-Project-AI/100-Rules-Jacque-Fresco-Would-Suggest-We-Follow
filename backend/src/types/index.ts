// Backend TypeScript Types for RBE Platform

export interface Resource {
  id: string;
  category: string;
  subcategory?: string;
  name: string;
  current_amount: number;
  unit: string;
  region: string;
  last_updated: Date;
  source_api?: string;
  confidence_level?: number;
  metadata?: any;
  created_at: Date;
  updated_at: Date;
}

export interface PrincipleImplementation {
  id: string;
  principle_number: number;
  principle_text: string;
  category: string;
  status: 'planned' | 'in_progress' | 'implemented';
  progress_percentage: number;
  region: string;
  evidence_links?: string[];
  notes?: string;
  created_at: Date;
  updated_at: Date;
  updated_by?: string;
}

export interface CooperationMetric {
  id: string;
  region_from: string;
  region_to?: string;
  cooperation_type: string;
  metric_name: string;
  metric_value: number;
  timestamp: Date;
  source?: string;
  metadata?: any;
}

export interface AutomationProgress {
  id: string;
  sector: string;
  subsector?: string;
  automation_percentage: number;
  jobs_automated: number;
  jobs_created: number;
  region: string;
  timestamp: Date;
  notes?: string;
}

export interface EnvironmentalMetric {
  id: string;
  metric_name: string;
  metric_type: string;
  value: number;
  unit: string;
  region: string;
  timestamp: Date;
  source?: string;
  metadata?: any;
}

export interface SocialMetric {
  id: string;
  metric_name: string;
  category: string;
  value: number;
  region: string;
  timestamp: Date;
  source?: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  password_hash: string;
  role: 'admin' | 'moderator' | 'contributor' | 'viewer';
  region?: string;
  created_at: Date;
  updated_at: Date;
  last_login?: Date;
  is_active: boolean;
}

export interface UserContribution {
  id: string;
  user_id: string;
  contribution_type: string;
  content: any;
  status: 'pending' | 'approved' | 'rejected';
  verified: boolean;
  created_at: Date;
  reviewed_at?: Date;
  reviewed_by?: string;
}

export interface CircularCity {
  id: string;
  name: string;
  region: string;
  country: string;
  status: 'proposed' | 'planning' | 'construction' | 'operational';
  population_target?: number;
  current_population: number;
  renewable_energy_percentage?: number;
  waste_recycling_percentage?: number;
  coordinates?: any;
  metadata?: any;
  created_at: Date;
  updated_at: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  order?: 'asc' | 'desc';
}

export interface FilterParams {
  region?: string;
  category?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
}
