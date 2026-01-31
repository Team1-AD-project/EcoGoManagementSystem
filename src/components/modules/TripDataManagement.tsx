import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface RoutePoint {
  lat: number;
  lng: number;
}

interface Route {
  id: string;
  name: string;
  distance: string;
  carbonSaved: string;
  points: RoutePoint[];
  date: string;
}

interface UserRoute {
  id: string;
  name: string;
  userType: 'Normal' | 'VIP';
  avatar: string;
  routes: Route[];
  color: string;
}

export function TripDataManagement() {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserRoute | null>(null);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('');

  const users: UserRoute[] = [
    {
      id: 'U001',
      name: 'John Smith',
      userType: 'VIP',
      avatar: 'JS',
      color: '#3b82f6',
      routes: [
        {
          id: 'R001-1',
          name: 'Utown → Central Library',
          distance: '2.8 km',
          carbonSaved: '0.4 kg',
          date: '2024-01-24 08:30',
          points: [
            { lat: 1.3050, lng: 103.7730 },
            { lat: 1.3045, lng: 103.7735 },
            { lat: 1.3038, lng: 103.7740 },
            { lat: 1.3030, lng: 103.7742 },
            { lat: 1.3020, lng: 103.7745 },
            { lat: 1.3010, lng: 103.7748 },
            { lat: 1.3000, lng: 103.7752 },
            { lat: 1.2990, lng: 103.7755 },
            { lat: 1.2980, lng: 103.7758 },
            { lat: 1.2972, lng: 103.7762 },
            { lat: 1.2966, lng: 103.7764 }
          ]
        },
        {
          id: 'R001-2',
          name: 'Central Library → Business',
          distance: '1.9 km',
          carbonSaved: '0.3 kg',
          date: '2024-01-24 14:15',
          points: [
            { lat: 1.2966, lng: 103.7764 },
            { lat: 1.2960, lng: 103.7770 },
            { lat: 1.2955, lng: 103.7775 },
            { lat: 1.2950, lng: 103.7780 },
            { lat: 1.2945, lng: 103.7785 },
            { lat: 1.2940, lng: 103.7788 },
            { lat: 1.2935, lng: 103.7790 }
          ]
        },
        {
          id: 'R001-3',
          name: 'Business → Utown',
          distance: '3.2 km',
          carbonSaved: '0.5 kg',
          date: '2024-01-24 18:45',
          points: [
            { lat: 1.2935, lng: 103.7790 },
            { lat: 1.2945, lng: 103.7785 },
            { lat: 1.2960, lng: 103.7775 },
            { lat: 1.2980, lng: 103.7765 },
            { lat: 1.3000, lng: 103.7755 },
            { lat: 1.3020, lng: 103.7745 },
            { lat: 1.3040, lng: 103.7735 },
            { lat: 1.3050, lng: 103.7730 }
          ]
        }
      ]
    },
    {
      id: 'U002',
      name: 'Emily Johnson',
      userType: 'Normal',
      avatar: 'EJ',
      color: '#10b981',
      routes: [
        {
          id: 'R002-1',
          name: 'Central Library → Engineering',
          distance: '1.5 km',
          carbonSaved: '0.2 kg',
          date: '2024-01-24 09:00',
          points: [
            { lat: 1.2966, lng: 103.7764 },
            { lat: 1.2970, lng: 103.7755 },
            { lat: 1.2975, lng: 103.7748 },
            { lat: 1.2980, lng: 103.7740 },
            { lat: 1.2983, lng: 103.7730 },
            { lat: 1.2985, lng: 103.7720 },
            { lat: 1.2987, lng: 103.7715 },
            { lat: 1.2989, lng: 103.7710 }
          ]
        },
        {
          id: 'R002-2',
          name: 'Engineering → Science',
          distance: '1.2 km',
          carbonSaved: '0.2 kg',
          date: '2024-01-24 13:30',
          points: [
            { lat: 1.2989, lng: 103.7710 },
            { lat: 1.2985, lng: 103.7720 },
            { lat: 1.2980, lng: 103.7735 },
            { lat: 1.2975, lng: 103.7750 },
            { lat: 1.2970, lng: 103.7765 },
            { lat: 1.2965, lng: 103.7780 },
            { lat: 1.2958, lng: 103.7800 }
          ]
        }
      ]
    },
    {
      id: 'U003',
      name: 'Michael Brown',
      userType: 'VIP',
      avatar: 'MB',
      color: '#f59e0b',
      routes: [
        {
          id: 'R003-1',
          name: 'Engineering → Kent Ridge MRT',
          distance: '4.1 km',
          carbonSaved: '0.6 kg',
          date: '2024-01-24 17:30',
          points: [
            { lat: 1.2989, lng: 103.7710 },
            { lat: 1.2985, lng: 103.7720 },
            { lat: 1.2980, lng: 103.7735 },
            { lat: 1.2975, lng: 103.7750 },
            { lat: 1.2970, lng: 103.7765 },
            { lat: 1.2965, lng: 103.7780 },
            { lat: 1.2960, lng: 103.7795 },
            { lat: 1.2955, lng: 103.7810 },
            { lat: 1.2950, lng: 103.7820 },
            { lat: 1.2945, lng: 103.7830 },
            { lat: 1.2940, lng: 103.7838 },
            { lat: 1.2934, lng: 103.7844 }
          ]
        },
        {
          id: 'R003-2',
          name: 'Kent Ridge MRT → Utown',
          distance: '3.8 km',
          carbonSaved: '0.5 kg',
          date: '2024-01-24 08:00',
          points: [
            { lat: 1.2934, lng: 103.7844 },
            { lat: 1.2945, lng: 103.7830 },
            { lat: 1.2960, lng: 103.7810 },
            { lat: 1.2975, lng: 103.7790 },
            { lat: 1.2990, lng: 103.7770 },
            { lat: 1.3005, lng: 103.7755 },
            { lat: 1.3020, lng: 103.7745 },
            { lat: 1.3035, lng: 103.7735 },
            { lat: 1.3050, lng: 103.7730 }
          ]
        }
      ]
    },
    {
      id: 'U004',
      name: 'Sarah Davis',
      userType: 'Normal',
      avatar: 'SD',
      color: '#8b5cf6',
      routes: [
        {
          id: 'R004-1',
          name: 'Science Faculty Loop',
          distance: '2.5 km',
          carbonSaved: '0.3 kg',
          date: '2024-01-24 10:00',
          points: [
            { lat: 1.2958, lng: 103.7800 },
            { lat: 1.2960, lng: 103.7810 },
            { lat: 1.2965, lng: 103.7815 },
            { lat: 1.2970, lng: 103.7818 },
            { lat: 1.2975, lng: 103.7815 },
            { lat: 1.2978, lng: 103.7810 },
            { lat: 1.2980, lng: 103.7805 },
            { lat: 1.2978, lng: 103.7800 },
            { lat: 1.2975, lng: 103.7795 },
            { lat: 1.2970, lng: 103.7792 },
            { lat: 1.2965, lng: 103.7795 },
            { lat: 1.2958, lng: 103.7800 }
          ]
        }
      ]
    },
    {
      id: 'U005',
      name: 'David Wilson',
      userType: 'VIP',
      avatar: 'DW',
      color: '#ec4899',
      routes: [
        {
          id: 'R005-1',
          name: 'Utown → Business School',
          distance: '3.7 km',
          carbonSaved: '0.5 kg',
          date: '2024-01-24 11:20',
          points: [
            { lat: 1.3050, lng: 103.7730 },
            { lat: 1.3040, lng: 103.7738 },
            { lat: 1.3028, lng: 103.7748 },
            { lat: 1.3015, lng: 103.7758 },
            { lat: 1.3000, lng: 103.7768 },
            { lat: 1.2985, lng: 103.7775 },
            { lat: 1.2970, lng: 103.7780 },
            { lat: 1.2955, lng: 103.7785 },
            { lat: 1.2945, lng: 103.7788 },
            { lat: 1.2935, lng: 103.7790 }
          ]
        },
        {
          id: 'R005-2',
          name: 'Business → Central Library',
          distance: '2.1 km',
          carbonSaved: '0.3 kg',
          date: '2024-01-24 15:45',
          points: [
            { lat: 1.2935, lng: 103.7790 },
            { lat: 1.2940, lng: 103.7785 },
            { lat: 1.2945, lng: 103.7780 },
            { lat: 1.2950, lng: 103.7775 },
            { lat: 1.2955, lng: 103.7770 },
            { lat: 1.2960, lng: 103.7766 },
            { lat: 1.2966, lng: 103.7764 }
          ]
        },
        {
          id: 'R005-3',
          name: 'Central Library → Kent Ridge',
          distance: '2.9 km',
          carbonSaved: '0.4 kg',
          date: '2024-01-24 19:00',
          points: [
            { lat: 1.2966, lng: 103.7764 },
            { lat: 1.2965, lng: 103.7780 },
            { lat: 1.2960, lng: 103.7795 },
            { lat: 1.2955, lng: 103.7810 },
            { lat: 1.2950, lng: 103.7820 },
            { lat: 1.2945, lng: 103.7830 },
            { lat: 1.2940, lng: 103.7838 },
            { lat: 1.2934, lng: 103.7844 }
          ]
        }
      ]
    },
    {
      id: 'U006',
      name: 'Jessica Martinez',
      userType: 'Normal',
      avatar: 'JM',
      color: '#06b6d4',
      routes: [
        {
          id: 'R006-1',
          name: 'Central Library → Utown',
          distance: '3.5 km',
          carbonSaved: '0.5 kg',
          date: '2024-01-24 16:30',
          points: [
            { lat: 1.2966, lng: 103.7764 },
            { lat: 1.2975, lng: 103.7760 },
            { lat: 1.2985, lng: 103.7758 },
            { lat: 1.2995, lng: 103.7755 },
            { lat: 1.3005, lng: 103.7750 },
            { lat: 1.3015, lng: 103.7745 },
            { lat: 1.3025, lng: 103.7740 },
            { lat: 1.3035, lng: 103.7735 },
            { lat: 1.3045, lng: 103.7732 },
            { lat: 1.3050, lng: 103.7730 }
          ]
        },
        {
          id: 'R006-2',
          name: 'Utown → Engineering',
          distance: '2.7 km',
          carbonSaved: '0.4 kg',
          date: '2024-01-24 12:00',
          points: [
            { lat: 1.3050, lng: 103.7730 },
            { lat: 1.3040, lng: 103.7728 },
            { lat: 1.3025, lng: 103.7725 },
            { lat: 1.3010, lng: 103.7722 },
            { lat: 1.2995, lng: 103.7718 },
            { lat: 1.2989, lng: 103.7710 }
          ]
        }
      ]
    }
  ];

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current).setView([1.2990, 103.7760], 15);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    mapRef.current = map;
    layerGroupRef.current = L.layerGroup().addTo(map);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update routes when user or route is selected
  useEffect(() => {
    if (!layerGroupRef.current || !selectedUser || !selectedRouteId) {
      if (layerGroupRef.current) {
        layerGroupRef.current.clearLayers();
      }
      return;
    }

    layerGroupRef.current.clearLayers();

    const selectedRoute = selectedUser.routes.find(r => r.id === selectedRouteId);
    if (!selectedRoute) return;

    // Draw polyline
    const latLngs: L.LatLngExpression[] = selectedRoute.points.map(point => [point.lat, point.lng]);
    const polyline = L.polyline(latLngs, {
      color: selectedUser.color,
      weight: 4,
      opacity: 0.7
    });
    layerGroupRef.current.addLayer(polyline);

    // Add start marker
    const startMarker = L.marker([selectedRoute.points[0].lat, selectedRoute.points[0].lng]);
    startMarker.bindPopup(`
      <div style="font-size: 12px;">
        <p style="font-weight: 600; margin-bottom: 4px;">${selectedUser.name}</p>
        <p style="color: #16a34a; margin-bottom: 2px;">Start Point</p>
        <p style="font-size: 10px; color: #999;">${selectedRoute.name}</p>
      </div>
    `);
    layerGroupRef.current.addLayer(startMarker);

    // Add end marker
    const lastPoint = selectedRoute.points[selectedRoute.points.length - 1];
    const endMarker = L.marker([lastPoint.lat, lastPoint.lng]);
    endMarker.bindPopup(`
      <div style="font-size: 12px;">
        <p style="font-weight: 600; margin-bottom: 4px;">${selectedUser.name}</p>
        <p style="color: #dc2626; margin-bottom: 2px;">End Point</p>
        <p style="font-size: 10px; color: #999;">${selectedRoute.name}</p>
      </div>
    `);
    layerGroupRef.current.addLayer(endMarker);

    // Fit bounds to show all markers
    const bounds = L.latLngBounds(selectedRoute.points.map(point => [point.lat, point.lng]));
    mapRef.current?.fitBounds(bounds, { padding: [50, 50] });
  }, [selectedUser, selectedRouteId]);

  const handleUserClick = (user: UserRoute) => {
    setSelectedUser(user);
    setSelectedRouteId(user.routes[0]?.id || '');
  };

  const getTotalStats = (user: UserRoute) => {
    const totalDistance = user.routes.reduce((sum, route) => {
      const dist = parseFloat(route.distance);
      return sum + dist;
    }, 0);
    const totalCarbon = user.routes.reduce((sum, route) => {
      const carbon = parseFloat(route.carbonSaved);
      return sum + carbon;
    }, 0);
    return {
      distance: totalDistance.toFixed(1) + ' km',
      carbon: totalCarbon.toFixed(1) + ' kg'
    };
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-6 bg-white border-b">
        <h2 className="text-2xl font-bold text-gray-900">Trip Data Management</h2>
        <p className="text-gray-600 mt-1">View user trip routes and carbon emission data</p>
      </div>

      {/* Map and User List Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Map Section */}
        <div className="flex-1 relative">
          <div ref={mapContainerRef} className="absolute inset-0" />
          
          {selectedUser && selectedRouteId && (
            <Card className="absolute top-4 left-4 p-4 bg-white/95 backdrop-blur shadow-lg z-[1000] max-w-sm">
              <div className="flex items-start gap-3">
                <Avatar className="size-12 flex-shrink-0">
                  <AvatarFallback 
                    className={selectedUser.userType === 'VIP' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'}
                  >
                    {selectedUser.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{selectedUser.name}</h3>
                    <Badge className={selectedUser.userType === 'VIP' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}>
                      {selectedUser.userType}
                    </Badge>
                  </div>
                  
                  <div className="mt-3">
                    <label className="text-xs text-gray-600 mb-1.5 block">Select Route</label>
                    <Select value={selectedRouteId} onValueChange={setSelectedRouteId}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a route" />
                      </SelectTrigger>
                      <SelectContent className="z-[2000]">
                        {selectedUser.routes.map((route) => (
                          <SelectItem key={route.id} value={route.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{route.name}</span>
                              <span className="text-xs text-gray-500">{route.distance} • {route.carbonSaved}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {(() => {
                    const currentRoute = selectedUser.routes.find(r => r.id === selectedRouteId);
                    return currentRoute ? (
                      <div className="text-sm text-gray-600 mt-3 space-y-1">
                        <p>Distance: {currentRoute.distance}</p>
                        <p>Carbon Saved: {currentRoute.carbonSaved}</p>
                        <p className="text-xs text-gray-500">Time: {currentRoute.date}</p>
                      </div>
                    ) : null;
                  })()}
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* User List Section */}
        <div className="w-80 bg-white border-l overflow-y-auto">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-semibold text-gray-900">User List</h3>
            <p className="text-xs text-gray-600 mt-1">Click to view user trips</p>
          </div>
          <div className="p-2 space-y-2">
            {users.map((user) => {
              const stats = getTotalStats(user);
              return (
                <button
                  key={user.id}
                  onClick={() => handleUserClick(user)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    selectedUser?.id === user.id
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'bg-white border-2 border-transparent hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 flex-shrink-0">
                      <AvatarFallback 
                        className={user.userType === 'VIP' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'}
                      >
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-gray-900 truncate">
                          {user.name}
                        </span>
                        <Badge className={user.userType === 'VIP' ? 'bg-purple-100 text-purple-700 text-xs' : 'bg-gray-100 text-gray-700 text-xs'}>
                          {user.userType}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 mt-1 space-y-0.5">
                        <p>{user.routes.length} routes</p>
                        <p>Total Distance: {stats.distance}</p>
                        <p>Total Carbon Saved: {stats.carbon}</p>
                      </div>
                    </div>
                    <div 
                      className="size-3 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: user.color }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
