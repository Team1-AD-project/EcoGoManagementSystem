import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Footprints,
  ShoppingBag,
  Crown,
  Award,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  MapPin
} from 'lucide-react';
import { HeatMapView } from './HeatMapView';

type TimeRange = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface GrowthMetric {
  title: string;
  value: number;
  unit: string;
  growthRate: number;
  previousValue: number;
  icon: React.ReactNode;
  color: string;
}

export function AnalyticsManagement() {
  const [timeRange, setTimeRange] = useState<TimeRange>('monthly');

  // User Growth Data
  const userGrowthData = {
    daily: [
      { date: '1月19日', users: 2340, newUsers: 145, activeUsers: 1856 },
      { date: '1月20日', users: 2398, newUsers: 158, activeUsers: 1923 },
      { date: '1月21日', users: 2467, newUsers: 169, activeUsers: 1987 },
      { date: '1月22日', users: 2523, newUsers: 156, activeUsers: 2045 },
      { date: '1月23日', users: 2601, newUsers: 178, activeUsers: 2134 },
      { date: '1月24日', users: 2689, newUsers: 188, activeUsers: 2198 }
    ],
    weekly: [
      { date: '第1周', users: 8234, newUsers: 523, activeUsers: 6789 },
      { date: '第2周', users: 9156, newUsers: 622, activeUsers: 7456 },
      { date: '第3周', users: 10234, newUsers: 778, activeUsers: 8234 },
      { date: '第4周', users: 11456, newUsers: 922, activeUsers: 9123 }
    ],
    monthly: [
      { date: '8月', users: 28456, newUsers: 2134, activeUsers: 22345 },
      { date: '9月', users: 31234, newUsers: 2778, activeUsers: 24567 },
      { date: '10月', users: 34567, newUsers: 3333, activeUsers: 27234 },
      { date: '11月', users: 38234, newUsers: 3667, activeUsers: 30123 },
      { date: '12月', users: 42567, newUsers: 4333, activeUsers: 33456 },
      { date: '1月', users: 47234, newUsers: 4667, activeUsers: 37123 }
    ],
    yearly: [
      { date: '2022', users: 156234, newUsers: 56234, activeUsers: 123456 },
      { date: '2023', users: 234567, newUsers: 78333, activeUsers: 189456 },
      { date: '2024', users: 345678, newUsers: 111111, activeUsers: 278234 },
      { date: '2025', users: 489234, newUsers: 143556, activeUsers: 389567 },
      { date: '2026', users: 547234, newUsers: 58000, activeUsers: 437123 }
    ]
  };

  // Steps Growth Data
  const stepsGrowthData = {
    daily: [
      { date: '1月19日', steps: 3456789, avgPerUser: 1478 },
      { date: '1月20日', steps: 3598234, avgPerUser: 1501 },
      { date: '1月21日', steps: 3723456, avgPerUser: 1509 },
      { date: '1月22日', steps: 3834567, avgPerUser: 1520 },
      { date: '1月23日', steps: 3978234, avgPerUser: 1530 },
      { date: '1月24日', steps: 4123456, avgPerUser: 1534 }
    ],
    weekly: [
      { date: '第1周', steps: 18456789, avgPerUser: 2242 },
      { date: '第2周', steps: 20234567, avgPerUser: 2210 },
      { date: '第3周', steps: 22456789, avgPerUser: 2194 },
      { date: '第4周', steps: 24789234, avgPerUser: 2164 }
    ],
    monthly: [
      { date: '8月', steps: 78456789, avgPerUser: 2757 },
      { date: '9月', steps: 86234567, avgPerUser: 2761 },
      { date: '10月', steps: 94567234, avgPerUser: 2736 },
      { date: '11月', steps: 103456789, avgPerUser: 2706 },
      { date: '12月', steps: 115234567, avgPerUser: 2707 },
      { date: '1月', steps: 128567234, avgPerUser: 2722 }
    ],
    yearly: [
      { date: '2022', steps: 456789234, avgPerUser: 2923 },
      { date: '2023', steps: 678234567, avgPerUser: 2891 },
      { date: '2024', steps: 923456789, avgPerUser: 2671 },
      { date: '2025', steps: 1234567890, avgPerUser: 2524 },
      { date: '2026', steps: 1289234567, avgPerUser: 2356 }
    ]
  };

  // Revenue Growth Data
  const revenueGrowthData = {
    daily: [
      { date: '1月19日', revenue: 45678, vipRevenue: 28900, shopRevenue: 16778 },
      { date: '1月20日', revenue: 48234, vipRevenue: 30200, shopRevenue: 18034 },
      { date: '1月21日', revenue: 51456, vipRevenue: 32100, shopRevenue: 19356 },
      { date: '1月22日', revenue: 49823, vipRevenue: 31200, shopRevenue: 18623 },
      { date: '1月23日', revenue: 53678, vipRevenue: 33500, shopRevenue: 20178 },
      { date: '1月24日', revenue: 56234, vipRevenue: 35100, shopRevenue: 21134 }
    ],
    weekly: [
      { date: '第1周', revenue: 234567, vipRevenue: 145678, shopRevenue: 88889 },
      { date: '第2周', revenue: 267234, vipRevenue: 167890, shopRevenue: 99344 },
      { date: '第3周', revenue: 298456, vipRevenue: 186234, shopRevenue: 112222 },
      { date: '第4周', revenue: 323456, vipRevenue: 201234, shopRevenue: 122222 }
    ],
    monthly: [
      { date: '8月', revenue: 856234, vipRevenue: 523456, shopRevenue: 332778 },
      { date: '9月', revenue: 923456, vipRevenue: 567890, shopRevenue: 355566 },
      { date: '10月', revenue: 1045678, vipRevenue: 623456, shopRevenue: 422222 },
      { date: '11月', revenue: 1134567, vipRevenue: 689234, shopRevenue: 445333 },
      { date: '12月', revenue: 1267234, vipRevenue: 756789, shopRevenue: 510445 },
      { date: '1月', revenue: 1389456, vipRevenue: 834567, shopRevenue: 554889 }
    ],
    yearly: [
      { date: '2022', revenue: 5678234, vipRevenue: 3234567, shopRevenue: 2443667 },
      { date: '2023', revenue: 7234567, vipRevenue: 4234567, shopRevenue: 3000000 },
      { date: '2024', revenue: 9456789, vipRevenue: 5567890, shopRevenue: 3888899 },
      { date: '2025', revenue: 12345678, vipRevenue: 7345678, shopRevenue: 5000000 },
      { date: '2026', revenue: 13896789, vipRevenue: 8346789, shopRevenue: 5550000 }
    ]
  };

  // VIP Subscription Data
  const vipDistributionData = [
    { name: 'Monthly', value: 423, color: '#3b82f6' },
    { name: 'Quarterly', value: 267, color: '#8b5cf6' },
    { name: 'Annual', value: 166, color: '#f59e0b' }
  ];

  // Product Category Data
  const categoryRevenueData = [
    { category: 'Daily Essentials', revenue: 234567, sales: 1234 },
    { category: 'Electronics', revenue: 456789, sales: 456 },
    { category: 'Fashion & Accessories', revenue: 189234, sales: 892 },
    { category: 'Charity Projects', revenue: 123456, sales: 678 }
  ];

  const currentData = {
    users: userGrowthData[timeRange],
    steps: stepsGrowthData[timeRange],
    revenue: revenueGrowthData[timeRange]
  };

  // Calculate growth metrics
  const calculateGrowthRate = (current: number, previous: number): number => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const getLatestData = () => {
    const latestUser = currentData.users[currentData.users.length - 1];
    const previousUser = currentData.users[currentData.users.length - 2];
    const latestSteps = currentData.steps[currentData.steps.length - 1];
    const previousSteps = currentData.steps[currentData.steps.length - 2];
    const latestRevenue = currentData.revenue[currentData.revenue.length - 1];
    const previousRevenue = currentData.revenue[currentData.revenue.length - 2];

    return {
      users: {
        current: latestUser.users,
        previous: previousUser.users,
        newUsers: latestUser.newUsers,
        activeUsers: latestUser.activeUsers
      },
      steps: {
        current: latestSteps.steps,
        previous: previousSteps.steps,
        avgPerUser: latestSteps.avgPerUser
      },
      revenue: {
        current: latestRevenue.revenue,
        previous: previousRevenue.revenue,
        vip: latestRevenue.vipRevenue,
        shop: latestRevenue.shopRevenue
      }
    };
  };

  const latestData = getLatestData();

  const growthMetrics: GrowthMetric[] = [
    {
      title: 'Total Users',
      value: latestData.users.current,
      unit: 'users',
      growthRate: calculateGrowthRate(latestData.users.current, latestData.users.previous),
      previousValue: latestData.users.previous,
      icon: <Users className="size-6" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'New Users',
      value: latestData.users.newUsers,
      unit: 'users',
      growthRate: calculateGrowthRate(latestData.users.newUsers, currentData.users[currentData.users.length - 2].newUsers),
      previousValue: currentData.users[currentData.users.length - 2].newUsers,
      icon: <ArrowUpRight className="size-6" />,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Active Users',
      value: latestData.users.activeUsers,
      unit: 'users',
      growthRate: calculateGrowthRate(latestData.users.activeUsers, currentData.users[currentData.users.length - 2].activeUsers),
      previousValue: currentData.users[currentData.users.length - 2].activeUsers,
      icon: <Activity className="size-6" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Total Steps',
      value: latestData.steps.current,
      unit: 'steps',
      growthRate: calculateGrowthRate(latestData.steps.current, latestData.steps.previous),
      previousValue: latestData.steps.previous,
      icon: <Footprints className="size-6" />,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Average Steps per User',
      value: latestData.steps.avgPerUser,
      unit: 'steps/user',
      growthRate: calculateGrowthRate(latestData.steps.avgPerUser, currentData.steps[currentData.steps.length - 2].avgPerUser),
      previousValue: currentData.steps[currentData.steps.length - 2].avgPerUser,
      icon: <Target className="size-6" />,
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Total Revenue',
      value: latestData.revenue.current,
      unit: 'points',
      growthRate: calculateGrowthRate(latestData.revenue.current, latestData.revenue.previous),
      previousValue: latestData.revenue.previous,
      icon: <DollarSign className="size-6" />,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'VIP Revenue',
      value: latestData.revenue.vip,
      unit: 'points',
      growthRate: calculateGrowthRate(latestData.revenue.vip, currentData.revenue[currentData.revenue.length - 2].vipRevenue),
      previousValue: currentData.revenue[currentData.revenue.length - 2].vipRevenue,
      icon: <Crown className="size-6" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Shop Revenue',
      value: latestData.revenue.shop,
      unit: 'points',
      growthRate: calculateGrowthRate(latestData.revenue.shop, currentData.revenue[currentData.revenue.length - 2].shopRevenue),
      previousValue: currentData.revenue[currentData.revenue.length - 2].shopRevenue,
      icon: <ShoppingBag className="size-6" />,
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const getTimeRangeLabel = (range: TimeRange) => {
    const labels = {
      daily: '日',
      weekly: '周',
      monthly: '月',
      yearly: '年'
    };
    return labels[range];
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Data Analytics Management</h2>
            <p className="text-gray-600 mt-1">View growth rates and key business metrics</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-gray-600" />
              <Label className="text-sm">Time Range:</Label>
            </div>
            <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Growth Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {growthMetrics.map((metric, index) => (
            <Card key={index} className={`p-4 bg-gradient-to-br ${metric.color} text-white`}>
              <div className="flex items-center justify-between mb-3">
                {metric.icon}
                <div className="flex items-center gap-1">
                  {metric.growthRate >= 0 ? (
                    <>
                      <TrendingUp className="size-4" />
                      <span className="text-sm font-semibold">+{metric.growthRate.toFixed(2)}%</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="size-4" />
                      <span className="text-sm font-semibold">{metric.growthRate.toFixed(2)}%</span>
                    </>
                  )}
                </div>
              </div>
              <p className="text-sm opacity-90 mb-1">{metric.title}</p>
              <p className="text-3xl font-bold mb-1">{metric.value.toLocaleString()}</p>
              <p className="text-xs opacity-75">{metric.unit}</p>
              <div className="mt-3 pt-3 border-t border-white/20">
                <p className="text-xs opacity-75">
                  Previous: {metric.previousValue.toLocaleString()} {metric.unit}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* User Growth Chart */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">User Growth Trends</h3>
            <p className="text-sm text-gray-600">Total users, new users, and active users comparison</p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={currentData.users}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} name="Total Users" />
              <Line type="monotone" dataKey="newUsers" stroke="#10b981" strokeWidth={2} name="New Users" />
              <Line type="monotone" dataKey="activeUsers" stroke="#8b5cf6" strokeWidth={2} name="Active Users" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Steps Growth Chart */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Steps Growth Trends</h3>
            <p className="text-sm text-gray-600">Total steps and average steps per user analysis</p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={currentData.steps}>
              <defs>
                <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => [`${value.toLocaleString()} steps`, 'Total Steps']}
              />
              <Legend />
              <Area type="monotone" dataKey="steps" stroke="#f97316" fill="url(#colorSteps)" name="Total Steps" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue Growth Chart */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Growth Trends</h3>
            <p className="text-sm text-gray-600">VIP subscription and store sales revenue comparison</p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={currentData.revenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="vipRevenue" fill="#8b5cf6" name="VIP Revenue" />
              <Bar dataKey="shopRevenue" fill="#ec4899" name="Store Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Distribution Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* VIP Distribution */}
          <Card className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">VIP Membership Distribution</h3>
              <p className="text-sm text-gray-600">User distribution by subscription type</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={vipDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {vipDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {vipDistributionData.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="size-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  </div>
                  <p className="text-xs text-gray-600">{item.name}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Category Revenue */}
          <Card className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Product Category Revenue</h3>
              <p className="text-sm text-gray-600">Sales performance by product category</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryRevenueData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="category" type="category" stroke="#6b7280" width={120} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue (points)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <Users className="size-8 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">User Analytics</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">User Growth Rate</span>
                <Badge className="bg-green-100 text-green-700">
                  +{growthMetrics[0].growthRate.toFixed(2)}%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Rate</span>
                <span className="font-semibold text-gray-900">
                  {((latestData.users.activeUsers / latestData.users.current) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">New User Ratio</span>
                <span className="font-semibold text-gray-900">
                  {((latestData.users.newUsers / latestData.users.current) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200">
            <div className="flex items-center gap-3 mb-4">
              <Footprints className="size-8 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">Steps Analytics</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Steps Growth Rate</span>
                <Badge className="bg-green-100 text-green-700">
                  +{growthMetrics[3].growthRate.toFixed(2)}%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg Steps per User</span>
                <span className="font-semibold text-gray-900">
                  {latestData.steps.avgPerUser.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Steps</span>
                <span className="font-semibold text-gray-900">
                  {(latestData.steps.current / 1000000).toFixed(1)}M
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="size-8 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Revenue Analytics</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Revenue Growth Rate</span>
                <Badge className="bg-green-100 text-green-700">
                  +{growthMetrics[5].growthRate.toFixed(2)}%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">VIP Revenue Ratio</span>
                <span className="font-semibold text-gray-900">
                  {((latestData.revenue.vip / latestData.revenue.current) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Store Revenue Ratio</span>
                <span className="font-semibold text-gray-900">
                  {((latestData.revenue.shop / latestData.revenue.current) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Carbon Emission Heatmap */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <MapPin className="size-8 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Carbon Emission Heatmap - NUS Campus</h3>
              <p className="text-sm text-gray-600">Pedestrian activity density and carbon footprint analysis across campus</p>
            </div>
          </div>
          <HeatMapView title="" height="600px" />
        </Card>
      </div>
    </div>
  );
}

// Missing Target icon import
function Target({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
      />
    </svg>
  );
}