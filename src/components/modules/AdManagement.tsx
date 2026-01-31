import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Megaphone,
  Edit,
  Trash2,
  Plus,
  Eye,
  MousePointerClick,
  TrendingUp,
  Calendar,
  MapPin,
  Link as LinkIcon,
  AlertCircle,
  CheckCircle,
  Power
} from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

interface Advertisement {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  position: 'banner' | 'sidebar' | 'popup' | 'feed';
  status: 'active' | 'inactive' | 'scheduled';
  startDate: string;
  endDate: string;
  impressions: number;
  clicks: number;
  clickRate: number;
  budget: number;
  spent: number;
  targetAudience: string;
}

export function AdManagement() {
  const [ads, setAds] = useState<Advertisement[]>([
    {
      id: 'AD001',
      name: 'Spring Eco Event',
      description: 'Join the spring tree planting event and win great rewards',
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
      linkUrl: 'https://example.com/spring-event',
      position: 'banner',
      status: 'active',
      startDate: '2026-01-15',
      endDate: '2026-03-31',
      impressions: 45678,
      clicks: 2345,
      clickRate: 5.13,
      budget: 50000,
      spent: 23456,
      targetAudience: 'All Users'
    },
    {
      id: 'AD002',
      name: 'VIP Member Special',
      description: 'Limited time 20% off, upgrade to VIP and enjoy more benefits',
      imageUrl: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800',
      linkUrl: 'https://example.com/vip-offer',
      position: 'popup',
      status: 'active',
      startDate: '2026-01-20',
      endDate: '2026-02-20',
      impressions: 32456,
      clicks: 3456,
      clickRate: 10.65,
      budget: 80000,
      spent: 34567,
      targetAudience: 'Regular Users'
    },
    {
      id: 'AD003',
      name: 'New Products Launch',
      description: 'New eco-friendly products in store, come shop now',
      imageUrl: 'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=800',
      linkUrl: 'https://example.com/new-products',
      position: 'sidebar',
      status: 'active',
      startDate: '2026-01-10',
      endDate: '2026-02-10',
      impressions: 28934,
      clicks: 1567,
      clickRate: 5.42,
      budget: 40000,
      spent: 19234,
      targetAudience: 'Active Users'
    },
    {
      id: 'AD004',
      name: 'Badge Collection Challenge',
      description: 'Collect all badges and unlock exclusive titles',
      imageUrl: 'https://images.unsplash.com/photo-1579547621700-1d0ca0f38e8a?w=800',
      linkUrl: 'https://example.com/badge-challenge',
      position: 'feed',
      status: 'inactive',
      startDate: '2026-01-05',
      endDate: '2026-01-25',
      impressions: 15678,
      clicks: 892,
      clickRate: 5.69,
      budget: 30000,
      spent: 30000,
      targetAudience: 'All Users'
    },
    {
      id: 'AD005',
      name: 'Referral Rewards',
      description: 'Invite friends to register and both receive points rewards',
      imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800',
      linkUrl: 'https://example.com/referral',
      position: 'banner',
      status: 'active',
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      impressions: 67234,
      clicks: 4234,
      clickRate: 6.30,
      budget: 120000,
      spent: 8934,
      targetAudience: 'All Users'
    },
    {
      id: 'AD006',
      name: 'Anniversary Celebration',
      description: 'Platform anniversary, multiple gifts waiting for you',
      imageUrl: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800',
      linkUrl: 'https://example.com/anniversary',
      position: 'popup',
      status: 'scheduled',
      startDate: '2026-02-01',
      endDate: '2026-02-28',
      impressions: 0,
      clicks: 0,
      clickRate: 0,
      budget: 100000,
      spent: 0,
      targetAudience: 'VIP Users'
    },
    {
      id: 'AD007',
      name: 'Steps Challenge',
      description: 'Participate in monthly steps challenge and win prizes',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      linkUrl: 'https://example.com/steps-challenge',
      position: 'feed',
      status: 'active',
      startDate: '2026-01-15',
      endDate: '2026-02-15',
      impressions: 41234,
      clicks: 2789,
      clickRate: 6.76,
      budget: 60000,
      spent: 28456,
      targetAudience: 'Active Users'
    },
    {
      id: 'AD008',
      name: 'Eco Education Class',
      description: 'Learn environmental knowledge and earn points rewards',
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
      linkUrl: 'https://example.com/eco-education',
      position: 'sidebar',
      status: 'inactive',
      startDate: '2025-12-20',
      endDate: '2026-01-20',
      impressions: 22456,
      clicks: 1123,
      clickRate: 5.00,
      budget: 35000,
      spent: 35000,
      targetAudience: 'All Users'
    }
  ]);

  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [adToDelete, setAdToDelete] = useState<Advertisement | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPosition, setFilterPosition] = useState<string>('all');

  const [newAd, setNewAd] = useState<Partial<Advertisement>>({
    name: '',
    description: '',
    imageUrl: '',
    linkUrl: '',
    position: 'banner',
    status: 'active',
    startDate: '',
    endDate: '',
    budget: 0,
    targetAudience: 'All Users'
  });

  const handleEditAd = (ad: Advertisement) => {
    setEditingAd({ ...ad });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingAd) {
      setAds(ads.map(a => a.id === editingAd.id ? editingAd : a));
      setIsEditDialogOpen(false);
      setEditingAd(null);
    }
  };

  const handleAddAd = () => {
    const ad: Advertisement = {
      id: `AD${String(ads.length + 1).padStart(3, '0')}`,
      name: newAd.name || '',
      description: newAd.description || '',
      imageUrl: newAd.imageUrl || 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800',
      linkUrl: newAd.linkUrl || '',
      position: newAd.position as 'banner' | 'sidebar' | 'popup' | 'feed',
      status: newAd.status as 'active' | 'inactive' | 'scheduled',
      startDate: newAd.startDate || '',
      endDate: newAd.endDate || '',
      impressions: 0,
      clicks: 0,
      clickRate: 0,
      budget: newAd.budget || 0,
      spent: 0,
      targetAudience: newAd.targetAudience || 'All Users'
    };
    setAds([...ads, ad]);
    setIsAddDialogOpen(false);
    setNewAd({
      name: '',
      description: '',
      imageUrl: '',
      linkUrl: '',
      position: 'banner',
      status: 'active',
      startDate: '',
      endDate: '',
      budget: 0,
      targetAudience: 'All Users'
    });
  };

  const handleDeleteAd = (ad: Advertisement) => {
    setAdToDelete(ad);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (adToDelete) {
      setAds(ads.filter(a => a.id !== adToDelete.id));
      setIsDeleteDialogOpen(false);
      setAdToDelete(null);
    }
  };

  const toggleAdStatus = (adId: string) => {
    setAds(ads.map(ad => {
      if (ad.id === adId) {
        return {
          ...ad,
          status: ad.status === 'active' ? 'inactive' : 'active'
        };
      }
      return ad;
    }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-700">Inactive</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-700">Scheduled</Badge>;
      default:
        return null;
    }
  };

  const getPositionLabel = (position: string) => {
    const labels = {
      banner: 'Banner',
      sidebar: 'Sidebar',
      popup: 'Popup',
      feed: 'Feed'
    };
    return labels[position as keyof typeof labels];
  };

  const filteredAds = ads.filter(ad => {
    const statusMatch = filterStatus === 'all' || ad.status === filterStatus;
    const positionMatch = filterPosition === 'all' || ad.position === filterPosition;
    return statusMatch && positionMatch;
  });

  const totalAds = ads.length;
  const activeAds = ads.filter(a => a.status === 'active').length;
  const totalImpressions = ads.reduce((sum, a) => sum + a.impressions, 0);
  const totalClicks = ads.reduce((sum, a) => sum + a.clicks, 0);
  const avgClickRate = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const totalBudget = ads.reduce((sum, a) => sum + a.budget, 0);
  const totalSpent = ads.reduce((sum, a) => sum + a.spent, 0);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-6 bg-white border-b">
        <h2 className="text-2xl font-bold text-gray-900">Advertisement Management</h2>
        <p className="text-gray-600 mt-1">Manage platform ad publishing, editing, and deployment</p>
      </div>

      {/* Statistics Cards */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between mb-2">
            <Megaphone className="size-8" />
          </div>
          <p className="text-sm opacity-90 mb-1">Total Ads</p>
          <p className="text-3xl font-bold">{totalAds}</p>
          <p className="text-xs opacity-75 mt-1">Active: {activeAds}</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between mb-2">
            <Eye className="size-8" />
          </div>
          <p className="text-sm opacity-90 mb-1">Total Impressions</p>
          <p className="text-3xl font-bold">{totalImpressions.toLocaleString()}</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between mb-2">
            <MousePointerClick className="size-8" />
          </div>
          <p className="text-sm opacity-90 mb-1">Total Clicks</p>
          <p className="text-3xl font-bold">{totalClicks.toLocaleString()}</p>
          <p className="text-xs opacity-75 mt-1">Avg Click Rate: {avgClickRate.toFixed(2)}%</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="size-8" />
          </div>
          <p className="text-sm opacity-90 mb-1">Budget Usage</p>
          <p className="text-3xl font-bold">{((totalSpent / totalBudget) * 100).toFixed(1)}%</p>
          <p className="text-xs opacity-75 mt-1">{totalSpent.toLocaleString()} / {totalBudget.toLocaleString()}</p>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="px-6 pb-4">
        <Card className="p-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <Label>Ad Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <Label>Display Position</Label>
              <Select value={filterPosition} onValueChange={setFilterPosition}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="banner">Banner</SelectItem>
                  <SelectItem value="sidebar">Sidebar</SelectItem>
                  <SelectItem value="popup">Popup</SelectItem>
                  <SelectItem value="feed">Feed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="size-4" />
              Add Advertisement
            </Button>
          </div>
        </Card>
      </div>

      {/* Ads Grid */}
      <div className="flex-1 overflow-hidden px-6 pb-6">
        <div className="h-full overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredAds.map((ad) => (
              <Card key={ad.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Ad Image */}
                <div className="relative h-48 bg-gray-100">
                  <ImageWithFallback
                    src={ad.imageUrl}
                    alt={ad.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(ad.status)}
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="outline" className="bg-white/90">
                      <MapPin className="size-3 mr-1" />
                      {getPositionLabel(ad.position)}
                    </Badge>
                  </div>
                </div>

                {/* Ad Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{ad.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{ad.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <LinkIcon className="size-3" />
                        <a href={ad.linkUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 truncate">
                          {ad.linkUrl}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Impressions</p>
                      <p className="font-bold text-gray-900">{ad.impressions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Clicks</p>
                      <p className="font-bold text-gray-900">{ad.clicks.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Click Rate</p>
                      <p className="font-bold text-green-600">{ad.clickRate.toFixed(2)}%</p>
                    </div>
                  </div>

                  {/* Budget & Timeline */}
                  <div className="space-y-2 mb-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Budget:</span>
                      <span className="font-semibold text-gray-900">{ad.budget.toLocaleString()} points</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Spent:</span>
                      <span className="font-semibold text-blue-600">{ad.spent.toLocaleString()} points</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium text-gray-900">{ad.startDate} to {ad.endDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Target Audience:</span>
                      <Badge variant="outline">{ad.targetAudience}</Badge>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={ad.status === 'active' ? 'default' : 'outline'}
                      className={`flex-1 gap-1 ${
                        ad.status === 'active' 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : ''
                      }`}
                      onClick={() => toggleAdStatus(ad.id)}
                    >
                      <Power className="size-3" />
                      {ad.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 gap-1"
                      onClick={() => handleEditAd(ad)}
                    >
                      <Edit className="size-3" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 gap-1 text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleDeleteAd(ad)}
                    >
                      <Trash2 className="size-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Advertisement</DialogTitle>
            <DialogDescription>Create a new ad campaign</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Ad Name *</Label>
                <Input
                  value={newAd.name}
                  onChange={(e) => setNewAd({ ...newAd, name: e.target.value })}
                  placeholder="e.g., Spring Eco Event"
                />
              </div>

              <div className="col-span-2">
                <Label>Ad Description *</Label>
                <Textarea
                  value={newAd.description}
                  onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
                  placeholder="Brief description of the ad content"
                  rows={2}
                />
              </div>

              <div className="col-span-2">
                <Label>Image URL</Label>
                <Input
                  value={newAd.imageUrl}
                  onChange={(e) => setNewAd({ ...newAd, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="col-span-2">
                <Label>Link URL</Label>
                <Input
                  value={newAd.linkUrl}
                  onChange={(e) => setNewAd({ ...newAd, linkUrl: e.target.value })}
                  placeholder="https://example.com/page"
                />
              </div>

              <div>
                <Label>Display Position *</Label>
                <Select 
                  value={newAd.position} 
                  onValueChange={(value) => setNewAd({ ...newAd, position: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="banner">Banner</SelectItem>
                    <SelectItem value="sidebar">Sidebar</SelectItem>
                    <SelectItem value="popup">Popup</SelectItem>
                    <SelectItem value="feed">Feed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Ad Status *</Label>
                <Select 
                  value={newAd.status} 
                  onValueChange={(value) => setNewAd({ ...newAd, status: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Start Date *</Label>
                <Input
                  type="date"
                  value={newAd.startDate}
                  onChange={(e) => setNewAd({ ...newAd, startDate: e.target.value })}
                />
              </div>

              <div>
                <Label>End Date *</Label>
                <Input
                  type="date"
                  value={newAd.endDate}
                  onChange={(e) => setNewAd({ ...newAd, endDate: e.target.value })}
                />
              </div>

              <div>
                <Label>Budget (points) *</Label>
                <Input
                  type="number"
                  value={newAd.budget}
                  onChange={(e) => setNewAd({ ...newAd, budget: parseInt(e.target.value) || 0 })}
                  placeholder="50000"
                />
              </div>

              <div>
                <Label>Target Audience *</Label>
                <Select 
                  value={newAd.targetAudience} 
                  onValueChange={(value) => setNewAd({ ...newAd, targetAudience: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Users">All Users</SelectItem>
                    <SelectItem value="Regular Users">Regular Users</SelectItem>
                    <SelectItem value="VIP Users">VIP Users</SelectItem>
                    <SelectItem value="Active Users">Active Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAd} className="bg-blue-600 hover:bg-blue-700">
              Create Ad
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Advertisement</DialogTitle>
            <DialogDescription>Modify ad information and settings</DialogDescription>
          </DialogHeader>
          
          {editingAd && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>Ad Name</Label>
                  <Input
                    value={editingAd.name}
                    onChange={(e) => setEditingAd({ ...editingAd, name: e.target.value })}
                  />
                </div>

                <div className="col-span-2">
                  <Label>Ad Description</Label>
                  <Textarea
                    value={editingAd.description}
                    onChange={(e) => setEditingAd({ ...editingAd, description: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="col-span-2">
                  <Label>Image URL</Label>
                  <Input
                    value={editingAd.imageUrl}
                    onChange={(e) => setEditingAd({ ...editingAd, imageUrl: e.target.value })}
                  />
                </div>

                <div className="col-span-2">
                  <Label>Link URL</Label>
                  <Input
                    value={editingAd.linkUrl}
                    onChange={(e) => setEditingAd({ ...editingAd, linkUrl: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Display Position</Label>
                  <Select 
                    value={editingAd.position} 
                    onValueChange={(value: any) => setEditingAd({ ...editingAd, position: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="banner">Banner</SelectItem>
                      <SelectItem value="sidebar">Sidebar</SelectItem>
                      <SelectItem value="popup">Popup</SelectItem>
                      <SelectItem value="feed">Feed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Ad Status</Label>
                  <Select 
                    value={editingAd.status} 
                    onValueChange={(value: any) => setEditingAd({ ...editingAd, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={editingAd.startDate}
                    onChange={(e) => setEditingAd({ ...editingAd, startDate: e.target.value })}
                  />
                </div>

                <div>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={editingAd.endDate}
                    onChange={(e) => setEditingAd({ ...editingAd, endDate: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Budget (points)</Label>
                  <Input
                    type="number"
                    value={editingAd.budget}
                    onChange={(e) => setEditingAd({ ...editingAd, budget: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div>
                  <Label>Target Audience</Label>
                  <Select 
                    value={editingAd.targetAudience} 
                    onValueChange={(value) => setEditingAd({ ...editingAd, targetAudience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Users">All Users</SelectItem>
                      <SelectItem value="Regular Users">Regular Users</SelectItem>
                      <SelectItem value="VIP Users">VIP Users</SelectItem>
                      <SelectItem value="Active Users">Active Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="size-5" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this advertisement? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {adToDelete && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-900">{adToDelete.name}</p>
              <p className="text-xs text-gray-600 mt-1">{adToDelete.description}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
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
