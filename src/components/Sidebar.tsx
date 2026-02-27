import React from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  FileText, 
  Settings as SettingsIcon, 
  Users, 
  Building2,
  LogOut,
  Menu,
  QrCode,
  Map,
  Smartphone
} from 'lucide-react';
import { Button } from './ui/Button';
import { UserRole } from '../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  onLogout: () => void;
  role: UserRole;
}

export function Sidebar({ isOpen, setIsOpen, activeView, setActiveView, onLogout, role }: SidebarProps) {
  const allNavItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['super_admin', 'revenue_manager', 'revenue_collector', 'licensing_officer', 'auditor', 'citizen'] },
    { id: 'payments', icon: CreditCard, label: 'Payments', roles: ['super_admin', 'revenue_manager', 'auditor', 'citizen'] },
    { id: 'collection', icon: QrCode, label: 'Field Collection', roles: ['revenue_collector', 'super_admin'] },
    { id: 'licenses', icon: FileText, label: 'Licenses & Permits', roles: ['licensing_officer', 'super_admin', 'revenue_manager', 'citizen'] },
    { id: 'reports', icon: FileText, label: 'Reports', roles: ['super_admin', 'revenue_manager', 'auditor'] },
    { id: 'citizens', icon: Users, label: 'Citizens', roles: ['super_admin', 'revenue_manager'] },
    { id: 'departments', icon: Building2, label: 'Departments', roles: ['super_admin', 'revenue_manager'] },
    { id: 'gis', icon: Map, label: 'GIS Mapping', roles: ['super_admin', 'revenue_manager'] },
    { id: 'channels', icon: Smartphone, label: 'Payment Channels', roles: ['super_admin'] },
    { id: 'settings', icon: SettingsIcon, label: 'Settings', roles: ['super_admin', 'revenue_manager', 'revenue_collector', 'licensing_officer', 'auditor', 'citizen'] },
  ];

  const navItems = allNavItems.filter(item => item.roles.includes(role));

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900/50 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-30 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-500">
            <Building2 className="h-6 w-6" />
            <span>GovPay</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="lg:hidden w-8 h-8 p-0" 
            onClick={() => setIsOpen(false)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col justify-between flex-1 py-4 overflow-y-auto scrollbar-hide">
          <nav className="px-4 space-y-1">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-600 dark:text-blue-500' : 'text-gray-400 dark:text-gray-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="px-4 mt-8">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
