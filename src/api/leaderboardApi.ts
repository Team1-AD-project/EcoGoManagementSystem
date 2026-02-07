import { api } from '../services/auth';

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
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
  const response = await api.get<ApiResponse<string[]>>('/leaderboards/periods');
  return response.data.data;
}

export async function getRankingsByPeriod(period: string, name: string = '', page: number = 0, size: number = 10): Promise<LeaderboardStatsDto> {
  const response = await api.get<ApiResponse<LeaderboardStatsDto>>('/leaderboards/rankings', {
    params: { period, name, page, size },
  });
  return response.data.data;
}
