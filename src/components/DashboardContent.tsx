import { Users, Map, TrendingUp, Award, Activity, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className="text-gray-400">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <p className={`text-xs mt-1 flex items-center gap-1 ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          <ArrowUpRight className="size-3" />
          {change}
        </p>
      </CardContent>
    </Card>
  );
}

export function DashboardContent() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600 mt-1">Welcome to the system management portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value="12,458"
          change="+12.5% from last month"
          icon={<Users className="size-5" />}
          trend="up"
        />
        <StatCard
          title="Active Trips"
          value="3,842"
          change="+8.2% from last month"
          icon={<Map className="size-5" />}
          trend="up"
        />
        <StatCard
          title="Carbon Reduction"
          value="24.8 tons"
          change="+15.3% from last month"
          icon={<TrendingUp className="size-5" />}
          trend="up"
        />
        <StatCard
          title="Badges Earned"
          value="8,564"
          change="+22.1% from last month"
          icon={<Award className="size-5" />}
          trend="up"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'New user registered', user: 'John Doe', time: '2 minutes ago' },
                { action: 'Trip data submitted', user: 'Jane Smith', time: '15 minutes ago' },
                { action: 'Badge unlocked', user: 'Mike Johnson', time: '1 hour ago' },
                { action: 'Redemption order placed', user: 'Sarah Wilson', time: '2 hours ago' },
                { action: 'VIP subscription renewed', user: 'Tom Brown', time: '3 hours ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Activity className="size-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600 mt-0.5">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { service: 'User Authentication Service', status: 'Operational', uptime: '99.9%' },
                { service: 'Trip Data Processing', status: 'Operational', uptime: '99.7%' },
                { service: 'Payment Gateway', status: 'Operational', uptime: '99.8%' },
                { service: 'Notification Service', status: 'Operational', uptime: '99.5%' },
                { service: 'Analytics Engine', status: 'Operational', uptime: '99.6%' }
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between pb-3 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{service.service}</p>
                    <p className="text-xs text-gray-600 mt-0.5">Uptime: {service.uptime}</p>
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    {service.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <Users className="size-5" />
              <span className="text-sm">Manage Users</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <Map className="size-5" />
              <span className="text-sm">View Trips</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <Award className="size-5" />
              <span className="text-sm">Manage Badges</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <TrendingUp className="size-5" />
              <span className="text-sm">View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
