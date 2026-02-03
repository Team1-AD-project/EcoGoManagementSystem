import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  AlertCircle,
  Power,
  Loader2,
  RefreshCw,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  getAllAdvertisements,
  createAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
  updateAdvertisementStatus,
  type Advertisement,
  type Page
} from '@/api/advertisementApi';
import { useDebounce } from '@/hooks/useDebounce';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800';

export function AdManagement() {
  const [adsPage, setAdsPage] = useState<Page<Advertisement> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [adToDelete, setAdToDelete] = useState<Advertisement | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const [newAd, setNewAd] = useState<Partial<Advertisement>>({
    name: '',
    description: '',
    imageUrl: '',
    linkUrl: '',
    position: 'banner',
    status: 'Active',
    startDate: '',
    endDate: '',
  });

  const loadAds = useCallback(async (search: string, page: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllAdvertisements(search, page, 10);
      setAdsPage(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load advertisements');
      console.error('Error loading ads:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAds(debouncedSearchQuery, currentPage);
  }, [debouncedSearchQuery, currentPage, loadAds]);

  const handleEditAd = (ad: Advertisement) => {
    setEditingAd({ ...ad });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (editingAd) {
      try {
        setSaving(true);
        await updateAdvertisement(editingAd.id, editingAd);
        loadAds(debouncedSearchQuery, currentPage); // Reload data
        setIsEditDialogOpen(false);
        setEditingAd(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update advertisement');
      } finally {
        setSaving(false);
      }
    }
  };

  const handleAddAd = async () => {
    try {
      setSaving(true);
      await createAdvertisement({
        name: newAd.name || '',
        description: newAd.description || '',
        status: newAd.status || 'Active',
        startDate: newAd.startDate || '',
        endDate: newAd.endDate || '',
        imageUrl: newAd.imageUrl || DEFAULT_IMAGE,
        linkUrl: newAd.linkUrl || '',
        position: newAd.position || 'banner',
        impressions: 0,
        clicks: 0,
      });

      loadAds(debouncedSearchQuery, 0); // Reload data to the first page
      setCurrentPage(0);
      setIsAddDialogOpen(false);
      setNewAd({
        name: '',
        description: '',
        imageUrl: '',
        linkUrl: '',
        position: 'banner',
        status: 'Active',
        startDate: '',
        endDate: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create advertisement');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAd = (ad: Advertisement) => {
    setAdToDelete(ad);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (adToDelete) {
      try {
        setSaving(true);
        await deleteAdvertisement(adToDelete.id);
        loadAds(debouncedSearchQuery, currentPage);
        setIsDeleteDialogOpen(false);
        setAdToDelete(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete advertisement');
      } finally {
        setSaving(false);
      }
    }
  };

  const toggleAdStatus = async (adId: string) => {
    const ad = adsPage?.content.find(a => a.id === adId);
    if (!ad) return;

    const newStatus = ad.status === 'Active' ? 'Inactive' : 'Active';
    try {
      await updateAdvertisementStatus(adId, newStatus);
      loadAds(debouncedSearchQuery, currentPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-700">Inactive</Badge>;
      case 'paused':
        return <Badge className="bg-yellow-100 text-yellow-700">Paused</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-700">Scheduled</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">{status}</Badge>;
    }
  };

  const getPositionLabel = (position: string | undefined) => {
    const labels: Record<string, string> = {
      banner: 'Banner',
      sidebar: 'Sidebar',
      popup: 'Popup',
      feed: 'Feed'
    };
    return labels[position || 'banner'] || 'Banner';
  };

  const calculateClickRate = (impressions: number, clicks: number): number => {
    if (!impressions || impressions === 0) return 0;
    return (clicks / impressions) * 100;
  };

  const ads = adsPage?.content || [];
  const totalAds = adsPage?.totalElements || 0;

  if (loading && !adsPage) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="size-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading advertisements...</p>
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
            <h2 className="text-2xl font-bold text-gray-900">Advertisement Management</h2>
            <p className="text-gray-600 mt-1">Manage platform ad publishing, editing, and deployment</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => loadAds(debouncedSearchQuery, currentPage)} className="gap-2">
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

      {/* Filters and Actions */}
      <div className="px-6 pt-6 pb-4">
        <Card className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative w-full md:w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="Search by ad name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
            </div>
            <div className="flex-1" />
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
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto pr-2">
            {loading && ads.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Loader2 className="size-8 animate-spin" />
              </div>
            ) : ads.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Megaphone className="size-12 mx-auto mb-4 opacity-50" />
                <p>No advertisements found</p>
                <p className="text-sm mt-1">Click "Add Advertisement" to create one</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {ads.map((ad) => (
                  <Card key={ad.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 bg-gray-100">
                      <img
                        src={ad.imageUrl || DEFAULT_IMAGE}
                        alt={ad.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_IMAGE; }}
                      />
                      <div className="absolute top-2 right-2">{getStatusBadge(ad.status)}</div>
                      <div className="absolute top-2 left-2">
                        <Badge variant="outline" className="bg-white/90">
                          <MapPin className="size-3 mr-1" />
                          {getPositionLabel(ad.position)}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">{ad.name}</h3>
                          <p className="text-sm text-gray-600 mb-2 h-10 overflow-hidden">{ad.description}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="size-3" />
                            <span>{ad.startDate} to {ad.endDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                        <div><p className="text-xs text-gray-600 mb-1">Impressions</p><p className="font-bold text-gray-900">{(ad.impressions || 0).toLocaleString()}</p></div>
                        <div><p className="text-xs text-gray-600 mb-1">Clicks</p><p className="font-bold text-gray-900">{(ad.clicks || 0).toLocaleString()}</p></div>
                        <div><p className="text-xs text-gray-600 mb-1">Click Rate</p><p className="font-bold text-green-600">{calculateClickRate(ad.impressions || 0, ad.clicks || 0).toFixed(2)}%</p></div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant={ad.status.toLowerCase() === 'active' ? 'default' : 'outline'} className={`flex-1 gap-1 ${ad.status.toLowerCase() === 'active' ? 'bg-green-600 hover:bg-green-700' : ''}`} onClick={() => toggleAdStatus(ad.id)}><Power className="size-3" />{ad.status.toLowerCase() === 'active' ? 'Deactivate' : 'Activate'}</Button>
                        <Button size="sm" variant="outline" className="flex-1 gap-1" onClick={() => handleEditAd(ad)}><Edit className="size-3" />Edit</Button>
                        <Button size="sm" variant="outline" className="flex-1 gap-1 text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleDeleteAd(ad)}><Trash2 className="size-3" />Delete</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
          {adsPage && adsPage.totalPages > 1 && (
              <div className="p-4 border-t flex items-center justify-between">
                  <p className="text-sm text-gray-600">Page {adsPage.number + 1} of {adsPage.totalPages} ({totalAds} ads)</p>
                  <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}><ChevronLeft className="size-4" />Previous</Button>
                  <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= adsPage.totalPages - 1}>Next<ChevronRight className="size-4" /></Button>
                  </div>
              </div>
          )}
        </div>
      </div>

      {/* Dialogs: Add, Edit, Delete */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}><DialogContent>...omitted for brevity...</DialogContent></Dialog>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}><DialogContent>...omitted for brevity...</DialogContent></Dialog>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}><DialogContent>...omitted for brevity...</DialogContent></Dialog>
    </div>
  );
}
