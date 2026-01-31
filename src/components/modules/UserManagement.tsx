import { useState } from 'react';
import { Search, Edit, Trash2, UserX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface User {
  id: string;
  username: string;
  email: string;
  userType: 'Normal' | 'VIP';
  status: 'Active' | 'Inactive';
  registeredDate: string;
  lastLogin: string;
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 'U001',
      username: 'John Smith',
      email: 'john.smith@example.com',
      userType: 'VIP',
      status: 'Active',
      registeredDate: '2024-01-15',
      lastLogin: '2026-01-24 10:30'
    },
    {
      id: 'U002',
      username: 'Emily Johnson',
      email: 'emily.j@example.com',
      userType: 'Normal',
      status: 'Active',
      registeredDate: '2024-02-20',
      lastLogin: '2026-01-24 09:15'
    },
    {
      id: 'U003',
      username: 'Michael Brown',
      email: 'michael.b@example.com',
      userType: 'VIP',
      status: 'Active',
      registeredDate: '2024-03-10',
      lastLogin: '2026-01-23 18:45'
    },
    {
      id: 'U004',
      username: 'Sarah Davis',
      email: 'sarah.davis@example.com',
      userType: 'Normal',
      status: 'Active',
      registeredDate: '2024-04-05',
      lastLogin: '2026-01-23 14:20'
    },
    {
      id: 'U005',
      username: 'David Wilson',
      email: 'david.w@example.com',
      userType: 'Normal',
      status: 'Inactive',
      registeredDate: '2024-05-12',
      lastLogin: '2026-01-20 11:30'
    },
    {
      id: 'U006',
      username: 'Jessica Martinez',
      email: 'jessica.m@example.com',
      userType: 'VIP',
      status: 'Active',
      registeredDate: '2024-06-18',
      lastLogin: '2026-01-24 08:00'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
  const [userToDeactivate, setUserToDeactivate] = useState<User | null>(null);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (user: User) => {
    setEditingUser({ ...user });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id ? editingUser : user
      ));
      setIsEditDialogOpen(false);
      setEditingUser(null);
    }
  };

  const handleDeactivateClick = (user: User) => {
    setUserToDeactivate(user);
    setIsDeactivateDialogOpen(true);
  };

  const handleDeactivateConfirm = () => {
    if (userToDeactivate) {
      setUsers(users.map(user =>
        user.id === userToDeactivate.id
          ? { ...user, status: 'Inactive' as const }
          : user
      ));
      setIsDeactivateDialogOpen(false);
      setUserToDeactivate(null);
    }
  };

  const normalUserCount = users.filter(u => u.userType === 'Normal').length;
  const vipUserCount = users.filter(u => u.userType === 'VIP').length;
  const activeUserCount = users.filter(u => u.status === 'Active').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <p className="text-gray-600 mt-1">Manage system user accounts and permissions</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{users.length}</p>
              </div>
              <div className="size-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <span className="text-2xl text-blue-600">👥</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Normal Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{normalUserCount}</p>
              </div>
              <div className="size-12 bg-green-50 rounded-lg flex items-center justify-center">
                <span className="text-2xl text-green-600">👤</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">VIP Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{vipUserCount}</p>
              </div>
              <div className="size-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <span className="text-2xl text-purple-600">👑</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">User List</CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">User ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Username</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">User Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Registered Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Last Login</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{user.id}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{user.username}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge className={user.userType === 'VIP' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}>
                        {user.userType}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{user.registeredDate}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{user.lastLogin}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(user)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit className="size-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeactivateClick(user)}
                          disabled={user.status === 'Inactive'}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 disabled:opacity-50"
                        >
                          <UserX className="size-4 mr-1" />
                          Deactivate
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit User Information</DialogTitle>
            <DialogDescription>
              Update user account information and permission settings
            </DialogDescription>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={editingUser.username}
                  onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userType">User Type</Label>
                <Select
                  value={editingUser.userType}
                  onValueChange={(value: 'Normal' | 'VIP') => setEditingUser({ ...editingUser, userType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Normal">Normal User</SelectItem>
                    <SelectItem value="VIP">VIP User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={editingUser.status}
                  onValueChange={(value: 'Active' | 'Inactive') => setEditingUser({ ...editingUser, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
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

      {/* Deactivate User Confirmation Dialog */}
      <Dialog open={isDeactivateDialogOpen} onOpenChange={setIsDeactivateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Account Deactivation</DialogTitle>
            <DialogDescription>
              Are you sure you want to deactivate user <span className="font-semibold text-gray-900">{userToDeactivate?.username}</span>?
              This action will prevent the user from logging into the system.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeactivateDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeactivateConfirm}>
              Confirm Deactivation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
