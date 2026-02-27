import React, { useState } from 'react';
import { Map, Briefcase, Bus, HeartPulse, Wheat, MoreVertical, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { mockDepartments } from '../../data/mockData';
import { User } from '../../types';

const iconMap: Record<string, React.ElementType> = {
  Map, Briefcase, Bus, HeartPulse, Wheat
};

interface DepartmentsProps {
  user: User;
}

export function Departments({ user }: DepartmentsProps) {
  const [departments, setDepartments] = useState(mockDepartments);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDept, setNewDept] = useState({ name: '', target: '', icon: 'Briefcase' });
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const isSuperAdmin = user.role === 'super_admin';

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    const newDepartment = {
      id: `dept-${Date.now()}`,
      name: newDept.name,
      target: Number(newDept.target),
      collected: 0,
      transactions: 0,
      icon: newDept.icon
    };
    setDepartments([...departments, newDepartment]);
    setIsAddModalOpen(false);
    setNewDept({ name: '', target: '', icon: 'Briefcase' });
  };

  const handleDeleteDepartment = (id: string) => {
    if (confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(d => d.id !== id));
      setActiveMenu(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Departments</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Revenue collection targets and progress by department.</p>
        </div>
        {isSuperAdmin && (
          <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Department
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept) => {
          const Icon = iconMap[dept.icon] || Briefcase;
          const progress = Math.min(100, (dept.collected / (dept.target || 1)) * 100);
          
          return (
            <Card key={dept.id} className="flex flex-col relative">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Icon className="h-5 w-5" />
                </div>
                {isSuperAdmin && (
                  <div className="relative">
                    <button 
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
                      onClick={() => setActiveMenu(activeMenu === dept.id ? null : dept.id)}
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>
                    {activeMenu === dept.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 z-20 overflow-hidden">
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                            onClick={() => handleDeleteDepartment(dept.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Department
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-1 flex flex-col pt-4">
                <CardTitle className="text-lg mb-1">{dept.name}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{dept.transactions} transactions this month</p>
                
                <div className="mt-auto space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Collected</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">Ksh {dept.collected.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{progress.toFixed(1)}% of target</span>
                    <span>Target: Ksh {dept.target.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Department">
        <form onSubmit={handleAddDepartment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department Name</label>
            <input 
              type="text" 
              required
              value={newDept.name}
              onChange={(e) => setNewDept({...newDept, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Education"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monthly Target (Ksh)</label>
            <input 
              type="number" 
              required
              min="0"
              value={newDept.target}
              onChange={(e) => setNewDept({...newDept, target: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 50000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon</label>
            <select 
              value={newDept.icon}
              onChange={(e) => setNewDept({...newDept, icon: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Briefcase">Briefcase (General)</option>
              <option value="Map">Map (Lands/Planning)</option>
              <option value="Bus">Bus (Transport)</option>
              <option value="HeartPulse">Heart (Health)</option>
              <option value="Wheat">Wheat (Agriculture)</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Department</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
