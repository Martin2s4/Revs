import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { mockCitizens } from '../../data/mockData';
import { CitizenModal } from '../ui/CitizenModal';

interface CitizensProps {
  setActiveView?: (view: string) => void;
}

export function Citizens({ setActiveView }: CitizensProps) {
  const [isCitizenModalOpen, setIsCitizenModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const displayCitizens = mockCitizens.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.idNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <CitizenModal 
        isOpen={isCitizenModalOpen} 
        onClose={() => setIsCitizenModalOpen(false)} 
      />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Citizens Directory</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage registered taxpayers and businesses.</p>
        </div>
        <Button className="gap-2" onClick={() => setIsCitizenModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Citizen
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-xl w-full max-w-md">
            <Search className="h-4 w-4 text-gray-500 cursor-pointer" onClick={() => {}} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, ID or phone..." 
              className="bg-transparent border-none outline-none text-sm w-full text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="relative">
            <Button variant="outline" className="gap-2 shrink-0" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <Filter className="h-4 w-4" />
              Filter
              {statusFilter !== 'All' && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-gray-900"></span>
              )}
            </Button>
            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)} />
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 z-20 p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                    <select 
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setStatusFilter('All');
                        setIsFilterOpen(false);
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">ID Number</th>
                  <th className="px-6 py-4 font-medium">Phone</th>
                  <th className="px-6 py-4 font-medium">Registered Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {displayCitizens.map((citizen) => (
                  <tr key={citizen.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{citizen.name}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{citizen.idNumber}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{citizen.phone}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{citizen.registered}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        citizen.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {citizen.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {displayCitizens.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No citizens found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
