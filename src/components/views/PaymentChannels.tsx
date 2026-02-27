import React from 'react';
import { Smartphone, CreditCard, Globe, MessageSquare, Settings, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';

export function PaymentChannels() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Payment Channels</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Configure and monitor multi-channel payment integrations.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
              <Smartphone className="h-6 w-6" />
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Active</span>
          </CardHeader>
          <CardContent className="pt-4">
            <CardTitle className="text-lg mb-1">USSD Gateway</CardTitle>
            <CardDescription className="mb-4">Shortcode *123# for basic phones</CardDescription>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Uptime</span><span className="font-medium text-green-600">99.9%</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Daily Volume</span><span className="font-medium">12,450 txns</span></div>
            </div>
            <Button variant="outline" className="w-full mt-6 gap-2"><Settings className="h-4 w-4" /> Configure</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Globe className="h-6 w-6" />
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Active</span>
          </CardHeader>
          <CardContent className="pt-4">
            <CardTitle className="text-lg mb-1">Web Portal</CardTitle>
            <CardDescription className="mb-4">Online citizen self-service portal</CardDescription>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Uptime</span><span className="font-medium text-green-600">100%</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Daily Volume</span><span className="font-medium">5,230 txns</span></div>
            </div>
            <Button variant="outline" className="w-full mt-6 gap-2"><Settings className="h-4 w-4" /> Configure</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <CreditCard className="h-6 w-6" />
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Active</span>
          </CardHeader>
          <CardContent className="pt-4">
            <CardTitle className="text-lg mb-1">Bank Integration</CardTitle>
            <CardDescription className="mb-4">Direct bank transfers & cards</CardDescription>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Uptime</span><span className="font-medium text-green-600">99.5%</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Daily Volume</span><span className="font-medium">1,890 txns</span></div>
            </div>
            <Button variant="outline" className="w-full mt-6 gap-2"><Settings className="h-4 w-4" /> Configure</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <MessageSquare className="h-6 w-6" />
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Beta</span>
          </CardHeader>
          <CardContent className="pt-4">
            <CardTitle className="text-lg mb-1">WhatsApp Bot</CardTitle>
            <CardDescription className="mb-4">Conversational payment flow</CardDescription>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="font-medium text-yellow-600">Testing Phase</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Active Users</span><span className="font-medium">450</span></div>
            </div>
            <Button variant="outline" className="w-full mt-6 gap-2"><Activity className="h-4 w-4" /> View Metrics</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
