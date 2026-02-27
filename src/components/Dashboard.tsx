import React, { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  Activity,
  CreditCard,
  Download,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Button } from "./ui/Button";
import { PaymentModal } from "./ui/PaymentModal";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { User, UserRole } from "../types";

const data = [
  { name: "Jan", total: Math.floor(Math.random() * 500) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 500) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 500) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 500) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jul", total: Math.floor(Math.random() * 50000) + 1000 },
  { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sep", total: Math.floor(Math.random() * 50000) + 1000 },
  { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Nov", total: Math.floor(Math.random() * 50000) + 1000 },
  { name: "Dec", total: Math.floor(Math.random() * 50000) + 1000 },
];

const recentTransactions = [
  {
    id: "TXN-001",
    name: "John Doe",
    amount: 150.0,
    status: "Completed",
    date: "2023-10-25",
    type: "Land Rates",
  },
  {
    id: "TXN-002",
    name: "Jane Smith",
    amount: 45.5,
    status: "Pending",
    date: "2023-10-25",
    type: "Market Fee",
  },
  {
    id: "TXN-003",
    name: "Acme Corp",
    amount: 1250.0,
    status: "Completed",
    date: "2023-10-24",
    type: "Business Permit",
  },
  {
    id: "TXN-004",
    name: "Michael Johnson",
    amount: 25.0,
    status: "Failed",
    date: "2023-10-24",
    type: "Parking Fee",
  },
  {
    id: "TXN-005",
    name: "Sarah Williams",
    amount: 300.0,
    status: "Completed",
    date: "2023-10-23",
    type: "Property Tax",
  },
];

interface DashboardProps {
  role: UserRole;
  user: User;
  setActiveView: (view: string) => void;
}

export function Dashboard({ role, user, setActiveView }: DashboardProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const isCitizen = role === "citizen";
  const isCollector = role === "revenue_collector";

  const displayTransactions = isCitizen
    ? recentTransactions.filter((t) => t.name === user.name)
    : recentTransactions;

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
            {isCitizen
              ? "My Dashboard"
              : isCollector
                ? "Field Dashboard"
                : "Overview Dashboard"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isCitizen
              ? "View your recent payments and active licenses."
              : "Overview of county revenue collection."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isCitizen && (
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => alert("Exporting dashboard data to CSV...")}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          )}
          <Button className="gap-2" onClick={() => setIsPaymentModalOpen(true)}>
            <DollarSign className="h-4 w-4" />
            {isCitizen ? "Pay Now" : "New Payment"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {isCitizen
                ? "Total Paid"
                : isCollector
                  ? "Collected Today"
                  : "Total Revenue"}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {isCitizen
                ? "Ksh 1,450.00"
                : isCollector
                  ? "Ksh 450.00"
                  : "Ksh 45,231.89"}
            </div>
            {!isCitizen && (
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +20.1% from last month
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {isCitizen ? "Active Licenses" : "Transactions"}
            </CardTitle>
            <CreditCard className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {isCitizen ? "2" : isCollector ? "45" : "+2350"}
            </div>
            {!isCitizen && (
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +15% from last month
              </p>
            )}
          </CardContent>
        </Card>
        {!isCitizen && !isCollector && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Active Citizens
                </CardTitle>
                <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  +12,234
                </div>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +8% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Collection Rate
                </CardTitle>
                <Activity className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  89.4%
                </div>
                <p className="text-xs text-red-600 dark:text-red-400 flex items-center mt-1">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  -2.1% from last month
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div
        className={`grid gap-4 ${isCitizen || isCollector ? "md:grid-cols-1" : "md:grid-cols-2 lg:grid-cols-7"}`}
      >
        {!isCitizen && !isCollector && (
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Monthly revenue collection across all departments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorTotal"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e5e7eb"
                      className="dark:stroke-gray-800"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                      tickFormatter={(value) => `Ksh ${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                      itemStyle={{ color: "#111827" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorTotal)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className={isCitizen || isCollector ? "" : "lg:col-span-3"}>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest payments received.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {displayTransactions.slice(0, isCitizen ? 3 : 5).map((txn) => (
                <div key={txn.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
                      {txn.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {txn.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {txn.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      +Ksh {txn.amount.toFixed(2)}
                    </p>
                    <p
                      className={`text-xs ${
                        txn.status === "Completed"
                          ? "text-green-600 dark:text-green-400"
                          : txn.status === "Pending"
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {txn.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-6"
              onClick={() => setActiveView("payments")}
            >
              View All Transactions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
