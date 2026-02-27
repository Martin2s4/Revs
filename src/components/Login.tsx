import React, { useState } from 'react';
import { Building2, Lock, User as UserIcon } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === 'admin' && password === 'admins') {
      onLogin({ username: 'admin', name: 'System Admin', role: 'super_admin' });
    } else if (username === 'manager' && password === 'managers') {
      onLogin({ username: 'manager', name: 'Revenue Manager', role: 'revenue_manager' });
    } else if (username === 'collector' && password === 'collectors') {
      onLogin({ username: 'collector', name: 'Field Officer', role: 'revenue_collector' });
    } else if (username === 'licensing' && password === 'licensing') {
      onLogin({ username: 'licensing', name: 'Licensing Officer', role: 'licensing_officer' });
    } else if (username === 'auditor' && password === 'auditors') {
      onLogin({ username: 'auditor', name: 'Compliance Officer', role: 'auditor' });
    } else if (username === 'citizen' && password === 'citizens') {
      onLogin({ username: 'citizen', name: 'John Doe', role: 'citizen' });
    } else {
      setError('Invalid credentials. Try admin/admins, manager/managers, collector/collectors, licensing/licensing, auditor/auditors, citizen/citizens.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center items-center p-4">
      <div className="mb-8 flex flex-col items-center gap-2 text-blue-600 dark:text-blue-500">
        <Building2 className="h-12 w-12" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">GovPay</h1>
        <p className="text-gray-500 dark:text-gray-400">County e-Revenue Collection</p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-xl">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  placeholder="admin or user"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  placeholder="admins or users"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full mt-2">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
