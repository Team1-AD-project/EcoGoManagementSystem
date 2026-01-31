import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Trophy,
  Medal,
  Crown,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  Users,
  Award,
  Star,
  Gift,
  ChevronLeft,
  ChevronRight,
  Search,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  MapPin,
  Activity,
  Clock
} from 'lucide-react';
import { Fragment } from 'react';

interface UserRanking {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  steps: number;
  points: number;
  distance: number; // km
  userType: 'normal' | 'vip';
  previousRank: number | null;
  rewards: string[];
  // Additional details
  avgDailySteps?: number;
  activeDays?: number;
  longestStreak?: number;
  favoriteRoute?: string;
}

interface WeeklyLeaderboard {
  weekId: string;
  weekLabel: string;
  startDate: string;
  endDate: string;
  totalParticipants: number;
  rankings: UserRanking[];
  status: 'ongoing' | 'completed';
}

export function LeaderboardManagement() {
  const [selectedWeek, setSelectedWeek] = useState('2026-W04');
  const [filterUserType, setFilterUserType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRanking | null>(null);
  const [showFullRankings, setShowFullRankings] = useState(true);

  // Edit form state
  const [editForm, setEditForm] = useState({
    steps: 0,
    points: 0,
    distance: 0,
    rank: 0,
    userType: 'normal' as 'normal' | 'vip',
    rewards: [] as string[],
    newReward: ''
  });

  // Mock data: Multiple week leaderboards
  const [leaderboards, setLeaderboards] = useState<WeeklyLeaderboard[]>([
    {
      weekId: '2026-W04',
      weekLabel: 'Week 4, 2026',
      startDate: '2026-01-19',
      endDate: '2026-01-25',
      totalParticipants: 1567,
      status: 'ongoing',
      rankings: [
        {
          rank: 1,
          userId: 'U001',
          username: 'Michael Walker',
          avatar: '👑',
          steps: 125000,
          points: 12500,
          distance: 87.5,
          userType: 'vip',
          previousRank: 2,
          rewards: ['Champion Trophy Badge', '1000 Points Reward', 'Exclusive Avatar Frame'],
          avgDailySteps: 17857,
          activeDays: 7,
          longestStreak: 45,
          favoriteRoute: 'Central Park Loop'
        },
        {
          rank: 2,
          userId: 'U002',
          username: 'Sarah Johnson',
          avatar: '🏃',
          steps: 118000,
          points: 11800,
          distance: 82.6,
          userType: 'vip',
          previousRank: 1,
          rewards: ['Runner-up Badge', '500 Points Reward'],
          avgDailySteps: 16857,
          activeDays: 7,
          longestStreak: 38,
          favoriteRoute: 'Riverside Trail'
        },
        {
          rank: 3,
          userId: 'U003',
          username: 'David Chen',
          avatar: '🌟',
          steps: 112000,
          points: 11200,
          distance: 78.4,
          userType: 'normal',
          previousRank: 5,
          rewards: ['Third Place Badge', '300 Points Reward'],
          avgDailySteps: 16000,
          activeDays: 7,
          longestStreak: 28,
          favoriteRoute: 'City Greenway'
        },
        {
          rank: 4,
          userId: 'U004',
          username: 'Emily Martinez',
          avatar: '💪',
          steps: 108000,
          points: 10800,
          distance: 75.6,
          userType: 'vip',
          previousRank: 3,
          rewards: ['Top 10 Badge', '200 Points Reward'],
          avgDailySteps: 15429,
          activeDays: 7,
          longestStreak: 32,
          favoriteRoute: 'Forest Park'
        },
        {
          rank: 5,
          userId: 'U005',
          username: 'James Anderson',
          avatar: '🏅',
          steps: 105000,
          points: 10500,
          distance: 73.5,
          userType: 'normal',
          previousRank: 4,
          rewards: ['Top 10 Badge', '200 Points Reward'],
          avgDailySteps: 15000,
          activeDays: 7,
          longestStreak: 25,
          favoriteRoute: 'Olympic Park'
        },
        {
          rank: 6,
          userId: 'U006',
          username: 'Lisa Brown',
          avatar: '🌿',
          steps: 98000,
          points: 9800,
          distance: 68.6,
          userType: 'normal',
          previousRank: 8,
          rewards: ['Top 10 Badge', '100 Points Reward'],
          avgDailySteps: 14000,
          activeDays: 7,
          longestStreak: 21,
          favoriteRoute: 'Lake Circuit'
        },
        {
          rank: 7,
          userId: 'U007',
          username: 'Robert Taylor',
          avatar: '⭐',
          steps: 95000,
          points: 9500,
          distance: 66.5,
          userType: 'vip',
          previousRank: 6,
          rewards: ['Top 10 Badge', '100 Points Reward'],
          avgDailySteps: 13571,
          activeDays: 7,
          longestStreak: 30,
          favoriteRoute: 'Botanical Garden Path'
        },
        {
          rank: 8,
          userId: 'U008',
          username: 'Jennifer Lee',
          avatar: '🎯',
          steps: 92000,
          points: 9200,
          distance: 64.4,
          userType: 'normal',
          previousRank: 7,
          rewards: ['Top 10 Badge', '100 Points Reward'],
          avgDailySteps: 13143,
          activeDays: 7,
          longestStreak: 18,
          favoriteRoute: 'Mountain Trail'
        },
        {
          rank: 9,
          userId: 'U009',
          username: 'Daniel Wilson',
          avatar: '🔥',
          steps: 89000,
          points: 8900,
          distance: 62.3,
          userType: 'normal',
          previousRank: 11,
          rewards: ['Top 10 Badge', '100 Points Reward'],
          avgDailySteps: 12714,
          activeDays: 7,
          longestStreak: 15,
          favoriteRoute: 'Coastal Boulevard'
        },
        {
          rank: 10,
          userId: 'U010',
          username: 'Amanda Garcia',
          avatar: '💎',
          steps: 87000,
          points: 8700,
          distance: 60.9,
          userType: 'vip',
          previousRank: 9,
          rewards: ['Top 10 Badge', '100 Points Reward'],
          avgDailySteps: 12429,
          activeDays: 7,
          longestStreak: 22,
          favoriteRoute: 'Downtown District'
        },
        {
          rank: 11,
          userId: 'U011',
          username: 'Christopher Moore',
          avatar: '🌸',
          steps: 82000,
          points: 8200,
          distance: 57.4,
          userType: 'normal',
          previousRank: 10,
          rewards: [],
          avgDailySteps: 11714,
          activeDays: 7,
          longestStreak: 19,
          favoriteRoute: 'Community Trail'
        },
        {
          rank: 12,
          userId: 'U012',
          username: 'Jessica White',
          avatar: '🌅',
          steps: 78000,
          points: 7800,
          distance: 54.6,
          userType: 'vip',
          previousRank: 15,
          rewards: [],
          avgDailySteps: 11143,
          activeDays: 7,
          longestStreak: 26,
          favoriteRoute: 'Morning Run Route'
        },
        {
          rank: 13,
          userId: 'U013',
          username: 'Matthew Harris',
          avatar: '🎖️',
          steps: 75000,
          points: 7500,
          distance: 52.5,
          userType: 'normal',
          previousRank: 12,
          rewards: [],
          avgDailySteps: 10714,
          activeDays: 7,
          longestStreak: 17,
          favoriteRoute: 'Campus Loop'
        },
        {
          rank: 14,
          userId: 'U014',
          username: 'Ashley Clark',
          avatar: '✨',
          steps: 72000,
          points: 7200,
          distance: 50.4,
          userType: 'normal',
          previousRank: 13,
          rewards: [],
          avgDailySteps: 10286,
          activeDays: 7,
          longestStreak: 14,
          favoriteRoute: 'Park Fitness Trail'
        },
        {
          rank: 15,
          userId: 'U015',
          username: 'Kevin Rodriguez',
          avatar: '⚡',
          steps: 68000,
          points: 6800,
          distance: 47.6,
          userType: 'normal',
          previousRank: 14,
          rewards: [],
          avgDailySteps: 9714,
          activeDays: 7,
          longestStreak: 12,
          favoriteRoute: 'Riverside Path'
        }
      ]
    },
    {
      weekId: '2026-W03',
      weekLabel: 'Week 3, 2026',
      startDate: '2026-01-12',
      endDate: '2026-01-18',
      totalParticipants: 1523,
      status: 'completed',
      rankings: [
        {
          rank: 1,
          userId: 'U002',
          username: 'Sarah Johnson',
          avatar: '🏃',
          steps: 132000,
          points: 13200,
          distance: 92.4,
          userType: 'vip',
          previousRank: 3,
          rewards: ['Champion Trophy Badge', '1000 Points Reward', 'Exclusive Avatar Frame'],
          avgDailySteps: 18857,
          activeDays: 7,
          longestStreak: 37,
          favoriteRoute: 'Riverside Trail'
        },
        {
          rank: 2,
          userId: 'U001',
          username: 'Michael Walker',
          avatar: '👑',
          steps: 128000,
          points: 12800,
          distance: 89.6,
          userType: 'vip',
          previousRank: 1,
          rewards: ['Runner-up Badge', '500 Points Reward'],
          avgDailySteps: 18286,
          activeDays: 7,
          longestStreak: 44,
          favoriteRoute: 'Central Park Loop'
        },
        {
          rank: 3,
          userId: 'U004',
          username: 'Emily Martinez',
          avatar: '💪',
          steps: 115000,
          points: 11500,
          distance: 80.5,
          userType: 'vip',
          previousRank: 4,
          rewards: ['Third Place Badge', '300 Points Reward'],
          avgDailySteps: 16429,
          activeDays: 7,
          longestStreak: 31,
          favoriteRoute: 'Forest Park'
        }
      ]
    }
  ]);

  const currentLeaderboard = leaderboards.find(lb => lb.weekId === selectedWeek);

  const toggleRowExpansion = (userId: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handleEdit = (user: UserRanking) => {
    setSelectedUser(user);
    setEditForm({
      steps: user.steps,
      points: user.points,
      distance: user.distance,
      rank: user.rank,
      userType: user.userType,
      rewards: [...user.rewards],
      newReward: ''
    });
    setEditDialogOpen(true);
  };

  const handleDelete = (user: UserRanking) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const confirmEdit = () => {
    if (!selectedUser) return;

    setLeaderboards(prev => prev.map(lb => {
      if (lb.weekId === selectedWeek) {
        return {
          ...lb,
          rankings: lb.rankings.map(user => 
            user.userId === selectedUser.userId
              ? {
                  ...user,
                  steps: editForm.steps,
                  points: editForm.points,
                  distance: editForm.distance,
                  rank: editForm.rank,
                  userType: editForm.userType,
                  rewards: editForm.rewards,
                  avgDailySteps: Math.round(editForm.steps / 7)
                }
              : user
          ).sort((a, b) => a.rank - b.rank)
        };
      }
      return lb;
    }));

    setEditDialogOpen(false);
    setSelectedUser(null);
  };

  const confirmDelete = () => {
    if (!selectedUser) return;

    setLeaderboards(prev => prev.map(lb => {
      if (lb.weekId === selectedWeek) {
        return {
          ...lb,
          rankings: lb.rankings
            .filter(user => user.userId !== selectedUser.userId)
            .map((user, index) => ({
              ...user,
              rank: index + 1
            })),
          totalParticipants: lb.totalParticipants - 1
        };
      }
      return lb;
    }));

    setDeleteDialogOpen(false);
    setSelectedUser(null);
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      newSet.delete(selectedUser.userId);
      return newSet;
    });
  };

  const addReward = () => {
    if (editForm.newReward.trim()) {
      setEditForm(prev => ({
        ...prev,
        rewards: [...prev.rewards, prev.newReward.trim()],
        newReward: ''
      }));
    }
  };

  const removeReward = (index: number) => {
    setEditForm(prev => ({
      ...prev,
      rewards: prev.rewards.filter((_, i) => i !== index)
    }));
  };

  const getRankTrendIcon = (current: number, previous: number | null) => {
    if (previous === null) return <Minus className="size-4 text-gray-400" />;
    if (current < previous) return <TrendingUp className="size-4 text-green-600" />;
    if (current > previous) return <TrendingDown className="size-4 text-red-600" />;
    return <Minus className="size-4 text-gray-400" />;
  };

  const getRankTrendText = (current: number, previous: number | null) => {
    if (previous === null) return 'New';
    const diff = previous - current;
    if (diff > 0) return `↑${diff}`;
    if (diff < 0) return `↓${Math.abs(diff)}`;
    return '—';
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Crown className="size-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="size-6 text-gray-400" />;
    if (rank === 3) return <Medal className="size-6 text-orange-400" />;
    return <span className="text-xl font-bold text-gray-600">#{rank}</span>;
  };

  const filteredRankings = currentLeaderboard?.rankings.filter(user => {
    const typeMatch = filterUserType === 'all' || user.userType === filterUserType;
    const searchMatch = searchQuery === '' || 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.userId.toLowerCase().includes(searchQuery.toLowerCase());
    return typeMatch && searchMatch;
  }) || [];

  const topThree = currentLeaderboard?.rankings.slice(0, 3) || [];
  const vipCount = currentLeaderboard?.rankings.filter(u => u.userType === 'vip').length || 0;
  const totalSteps = currentLeaderboard?.rankings.reduce((sum, u) => sum + u.steps, 0) || 0;
  const avgSteps = Math.round(totalSteps / (currentLeaderboard?.rankings.length || 1));

  const currentWeekIndex = leaderboards.findIndex(lb => lb.weekId === selectedWeek);
  const canGoPrevious = currentWeekIndex < leaderboards.length - 1;
  const canGoNext = currentWeekIndex > 0;

  const goToPreviousWeek = () => {
    if (canGoPrevious) {
      setSelectedWeek(leaderboards[currentWeekIndex + 1].weekId);
    }
  };

  const goToNextWeek = () => {
    if (canGoNext) {
      setSelectedWeek(leaderboards[currentWeekIndex - 1].weekId);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-6 bg-white border-b">
        <h2 className="text-2xl font-bold text-gray-900">Leaderboard Management</h2>
        <p className="text-gray-600 mt-1">View and manage weekly user step rankings and reward distribution</p>
      </div>

      {/* Statistics Cards */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="size-8" />
          </div>
          <p className="text-sm opacity-90 mb-1">This Week's Participants</p>
          <p className="text-3xl font-bold">{currentLeaderboard?.totalParticipants.toLocaleString()}</p>
          <p className="text-xs opacity-75 mt-1">Active users: 78%</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between mb-2">
            <Users className="size-8" />
          </div>
          <p className="text-sm opacity-90 mb-1">VIP Users on Board</p>
          <p className="text-3xl font-bold">{vipCount}</p>
          <p className="text-xs opacity-75 mt-1">Top 15: {Math.round(vipCount / (currentLeaderboard?.rankings.length || 1) * 100)}%</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="size-8" />
          </div>
          <p className="text-sm opacity-90 mb-1">Average Steps</p>
          <p className="text-3xl font-bold">{avgSteps.toLocaleString()}</p>
          <p className="text-xs opacity-75 mt-1">vs last week: +12%</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between mb-2">
            <Gift className="size-8" />
          </div>
          <p className="text-sm opacity-90 mb-1">Rewards Distributed</p>
          <p className="text-3xl font-bold">10</p>
          <p className="text-xs opacity-75 mt-1">Auto-sent to top 10</p>
        </Card>
      </div>

      {/* Week Selector & Filters */}
      <div className="px-6 pb-4">
        <Card className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Week Navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousWeek}
                disabled={!canGoPrevious}
              >
                <ChevronLeft className="size-4" />
              </Button>
              
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger className="w-[200px]">
                  <Calendar className="size-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {leaderboards.map(lb => (
                    <SelectItem key={lb.weekId} value={lb.weekId}>
                      {lb.weekLabel}
                      {lb.status === 'ongoing' && (
                        <Badge className="ml-2 bg-green-500 text-white text-xs">Ongoing</Badge>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={goToNextWeek}
                disabled={!canGoNext}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>

            {/* Date Range */}
            <div className="text-sm text-gray-600">
              {currentLeaderboard?.startDate} to {currentLeaderboard?.endDate}
            </div>

            <div className="flex-1" />

            {/* User Type Filter */}
            <Select value={filterUserType} onValueChange={setFilterUserType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="User Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="vip">VIP Users</SelectItem>
                <SelectItem value="normal">Regular Users</SelectItem>
              </SelectContent>
            </Select>

            {/* Search */}
            <div className="relative w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Search username or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Top 3 Podium */}
      <div className="px-6 pb-4">
        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Trophy className="size-5 text-yellow-600" />
              Top 3 This Week
            </h3>
            <Button
              variant="outline"
              onClick={() => setShowFullRankings(!showFullRankings)}
              className="gap-2"
            >
              {showFullRankings ? (
                <>
                  <ChevronUp className="size-4" />
                  Hide Full Rankings
                </>
              ) : (
                <>
                  <ChevronDown className="size-4" />
                  View Full Rankings
                </>
              )}
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {/* 2nd Place */}
            {topThree[1] && (
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-3xl mb-2 shadow-lg">
                  {topThree[1].avatar}
                </div>
                <Medal className="size-8 text-gray-400 mb-2" />
                <p className="font-bold text-gray-900">{topThree[1].username}</p>
                <p className="text-sm text-gray-600">{topThree[1].steps.toLocaleString()} steps</p>
                {topThree[1].userType === 'vip' && (
                  <Badge className="mt-1 bg-purple-100 text-purple-700">VIP</Badge>
                )}
              </div>
            )}

            {/* 1st Place */}
            {topThree[0] && (
              <div className="flex flex-col items-center -mt-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-4xl mb-2 shadow-xl ring-4 ring-yellow-300">
                  {topThree[0].avatar}
                </div>
                <Crown className="size-10 text-yellow-500 mb-2" />
                <p className="font-bold text-gray-900 text-lg">{topThree[0].username}</p>
                <p className="text-sm text-gray-600">{topThree[0].steps.toLocaleString()} steps</p>
                {topThree[0].userType === 'vip' && (
                  <Badge className="mt-1 bg-purple-100 text-purple-700">VIP</Badge>
                )}
              </div>
            )}

            {/* 3rd Place */}
            {topThree[2] && (
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 flex items-center justify-center text-3xl mb-2 shadow-lg">
                  {topThree[2].avatar}
                </div>
                <Medal className="size-8 text-orange-400 mb-2" />
                <p className="font-bold text-gray-900">{topThree[2].username}</p>
                <p className="text-sm text-gray-600">{topThree[2].steps.toLocaleString()} steps</p>
                {topThree[2].userType === 'vip' && (
                  <Badge className="mt-1 bg-purple-100 text-purple-700">VIP</Badge>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Rankings Table */}
      {showFullRankings && (
        <div className="flex-1 overflow-hidden px-6 pb-6">
          <Card className="h-full flex flex-col">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-bold text-gray-900">Full Rankings</h3>
              <p className="text-sm text-gray-600">{filteredRankings.length} users • Click row to expand details</p>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-white border-b z-10">
                  <tr className="text-left text-sm text-gray-600">
                    <th className="p-4 font-medium w-12"></th>
                    <th className="p-4 font-medium w-20">Rank</th>
                    <th className="p-4 font-medium">User Info</th>
                    <th className="p-4 font-medium text-right">Steps</th>
                    <th className="p-4 font-medium text-right">Points</th>
                    <th className="p-4 font-medium text-right">Distance(km)</th>
                    <th className="p-4 font-medium text-center">Rank Change</th>
                    <th className="p-4 font-medium text-center">User Type</th>
                    <th className="p-4 font-medium text-center">Rewards</th>
                    <th className="p-4 font-medium text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRankings.flatMap((user) => [
                    <tr 
                      key={user.userId}
                      className={`border-b hover:bg-gray-50 transition-colors cursor-pointer ${
                        user.rank <= 3 ? 'bg-yellow-50/50' : ''
                      } ${expandedRows.has(user.userId) ? 'bg-blue-50' : ''}`}
                      onClick={() => toggleRowExpansion(user.userId)}
                    >
                      <td className="p-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="size-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRowExpansion(user.userId);
                          }}
                        >
                          {expandedRows.has(user.userId) ? (
                            <ChevronUp className="size-4" />
                          ) : (
                            <ChevronDown className="size-4" />
                          )}
                        </Button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center">
                          {getRankBadge(user.rank)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-xl">
                            {user.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{user.username}</p>
                            <p className="text-sm text-gray-500">{user.userId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <p className="font-bold text-gray-900">{user.steps.toLocaleString()}</p>
                        {user.avgDailySteps && (
                          <p className="text-xs text-gray-500">{user.avgDailySteps.toLocaleString()}/day</p>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <p className="font-semibold text-blue-600">{user.points.toLocaleString()}</p>
                      </td>
                      <td className="p-4 text-right">
                        <p className="font-medium text-gray-900">{user.distance.toFixed(1)}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-1">
                          {getRankTrendIcon(user.rank, user.previousRank)}
                          <span className="text-sm font-medium">{getRankTrendText(user.rank, user.previousRank)}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {user.userType === 'vip' ? (
                          <Badge className="bg-purple-100 text-purple-700">VIP</Badge>
                        ) : (
                          <Badge variant="outline">Regular</Badge>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                          {user.rewards.length} {user.rewards.length === 1 ? 'reward' : 'rewards'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(user);
                            }}
                          >
                            <Edit className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(user);
                            }}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>,
                    // Expanded row details
                    expandedRows.has(user.userId) && (
                      <tr key={`${user.userId}-expanded`} className="bg-blue-50/30 border-b">
                        <td colSpan={10} className="p-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white p-3 rounded-lg border">
                              <div className="flex items-center gap-2 mb-1">
                                <Activity className="size-4 text-blue-600" />
                                <p className="text-xs text-gray-600">Active Days</p>
                              </div>
                              <p className="text-lg font-bold text-gray-900">{user.activeDays || 0} days</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border">
                              <div className="flex items-center gap-2 mb-1">
                                <Award className="size-4 text-green-600" />
                                <p className="text-xs text-gray-600">Longest Streak</p>
                              </div>
                              <p className="text-lg font-bold text-gray-900">{user.longestStreak || 0} days</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border col-span-2">
                              <div className="flex items-center gap-2 mb-1">
                                <MapPin className="size-4 text-purple-600" />
                                <p className="text-xs text-gray-600">Favorite Route</p>
                              </div>
                              <p className="text-sm font-semibold text-gray-900">{user.favoriteRoute || 'N/A'}</p>
                            </div>
                          </div>
                          {user.rewards.length > 0 && (
                            <div className="mt-3 bg-white p-3 rounded-lg border">
                              <p className="text-xs text-gray-600 mb-2 flex items-center gap-2">
                                <Gift className="size-4 text-yellow-600" />
                                Rewards Received
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {user.rewards.map((reward, idx) => (
                                  <Badge key={idx} className="bg-yellow-100 text-yellow-800">
                                    {reward}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  ])}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit User Ranking</DialogTitle>
            <DialogDescription>
              Modify user ranking data and rewards
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Rank</Label>
                  <Input
                    type="number"
                    value={editForm.rank}
                    onChange={(e) => setEditForm({ ...editForm, rank: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>User Type</Label>
                  <Select
                    value={editForm.userType}
                    onValueChange={(value: 'normal' | 'vip') => setEditForm({ ...editForm, userType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Regular</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Steps</Label>
                  <Input
                    type="number"
                    value={editForm.steps}
                    onChange={(e) => setEditForm({ ...editForm, steps: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>Points</Label>
                  <Input
                    type="number"
                    value={editForm.points}
                    onChange={(e) => setEditForm({ ...editForm, points: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Distance (km)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={editForm.distance}
                    onChange={(e) => setEditForm({ ...editForm, distance: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div>
                <Label>Rewards</Label>
                <div className="space-y-2 mt-2">
                  {editForm.rewards.map((reward, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input value={reward} disabled className="flex-1" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeReward(idx)}
                        className="text-red-600"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Add new reward..."
                      value={editForm.newReward}
                      onChange={(e) => setEditForm({ ...editForm, newReward: e.target.value })}
                      onKeyPress={(e) => e.key === 'Enter' && addReward()}
                    />
                    <Button onClick={addReward}>Add</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmEdit} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="size-5" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this user from the leaderboard? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-2xl">
                  {selectedUser.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedUser.username}</p>
                  <p className="text-sm text-gray-600">Rank #{selectedUser.rank} • {selectedUser.steps.toLocaleString()} steps</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
