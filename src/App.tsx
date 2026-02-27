import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { Payments } from './components/views/Payments';
import { Reports } from './components/views/Reports';
import { Citizens } from './components/views/Citizens';
import { Departments } from './components/views/Departments';
import { Settings } from './components/views/Settings';
import { FieldCollection } from './components/views/FieldCollection';
import { Licenses } from './components/views/Licenses';
import { GISMapping } from './components/views/GISMapping';
import { PaymentChannels } from './components/views/PaymentChannels';
import { Notifications } from './components/views/Notifications';
import { User } from './types';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard role={user.role} user={user} setActiveView={setActiveView} />;
      case 'payments': return <Payments user={user} setActiveView={setActiveView} />;
      case 'collection': return <FieldCollection setActiveView={setActiveView} />;
      case 'licenses': return <Licenses user={user} setActiveView={setActiveView} />;
      case 'reports': return <Reports />;
      case 'citizens': return <Citizens setActiveView={setActiveView} />;
      case 'departments': return <Departments user={user} />;
      case 'gis': return <GISMapping />;
      case 'channels': return <PaymentChannels />;
      case 'notifications': return <Notifications />;
      case 'settings': return <Settings user={user} />;
      default: return <Dashboard role={user.role} user={user} setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-50 dark:bg-gray-950 flex transition-colors duration-300">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        activeView={activeView}
        setActiveView={setActiveView}
        onLogout={() => setUser(null)}
        role={user.role}
      />
      
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-300">
        <Header setSidebarOpen={setSidebarOpen} user={user} setActiveView={setActiveView} />
        
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
