import { Users, Map, Coins, Crown, Gift, Award, TrendingUp, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function Dashboard() {
  const quickStats = [
    { icon: <Users className="size-8 text-blue-500" />, label: '总用户数', value: '12,458', change: '+12.5%', color: 'bg-blue-50' },
    { icon: <Map className="size-8 text-green-500" />, label: '总行程数', value: '3,842', change: '+8.2%', color: 'bg-green-50' },
    { icon: <Coins className="size-8 text-orange-500" />, label: '积分总量', value: '284K', change: '+22.1%', color: 'bg-orange-50' },
    { icon: <Crown className="size-8 text-purple-500" />, label: 'VIP会员', value: '1,245', change: '+5.7%', color: 'bg-purple-50' },
    { icon: <Gift className="size-8 text-yellow-500" />, label: '兑换订单', value: '8,564', change: '+15.3%', color: 'bg-yellow-50' },
    { icon: <Award className="size-8 text-cyan-500" />, label: '徽章总数', value: '48', change: '+6', color: 'bg-cyan-50' },
    { icon: <TrendingUp className="size-8 text-pink-500" />, label: '活跃广告', value: '126', change: '+18', color: 'bg-pink-50' },
    { icon: <Activity className="size-8 text-indigo-500" />, label: '日活跃度', value: '89%', change: '+2.3%', color: 'bg-indigo-50' }
  ];

  const recentActivities = [
    { time: '10:30', user: '张三', action: '创建了新的兑换项目 "环保背包"', module: '奖励商店管理' },
    { time: '10:15', user: '李四', action: '更新了用户 "user_123" 的角色权限', module: '用户权限管理' },
    { time: '09:45', user: '王五', action: '上传了 50 条新的行程数据', module: '行程数据管理' },
    { time: '09:20', user: '赵六', action: '创建了新徽章 "绿色先锋"', module: '徽章管理' },
    { time: '08:55', user: '孙七', action: '调整了积分兑换比例为 1:100', module: '积分交易管理' },
    { time: '08:30', user: '周八', action: '发布了新广告活动 "春季环保月"', module: '广告管理' },
    { time: '08:00', user: '吴九', action: '更新了本月排行榜规则', module: '排行榜管理' },
    { time: '07:45', user: '郑十', action: '导出了碳排放数据报表', module: '数据分析管理' }
  ];

  const moduleStats = [
    { name: '用户权限管理', value: 12458, description: '注册用户总数' },
    { name: '行程数据管理', value: 3842, description: '累计行程记录' },
    { name: '积分交易管理', value: 28456, description: '累计积分交易' },
    { name: 'VIP订阅功能管理', value: 1245, description: '当前VIP用户' },
    { name: '奖励商店管理', value: 8564, description: '累计兑换订单' },
    { name: '徽章管理', value: 48, description: '系统徽章总数' }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">早安，管理员！</h2>
            <p className="text-sm text-white/90 mt-2">欢迎回到系统管理平台，开始您一天的工作</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-sm text-white/80">功能模块</div>
              <div className="text-3xl font-bold mt-1">9</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/80">今日访问</div>
              <div className="text-3xl font-bold mt-1">1,248</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/80">待处理</div>
              <div className="text-3xl font-bold mt-1">23</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className={`size-12 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                {stat.icon}
              </div>
              <div className="text-xs text-gray-600 mb-1">{stat.label}</div>
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-green-600 mt-1">{stat.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">最新动态</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-xs text-gray-500 flex-shrink-0 w-12 pt-0.5">{activity.time}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium text-blue-600">{activity.user}</span>
                      {' '}
                      <span className="text-gray-600">{activity.action}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{activity.module}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Module Statistics */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">模块统计</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moduleStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{stat.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{stat.description}</div>
                  </div>
                  <div className="text-xl font-bold text-blue-600">
                    {stat.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Overview */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">系统概览</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative size-40">
                <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset="37.68"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Activity className="size-10 text-blue-600 mb-2" />
                  <span className="text-3xl font-bold text-gray-900">85%</span>
                  <span className="text-xs text-gray-500 mt-1">运行状态</span>
                </div>
              </div>
              <div className="mt-6 w-full space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                    <span>系统性能</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                    <span>数据完整性</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                    <span>用户活跃度</span>
                    <span>76%</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Access */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">快捷访问</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: '用户管理', icon: <Users className="size-6" />, color: 'bg-blue-50 text-blue-600' },
                { label: '行程管理', icon: <Map className="size-6" />, color: 'bg-green-50 text-green-600' },
                { label: '积分管理', icon: <Coins className="size-6" />, color: 'bg-orange-50 text-orange-600' },
                { label: 'VIP管理', icon: <Crown className="size-6" />, color: 'bg-purple-50 text-purple-600' },
                { label: '商店管理', icon: <Gift className="size-6" />, color: 'bg-yellow-50 text-yellow-600' },
                { label: '徽章管理', icon: <Award className="size-6" />, color: 'bg-cyan-50 text-cyan-600' }
              ].map((item, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`size-12 ${item.color} rounded-lg flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <span className="text-xs text-gray-700">{item.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">系统状态</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: '用户认证服务', status: '正常', uptime: '99.9%' },
                { name: '数据处理服务', status: '正常', uptime: '99.7%' },
                { name: '积分计算引擎', status: '正常', uptime: '99.8%' },
                { name: '通知推送服务', status: '正常', uptime: '99.5%' },
                { name: '数据分析引擎', status: '正常', uptime: '99.6%' },
                { name: '文件存储服务', status: '正常', uptime: '99.4%' }
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{service.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">运行时间: {service.uptime}</div>
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
    </div>
  );
}
