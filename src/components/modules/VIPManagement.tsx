import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Crown, 
  Users, 
  CheckCircle, 
  XCircle, 
  Calendar,
  TrendingUp,
  Settings,
  Zap
} from 'lucide-react';

interface VIPUser {
  id: string;
  name: string;
  avatar: string;
  email: string;
  subscriptionType: 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate: string;
  status: 'active' | 'expiring' | 'expired';
  autoRenew: boolean;
  totalSpent: number;
}

interface VIPFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: React.ReactNode;
}

export function VIPManagement() {
  const [vipUsers, setVipUsers] = useState<VIPUser[]>([
    {
      id: 'U001',
      name: 'John Smith',
      avatar: 'JS',
      email: 'john.smith@example.com',
      subscriptionType: 'monthly',
      startDate: '2026-01-01',
      endDate: '2026-02-01',
      status: 'active',
      autoRenew: true,
      totalSpent: 2400
    },
    {
      id: 'U003',
      name: 'Michael Brown',
      avatar: 'MB',
      email: 'michael.b@example.com',
      subscriptionType: 'yearly',
      startDate: '2025-12-15',
      endDate: '2026-12-15',
      status: 'active',
      autoRenew: true,
      totalSpent: 9600
    },
    {
      id: 'U005',
      name: 'David Wilson',
      avatar: 'DW',
      email: 'david.w@example.com',
      subscriptionType: 'quarterly',
      startDate: '2026-01-10',
      endDate: '2026-04-10',
      status: 'active',
      autoRenew: false,
      totalSpent: 3600
    },
    {
      id: 'U007',
      name: 'Robert Chen',
      avatar: 'RC',
      email: 'robert.c@example.com',
      subscriptionType: 'monthly',
      startDate: '2025-12-20',
      endDate: '2026-01-28',
      status: 'expiring',
      autoRenew: false,
      totalSpent: 1200
    },
    {
      id: 'U008',
      name: 'William Taylor',
      avatar: 'WT',
      email: 'william.t@example.com',
      subscriptionType: 'yearly',
      startDate: '2025-06-01',
      endDate: '2026-06-01',
      status: 'active',
      autoRenew: true,
      totalSpent: 9600
    },
    {
      id: 'U010',
      name: 'James Anderson',
      avatar: 'JA',
      email: 'james.a@example.com',
      subscriptionType: 'monthly',
      startDate: '2025-12-24',
      endDate: '2026-01-24',
      status: 'active',
      autoRenew: true,
      totalSpent: 2400
    }
  ]);

  const [vipFeatures, setVipFeatures] = useState<VIPFeature[]>([
    {
      id: 'F001',
      name: 'Exclusive Badges',
      description: 'Access to premium badge collection',
      enabled: true,
      icon: <Crown className="size-5 text-purple-600" />
    },
    {
      id: 'F002',
      name: 'Double Points',
      description: 'Earn 2x points on all activities',
      enabled: true,
      icon: <Zap className="size-5 text-yellow-600" />
    },
    {
      id: 'F003',
      name: 'Priority Support',
      description: '24/7 dedicated customer support',
      enabled: true,
      icon: <CheckCircle className="size-5 text-green-600" />
    },
    {
      id: 'F004',
      name: 'Advanced Analytics',
      description: 'Detailed activity reports and insights',
      enabled: true,
      icon: <TrendingUp className="size-5 text-blue-600" />
    },
    {
      id: 'F005',
      name: 'Early Access',
      description: 'Try new features before public release',
      enabled: false,
      icon: <Calendar className="size-5 text-orange-600" />
    }
  ]);

  const handleToggleAutoRenew = (userId: string) => {
    setVipUsers(vipUsers.map(user => 
      user.id === userId ? { ...user, autoRenew: !user.autoRenew } : user
    ));
  };

  const handleToggleFeature = (featureId: string) => {
    setVipFeatures(vipFeatures.map(feature => 
      feature.id === featureId ? { ...feature, enabled: !feature.enabled } : feature
    ));
  };

  const getSubscriptionBadge = (type: VIPUser['subscriptionType']) => {
    const colors = {
      monthly: 'bg-blue-100 text-blue-700',
      quarterly: 'bg-purple-100 text-purple-700',
      yearly: 'bg-amber-100 text-amber-700'
    };
    const labels = {
      monthly: 'Monthly',
      quarterly: 'Quarterly',
      yearly: 'Yearly'
    };
    return <Badge className={colors[type]}>{labels[type]}</Badge>;
  };

  const getStatusBadge = (status: VIPUser['status']) => {
    const colors = {
      active: 'bg-green-100 text-green-700',
      expiring: 'bg-orange-100 text-orange-700',
      expired: 'bg-red-100 text-red-700'
    };
    const labels = {
      active: 'Active',
      expiring: 'Expiring Soon',
      expired: 'Expired'
    };
    return <Badge className={colors[status]}>{labels[status]}</Badge>;
  };

  const activeCount = vipUsers.filter(u => u.status === 'active').length;
  const expiringCount = vipUsers.filter(u => u.status === 'expiring').length;
  const totalRevenue = vipUsers.reduce((sum, user) => sum + user.totalSpent, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">VIP Subscription Management</h2>
        <p className="text-gray-600 mt-1">Manage VIP user memberships and premium features</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total VIP Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{vipUsers.length}</p>
            </div>
            <div className="size-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Crown className="size-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{activeCount}</p>
            </div>
            <div className="size-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="size-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Expiring Soon</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">{expiringCount}</p>
            </div>
            <div className="size-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <Calendar className="size-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">${totalRevenue}</p>
            </div>
            <div className="size-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="size-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="users">
            <Users className="size-4 mr-2" />
            VIP Users
          </TabsTrigger>
          <TabsTrigger value="features">
            <Settings className="size-4 mr-2" />
            Features
          </TabsTrigger>
        </TabsList>

        {/* VIP Users Tab */}
        <TabsContent value="users" className="mt-6">
          <Card>
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-900">VIP User List</h3>
              <p className="text-xs text-gray-600 mt-1">Manage VIP subscriptions and settings</p>
            </div>
            <ScrollArea className="h-[600px]">
              <div className="p-4 space-y-4">
                {vipUsers.map((user) => (
                  <Card key={user.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <Avatar className="size-14 flex-shrink-0">
                        <AvatarFallback className="bg-purple-600 text-white text-lg">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{user.name}</h4>
                          {getSubscriptionBadge(user.subscriptionType)}
                          {getStatusBadge(user.status)}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{user.email}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-500">Start Date</p>
                            <p className="text-sm font-medium text-gray-900">{user.startDate}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">End Date</p>
                            <p className="text-sm font-medium text-gray-900">{user.endDate}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Total Spent</p>
                            <p className="text-sm font-medium text-blue-600">${user.totalSpent}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Days Remaining</p>
                            <p className="text-sm font-medium text-gray-900">
                              {Math.ceil((new Date(user.endDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} days
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 border-t">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={user.autoRenew}
                              onCheckedChange={() => handleToggleAutoRenew(user.id)}
                            />
                            <span className="text-sm text-gray-700">Auto Renew</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {user.autoRenew ? (
                              <CheckCircle className="size-4 text-green-600" />
                            ) : (
                              <XCircle className="size-4 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>

        {/* VIP Features Tab */}
        <TabsContent value="features" className="mt-6">
          <Card>
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-900">VIP Feature Management</h3>
              <p className="text-xs text-gray-600 mt-1">Enable or disable premium features</p>
            </div>
            <div className="p-4 space-y-4">
              {vipFeatures.map((feature) => (
                <Card key={feature.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.name}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Badge className={feature.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                        {feature.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                      <Switch
                        checked={feature.enabled}
                        onCheckedChange={() => handleToggleFeature(feature.id)}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
