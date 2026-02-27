import React, { useState } from 'react';
import { FileText, Search, Plus, CheckCircle, XCircle, Clock, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import { User } from '../../types';
import { LicenseModal } from '../ui/LicenseModal';
import { ReviewModal } from '../ui/ReviewModal';

const initialLicenses = [
  { id: 'LIC-2023-001', type: 'Single Business Permit', applicant: 'Acme Corp', status: 'Approved', date: '2023-10-25', feedback: 'All documents verified.' },
  { id: 'LIC-2023-002', type: 'Liquor License', applicant: 'The Local Pub', status: 'Pending', date: '2023-10-24', feedback: '' },
  { id: 'LIC-2023-003', type: 'Health Certificate', applicant: 'Fresh Foods Ltd', status: 'Rejected', date: '2023-10-23', feedback: 'Missing valid food handling certificates for staff.' },
  { id: 'LIC-2023-004', type: 'Fire Clearance', applicant: 'Tech Hub', status: 'Approved', date: '2023-10-22', feedback: '' },
  { id: 'LIC-2023-005', type: 'Building Permit', applicant: 'John Doe', status: 'Approved', date: '2023-10-20', feedback: '' },
  { id: 'LIC-2023-006', type: 'Market Stall Allocation', applicant: 'John Doe', status: 'Pending', date: '2023-10-26', feedback: '' },
];

interface LicensesProps {
  user: User;
  setActiveView: (view: string) => void;
}

export function Licenses({ user, setActiveView }: LicensesProps) {
  const [licensesData, setLicensesData] = useState(initialLicenses);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const isCitizen = user.role === 'citizen';
  
  const displayLicenses = licensesData.filter(l => {
    const matchesCitizen = isCitizen ? l.applicant === user.name : true;
    const matchesSearch = 
      l.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      l.applicant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    return matchesCitizen && matchesSearch && matchesStatus;
  });

  const pendingCount = displayLicenses.filter(l => l.status === 'Pending').length;
  const approvedCount = displayLicenses.filter(l => l.status === 'Approved').length;
  const rejectedCount = displayLicenses.filter(l => l.status === 'Rejected').length;

  const handleReviewClick = (license: any) => {
    setSelectedLicense(license);
    setIsReviewModalOpen(true);
  };

  const handleUpdateLicense = (id: string, newStatus: string, feedback: string) => {
    setLicensesData(prev => prev.map(l => 
      l.id === id ? { ...l, status: newStatus, feedback } : l
    ));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <LicenseModal 
        isOpen={isLicenseModalOpen} 
        onClose={() => setIsLicenseModalOpen(false)} 
        isCitizen={isCitizen} 
      />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        license={selectedLicense}
        onUpdate={handleUpdateLicense}
      />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {isCitizen ? 'My Licenses & Permits' : 'Licenses & Permits'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isCitizen ? 'Manage your applications and active permits.' : 'Manage business permits, health certificates, and approvals.'}
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsLicenseModalOpen(true)}>
          <Plus className="h-4 w-4" />
          New Application
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {isCitizen ? 'My Pending Applications' : 'Pending Approvals'}
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {pendingCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {isCitizen ? 'My Active Licenses' : 'Approved This Month'}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {approvedCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {isCitizen ? 'My Rejected Applications' : 'Rejected Applications'}
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {rejectedCount}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-xl w-full max-w-md">
            <Search className="h-4 w-4 text-gray-500 cursor-pointer" onClick={() => {}} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isCitizen ? "Search my applications..." : "Search by ID or applicant..."}
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
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
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
                  <th className="px-6 py-4 font-medium">Application ID</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  {!isCitizen && <th className="px-6 py-4 font-medium">Applicant</th>}
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {displayLicenses.map((license) => (
                  <tr key={license.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                      {license.id}
                      {license.feedback && isCitizen && license.status === 'Rejected' && (
                        <p className="text-xs text-red-500 mt-1">Feedback: {license.feedback}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{license.type}</td>
                    {!isCitizen && <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{license.applicant}</td>}
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{license.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        license.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        license.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {license.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isCitizen ? (
                        <Button variant="ghost" size="sm" className="gap-2" onClick={() => alert(license.status === 'Approved' ? 'Downloading permit...' : 'Viewing application details...')}>
                          <Download className="h-4 w-4" />
                          {license.status === 'Approved' ? 'Download' : 'View'}
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm" onClick={() => handleReviewClick(license)}>Review</Button>
                      )}
                    </td>
                  </tr>
                ))}
                {displayLicenses.length === 0 && (
                  <tr>
                    <td colSpan={isCitizen ? 5 : 6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No applications found matching your search.
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
