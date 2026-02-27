import React from 'react';
import { Bell, CheckCircle, Info, AlertTriangle, XCircle, Check } from 'lucide-react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export function NotificationsPanel({ isOpen, onClose, notifications, onMarkAsRead, onMarkAllAsRead }: NotificationsPanelProps) {
  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <>
      {/* Overlay for mobile/desktop to close when clicking outside */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      <div className="absolute top-16 right-4 sm:right-6 w-80 sm:w-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={onMarkAllAsRead}
              className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
            >
              <Check className="h-3 w-3" />
              Mark all read
            </button>
          )}
        </div>
        
        <div className="overflow-y-auto flex-1 p-2 scrollbar-hide">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <Bell className="h-8 w-8 mx-auto mb-3 opacity-20" />
              <p>You're all caught up!</p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-3 rounded-xl transition-colors flex gap-3 ${
                    notification.read 
                      ? 'hover:bg-gray-50 dark:hover:bg-gray-800/50 opacity-70' 
                      : 'bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  }`}
                  onClick={() => !notification.read && onMarkAsRead(notification.id)}
                >
                  <div className="shrink-0 mt-0.5">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <p className={`text-sm font-medium truncate ${notification.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-gray-100'}`}>
                        {notification.title}
                      </p>
                      <span className="text-[10px] text-gray-500 whitespace-nowrap shrink-0 mt-0.5">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {notification.message}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="shrink-0 flex items-center justify-center w-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 text-center">
          <button className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            View all notifications
          </button>
        </div>
      </div>
    </>
  );
}
