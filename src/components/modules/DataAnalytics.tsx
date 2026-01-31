import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function DataAnalytics() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Data Analysis and Log Management</h2>
          <p className="text-gray-600 mt-1">View analytics, insights, and system logs</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="7days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24hours">Last 24 Hours</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">8,342</p>
                <p className="text-xs text-green-600 mt-1">+12.5% vs last week</p>
              </div>
              <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="size-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Trips</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">15,234</p>
                <p className="text-xs text-green-600 mt-1">+8.2% vs last week</p>
              </div>
              <div className="size-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="size-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Carbon Saved</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">142.5 tons</p>
                <p className="text-xs text-green-600 mt-1">+15.3% vs last week</p>
              </div>
              <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Leaf className="size-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Redemptions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">1,456</p>
                <p className="text-xs text-green-600 mt-1">+22.1% vs last week</p>
              </div>
              <div className="size-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="size-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center text-gray-500">
                <BarChart3 className="size-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">User growth chart visualization</p>
                <p className="text-xs mt-1">Daily active users over time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Carbon Emission Reduction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center text-gray-500">
                <Leaf className="size-12 mx-auto mb-2 text-green-400" />
                <p className="text-sm">Carbon reduction heatmap</p>
                <p className="text-xs mt-1">Emissions saved by region</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transport Mode Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { mode: 'Bicycle', percentage: 35, color: 'bg-green-500' },
                { mode: 'Public Bus', percentage: 28, color: 'bg-blue-500' },
                { mode: 'Walking', percentage: 22, color: 'bg-purple-500' },
                { mode: 'Carpool', percentage: 10, color: 'bg-orange-500' },
                { mode: 'E-Scooter', percentage: 5, color: 'bg-yellow-500' },
              ].map((item) => (
                <div key={item.mode}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.mode}</span>
                    <span className="text-sm text-gray-600">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'John Doe', trips: 156, carbon: '24.5 kg' },
                { name: 'Jane Smith', trips: 142, carbon: '22.1 kg' },
                { name: 'Mike Johnson', trips: 128, carbon: '19.8 kg' },
                { name: 'Sarah Wilson', trips: 115, carbon: '18.2 kg' },
                { name: 'Tom Brown', trips: 98, carbon: '15.6 kg' },
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="size-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.trips} trips</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">{user.carbon}</p>
                    <p className="text-xs text-gray-600">saved</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
