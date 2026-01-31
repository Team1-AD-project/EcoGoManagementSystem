import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  Map,
  Coins,
  Crown,
  ShoppingBag,
  Award,
  BarChart3,
  Megaphone,
  Trophy,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  UserPlus,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Zap,
  Target,
  Calendar,
  MessageSquare,
  Server,
  Bot
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  onModuleSelect: (moduleId: string) => void;
}

export function Dashboard({ onModuleSelect }: DashboardProps) {
  // Mock data - User statistics
  const userStats = {
    total: 45678,
    normal: 38456,
    vip: 7222,
    newToday: 234,
    activeToday: 12456,
    growth: 12.5
  };

  // Mock data - Trip data
  const tripStats = {
    totalTrips: 128945,
    totalDistance: 3456.7, // km
    avgDistance: 26.8, // km
    todayTrips: 1234,
    weekGrowth: 8.3
  };

  // Mock data - Point transactions
  const pointStats = {
    totalTransactions: 56789,
    todayTransactions: 892,
    totalPoints: 12456789,
    avgTransaction: 219,
    revenue: 456789,
    growth: 15.2
  };

  // Mock data - VIP subscriptions
  const vipStats = {
    totalSubscribers: 7222,
    monthlyRevenue: 288880,
    newThisMonth: 456,
    renewalRate: 89.5,
    churnRate: 10.5,
    growth: 18.7
  };

  // Mock data - Reward store
  const storeStats = {
    totalProducts: 128,
    activeProducts: 95,
    totalOrders: 23456,
    todayOrders: 145,
    revenue: 567890,
    topProduct: 'Eco Water Bottle'
  };

  // Mock data - Collectibles (badges + pets)
  const collectibleStats = {
    totalBadges: 56,
    totalPets: 32,
    totalCollected: 45678,
    rareItems: 12,
    activeCollectors: 8934
  };

  // Mock data - Ads
  const adStats = {
    totalAds: 24,
    activeAds: 18,
    totalImpressions: 1234567,
    totalClicks: 45678,
    ctr: 3.7,
    revenue: 123456
  };

  // Mock data - Leaderboard
  const leaderboardStats = {
    weeklyParticipants: 1567,
    totalSteps: 125000000,
    avgSteps: 12500,
    topUser: 'Walking Master Tom',
    rewardsIssued: 10
  };

  // Mock data - Chat Management
  const chatStats = {
    totalRequests: 24610,
    todayRequests: 1567,
    activeModels: 2,
    totalModels: 3,
    apiStatus: 'connected',
    avgResponseTime: 1.1,
    activeUsers: 435,
    topModel: 'Llama 2',
    growth: 22.3
  };

  // Chart data - User growth trend
  const userGrowthData = [
    { month: 'Jan', normal: 32000, vip: 5500 },
    { month: 'Feb', normal: 33500, vip: 5800 },
    { month: 'Mar', normal: 35000, vip: 6200 },
    { month: 'Apr', normal: 36200, vip: 6500 },
    { month: 'May', normal: 37500, vip: 6800 },
    { month: 'Jun', normal: 38456, vip: 7222 }
  ];

  // Chart data - Daily activity
  const activityData = [
    { day: 'Mon', trips: 980, transactions: 756, orders: 123 },
    { day: 'Tue', trips: 1050, transactions: 812, orders: 145 },
    { day: 'Wed', trips: 1120, transactions: 890, orders: 156 },
    { day: 'Thu', trips: 1080, transactions: 845, orders: 138 },
    { day: 'Fri', trips: 1200, transactions: 923, orders: 167 },
    { day: 'Sat', trips: 1350, transactions: 1045, orders: 189 },
    { day: 'Sun', trips: 1234, transactions: 892, orders: 145 }
  ];

  // Chart data - Revenue distribution
  const revenueData = [
    { name: 'VIP Subscriptions', value: 288880, color: '#8b5cf6' },
    { name: 'Point Transactions', value: 456789, color: '#3b82f6' },
    { name: 'Store Sales', value: 567890, color: '#10b981' },
    { name: 'Ad Revenue', value: 123456, color: '#f59e0b' }
  ];

  // Chart data - Weekly step trend
  const stepsData = [
    { week: 'W1', steps: 112000000 },
    { week: 'W2', steps: 115000000 },
    { week: 'W3', steps: 118000000 },
    { week: 'W4', steps: 122000000 },
    { week: 'W5', steps: 125000000 }
  ];

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.value, 0);

  // Recent activity data
  const recentActivities = [
    { id: 1, type: 'user', icon: UserPlus, text: 'New User Registration', detail: '234 new users joined', time: 'Just now', color: 'text-blue-600' },
    { id: 2, type: 'vip', icon: Crown, text: 'VIP Subscription', detail: '45 users upgraded to VIP', time: '5 mins ago', color: 'text-purple-600' },
    { id: 3, type: 'order', icon: ShoppingBag, text: 'Store Orders', detail: '145 new orders completed', time: '10 mins ago', color: 'text-green-600' },
    { id: 4, type: 'ad', icon: Megaphone, text: 'Ad Campaign', detail: '3 new ads launched', time: '30 mins ago', color: 'text-orange-600' },
    { id: 5, type: 'leaderboard', icon: Trophy, text: 'Leaderboard Update', detail: 'Weekly rankings refreshed', time: '1 hour ago', color: 'text-yellow-600' }
  ];

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Header */}
      <div className="p-6 bg-white border-b sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">System Dashboard</h2>
            <p className="text-gray-600 mt-1">Welcome back! Here's your system overview</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="size-4" />
            <span>Last updated: {new Date().toLocaleString('en-US')}</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Core metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total users */}
          <Card className="p-5 bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onModuleSelect('user-management')}>
            <div className="flex items-center justify-between mb-3">
              <Users className="size-8 opacity-80" />
              <Badge className="bg-white/20 text-white">User Mgmt</Badge>
            </div>
            <p className="text-sm opacity-90 mb-1">Total Users</p>
            <p className="text-3xl font-bold mb-2">{userStats.total.toLocaleString()}</p>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="size-4" />
              <span>+{userStats.newToday} today</span>
            </div>
          </Card>

          {/* Today's trips */}
          <Card className="p-5 bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onModuleSelect('trip-management')}>
            <div className="flex items-center justify-between mb-3">
              <Map className="size-8 opacity-80" />
              <Badge className="bg-white/20 text-white">Trip Data</Badge>
            </div>
            <p className="text-sm opacity-90 mb-1">Today's Trips</p>
            <p className="text-3xl font-bold mb-2">{tripStats.todayTrips.toLocaleString()}</p>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="size-4" />
              <span>+{tripStats.weekGrowth}% this week</span>
            </div>
          </Card>

          {/* VIP subscriptions */}
          <Card className="p-5 bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onModuleSelect('vip-management')}>
            <div className="flex items-center justify-between mb-3">
              <Crown className="size-8 opacity-80" />
              <Badge className="bg-white/20 text-white">VIP Mgmt</Badge>
            </div>
            <p className="text-sm opacity-90 mb-1">VIP Users</p>
            <p className="text-3xl font-bold mb-2">{vipStats.totalSubscribers.toLocaleString()}</p>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="size-4" />
              <span>+{vipStats.growth}% this month</span>
            </div>
          </Card>

          {/* Total revenue */}
          <Card className="p-5 bg-gradient-to-br from-orange-500 to-orange-600 text-white hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onModuleSelect('analytics-management')}>
            <div className="flex items-center justify-between mb-3">
              <DollarSign className="size-8 opacity-80" />
              <Badge className="bg-white/20 text-white">Total Revenue</Badge>
            </div>
            <p className="text-sm opacity-90 mb-1">Total Revenue (CNY)</p>
            <p className="text-3xl font-bold mb-2">¥{(totalRevenue / 10000).toFixed(1)}W</p>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="size-4" />
              <span>+14.2% MoM</span>
            </div>
          </Card>
        </div>

        {/* Detailed statistic cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Point transactions */}
          <Card className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Coins className="size-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Point Transactions</h3>
                <p className="text-sm text-gray-600">Today: {pointStats.todayTransactions} txns</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Transactions</span>
                <span className="font-semibold">{pointStats.totalTransactions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Points</span>
                <span className="font-semibold text-blue-600">{(pointStats.totalPoints / 10000).toFixed(0)}W</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg Transaction</span>
                <span className="font-semibold">{pointStats.avgTransaction} pts</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t flex items-center justify-between">
              <span className="text-sm text-gray-600">Growth Rate</span>
              <Badge className="bg-green-100 text-green-700">
                <TrendingUp className="size-3 mr-1" />
                {pointStats.growth}%
              </Badge>
            </div>
          </Card>

          {/* Reward store */}
          <Card className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <ShoppingBag className="size-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Reward Store</h3>
                <p className="text-sm text-gray-600">Today: {storeStats.todayOrders} orders</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Products</span>
                <span className="font-semibold">{storeStats.totalProducts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Products</span>
                <span className="font-semibold text-green-600">{storeStats.activeProducts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Orders</span>
                <span className="font-semibold">{storeStats.totalOrders.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t">
              <span className="text-sm text-gray-600">Top Product</span>
              <p className="font-semibold text-gray-900 mt-1">{storeStats.topProduct}</p>
            </div>
          </Card>

          {/* Collectible management */}
          <Card className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Award className="size-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Collectibles</h3>
                <p className="text-sm text-gray-600">Badges + Pets</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Badges</span>
                <span className="font-semibold">{collectibleStats.totalBadges}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Pets</span>
                <span className="font-semibold">{collectibleStats.totalPets}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Rare Items</span>
                <span className="font-semibold text-purple-600">{collectibleStats.rareItems}</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t">
              <span className="text-sm text-gray-600">Active Collectors</span>
              <p className="font-semibold text-gray-900 mt-1">{collectibleStats.activeCollectors.toLocaleString()}</p>
            </div>
          </Card>

          {/* Ad management */}
          <Card className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Megaphone className="size-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Ad Management</h3>
                <p className="text-sm text-gray-600">Active: {adStats.activeAds}/{adStats.totalAds}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Impressions</span>
                <span className="font-semibold">{(adStats.totalImpressions / 10000).toFixed(1)}W</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Clicks</span>
                <span className="font-semibold">{adStats.totalClicks.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Click Rate</span>
                <span className="font-semibold text-orange-600">{adStats.ctr}%</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t">
              <span className="text-sm text-gray-600">Ad Revenue</span>
              <p className="font-semibold text-gray-900 mt-1">¥{adStats.revenue.toLocaleString()}</p>
            </div>
          </Card>

          {/* Leaderboard */}
          <Card className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Trophy className="size-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Leaderboard</h3>
                <p className="text-sm text-gray-600">Weekly: {leaderboardStats.weeklyParticipants} users</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Steps</span>
                <span className="font-semibold">{(leaderboardStats.totalSteps / 100000000).toFixed(2)}B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg Steps</span>
                <span className="font-semibold">{leaderboardStats.avgSteps.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Rewards Issued</span>
                <span className="font-semibold text-yellow-600">{leaderboardStats.rewardsIssued}</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t">
              <span className="text-sm text-gray-600">Top User</span>
              <p className="font-semibold text-gray-900 mt-1">{leaderboardStats.topUser}</p>
            </div>
          </Card>

          {/* Data analysis */}
          <Card className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <BarChart3 className="size-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Data Analytics</h3>
                <p className="text-sm text-gray-600">Smart Insights</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-green-600" />
                <span className="text-sm text-gray-700">User activity healthy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-green-600" />
                <span className="text-sm text-gray-700">Revenue growing</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="size-4 text-orange-600" />
                <span className="text-sm text-gray-700">VIP renewal needs attention</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-green-600" />
                <span className="text-sm text-gray-700">Ad conversion stable</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t">
              <Button variant="outline" size="sm" className="w-full" onClick={() => onModuleSelect('analytics-management')}>
                <Target className="size-4 mr-2" />
                View Details
              </Button>
            </div>
          </Card>

          {/* Chat Management */}
          <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50" onClick={() => onModuleSelect('chat-management')}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageSquare className="size-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  AI Chat
                  <Badge className="bg-green-100 text-green-700 text-xs">
                    <Server className="size-3 mr-1" />
                    {chatStats.apiStatus}
                  </Badge>
                </h3>
                <p className="text-sm text-gray-600">Today: {chatStats.todayRequests} requests</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Requests</span>
                <span className="font-semibold">{chatStats.totalRequests.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Models</span>
                <span className="font-semibold text-blue-600">{chatStats.activeModels}/{chatStats.totalModels}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Users</span>
                <span className="font-semibold">{chatStats.activeUsers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg Response</span>
                <span className="font-semibold text-green-600">{chatStats.avgResponseTime}s</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-600">Top Model</span>
                <p className="font-semibold text-gray-900 mt-1 flex items-center gap-1">
                  <Bot className="size-4 text-blue-600" />
                  {chatStats.topModel}
                </p>
              </div>
              <Badge className="bg-green-100 text-green-700">
                <TrendingUp className="size-3 mr-1" />
                {chatStats.growth}%
              </Badge>
            </div>
          </Card>
        </div>

        {/* Chart area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User growth trend */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">User Growth Trend</h3>
              <Badge variant="outline">Last 6 months</Badge>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="normal" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Normal Users" />
                <Area type="monotone" dataKey="vip" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" name="VIP Users" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Revenue distribution */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Revenue Distribution</h3>
              <Badge variant="outline">Total ¥{(totalRevenue / 10000).toFixed(1)}W</Badge>
            </div>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="50%" height={300}>
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `¥${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-3">
                {revenueData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">¥{item.value.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">
                        {((item.value / totalRevenue) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Daily activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Daily Activity</h3>
              <Badge variant="outline">This Week</Badge>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="trips" fill="#10b981" name="Trips" />
                <Bar dataKey="transactions" fill="#3b82f6" name="Transactions" />
                <Bar dataKey="orders" fill="#8b5cf6" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Step trend */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Weekly Step Trend</h3>
              <Badge variant="outline">Last 5 weeks</Badge>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stepsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                <Tooltip formatter={(value: number) => `${(value / 100000000).toFixed(2)}B steps`} />
                <Legend />
                <Line type="monotone" dataKey="steps" stroke="#f59e0b" strokeWidth={3} name="Total Steps" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent activities */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Activity className="size-5 text-blue-600" />
              Recent System Activities
            </h3>
            <Button variant="outline" size="sm">
              <Eye className="size-4 mr-2" />
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`p-2 bg-white rounded-lg ${activity.color}`}>
                  <activity.icon className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{activity.text}</p>
                  <p className="text-sm text-gray-600">{activity.detail}</p>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="size-4" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <Button variant="outline" className="h-20 flex-col gap-2 hover:border-blue-500 hover:bg-blue-50 transition-all" onClick={() => onModuleSelect('user-management')}>
            <Users className="size-6" />
            <span className="text-sm">Users</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2 hover:border-green-500 hover:bg-green-50 transition-all" onClick={() => onModuleSelect('trip-management')}>
            <Map className="size-6" />
            <span className="text-sm">Trips</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2 hover:border-blue-500 hover:bg-blue-50 transition-all" onClick={() => onModuleSelect('points-management')}>
            <Coins className="size-6" />
            <span className="text-sm">Points</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2 hover:border-purple-500 hover:bg-purple-50 transition-all" onClick={() => onModuleSelect('vip-management')}>
            <Crown className="size-6" />
            <span className="text-sm">VIP</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2 hover:border-green-500 hover:bg-green-50 transition-all" onClick={() => onModuleSelect('rewards-management')}>
            <ShoppingBag className="size-6" />
            <span className="text-sm">Store</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2 hover:border-purple-500 hover:bg-purple-50 transition-all" onClick={() => onModuleSelect('collectibles-management')}>
            <Award className="size-6" />
            <span className="text-sm">Collectibles</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2 hover:border-indigo-500 hover:bg-indigo-50 transition-all" onClick={() => onModuleSelect('analytics-management')}>
            <BarChart3 className="size-6" />
            <span className="text-sm">Analytics</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2 hover:border-orange-500 hover:bg-orange-50 transition-all" onClick={() => onModuleSelect('ad-management')}>
            <Megaphone className="size-6" />
            <span className="text-sm">Ads</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2 hover:border-yellow-500 hover:bg-yellow-50 transition-all" onClick={() => onModuleSelect('leaderboard-management')}>
            <Trophy className="size-6" />
            <span className="text-sm">Leaderboard</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2 hover:border-blue-500 hover:bg-blue-50 transition-all" onClick={() => onModuleSelect('chat-management')}>
            <MessageSquare className="size-6" />
            <span className="text-sm">AI Chat</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 hover:shadow-md transition-all" onClick={() => onModuleSelect('dashboard')}>
            <Zap className="size-6 text-blue-600" />
            <span className="text-sm text-blue-600">All Modules</span>
          </Button>
        </div>
      </div>
    </div>
  );
}