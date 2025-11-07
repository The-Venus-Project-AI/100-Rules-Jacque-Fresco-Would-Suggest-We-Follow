// API Service Layer for RBE Platform

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Health check
  async checkHealth() {
    return this.request<any>('/health');
  }

  // Resources API
  async getResources(params?: {
    page?: number;
    limit?: number;
    region?: string;
    category?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.region) queryParams.append('region', params.region);
    if (params?.category) queryParams.append('category', params.category);

    const query = queryParams.toString();
    return this.request<any[]>(`/resources${query ? `?${query}` : ''}`);
  }

  async getResource(id: string) {
    return this.request<any>(`/resources/${id}`);
  }

  async createResource(data: any) {
    return this.request<any>('/resources', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateResource(id: string, data: any) {
    return this.request<any>(`/resources/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteResource(id: string) {
    return this.request<any>(`/resources/${id}`, {
      method: 'DELETE',
    });
  }

  async getResourceCategories() {
    return this.request<string[]>('/resources/meta/categories');
  }

  async getResourceRegions() {
    return this.request<string[]>('/resources/meta/regions');
  }

  // Principles API
  async getPrinciples(params?: {
    page?: number;
    limit?: number;
    region?: string;
    category?: string;
    status?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.region) queryParams.append('region', params.region);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.status) queryParams.append('status', params.status);

    const query = queryParams.toString();
    return this.request<any[]>(`/principles${query ? `?${query}` : ''}`);
  }

  async getPrinciple(number: number) {
    return this.request<any>(`/principles/${number}`);
  }

  async updatePrinciple(number: number, data: any) {
    return this.request<any>(`/principles/${number}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getPrinciplesStats() {
    return this.request<any>('/principles/stats/summary');
  }

  async getPrinciplesByCategory() {
    return this.request<any>('/principles/stats/by-category');
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
