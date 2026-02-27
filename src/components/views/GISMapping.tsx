import React, { useState } from 'react';
import { Map as MapIcon, Layers, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different statuses
const createIcon = (color: string) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const icons = {
  compliant: createIcon('green'),
  pending: createIcon('gold'),
  defaulter: createIcon('red')
};

// Mock data for Makueni County businesses
const mockBusinesses = [
  { id: 1, name: 'Wote Supermarket', type: 'Retail', status: 'compliant', position: [-1.7820, 37.6250] as [number, number], revenue: 'Ksh 1,200' },
  { id: 2, name: 'Makueni Hardware', type: 'Hardware', status: 'pending', position: [-1.7850, 37.6280] as [number, number], revenue: 'Ksh 850' },
  { id: 3, name: 'Kibwezi Auto Spares', type: 'Automotive', status: 'defaulter', position: [-2.4167, 37.9667] as [number, number], revenue: 'Ksh 400' },
  { id: 4, name: 'Mtito Andei Lodge', type: 'Hospitality', status: 'compliant', position: [-2.6833, 38.1667] as [number, number], revenue: 'Ksh 2,500' },
  { id: 5, name: 'Emali Agrovet', type: 'Agriculture', status: 'compliant', position: [-2.0333, 37.4500] as [number, number], revenue: 'Ksh 600' },
  { id: 6, name: 'Sultan Hamud Traders', type: 'Retail', status: 'pending', position: [-2.0167, 37.3833] as [number, number], revenue: 'Ksh 950' },
  { id: 7, name: 'Wote Central Pharmacy', type: 'Healthcare', status: 'compliant', position: [-1.7800, 37.6220] as [number, number], revenue: 'Ksh 1,100' },
  { id: 8, name: 'Makindu Electronics', type: 'Retail', status: 'defaulter', position: [-2.2833, 37.8167] as [number, number], revenue: 'Ksh 300' },
];

export function GISMapping() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Makueni County approximate center
  const makueniCenter: [number, number] = [-2.25, 37.8];

  // Restrict map panning to Makueni County bounds
  const makueniBounds: L.LatLngBoundsExpression = [
    [-1.4, 37.1], // Northwest corner
    [-3.1, 38.6]  // Southeast corner
  ];

  const filteredBusinesses = activeFilter 
    ? mockBusinesses.filter(b => b.status === activeFilter)
    : mockBusinesses;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">GIS Mapping: Makueni County</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Geospatial analysis of revenue sources and compliance in Makueni.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setActiveFilter(null)}>
            <Layers className="h-4 w-4" />
            All Layers
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => setActiveFilter('defaulter')}>
            <Filter className="h-4 w-4" />
            Defaulters Only
          </Button>
        </div>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b border-gray-200 dark:border-gray-800">
          <CardTitle>Revenue Heatmap & Compliance</CardTitle>
          <CardDescription>Visualizing business compliance across Makueni County wards.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-0 relative bg-gray-100 dark:bg-gray-800 overflow-hidden rounded-b-2xl">
          <MapContainer 
            center={makueniCenter} 
            zoom={9} 
            minZoom={9}
            maxBounds={makueniBounds}
            maxBoundsViscosity={1.0}
            style={{ height: '100%', width: '100%', zIndex: 1 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Draw a rough circle to represent Makueni County area */}
            <Circle 
              center={makueniCenter} 
              pathOptions={{ fillColor: 'blue', fillOpacity: 0.05, color: 'blue', weight: 1 }} 
              radius={60000} 
            />

            {filteredBusinesses.map((business) => (
              <Marker 
                key={business.id} 
                position={business.position}
                icon={icons[business.status as keyof typeof icons]}
              >
                <Popup>
                  <div className="p-1">
                    <h3 className="font-bold text-gray-900">{business.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{business.type}</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">Status:</span>
                        <span className={`font-medium capitalize ${
                          business.status === 'compliant' ? 'text-green-600' :
                          business.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                        }`}>{business.status}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">Est. Revenue:</span>
                        <span className="font-medium text-gray-900">{business.revenue}</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {/* Legend Overlay */}
          <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 z-[1000]">
            <h4 className="text-sm font-semibold mb-2 text-gray-900 dark:text-gray-100">Compliance Status</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80" onClick={() => setActiveFilter('compliant')}>
                <div className="w-3 h-3 rounded-full bg-green-500"></div> 
                <span className="text-gray-700 dark:text-gray-300">Fully Compliant</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80" onClick={() => setActiveFilter('pending')}>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div> 
                <span className="text-gray-700 dark:text-gray-300">Pending Renewal</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80" onClick={() => setActiveFilter('defaulter')}>
                <div className="w-3 h-3 rounded-full bg-red-500"></div> 
                <span className="text-gray-700 dark:text-gray-300">Defaulter</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
