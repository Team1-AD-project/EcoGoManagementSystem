import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
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
  Award,
  Edit,
  Trophy,
  Crown,
  Leaf,
  Footprints,
  Star,
  Zap,
  Heart,
  Shield,
  Flame,
  Users,
  Medal,
  Sparkles,
  Mountain,
  Dog,
  Cat,
  Shirt,
  CircleDot,
  Candy,
  Palette
} from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

type AcquisitionMethod = 'purchase' | 'achievement' | 'task' | 'vip' | 'event' | 'free';

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  acquisitionMethod: AcquisitionMethod;
  price: number;
  requirementDescription: string;
  ownedBy: number;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface PetAccessory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: 'hat' | 'clothing' | 'accessory' | 'background' | 'effect';
  acquisitionMethod: AcquisitionMethod;
  price: number;
  requirementDescription: string;
  ownedBy: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  compatiblePets: string[];
}

export function CollectiblesManagement() {
  const [badges, setBadges] = useState<BadgeItem[]>([
    {
      id: 'B001',
      name: 'Eco Beginner',
      description: 'First-time walker badge for completing your first walk',
      icon: <Footprints className="size-8 text-green-600" />,
      acquisitionMethod: 'free',
      price: 0,
      requirementDescription: 'Complete your first walk',
      ownedBy: 2456,
      category: 'Starter Badges',
      rarity: 'common'
    },
    {
      id: 'B002',
      name: 'Walking Master',
      description: 'Achievement badge for reaching 100,000 steps',
      icon: <Footprints className="size-8 text-blue-600" />,
      acquisitionMethod: 'achievement',
      price: 0,
      requirementDescription: 'Accumulate 100,000 steps',
      ownedBy: 1234,
      category: 'Achievement Badges',
      rarity: 'rare'
    },
    {
      id: 'B003',
      name: 'Gold Member',
      description: 'Exclusive prestigious badge for VIP members',
      icon: <Crown className="size-8 text-yellow-600" />,
      acquisitionMethod: 'vip',
      price: 0,
      requirementDescription: 'Automatically awarded to VIP members',
      ownedBy: 856,
      category: 'VIP Badges',
      rarity: 'epic'
    },
    {
      id: 'B004',
      name: 'Green Guardian',
      description: 'Environmental badge for tree planting participation',
      icon: <Leaf className="size-8 text-green-500" />,
      acquisitionMethod: 'task',
      price: 0,
      requirementDescription: 'Participate in at least one tree planting event',
      ownedBy: 567,
      category: 'Event Badges',
      rarity: 'rare'
    },
    {
      id: 'B005',
      name: 'Stellar Badge',
      description: 'Limited edition premium badge, purchasable with points',
      icon: <Star className="size-8 text-purple-600" />,
      acquisitionMethod: 'purchase',
      price: 500,
      requirementDescription: 'Purchase for 500 points',
      ownedBy: 432,
      category: 'Store Badges',
      rarity: 'rare'
    },
    {
      id: 'B006',
      name: 'Lightning Warrior',
      description: 'Perseverance badge for 7-day check-in streak',
      icon: <Zap className="size-8 text-yellow-500" />,
      acquisitionMethod: 'achievement',
      price: 0,
      requirementDescription: 'Complete walk tasks for 7 consecutive days',
      ownedBy: 789,
      category: 'Achievement Badges',
      rarity: 'rare'
    },
    {
      id: 'B007',
      name: 'Heartfelt Messenger',
      description: 'Charity badge for donating points to charity projects',
      icon: <Heart className="size-8 text-red-500" />,
      acquisitionMethod: 'task',
      price: 0,
      requirementDescription: 'Donate at least 1000 points',
      ownedBy: 345,
      category: 'Charity Badges',
      rarity: 'epic'
    },
    {
      id: 'B008',
      name: 'Diamond Shield',
      description: 'Top-tier badge exclusive to advanced VIP members',
      icon: <Shield className="size-8 text-blue-400" />,
      acquisitionMethod: 'vip',
      price: 0,
      requirementDescription: 'Exclusive to annual VIP members',
      ownedBy: 234,
      category: 'VIP Badges',
      rarity: 'legendary'
    },
    {
      id: 'B009',
      name: 'Passionate Flame',
      description: 'Limited edition event badge',
      icon: <Flame className="size-8 text-orange-500" />,
      acquisitionMethod: 'event',
      price: 0,
      requirementDescription: 'Participate in the 2026 Spring Special Event',
      ownedBy: 678,
      category: 'Event Badges',
      rarity: 'epic'
    },
    {
      id: 'B010',
      name: 'Social Master',
      description: 'Promotion badge for inviting 10 friends to join',
      icon: <Users className="size-8 text-indigo-600" />,
      acquisitionMethod: 'achievement',
      price: 0,
      requirementDescription: 'Successfully invite 10 friends to register',
      ownedBy: 456,
      category: 'Achievement Badges',
      rarity: 'rare'
    },
    {
      id: 'B011',
      name: 'Glory Medal',
      description: 'Luxury badge, limited release in the point store',
      icon: <Medal className="size-8 text-amber-600" />,
      acquisitionMethod: 'purchase',
      price: 1200,
      requirementDescription: 'Purchase for 1200 points',
      ownedBy: 198,
      category: 'Store Badges',
      rarity: 'epic'
    },
    {
      id: 'B012',
      name: 'Shimmering Star',
      description: 'Top collection badge, premium exclusive',
      icon: <Sparkles className="size-8 text-pink-500" />,
      acquisitionMethod: 'purchase',
      price: 2000,
      requirementDescription: 'Purchase for 2000 points',
      ownedBy: 89,
      category: 'Store Badges',
      rarity: 'legendary'
    },
    {
      id: 'B013',
      name: 'Peak Climber',
      description: 'Achievement badge for completing annual walk goals',
      icon: <Mountain className="size-8 text-gray-700" />,
      acquisitionMethod: 'achievement',
      price: 0,
      requirementDescription: 'Accumulate 5 million steps annually',
      ownedBy: 123,
      category: 'Achievement Badges',
      rarity: 'legendary'
    },
    {
      id: 'B014',
      name: 'Champion Trophy',
      description: 'Honor badge for ranking first in the leaderboard',
      icon: <Trophy className="size-8 text-yellow-500" />,
      acquisitionMethod: 'achievement',
      price: 0,
      requirementDescription: 'Achieve first place in the monthly leaderboard',
      ownedBy: 45,
      category: 'Competitive Badges',
      rarity: 'legendary'
    },
    {
      id: 'B015',
      name: 'Glory Light',
      description: 'Advanced badge limited to special events',
      icon: <Award className="size-8 text-cyan-500" />,
      acquisitionMethod: 'event',
      price: 0,
      requirementDescription: 'Participate in the anniversary celebration event',
      ownedBy: 567,
      category: 'Event Badges',
      rarity: 'epic'
    }
  ]);

  const [accessories, setAccessories] = useState<PetAccessory[]>([
    {
      id: 'PA001',
      name: 'Red Baseball Cap',
      description: 'Fashionable red baseball cap, making your pet cooler',
      imageUrl: 'https://images.unsplash.com/photo-1647528458336-c0eb575af956?w=400',
      category: 'hat',
      acquisitionMethod: 'purchase',
      price: 300,
      requirementDescription: 'Purchase for 300 points',
      ownedBy: 1234,
      rarity: 'common',
      compatiblePets: ['Dog', 'Cat', 'Rabbit']
    },
    {
      id: 'PA002',
      name: 'Crown Hat',
      description: 'VIP exclusive golden crown, showcasing noble status',
      imageUrl: 'https://images.unsplash.com/photo-1748616789793-b44842f85fa4?w=400',
      category: 'hat',
      acquisitionMethod: 'vip',
      price: 0,
      requirementDescription: 'Exclusive to VIP members',
      ownedBy: 456,
      rarity: 'legendary',
      compatiblePets: ['Dog', 'Cat', 'Rabbit', 'Panda']
    },
    {
      id: 'PA003',
      name: 'Sporty Vest',
      description: 'Comfortable sporty style vest',
      imageUrl: 'https://images.unsplash.com/photo-1633933061665-bdd0f626e59c?w=400',
      category: 'clothing',
      acquisitionMethod: 'purchase',
      price: 500,
      requirementDescription: 'Purchase for 500 points',
      ownedBy: 892,
      rarity: 'common',
      compatiblePets: ['Dog', 'Cat']
    },
    {
      id: 'PA004',
      name: 'Superhero Cape',
      description: 'Cool superhero style cape',
      imageUrl: 'https://images.unsplash.com/photo-1596284274000-7d3eca888e3e?w=400',
      category: 'clothing',
      acquisitionMethod: 'achievement',
      price: 0,
      requirementDescription: 'Complete 100 walk tasks',
      ownedBy: 567,
      rarity: 'epic',
      compatiblePets: ['Dog', 'Cat', 'Rabbit', 'Panda']
    },
    {
      id: 'PA005',
      name: 'Pink Bow',
      description: 'Cute pink bow decoration',
      imageUrl: 'https://images.unsplash.com/photo-1535551393484-1a1907f51759?w=400',
      category: 'accessory',
      acquisitionMethod: 'purchase',
      price: 200,
      requirementDescription: 'Purchase for 200 points',
      ownedBy: 1567,
      rarity: 'common',
      compatiblePets: ['Cat', 'Rabbit']
    },
    {
      id: 'PA006',
      name: 'Star Glasses',
      description: 'Fashionable star-shaped glasses',
      imageUrl: 'https://images.unsplash.com/photo-1760843496434-fc41a23ddec9?w=400',
      category: 'accessory',
      acquisitionMethod: 'purchase',
      price: 400,
      requirementDescription: 'Purchase for 400 points',
      ownedBy: 723,
      rarity: 'rare',
      compatiblePets: ['Dog', 'Cat', 'Rabbit']
    },
    {
      id: 'PA007',
      name: 'Rainbow Background',
      description: 'Luminous rainbow-themed background',
      imageUrl: 'https://images.unsplash.com/photo-1533984649377-c20fc524425b?w=400',
      category: 'background',
      acquisitionMethod: 'purchase',
      price: 600,
      requirementDescription: 'Purchase for 600 points',
      ownedBy: 934,
      rarity: 'rare',
      compatiblePets: ['Dog', 'Cat', 'Rabbit', 'Panda']
    },
    {
      id: 'PA008',
      name: 'Starry Background',
      description: 'VIP exclusive romantic starry background',
      imageUrl: 'https://images.unsplash.com/photo-1641895958846-19dab3471449?w=400',
      category: 'background',
      acquisitionMethod: 'vip',
      price: 0,
      requirementDescription: 'Exclusive to VIP members',
      ownedBy: 345,
      rarity: 'epic',
      compatiblePets: ['Dog', 'Cat', 'Rabbit', 'Panda']
    },
    {
      id: 'PA009',
      name: 'Sparkle Effect',
      description: 'Shimmering special effect',
      imageUrl: 'https://images.unsplash.com/photo-1768326947711-5551d8ea9cf6?w=400',
      category: 'effect',
      acquisitionMethod: 'achievement',
      price: 0,
      requirementDescription: 'Reach top 10 in the monthly step leaderboard',
      ownedBy: 234,
      rarity: 'epic',
      compatiblePets: ['Dog', 'Cat', 'Rabbit', 'Panda']
    },
    {
      id: 'PA010',
      name: 'Heart Effect',
      description: 'Cute effect surrounded by hearts',
      imageUrl: 'https://images.unsplash.com/photo-1548544099-a89e27f73a84?w=400',
      category: 'effect',
      acquisitionMethod: 'event',
      price: 0,
      requirementDescription: 'Obtained by participating in Valentine\'s Day event',
      ownedBy: 678,
      rarity: 'rare',
      compatiblePets: ['Dog', 'Cat', 'Rabbit', 'Panda']
    },
    {
      id: 'PA011',
      name: 'Santa Hat',
      description: 'Cute Santa hat limited to festivals',
      imageUrl: 'https://images.unsplash.com/photo-1608492194133-2773feac8af0?w=400',
      category: 'hat',
      acquisitionMethod: 'event',
      price: 0,
      requirementDescription: 'Obtained by participating in Christmas event',
      ownedBy: 1123,
      rarity: 'rare',
      compatiblePets: ['Dog', 'Cat', 'Rabbit', 'Panda']
    },
    {
      id: 'PA012',
      name: 'Diamond Necklace',
      description: 'Luxurious diamond necklace accessory',
      imageUrl: 'https://images.unsplash.com/photo-1624929090883-3d2f7874a019?w=400',
      category: 'accessory',
      acquisitionMethod: 'purchase',
      price: 1500,
      requirementDescription: 'Purchase for 1500 points',
      ownedBy: 156,
      rarity: 'legendary',
      compatiblePets: ['Dog', 'Cat', 'Rabbit']
    }
  ]);

  const [editingBadge, setEditingBadge] = useState<BadgeItem | null>(null);
  const [editingAccessory, setEditingAccessory] = useState<PetAccessory | null>(null);
  const [isBadgeEditOpen, setIsBadgeEditOpen] = useState(false);
  const [isAccessoryEditOpen, setIsAccessoryEditOpen] = useState(false);
  const [filterMethod, setFilterMethod] = useState<string>('all');
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const handleEditBadge = (badge: BadgeItem) => {
    setEditingBadge({ ...badge });
    setIsBadgeEditOpen(true);
  };

  const handleSaveBadgeEdit = () => {
    if (editingBadge) {
      setBadges(badges.map(b => b.id === editingBadge.id ? editingBadge : b));
      setIsBadgeEditOpen(false);
      setEditingBadge(null);
    }
  };

  const handleEditAccessory = (accessory: PetAccessory) => {
    setEditingAccessory({ ...accessory });
    setIsAccessoryEditOpen(true);
  };

  const handleSaveAccessoryEdit = () => {
    if (editingAccessory) {
      setAccessories(accessories.map(a => a.id === editingAccessory.id ? editingAccessory : a));
      setIsAccessoryEditOpen(false);
      setEditingAccessory(null);
    }
  };

  const getMethodBadge = (method: AcquisitionMethod) => {
    switch (method) {
      case 'purchase':
        return <Badge className="bg-blue-100 text-blue-700">Points Purchase</Badge>;
      case 'achievement':
        return <Badge className="bg-green-100 text-green-700">Achievement Unlock</Badge>;
      case 'task':
        return <Badge className="bg-orange-100 text-orange-700">Task Reward</Badge>;
      case 'vip':
        return <Badge className="bg-purple-100 text-purple-700">VIP Exclusive</Badge>;
      case 'event':
        return <Badge className="bg-pink-100 text-pink-700">Event Limited</Badge>;
      case 'free':
        return <Badge className="bg-gray-100 text-gray-700">Free</Badge>;
      default:
        return null;
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return <Badge variant="outline" className="border-gray-400 text-gray-700">Common</Badge>;
      case 'rare':
        return <Badge variant="outline" className="border-blue-400 text-blue-700">Rare</Badge>;
      case 'epic':
        return <Badge variant="outline" className="border-purple-400 text-purple-700">Epic</Badge>;
      case 'legendary':
        return <Badge variant="outline" className="border-yellow-400 text-yellow-700">Legendary</Badge>;
      default:
        return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hat':
        return <Crown className="size-4" />;
      case 'clothing':
        return <Shirt className="size-4" />;
      case 'accessory':
        return <CircleDot className="size-4" />;
      case 'background':
        return <Palette className="size-4" />;
      case 'effect':
        return <Sparkles className="size-4" />;
      default:
        return null;
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      hat: 'Hat',
      clothing: 'Clothing',
      accessory: 'Accessory',
      background: 'Background',
      effect: 'Effect'
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getMethodLabel = (method: AcquisitionMethod) => {
    const labels = {
      purchase: 'Points Purchase',
      achievement: 'Achievement Unlock',
      task: 'Task Reward',
      vip: 'VIP Exclusive',
      event: 'Event Limited',
      free: 'Free'
    };
    return labels[method];
  };

  const filteredBadges = badges.filter(badge => {
    const methodMatch = filterMethod === 'all' || badge.acquisitionMethod === filterMethod;
    const rarityMatch = filterRarity === 'all' || badge.rarity === filterRarity;
    return methodMatch && rarityMatch;
  });

  const filteredAccessories = accessories.filter(accessory => {
    const methodMatch = filterMethod === 'all' || accessory.acquisitionMethod === filterMethod;
    const rarityMatch = filterRarity === 'all' || accessory.rarity === filterRarity;
    const categoryMatch = filterCategory === 'all' || accessory.category === filterCategory;
    return methodMatch && rarityMatch && categoryMatch;
  });

  const totalBadges = badges.length;
  const totalAccessories = accessories.length;
  const badgeOwners = badges.reduce((sum, b) => sum + b.ownedBy, 0);
  const accessoryOwners = accessories.reduce((sum, a) => sum + a.ownedBy, 0);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-6 bg-white border-b">
        <h2 className="text-2xl font-bold text-gray-900">Collectibles Management</h2>
        <p className="text-gray-600 mt-1">Manage badges and pet accessory system</p>
      </div>

      {/* Statistics Cards */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between mb-2">
            <Award className="size-8" />
          </div>
          <p className="text-sm opacity-90 mb-1">Total Badges</p>
          <p className="text-3xl font-bold">{totalBadges}</p>
          <p className="text-xs opacity-75 mt-1">Total Ownership: {badgeOwners.toLocaleString()}</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between mb-2">
            <Dog className="size-8" />
          </div>
          <p className="text-sm opacity-90 mb-1">Total Pet Accessories</p>
          <p className="text-3xl font-bold">{totalAccessories}</p>
          <p className="text-xs opacity-75 mt-1">Total Ownership: {accessoryOwners.toLocaleString()}</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="size-8" />
          </div>
          <p className="text-sm opacity-90 mb-1">Purchasable Badges</p>
          <p className="text-3xl font-bold">{badges.filter(b => b.acquisitionMethod === 'purchase').length}</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-pink-500 to-pink-600 text-white">
          <div className="flex items-center justify-between mb-2">
            <Sparkles className="size-8" />
          </div>
          <p className="text-sm opacity-90 mb-1">Purchasable Accessories</p>
          <p className="text-3xl font-bold">{accessories.filter(a => a.acquisitionMethod === 'purchase').length}</p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-hidden px-6 pb-6">
        <Tabs defaultValue="badges" className="h-full flex flex-col">
          <TabsList className="bg-white border w-fit">
            <TabsTrigger value="badges" className="gap-2">
              <Award className="size-4" />
              Badge Management
            </TabsTrigger>
            <TabsTrigger value="accessories" className="gap-2">
              <Dog className="size-4" />
              Pet Accessory Management
            </TabsTrigger>
          </TabsList>

          {/* Badges Tab */}
          <TabsContent value="badges" className="flex-1 overflow-hidden mt-4 data-[state=active]:flex data-[state=active]:flex-col">
            {/* Filters */}
            <Card className="p-4 mb-4 flex-shrink-0">
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[200px]">
                  <Label>Acquisition Method</Label>
                  <Select value={filterMethod} onValueChange={setFilterMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Methods</SelectItem>
                      <SelectItem value="purchase">Points Purchase</SelectItem>
                      <SelectItem value="achievement">Achievement Unlock</SelectItem>
                      <SelectItem value="task">Task Reward</SelectItem>
                      <SelectItem value="vip">VIP Exclusive</SelectItem>
                      <SelectItem value="event">Event Limited</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1 min-w-[200px]">
                  <Label>Rarity</Label>
                  <Select value={filterRarity} onValueChange={setFilterRarity}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Rarities</SelectItem>
                      <SelectItem value="common">Common</SelectItem>
                      <SelectItem value="rare">Rare</SelectItem>
                      <SelectItem value="epic">Epic</SelectItem>
                      <SelectItem value="legendary">Legendary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                  <Award className="size-4" />
                  Add Badge
                </Button>
              </div>
            </Card>

            {/* Badges Grid */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredBadges.map((badge) => (
                  <Card key={badge.id} className="p-5 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-center mb-4">
                      <div className={`p-4 rounded-full ${
                        badge.rarity === 'legendary' ? 'bg-gradient-to-br from-yellow-100 to-yellow-200' :
                        badge.rarity === 'epic' ? 'bg-gradient-to-br from-purple-100 to-purple-200' :
                        badge.rarity === 'rare' ? 'bg-gradient-to-br from-blue-100 to-blue-200' :
                        'bg-gray-100'
                      }`}>
                        {badge.icon}
                      </div>
                    </div>

                    <div className="text-center mb-3">
                      <h3 className="font-bold text-gray-900 mb-1">{badge.name}</h3>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        {getRarityBadge(badge.rarity)}
                        {getMethodBadge(badge.acquisitionMethod)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {badge.description}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {badge.category}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm">
                        <p className="text-gray-600 mb-1">Requirement:</p>
                        <p className="font-medium text-gray-900">{badge.requirementDescription}</p>
                      </div>
                      
                      {badge.acquisitionMethod === 'purchase' && (
                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-sm text-gray-600">Price:</span>
                          <span className="font-bold text-blue-600">{badge.price} points</span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">Owners:</span>
                        <span className="font-semibold text-gray-900">{badge.ownedBy}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full gap-2"
                      variant="outline"
                      onClick={() => handleEditBadge(badge)}
                    >
                      <Edit className="size-4" />
                      Edit Settings
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Pet Accessories Tab */}
          <TabsContent value="accessories" className="flex-1 overflow-hidden mt-4 data-[state=active]:flex data-[state=active]:flex-col">
            {/* Filters */}
            <Card className="p-4 mb-4 flex-shrink-0">
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[180px]">
                  <Label>Category</Label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="hat">Hat</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="accessory">Accessory</SelectItem>
                      <SelectItem value="background">Background</SelectItem>
                      <SelectItem value="effect">Effect</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1 min-w-[180px]">
                  <Label>Acquisition Method</Label>
                  <Select value={filterMethod} onValueChange={setFilterMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Methods</SelectItem>
                      <SelectItem value="purchase">Points Purchase</SelectItem>
                      <SelectItem value="achievement">Achievement Unlock</SelectItem>
                      <SelectItem value="task">Task Reward</SelectItem>
                      <SelectItem value="vip">VIP Exclusive</SelectItem>
                      <SelectItem value="event">Event Limited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1 min-w-[180px]">
                  <Label>Rarity</Label>
                  <Select value={filterRarity} onValueChange={setFilterRarity}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Rarities</SelectItem>
                      <SelectItem value="common">Common</SelectItem>
                      <SelectItem value="rare">Rare</SelectItem>
                      <SelectItem value="epic">Epic</SelectItem>
                      <SelectItem value="legendary">Legendary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
                  <Dog className="size-4" />
                  Add Accessory
                </Button>
              </div>
            </Card>

            {/* Accessories Grid */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredAccessories.map((accessory) => (
                  <Card key={accessory.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 bg-gray-100">
                      <ImageWithFallback
                        src={accessory.imageUrl}
                        alt={accessory.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        {getRarityBadge(accessory.rarity)}
                      </div>
                      <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                        {getCategoryIcon(accessory.category)}
                        <span className="text-xs font-medium">{getCategoryLabel(accessory.category)}</span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2">{accessory.name}</h3>
                      <div className="mb-3">
                        {getMethodBadge(accessory.acquisitionMethod)}
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {accessory.description}
                      </p>

                      <div className="space-y-2 mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm">
                          <p className="text-gray-600 mb-1">Requirement:</p>
                          <p className="font-medium text-gray-900">{accessory.requirementDescription}</p>
                        </div>
                        
                        {accessory.acquisitionMethod === 'purchase' && (
                          <div className="flex items-center justify-between pt-2 border-t">
                            <span className="text-sm text-gray-600">Price:</span>
                            <span className="font-bold text-blue-600">{accessory.price} points</span>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-sm text-gray-600">Owners:</span>
                          <span className="font-semibold text-gray-900">{accessory.ownedBy}</span>
                        </div>

                        <div className="pt-2 border-t">
                          <p className="text-xs text-gray-600 mb-1">Compatible Pets:</p>
                          <div className="flex flex-wrap gap-1">
                            {accessory.compatiblePets.map((pet, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {pet}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button
                        className="w-full gap-2"
                        variant="outline"
                        onClick={() => handleEditAccessory(accessory)}
                      >
                        <Edit className="size-4" />
                        Edit Settings
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Badge Edit Dialog */}
      <Dialog open={isBadgeEditOpen} onOpenChange={setIsBadgeEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Badge</DialogTitle>
            <DialogDescription>
              Update badge information and settings
            </DialogDescription>
          </DialogHeader>
          {editingBadge && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="badge-name">Badge Name</Label>
                <Input
                  id="badge-name"
                  value={editingBadge.name}
                  onChange={(e) => setEditingBadge({ ...editingBadge, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="badge-description">Description</Label>
                <Textarea
                  id="badge-description"
                  value={editingBadge.description}
                  onChange={(e) => setEditingBadge({ ...editingBadge, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="badge-price">Price (points)</Label>
                  <Input
                    id="badge-price"
                    type="number"
                    value={editingBadge.price}
                    onChange={(e) => setEditingBadge({ ...editingBadge, price: parseInt(e.target.value) })}
                    disabled={editingBadge.acquisitionMethod !== 'purchase'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="badge-category">Category</Label>
                  <Input
                    id="badge-category"
                    value={editingBadge.category}
                    onChange={(e) => setEditingBadge({ ...editingBadge, category: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBadgeEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveBadgeEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Accessory Edit Dialog */}
      <Dialog open={isAccessoryEditOpen} onOpenChange={setIsAccessoryEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Pet Accessory</DialogTitle>
            <DialogDescription>
              Update accessory information and settings
            </DialogDescription>
          </DialogHeader>
          {editingAccessory && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="accessory-name">Accessory Name</Label>
                <Input
                  id="accessory-name"
                  value={editingAccessory.name}
                  onChange={(e) => setEditingAccessory({ ...editingAccessory, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accessory-description">Description</Label>
                <Textarea
                  id="accessory-description"
                  value={editingAccessory.description}
                  onChange={(e) => setEditingAccessory({ ...editingAccessory, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accessory-price">Price (points)</Label>
                  <Input
                    id="accessory-price"
                    type="number"
                    value={editingAccessory.price}
                    onChange={(e) => setEditingAccessory({ ...editingAccessory, price: parseInt(e.target.value) })}
                    disabled={editingAccessory.acquisitionMethod !== 'purchase'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accessory-category">Category</Label>
                  <Select
                    value={editingAccessory.category}
                    onValueChange={(value: any) => setEditingAccessory({ ...editingAccessory, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hat">Hat</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="accessory">Accessory</SelectItem>
                      <SelectItem value="background">Background</SelectItem>
                      <SelectItem value="effect">Effect</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAccessoryEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAccessoryEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
