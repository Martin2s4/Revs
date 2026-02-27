import React, { useState } from 'react';
import { Menu, Bell, Search, UserCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { User } from '../types';
import { NotificationsPanel, Notification } from './ui/NotificationsPanel';

interface HeaderProps {
  setSidebarOpen: (isOpen: boolean) => void;
  user: User;
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'Payment Received', message: 'Payment of Ksh 150.00 for Land Rates has been successfully processed.', time: '2 mins ago', read: false, type: 'success' },
  { id: '2', title: 'License Approved', message: 'Your Single Business Permit application has been approved.', time: '1 hour ago', read: false, type: 'success' },
  { id: '3', title: 'System Maintenance', message: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM.', time: '5 hours ago', read: true, type: 'info' },
  { id: '4', title: 'Payment Failed', message: 'Your recent payment attempt for Parking Fee failed. Please try again.', time: '1 day ago', read: true, type: 'error' },
];

export function Header({ setSidebarOpen, user }: HeaderProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 sm:px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="lg:hidden w-10 h-10 p-0 rounded-full" 
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-full w-64 focus-within:ring-2 focus-within:ring-blue-500 transition-shadow">
          <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-sm w-full text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 relative">
        <ThemeToggle />
        
        <div className="relative">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-10 h-10 rounded-full p-0 relative"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
            )}
          </Button>
          
          {isNotificationsOpen && (
            <NotificationsPanel 
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
            />
          )}
        </div>
        
        <div className="h-8 w-px bg-gray-200 dark:bg-gray-800 mx-1 sm:mx-2"></div>
        
        <div className="flex items-center gap-2 p-1.5 rounded-full transition-colors">
          <UserCircle className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-none">{user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
