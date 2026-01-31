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
  Crown,
  Package,
  Edit,
  Trash2,
  Plus,
  TrendingUp,
  ShoppingBag,
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  isVIP: boolean;
  imageUrl: string;
  sold: number;
  status: 'available' | 'low-stock' | 'out-of-stock';
}

export function RewardStoreManagement() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'P001',
      name: 'Eco Water Bottle',
      description: 'Reusable stainless steel insulated bottle, reduces single-use plastic',
      price: 800,
      stock: 50,
      category: 'Lifestyle',
      isVIP: false,
      imageUrl: 'https://images.unsplash.com/photo-1602143407264-cf6d6c7e6d0f?w=400',
      sold: 125,
      status: 'available'
    },
    {
      id: 'P002',
      name: 'Smart Fitness Band',
      description: 'VIP Exclusive - Activity tracker with multiple sport modes',
      price: 3000,
      stock: 5,
      category: 'Electronics',
      isVIP: true,
      imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400',
      sold: 45,
      status: 'low-stock'
    },
    {
      id: 'P003',
      name: 'Custom T-Shirt',
      description: '100% organic cotton eco-friendly tee with environmental theme',
      price: 600,
      stock: 80,
      category: 'Apparel',
      isVIP: false,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      sold: 210,
      status: 'available'
    },
    {
      id: 'P004',
      name: 'Bamboo Cutlery Set',
      description: 'Portable bamboo utensils with carrying case',
      price: 400,
      stock: 0,
      category: 'Lifestyle',
      isVIP: false,
      imageUrl: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=400',
      sold: 185,
      status: 'out-of-stock'
    },
    {
      id: 'P005',
      name: 'Wireless Earbuds',
      description: 'VIP Exclusive - Premium noise-cancelling wireless earbuds',
      price: 4500,
      stock: 15,
      category: 'Electronics',
      isVIP: true,
      imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',
      sold: 32,
      status: 'available'
    },
    {
      id: 'P006',
      name: 'Yoga Mat',
      description: 'Non-slip eco-friendly yoga mat with carrying strap',
      price: 1200,
      stock: 8,
      category: 'Sports',
      isVIP: false,
      imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
      sold: 95,
      status: 'low-stock'
    },
    {
      id: 'P007',
      name: 'Backpack',
      description: 'Durable recycled material backpack with laptop compartment',
      price: 1800,
      stock: 25,
      category: 'Accessories',
      isVIP: false,
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      sold: 78,
      status: 'available'
    },
    {
      id: 'P008',
      name: 'Coffee Voucher',
      description: 'Starbucks $10 gift card redeemable at any location',
      price: 500,
      stock: 150,
      category: 'Food & Beverage',
      isVIP: false,
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      sold: 420,
      status: 'available'
    }
  ]);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const handleEdit = (product: Product) => {
    setSelectedProduct({ ...product });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (selectedProduct) {
      setProducts(products.map(p => 
        p.id === selectedProduct.id ? selectedProduct : p
      ));
      setIsEditDialogOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedProduct) {
      setProducts(products.filter(p => p.id !== selectedProduct.id));
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
    }
  };

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = filterCategory === 'all' 
    ? products 
    : products.filter(p => p.category === filterCategory);

  const totalProducts = products.length;
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.sold), 0);
  const lowStockProducts = products.filter(p => p.status === 'low-stock' || p.status === 'out-of-stock').length;
  const totalSold = products.reduce((sum, p) => sum + p.sold, 0);

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700';
      case 'low-stock': return 'bg-orange-100 text-orange-700';
      case 'out-of-stock': return 'bg-red-100 text-red-700';
    }
  };

  const getStatusLabel = (status: Product['status']) => {
    switch (status) {
      case 'available': return 'In Stock';
      case 'low-stock': return 'Low Stock';
      case 'out-of-stock': return 'Out of Stock';
    }
  };

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="p-6 bg-white border-b">
        <h2 className="text-2xl font-bold text-gray-900">Reward Store Management</h2>
        <p className="text-gray-600 mt-1">Manage product inventory, prices, and categories</p>
      </div>

      {/* Statistics */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Package className="size-8" />
            </div>
            <p className="text-sm opacity-90 mb-1">Total Products</p>
            <p className="text-3xl font-bold">{totalProducts}</p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingBag className="size-8" />
            </div>
            <p className="text-sm opacity-90 mb-1">Total Sold</p>
            <p className="text-3xl font-bold">{totalSold}</p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="size-8" />
            </div>
            <p className="text-sm opacity-90 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold">{totalRevenue.toLocaleString()}</p>
            <p className="text-xs opacity-75 mt-1">points</p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="size-8" />
            </div>
            <p className="text-sm opacity-90 mb-1">Low Stock Alert</p>
            <p className="text-3xl font-bold">{lowStockProducts}</p>
            <p className="text-xs opacity-75 mt-1">items need restocking</p>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Label>Category:</Label>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="gap-2">
            <Plus className="size-4" />
            Add Product
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-100">
                <ImageWithFallback
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isVIP && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-purple-600 text-white">
                      <Crown className="size-3 mr-1" />
                      VIP Only
                    </Badge>
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <Badge className={getStatusColor(product.status)}>
                    {getStatusLabel(product.status)}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-semibold text-blue-600">{product.price} pts</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Stock:</span>
                    <span className="font-medium">{product.stock}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Sold:</span>
                    <span className="font-medium text-green-600">{product.sold}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Category:</span>
                    <Badge variant="outline" className="text-xs">{product.category}</Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="size-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteClick(product)}
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update product information and settings
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={selectedProduct.name}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={selectedProduct.category}
                    onValueChange={(value) => setSelectedProduct({ ...selectedProduct, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Apparel">Apparel</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                      <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={selectedProduct.description}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (points)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={selectedProduct.price}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, price: parseInt(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={selectedProduct.stock}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="vip"
                  checked={selectedProduct.isVIP}
                  onCheckedChange={(checked) => setSelectedProduct({ ...selectedProduct, isVIP: checked })}
                />
                <Label htmlFor="vip">VIP Exclusive Product</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <span className="font-semibold text-gray-900">{selectedProduct?.name}</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
