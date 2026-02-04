const API_BASE_URL = 'http://localhost:8090/api/v1';

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, { ...options, headers: { 'Content-Type': 'application/json', ...options.headers } });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// --- Types for the Management Analytics Page (Refactored) ---

export interface Metric {
  currentValue: number;
  previousValue: number;
  growthRate: number;
}

export interface UserGrowthPoint { /* ... unchanged ... */ }
export interface RevenueGrowthPoint { /* ... unchanged ... */ }
export interface DistributionPoint { /* ... unchanged ... */ }

// Renamed from StepsGrowthPoint
export interface CarbonGrowthPoint {
  date: string;
  carbonSaved: number; // Renamed from steps
  avgPerUser: number;
}

export interface ManagementAnalyticsData {
  totalUsers: Metric;
  newUsers: Metric;
  activeUsers: Metric;
  totalCarbonSaved: Metric; // Renamed from totalSteps
  averageCarbonPerUser: Metric; // Renamed from averageStepsPerUser
  totalRevenue: Metric;
  vipRevenue: Metric;
  shopRevenue: Metric;
  userGrowthTrend: UserGrowthPoint[];
  carbonGrowthTrend: CarbonGrowthPoint[]; // Renamed from stepsGrowthTrend
  revenueGrowthTrend: RevenueGrowthPoint[];
  vipDistribution: DistributionPoint[];
  categoryRevenue: DistributionPoint[];
}

export async function getManagementAnalytics(timeRange: string): Promise<ManagementAnalyticsData> {
  const response = await fetchApi<ApiResponse<ManagementAnalyticsData>>(`/statistics/management-analytics?timeRange=${timeRange}`);
  return response.data;
}
