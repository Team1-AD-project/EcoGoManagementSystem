import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Trophy,
  Medal,
  Crown,
  TrendingUp,
  Calendar,
  Users,
  Gift,
  ChevronLeft,
  ChevronRight,
  Search,
  Loader2,
  RefreshCw
} from 'lucide-react';
import {
  getLeaderboardPeriods,
  getRankingsByPeriod,
  type Ranking,
  type LeaderboardStatsDto
} from '@/api/leaderboardApi';
import { useDebounce } from '@/hooks/useDebounce';

// Frontend extended ranking type
interface UserRanking extends Ranking {
  username?: string;
  avatar?: string;
  points?: number;
  avgDailyCarbonSaved?: number;
}

// Default avatar list
const AVATARS = ['👑', '🏃', '🌟', '💪', '🏅', '🌿', '⭐', '🎯', '🔥', '💎'];

export function LeaderboardManagement() {
  const [periods, setPeriods] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [stats, setStats] = useState<LeaderboardStatsDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Load period list
  const loadPeriods = async () => {
    try {
      const data = await getLeaderboardPeriods();
      setPeriods(data);
      if (data.length > 0 && !selectedPeriod) {
        setSelectedPeriod(data[0]);
      }
    } catch (err) {
      console.error('Error loading periods:', err);
    }
  };

  // Load leaderboard data
  const loadRankings = useCallback(async (period: string, search: string, page: number) => {
    if (!period) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getRankingsByPeriod(period, search, page, 10);

      const enrichedContent: UserRanking[] = data.rankingsPage.content.map((ranking, index) => ({
        ...ranking,
        username: ranking.nickname || `User ${ranking.userId}`,
        avatar: AVATARS[(ranking.rank - 1) % AVATARS.length],
        points: ranking.carbonSaved ? Math.floor(ranking.carbonSaved / 10) : 0,
        avgDailyCarbonSaved: ranking.carbonSaved ? Math.floor(ranking.carbonSaved / 7) : 0,
      }));

      const enrichedData: LeaderboardStatsDto = {
        ...data,
        rankingsPage: {
          ...data.rankingsPage,
          content: enrichedContent,
        },
      };

      setStats(enrichedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load rankings');
      console.error('Error loading rankings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPeriods();
  }, []);

  useEffect(() => {
    if (selectedPeriod) {
      loadRankings(selectedPeriod, debouncedSearchQuery, currentPage);
    }
  }, [selectedPeriod, debouncedSearchQuery, currentPage, loadRankings]);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Crown className="size-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="size-6 text-gray-400" />;
    if (rank === 3) return <Medal className="size-6 text-orange-400" />;
    return <span className="text-xl font-bold text-gray-600">#{rank}</span>;
  };

  const rankingsPage = stats?.rankingsPage;
  const rankings = rankingsPage?.content || [];
  
  const totalParticipants = stats?.rankingsPage.totalElements || 0;
  const avgCarbonSaved = totalParticipants > 0
    ? Math.round((stats?.totalCarbonSaved || 0) / totalParticipants)
    : 0;

  const currentPeriodIndex = periods.indexOf(selectedPeriod);
  const canGoPreviousPeriod = currentPeriodIndex < periods.length - 1;
  const canGoNextPeriod = currentPeriodIndex > 0;

  const goToPreviousPeriod = () => {
    if (canGoPreviousPeriod) {
        setCurrentPage(0);
        setSelectedPeriod(periods[currentPeriodIndex + 1]);
    }
  };

  const goToNextPeriod = () => {
    if (canGoNextPeriod) {
        setCurrentPage(0);
        setSelectedPeriod(periods[currentPeriodIndex - 1]);
    }
  };
  
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };


  if (loading && !stats) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="size-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Leaderboard Management</h2>
            <p className="text-gray-600 mt-1">View and manage weekly user rankings and reward distribution</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => loadRankings(selectedPeriod, debouncedSearchQuery, currentPage)}
            className="gap-2"
            disabled={loading}
          >
            <RefreshCw className="size-4" />
            Refresh
          </Button>
        </div>
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <Trophy className="size-8 mb-2" />
          <p className="text-sm opacity-90 mb-1">Total Participants</p>
          <p className="text-3xl font-bold">{totalParticipants}</p>
          <p className="text-xs opacity-75 mt-1">This period</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <Users className="size-8 mb-2" />
          <p className="text-sm opacity-90 mb-1">VIP Users</p>
          <p className="text-3xl font-bold">{stats?.totalVipUsers || 0}</p>
          <p className="text-xs opacity-75 mt-1">In this period</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <TrendingUp className="size-8 mb-2" />
          <p className="text-sm opacity-90 mb-1">Average Carbon Saved</p>
          <p className="text-3xl font-bold">{avgCarbonSaved.toLocaleString()} kg</p>
          <p className="text-xs opacity-75 mt-1">Per user, this period</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
           <Gift className="size-8 mb-2" />
           <p className="text-sm opacity-90 mb-1">Rewards Distributed</p>
           <p className="text-3xl font-bold">{Math.min(totalParticipants, 10)}</p>
           <p className="text-xs opacity-75 mt-1">Top 10 rewarded</p>
        </Card>
      </div>

      {/* Period Selector & Filters */}
      <div className="px-6 pb-4">
        <Card className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToPreviousPeriod} disabled={!canGoPreviousPeriod}><ChevronLeft className="size-4" /></Button>
              <Select value={selectedPeriod} onValueChange={(value) => { setSelectedPeriod(value); setCurrentPage(0); }}>
                <SelectTrigger className="w-[200px]">
                  <Calendar className="size-4 mr-2" />
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  {periods.map(period => (
                    <SelectItem key={period} value={period}>{period}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={goToNextPeriod} disabled={!canGoNextPeriod}><ChevronRight className="size-4" /></Button>
            </div>
            <div className="flex-1" />
            <div className="relative w-full sm:w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Search by nickname..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(0); }}
                className="pl-9"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Rankings Table */}
        <div className="px-6 pb-6 flex-1 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-bold text-gray-900">Full Rankings</h3>
              <p className="text-sm text-gray-600">{totalParticipants} users found</p>
            </div>

            <div className="flex-1 overflow-y-auto">
              {loading && rankings.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <Loader2 className="size-6 animate-spin text-blue-600" />
                  </div>
              ) : rankings.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Trophy className="size-12 mx-auto mb-4 opacity-50" />
                  <p>No rankings found</p>
                  <p className="text-sm mt-1">No users match the current filter.</p>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-white border-b z-10">
                    <tr className="text-left text-gray-600">
                      <th className="p-4 font-medium w-20 text-center">Rank</th>
                      <th className="p-4 font-medium">User Info</th>
                      <th className="p-4 font-medium text-right">Carbon Saved</th>
                      <th className="p-4 font-medium text-right">Points</th>
                      <th className="p-4 font-medium text-center">User Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {rankings.map((user) => (
                      <tr key={user.id} className={`hover:bg-gray-50/50 transition-colors ${
                          user.rank <= 3 ? 'bg-yellow-50/50' : ''
                        }`}>
                        <td className="p-4">
                          <div className="flex items-center justify-center">
                            {getRankBadge(user.rank)}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-xl shadow-inner text-white">
                              {user.avatar}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{user.nickname || user.username}</p>
                              <p className="text-xs text-gray-500">ID: {user.userId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <p className="font-bold text-gray-900">{(user.carbonSaved || 0).toLocaleString()} kg</p>
                          <p className="text-xs text-gray-500">{(user.avgDailyCarbonSaved || 0).toLocaleString()} kg/day</p>
                        </td>
                        <td className="p-4 text-right">
                          <p className="font-semibold text-blue-600">{(user.points || 0).toLocaleString()}</p>
                        </td>
                        <td className="p-4 text-center">
                          {user.isVip ? (
                            <Badge className="bg-purple-100 text-purple-700">VIP</Badge>
                          ) : (
                            <Badge variant="outline">Regular</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            
            {rankingsPage && rankingsPage.totalPages > 1 && (
              <div className="p-4 border-t flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Page {rankingsPage.number + 1} of {rankingsPage.totalPages}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                  >
                    <ChevronLeft className="size-4 mr-1" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= rankingsPage.totalPages - 1}
                  >
                    Next
                    <ChevronRight className="size-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
    </div>
  );
}
