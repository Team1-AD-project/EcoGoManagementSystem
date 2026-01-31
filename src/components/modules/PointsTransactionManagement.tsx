import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowUpCircle, ArrowDownCircle, Trophy, ShoppingBag, Award, Footprints } from 'lucide-react';

type TransactionType = 'EARN_WALK' | 'PURCHASE_VIP' | 'PURCHASE_ITEM' | 'PURCHASE_BADGE';

interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  points: number; // positive for earning, negative for spending
  date: string;
  balance: number; // balance after transaction
}

interface UserWithTransactions {
  id: string;
  name: string;
  userType: 'Normal' | 'VIP';
  avatar: string;
  currentBalance: number;
  totalEarned: number;
  totalSpent: number;
  transactions: Transaction[];
}

export function PointsTransactionManagement() {
  const [selectedUser, setSelectedUser] = useState<UserWithTransactions | null>(null);

  const users: UserWithTransactions[] = [
    {
      id: 'U001',
      name: 'John Smith',
      userType: 'VIP',
      avatar: 'JS',
      currentBalance: 1250,
      totalEarned: 3500,
      totalSpent: 2250,
      transactions: [
        {
          id: 'T001-1',
          type: 'EARN_WALK',
          description: 'Utown → Central Library (2.8km)',
          points: 280,
          date: '2024-01-24 08:30',
          balance: 1250
        },
        {
          id: 'T001-2',
          type: 'PURCHASE_ITEM',
          description: 'Purchased Starbucks Coffee Voucher',
          points: -500,
          date: '2024-01-23 15:20',
          balance: 970
        },
        {
          id: 'T001-3',
          type: 'EARN_WALK',
          description: 'Central Library → Business (1.9km)',
          points: 190,
          date: '2024-01-23 14:15',
          balance: 1470
        },
        {
          id: 'T001-4',
          type: 'PURCHASE_BADGE',
          description: 'Purchased Badge: Eco Pioneer',
          points: -300,
          date: '2024-01-22 10:30',
          balance: 1280
        },
        {
          id: 'T001-5',
          type: 'EARN_WALK',
          description: 'Business → Utown (3.2km)',
          points: 320,
          date: '2024-01-22 09:45',
          balance: 1580
        },
        {
          id: 'T001-6',
          type: 'PURCHASE_VIP',
          description: 'VIP Membership Renewal (1 month)',
          points: -1200,
          date: '2024-01-21 12:00',
          balance: 1260
        },
        {
          id: 'T001-7',
          type: 'EARN_WALK',
          description: 'Kent Ridge → Science (4.5km)',
          points: 450,
          date: '2024-01-21 08:15',
          balance: 2460
        },
        {
          id: 'T001-8',
          type: 'PURCHASE_ITEM',
          description: 'Purchased Campus Store Voucher',
          points: -250,
          date: '2024-01-20 16:30',
          balance: 2010
        },
        {
          id: 'T001-9',
          type: 'EARN_WALK',
          description: 'Engineering → Utown (2.1km)',
          points: 210,
          date: '2024-01-20 11:20',
          balance: 2260
        },
        {
          id: 'T001-10',
          type: 'EARN_WALK',
          description: 'Utown → Engineering (2.3km)',
          points: 230,
          date: '2024-01-19 13:45',
          balance: 2050
        }
      ]
    },
    {
      id: 'U002',
      name: 'Emily Johnson',
      userType: 'Normal',
      avatar: 'EJ',
      currentBalance: 850,
      totalEarned: 2100,
      totalSpent: 1250,
      transactions: [
        {
          id: 'T002-1',
          type: 'EARN_WALK',
          description: 'Central Library → Engineering (1.5km)',
          points: 150,
          date: '2024-01-24 09:00',
          balance: 850
        },
        {
          id: 'T002-2',
          type: 'PURCHASE_ITEM',
          description: 'Purchased Lunch Voucher',
          points: -200,
          date: '2024-01-23 12:30',
          balance: 700
        },
        {
          id: 'T002-3',
          type: 'EARN_WALK',
          description: 'Engineering → Science (1.2km)',
          points: 120,
          date: '2024-01-23 13:30',
          balance: 900
        },
        {
          id: 'T002-4',
          type: 'PURCHASE_BADGE',
          description: 'Purchased Badge: Beginner Explorer',
          points: -150,
          date: '2024-01-22 14:20',
          balance: 780
        },
        {
          id: 'T002-5',
          type: 'EARN_WALK',
          description: 'Science → Central Library (1.8km)',
          points: 180,
          date: '2024-01-22 16:00',
          balance: 930
        },
        {
          id: 'T002-6',
          type: 'PURCHASE_VIP',
          description: 'Upgrade to VIP Member (1 month)',
          points: -900,
          date: '2024-01-21 10:00',
          balance: 750
        },
        {
          id: 'T002-7',
          type: 'EARN_WALK',
          description: 'Utown → Business (2.5km)',
          points: 250,
          date: '2024-01-20 08:45',
          balance: 1650
        }
      ]
    },
    {
      id: 'U003',
      name: 'Michael Brown',
      userType: 'VIP',
      avatar: 'MB',
      currentBalance: 2100,
      totalEarned: 4800,
      totalSpent: 2700,
      transactions: [
        {
          id: 'T003-1',
          type: 'EARN_WALK',
          description: 'Engineering → Kent Ridge MRT (4.1km)',
          points: 410,
          date: '2024-01-24 17:30',
          balance: 2100
        },
        {
          id: 'T003-2',
          type: 'PURCHASE_ITEM',
          description: 'Purchased Gym Monthly Pass',
          points: -800,
          date: '2024-01-23 10:00',
          balance: 1690
        },
        {
          id: 'T003-3',
          type: 'EARN_WALK',
          description: 'Kent Ridge MRT → Utown (3.8km)',
          points: 380,
          date: '2024-01-23 08:00',
          balance: 2490
        },
        {
          id: 'T003-4',
          type: 'PURCHASE_BADGE',
          description: 'Purchased Badge: Marathon Challenger',
          points: -500,
          date: '2024-01-22 15:30',
          balance: 2110
        },
        {
          id: 'T003-5',
          type: 'EARN_WALK',
          description: 'Business → Science (3.2km)',
          points: 320,
          date: '2024-01-22 11:15',
          balance: 2610
        },
        {
          id: 'T003-6',
          type: 'PURCHASE_VIP',
          description: 'VIP Membership Renewal (1 month)',
          points: -1200,
          date: '2024-01-21 09:00',
          balance: 2290
        },
        {
          id: 'T003-7',
          type: 'EARN_WALK',
          description: 'Utown → Central Library (2.7km)',
          points: 270,
          date: '2024-01-20 14:20',
          balance: 3490
        },
        {
          id: 'T003-8',
          type: 'PURCHASE_ITEM',
          description: 'Purchased Bookstore Voucher',
          points: -200,
          date: '2024-01-19 16:45',
          balance: 3220
        }
      ]
    },
    {
      id: 'U004',
      name: 'Sarah Davis',
      userType: 'Normal',
      avatar: 'SD',
      currentBalance: 620,
      totalEarned: 1450,
      totalSpent: 830,
      transactions: [
        {
          id: 'T004-1',
          type: 'EARN_WALK',
          description: 'Science Faculty Loop (2.5km)',
          points: 250,
          date: '2024-01-24 10:00',
          balance: 620
        },
        {
          id: 'T004-2',
          type: 'PURCHASE_BADGE',
          description: 'Purchased Badge: Science Explorer',
          points: -180,
          date: '2024-01-23 11:30',
          balance: 370
        },
        {
          id: 'T004-3',
          type: 'EARN_WALK',
          description: 'Central Library → Science (1.6km)',
          points: 160,
          date: '2024-01-23 09:15',
          balance: 550
        },
        {
          id: 'T004-4',
          type: 'PURCHASE_ITEM',
          description: 'Purchased Beverage Voucher',
          points: -150,
          date: '2024-01-22 13:00',
          balance: 390
        },
        {
          id: 'T004-5',
          type: 'EARN_WALK',
          description: 'Engineering → Business (2.8km)',
          points: 280,
          date: '2024-01-21 15:30',
          balance: 540
        },
        {
          id: 'T004-6',
          type: 'PURCHASE_ITEM',
          description: 'Purchased Stationery Set',
          points: -500,
          date: '2024-01-20 10:20',
          balance: 260
        }
      ]
    },
    {
      id: 'U005',
      name: 'David Wilson',
      userType: 'VIP',
      avatar: 'DW',
      currentBalance: 1880,
      totalEarned: 5200,
      totalSpent: 3320,
      transactions: [
        {
          id: 'T005-1',
          type: 'EARN_WALK',
          description: 'Utown → Business School (3.7km)',
          points: 370,
          date: '2024-01-24 11:20',
          balance: 1880
        },
        {
          id: 'T005-2',
          type: 'PURCHASE_ITEM',
          description: 'Purchased Movie Tickets',
          points: -350,
          date: '2024-01-23 18:00',
          balance: 1510
        },
        {
          id: 'T005-3',
          type: 'EARN_WALK',
          description: 'Business → Central Library (2.1km)',
          points: 210,
          date: '2024-01-23 15:45',
          balance: 1860
        },
        {
          id: 'T005-4',
          type: 'PURCHASE_BADGE',
          description: 'Purchased Badge: Night Walker',
          points: -400,
          date: '2024-01-22 20:30',
          balance: 1650
        },
        {
          id: 'T005-5',
          type: 'EARN_WALK',
          description: 'Central Library → Kent Ridge (2.9km)',
          points: 290,
          date: '2024-01-22 19:00',
          balance: 2050
        },
        {
          id: 'T005-6',
          type: 'PURCHASE_VIP',
          description: 'VIP Membership Renewal (1 month)',
          points: -1200,
          date: '2024-01-21 08:30',
          balance: 1760
        },
        {
          id: 'T005-7',
          type: 'PURCHASE_ITEM',
          description: 'Purchased Sports Equipment',
          points: -670,
          date: '2024-01-20 12:00',
          balance: 2960
        },
        {
          id: 'T005-8',
          type: 'EARN_WALK',
          description: 'Kent Ridge → Utown (3.5km)',
          points: 350,
          date: '2024-01-19 17:30',
          balance: 3630
        },
        {
          id: 'T005-9',
          type: 'PURCHASE_BADGE',
          description: 'Purchased Badge: All-Round Champion',
          points: -700,
          date: '2024-01-18 14:15',
          balance: 3280
        }
      ]
    },
    {
      id: 'U006',
      name: 'Jessica Martinez',
      userType: 'Normal',
      avatar: 'JM',
      currentBalance: 1340,
      totalEarned: 3100,
      totalSpent: 1760,
      transactions: [
        {
          id: 'T006-1',
          type: 'EARN_WALK',
          description: 'Central Library → Utown (3.5km)',
          points: 350,
          date: '2024-01-24 16:30',
          balance: 1340
        },
        {
          id: 'T006-2',
          type: 'PURCHASE_ITEM',
          description: 'Purchased Lunch Combo Voucher',
          points: -280,
          date: '2024-01-23 12:00',
          balance: 990
        },
        {
          id: 'T006-3',
          type: 'EARN_WALK',
          description: 'Utown → Engineering (2.7km)',
          points: 270,
          date: '2024-01-23 12:00',
          balance: 1270
        },
        {
          id: 'T006-4',
          type: 'PURCHASE_BADGE',
          description: 'Purchased Badge: Engineer\'s Path',
          points: -350,
          date: '2024-01-22 09:30',
          balance: 1000
        },
        {
          id: 'T006-5',
          type: 'EARN_WALK',
          description: 'Business → Kent Ridge (3.1km)',
          points: 310,
          date: '2024-01-21 17:00',
          balance: 1350
        },
        {
          id: 'T006-6',
          type: 'PURCHASE_ITEM',
          description: 'Purchased Library Print Credits',
          points: -180,
          date: '2024-01-20 14:30',
          balance: 1040
        },
        {
          id: 'T006-7',
          type: 'PURCHASE_VIP',
          description: 'Upgrade to VIP Member (1 month)',
          points: -950,
          date: '2024-01-19 10:00',
          balance: 1220
        },
        {
          id: 'T006-8',
          type: 'EARN_WALK',
          description: 'Engineering → Science (2.4km)',
          points: 240,
          date: '2024-01-18 15:20',
          balance: 2170
        }
      ]
    }
  ];

  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case 'EARN_WALK':
        return <Footprints className="size-5 text-green-600" />;
      case 'PURCHASE_VIP':
        return <Trophy className="size-5 text-purple-600" />;
      case 'PURCHASE_ITEM':
        return <ShoppingBag className="size-5 text-blue-600" />;
      case 'PURCHASE_BADGE':
        return <Award className="size-5 text-orange-600" />;
    }
  };

  const getTransactionLabel = (type: TransactionType) => {
    switch (type) {
      case 'EARN_WALK':
        return 'Walk Earnings';
      case 'PURCHASE_VIP':
        return 'VIP Membership';
      case 'PURCHASE_ITEM':
        return 'Item Purchase';
      case 'PURCHASE_BADGE':
        return 'Badge Purchase';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-6 bg-white border-b">
        <h2 className="text-2xl font-bold text-gray-900">Points Transaction Management</h2>
        <p className="text-gray-600 mt-1">View user points income and expenditure records and transaction details</p>
      </div>

      {/* Content Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* User List Section */}
        <div className="w-80 bg-white border-r overflow-y-auto">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-semibold text-gray-900">User List</h3>
            <p className="text-xs text-gray-600 mt-1">Click to view transaction records</p>
          </div>
          <div className="p-2 space-y-2">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  selectedUser?.id === user.id
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : 'bg-white border-2 border-transparent hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="size-12 flex-shrink-0">
                    <AvatarFallback 
                      className={user.userType === 'VIP' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'}
                    >
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 truncate">
                        {user.name}
                      </span>
                      <Badge className={user.userType === 'VIP' ? 'bg-purple-100 text-purple-700 text-xs' : 'bg-gray-100 text-gray-700 text-xs'}>
                        {user.userType}
                      </Badge>
                    </div>
                    <div className="text-sm space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Current Balance:</span>
                        <span className="font-semibold text-blue-600">{user.currentBalance} pts</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Total Earned:</span>
                        <span className="text-green-600">+{user.totalEarned}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Total Spent:</span>
                        <span className="text-red-600">-{user.totalSpent}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Transaction Details Section */}
        <div className="flex-1 bg-white overflow-hidden flex flex-col">
          {selectedUser ? (
            <>
              {/* Selected User Header */}
              <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-4">
                  <Avatar className="size-16">
                    <AvatarFallback 
                      className={selectedUser.userType === 'VIP' ? 'bg-purple-600 text-white text-xl' : 'bg-blue-600 text-white text-xl'}
                    >
                      {selectedUser.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h3>
                      <Badge className={selectedUser.userType === 'VIP' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'}>
                        {selectedUser.userType}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-xs text-gray-600 mb-1">Current Balance</p>
                        <p className="text-xl font-bold text-blue-600">{selectedUser.currentBalance}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-xs text-gray-600 mb-1">Total Earned</p>
                        <p className="text-xl font-bold text-green-600">+{selectedUser.totalEarned}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-xs text-gray-600 mb-1">Total Spent</p>
                        <p className="text-xl font-bold text-red-600">-{selectedUser.totalSpent}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction List */}
              <div className="flex-1 overflow-hidden">
                <div className="p-4 border-b bg-gray-50">
                  <h4 className="font-semibold text-gray-900">Transaction Records</h4>
                  <p className="text-xs text-gray-600 mt-1">Total {selectedUser.transactions.length} records</p>
                </div>
                <ScrollArea className="h-[calc(100%-4rem)]">
                  <div className="p-4 space-y-3">
                    {selectedUser.transactions.map((transaction) => (
                      <Card key={transaction.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="text-xs">
                                    {getTransactionLabel(transaction.type)}
                                  </Badge>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                  {transaction.description}
                                </p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className={`text-lg font-bold ${
                                  transaction.points > 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {transaction.points > 0 ? '+' : ''}{transaction.points}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                              <span>{transaction.date}</span>
                              <span className="font-medium">Balance: {transaction.balance} pts</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <ArrowUpCircle className="size-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Please Select a User</p>
                <p className="text-sm mt-1">Click a user on the left to view transaction records</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
