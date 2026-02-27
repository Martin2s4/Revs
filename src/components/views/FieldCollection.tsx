import React, { useState } from 'react';
import { QrCode, Search, Car, Map as MapIcon, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';

interface FieldCollectionProps {
  setActiveView?: (view: string) => void;
}

export function FieldCollection({ setActiveView }: FieldCollectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    alert(`Searching for vehicle/business: ${searchQuery}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Field Collection</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Process payments and verify receipts in the field.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-blue-600 text-white border-none">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-4 bg-white/20 rounded-full">
              <QrCode className="h-10 w-10" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Scan QR Code</h3>
              <p className="text-blue-100 text-sm mt-1">Verify payment receipts instantly</p>
            </div>
            <Button variant="secondary" className="w-full mt-2" onClick={() => alert('Opening camera for QR scanning...')}>Open Scanner</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Collection</CardTitle>
            <CardDescription>Select a stream to process payment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3 h-12" onClick={() => alert('Initiating collection for Parking Fee...')}>
              <Car className="h-5 w-5 text-gray-500" />
              Parking Fee
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 h-12" onClick={() => alert('Initiating collection for Market Fee...')}>
              <Briefcase className="h-5 w-5 text-gray-500" />
              Market Fee
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 h-12" onClick={() => alert('Initiating collection for Cess / Barrier...')}>
              <MapIcon className="h-5 w-5 text-gray-500" />
              Cess / Barrier
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verify Vehicle/Business</CardTitle>
            <CardDescription>Search by registration or ID</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search 
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer hover:text-blue-500" 
                onClick={handleSearch}
              />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. KCA 123A or BZ-2023-001" 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <Button className="w-full" onClick={handleSearch}>Search</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
