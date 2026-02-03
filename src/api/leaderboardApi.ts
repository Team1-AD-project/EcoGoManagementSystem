const API_BASE_URL = 'http://localhost:8090/api/v1';

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export interface Ranking {
  id: string;
  period: string;
  rank: number;
  userId: string;
  nickname: string;
  carbonSaved: number;
  isVip: boolean;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface LeaderboardStatsDto {
  rankingsPage: Page<Ranking>;
  totalCarbonSaved: number;
  totalVipUsers: number;
}

export async function getLeaderboardPeriods(): Promise<string[]> {
  const response = await fetchApi<ApiResponse<string[]>>('/leaderboards/periods');
  return response.data;
}

export async function getRankingsByPeriod(period: string, name: string = '', page: number = 0, size: number = 10): Promise<LeaderboardStatsDto> {
  const encodedPeriod = encodeURIComponent(period);
  const encodedName = encodeURIComponent(name);
  const response = await fetchApi<ApiResponse<LeaderboardStatsDto>>(`/leaderboards/rankings?period=${encodedPeriod}&name=${encodedName}&page=${page}&size=${size}`);
  return response.data;
}
