import React, { useState } from 'react';
import { Bell, CheckCircle, Info, AlertTriangle, XCircle, Check, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'Payment Received', message: 'Payment of Ksh 150.00 for Land Rates has been successfully processed.', time: '2 mins ago', read: false, type: 'success' },
  { id: '2', title: 'License Approved', message: 'Your Single Business Permit application has been approved.', time: '1 hour ago', read: false, type: 'success' },
  { id: '3', title: 'System Maintenance', message: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM.', time: '5 hours ago', read: true, type: 'info' },
  { id: '4', title: 'Payment Failed', message: 'Your recent payment attempt for Parking Fee failed. Please try again.', time: '1 day ago', read: true, type: 'error' },
  { id: '5', title: 'New Document Uploaded', message: 'A new document has been uploaded to your profile.', time: '2 days ago', read: true, type: 'info' },
  { id: '6', title: 'Account Verification', message: 'Your account has been successfully verified.', time: '3 days ago', read: true, type: 'success' },
  { id: '7', title: 'Pending Action', message: 'Please review and sign the updated terms of service.', time: '4 days ago', read: true, type: 'warning' },
];

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const displayNotifications = notifications.filter(n => {
    const matchesSearch = 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || n.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notifications
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">View and manage all your notifications.</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" className="gap-2" onClick={handleMarkAllAsRead}>
            <Check className="h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-xl w-full max-w-md">
            <Search className="h-4 w-4 text-gray-500 cursor-pointer" onClick={() => {}} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notifications..." 
              className="bg-transparent border-none outline-none text-sm w-full text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="relative">
            <Button variant="outline" className="gap-2 shrink-0" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <Filter className="h-4 w-4" />
              Filter
              {typeFilter !== 'All' && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-gray-900"></span>
              )}
            </Button>
            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)} />
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 z-20 p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                    <select 
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="All">All Types</option>
                      <option value="info">Info</option>
                      <option value="success">Success</option>
                      <option value="warning">Warning</option>
                      <option value="error">Error</option>
                    </select>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setTypeFilter('All');
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
          {displayNotifications.length === 0 ? (
            <div className="p-12 text-center text-gray-500 dark:text-gray-400">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium">No notifications found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {displayNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 sm:p-6 transition-colors flex gap-4 ${
                    notification.read 
                      ? 'hover:bg-gray-50 dark:hover:bg-gray-800/50' 
                      : 'bg-blue-50/30 dark:bg-blue-900/10 hover:bg-blue-50/50 dark:hover:bg-blue-900/20'
                  }`}
                >
                  <div className="shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 mb-1">
                      <p className={`text-base font-medium ${notification.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-gray-100'}`}>
                        {notification.title}
                      </p>
                      <span className="text-xs text-gray-500 whitespace-nowrap shrink-0">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {notification.message}
                    </p>
                    {!notification.read && (
                      <div className="mt-3">
                        <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(notification.id)}>
                          Mark as read
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
