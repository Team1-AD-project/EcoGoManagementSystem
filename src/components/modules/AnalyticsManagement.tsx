import { useState, useEffect } from 'react';
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
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import {
  TrendingUp, TrendingDown, Users, Leaf, ShoppingBag, Crown, DollarSign, Calendar, ArrowUpRight, Activity, MapPin, Loader2
} from 'lucide-react';
import { HeatMapView } from './HeatMapView'; // Assuming this component exists
import { getManagementAnalytics, type ManagementAnalyticsData, type Metric } from '@/api/statisticsApi';

type TimeRange = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface GrowthMetricForUI {
  title: string;
  metric?: Metric;
  unit: string;
  icon: React.ReactNode;
  color: string;
}

// Refactored to use carbon data
const createGrowthMetrics = (data?: ManagementAnalyticsData): GrowthMetricForUI[] => [
  { title: 'Total Users', metric: data?.totalUsers, unit: 'users', icon: <Users className="size-6" />, color: 'from-blue-500 to-blue-600' },
  { title: 'New Users', metric: data?.newUsers, unit: 'users', icon: <ArrowUpRight className="size-6" />, color: 'from-green-500 to-green-600' },
  { title: 'Active Users', metric: data?.activeUsers, unit: 'users', icon: <Activity className="size-6" />, color: 'from-purple-500 to-purple-600' },
  { title: 'Total Carbon Saved', metric: data?.totalCarbonSaved, unit: 'kg', icon: <Leaf className="size-6" />, color: 'from-orange-500 to-orange-600' },
  { title: 'Avg Carbon / User', metric: data?.averageCarbonPerUser, unit: 'kg/user', icon: <Target className="size-6" />, color: 'from-teal-500 to-teal-600' },
  { title: 'Total Revenue (Mock)', metric: data?.totalRevenue, unit: 'points', icon: <DollarSign className="size-6" />, color: 'from-yellow-500 to-yellow-600' },
  { title: 'VIP Revenue (Mock)', metric: data?.vipRevenue, unit: 'points', icon: <Crown className="size-6" />, color: 'from-purple-500 to-purple-600' },
  { title: 'Shop Revenue (Mock)', metric: data?.shopRevenue, unit: 'points', icon: <ShoppingBag className="size-6" />, color: 'from-pink-500 to-pink-600' }
];

const PIE_CHART_COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981'];

export function AnalyticsManagement() {
  const [timeRange, setTimeRange] = useState<TimeRange>('monthly');
  const [analyticsData, setAnalyticsData] = useState<ManagementAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getManagementAnalytics(timeRange);
        setAnalyticsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [timeRange]);

  const growthMetrics = createGrowthMetrics(analyticsData ?? undefined);

  if (loading) {
    return <div className="h-full flex items-center justify-center"><Loader2 className="size-8 animate-spin text-blue-600" /></div>;
  }

  if (error || !analyticsData) {
    return <div className="h-full flex items-center justify-center text-red-500">{error || 'No data available.'}</div>;
  }
  
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <div><h2 className="text-2xl font-bold">Data Analytics Management</h2><p className="text-gray-600 mt-1">View growth rates and key business metrics</p></div>
          <div className="flex items-center gap-4"><div className="flex items-center gap-2"><Calendar className="size-5 text-gray-600" /><Label className="text-sm">Time Range:</Label></div><Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}><SelectTrigger className="w-32"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="daily">Daily</SelectItem><SelectItem value="weekly">Weekly</SelectItem><SelectItem value="monthly">Monthly</SelectItem><SelectItem value="yearly">Yearly</SelectItem></SelectContent></Select></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {growthMetrics.map((metric, index) => (
            <Card key={index} className={`p-4 bg-gradient-to-br ${metric.color} text-white`}>
              <div className="flex items-center justify-between mb-3">
                {metric.icon}
                {metric.metric && (<div className={`flex items-center gap-1 ${metric.metric.growthRate >= 0 ? 'text-green-300' : 'text-red-300'}`}><_TrendingIcon rate={metric.metric.growthRate} /><span className="text-sm font-semibold">{metric.metric.growthRate.toFixed(2)}%</span></div>)}
              </div>
              <p className="text-sm opacity-90 mb-1">{metric.title}</p>
              <p className="text-3xl font-bold mb-1">{metric.metric?.currentValue.toLocaleString() || 'N/A'}</p>
              <p className="text-xs opacity-75">{metric.unit}</p>
              <div className="mt-3 pt-3 border-t border-white/20"><p className="text-xs opacity-75">Previous: {metric.metric?.previousValue.toLocaleString() || 'N/A'} {metric.unit}</p></div>
            </Card>
          ))}
        </div>

        <Card className="p-6"><h3 className="text-lg font-semibold">User Growth Trends</h3><ResponsiveContainer width="100%" height={350}><LineChart data={analyticsData.userGrowthTrend}><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /><XAxis dataKey="date" stroke="#6b7280" /><YAxis stroke="#6b7280" /><Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} /><Legend /><Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} name="Total Users" /><Line type="monotone" dataKey="newUsers" stroke="#10b981" strokeWidth={2} name="New Users" /><Line type="monotone" dataKey="activeUsers" stroke="#8b5cf6" strokeWidth={2} name="Active Users" /></LineChart></ResponsiveContainer></Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Carbon Saved Trends</h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={analyticsData.carbonGrowthTrend}>
              <defs><linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/><stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} formatter={(value: number) => [`${value.toLocaleString()} kg`, 'Total Carbon Saved']} />
              <Legend />
              <Area type="monotone" dataKey="carbonSaved" stroke="#f97316" fill="url(#colorCarbon)" name="Total Carbon Saved" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6"><h3 className="text-lg font-semibold">Revenue Trends (Mock)</h3><ResponsiveContainer width="100%" height={350}><BarChart data={analyticsData.revenueGrowthTrend}><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /><XAxis dataKey="date" stroke="#6b7280" /><YAxis stroke="#6b7280" /><Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} /><Legend /><Bar dataKey="vipRevenue" fill="#8b5cf6" name="VIP Revenue" /><Bar dataKey="shopRevenue" fill="#ec4899" name="Store Revenue" /></BarChart></ResponsiveContainer></Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6"><h3 className="text-lg font-semibold">VIP Membership (Mock)</h3><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={analyticsData.vipDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} >{analyticsData.vipDistribution.map((entry, index) => (<Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />))}</Pie><Tooltip /></PieChart></ResponsiveContainer></Card>
          <Card className="p-6"><h3 className="text-lg font-semibold">Category Revenue (Mock)</h3><ResponsiveContainer width="100%" height={300}><BarChart data={analyticsData.categoryRevenue} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /><XAxis type="number" stroke="#6b7280" /><YAxis dataKey="name" type="category" stroke="#6b7280" width={120} /><Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} /><Bar dataKey="value" fill="#3b82f6" name="Revenue (points)" /></BarChart></ResponsiveContainer></Card>
        </div>

        <Card className="p-6"><h3 className="text-lg font-semibold">Carbon Emission Heatmap</h3><HeatMapView title="" height="600px" /></Card>
      </div>
    </div>
  );
}

function _TrendingIcon({ rate }: { rate: number }) {
  return rate >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />;
}

function Target({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" /></svg>;
}
