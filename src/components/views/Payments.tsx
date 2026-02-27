import React, { useState } from 'react';
import { Search, Filter, Download, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { mockPayments } from '../../data/mockData';
import { User } from '../../types';
import { PaymentModal } from '../ui/PaymentModal';

interface PaymentsProps {
  user: User;
  setActiveView: (view: string) => void;
}

export function Payments({ user, setActiveView }: PaymentsProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const isCitizen = user.role === 'citizen';
  
  const displayPayments = mockPayments.filter(p => {
    const matchesCitizen = isCitizen ? p.citizen === user.name : true;
    const matchesSearch = 
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.citizen.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesDepartment = departmentFilter === 'All' || p.department === departmentFilter;
    return matchesCitizen && matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        isCitizen={isCitizen} 
      />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {isCitizen ? 'My Payments' : 'Payments'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isCitizen ? 'View your payment history and receipts.' : 'Manage and view all revenue transactions.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isCitizen && (
            <Button variant="outline" className="gap-2" onClick={() => alert('Exporting payments to CSV...')}>
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          )}
          {isCitizen && (
            <Button className="gap-2" onClick={() => setIsPaymentModalOpen(true)}>
              <DollarSign className="h-4 w-4" />
              Make Payment
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-xl w-full sm:w-80">
            <Search className="h-4 w-4 text-gray-500 cursor-pointer" onClick={() => {}} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transactions..." 
              className="bg-transparent border-none outline-none text-sm w-full text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="relative">
            <Button variant="outline" className="gap-2 shrink-0" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <Filter className="h-4 w-4" />
              Filter
              {(statusFilter !== 'All' || departmentFilter !== 'All') && (
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
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                    <select 
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="All">All Departments</option>
                      <option value="Lands">Lands</option>
                      <option value="Markets">Markets</option>
                      <option value="Trade">Trade</option>
                      <option value="Transport">Transport</option>
                      <option value="Health">Health</option>
                    </select>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setStatusFilter('All');
                        setDepartmentFilter('All');
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
                  <th className="px-6 py-4 font-medium">Transaction ID</th>
                  {!isCitizen && <th className="px-6 py-4 font-medium">Citizen / Business</th>}
                  <th className="px-6 py-4 font-medium">Department</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {displayPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{payment.id}</td>
                    {!isCitizen && <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{payment.citizen}</td>}
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{payment.department}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{payment.date}</td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 dark:text-gray-100">Ksh {payment.amount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        payment.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {displayPayments.length === 0 && (
                  <tr>
                    <td colSpan={isCitizen ? 5 : 6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No transactions found matching your search.
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
