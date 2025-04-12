'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarDays, Clock, Wallet, DollarSign, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Link from 'next/link';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#1a1a1a',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      padding: 12,
      displayColors: false,
      callbacks: {
        label: function (context: any) {
          return `£${context.parsed.y}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#a3a3a3',
        font: {
          size: 12,
        },
      },
    },
    y: {
      grid: {
        color: '#333333',
      },
      ticks: {
        color: '#a3a3a3',
        callback: function (value: any) {
          return '£' + value;
        },
        font: {
          size: 12,
        },
      },
    },
  },
};

const weeklyData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [120, 85, 150, 95, 180, 210, 165],
      backgroundColor: '#ffd342',
      borderRadius: 8,
      borderSkipped: false,
    },
  ],
};

const monthlyData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      data: [850, 920, 780, 1100],
      backgroundColor: '#ffd342',
      borderRadius: 8,
      borderSkipped: false,
    },
  ],
};

const walletData = {
  totalEarnings: 245.75,
  pendingPayout: 45.2,
  lastWithdrawal: 'April 1, 2025',
};

const recentTransactions = [
  {
    id: 1,
    type: 'Airport Transfer',
    amount: 45.0,
    date: new Date(2024, 1, 15, 14, 30),
    location: 'Heathrow Airport',
    status: 'completed',
  },
  {
    id: 2,
    type: 'City Ride',
    amount: 28.5,
    date: new Date(2024, 1, 15, 12, 15),
    location: 'Central London',
    status: 'completed',
  },
  {
    id: 3,
    type: 'Subscription Fee',
    amount: -29.99,
    date: new Date(2024, 1, 15, 0, 0),
    location: 'System',
    status: 'deducted',
  },
  {
    id: 4,
    type: 'Long Distance',
    amount: 75.2,
    date: new Date(2024, 1, 14, 18, 45),
    location: 'Brighton',
    status: 'completed',
  },
  {
    id: 5,
    type: 'Express Delivery',
    amount: 32.0,
    date: new Date(2024, 1, 14, 15, 20),
    location: 'Manchester',
    status: 'completed',
  },
];

export default function EarningsPage() {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');
  const totalEarnings = timeframe === 'weekly' ? 1005 : 3650;
  const comparisonPercent = timeframe === 'weekly' ? 12.5 : 8.2;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto pt-12 sm:pt-16 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-black dark:text-white">
            Earnings Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Track your earnings and financial performance
          </p>
        </div>
        <div className="flex items-center  rounded-xl p-1">
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
              timeframe === 'weekly'
                ? 'bg-[#ffd342] text-black'
                : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeframe('monthly')}
            className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
              timeframe === 'monthly'
                ? 'bg-[#ffd342] text-black'
                : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Chart and Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className=" p-4 sm:p-6 rounded-2xl shadow-lg sm:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-1 text-black dark:text-white">
                £{totalEarnings.toFixed(2)}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 text-sm sm:text-base">
                <span>vs previous {timeframe === 'weekly' ? 'week' : 'month'}</span>
                <span
                  className={`flex items-center ${
                    comparisonPercent >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {comparisonPercent >= 0 ? (
                    <ArrowUpRight size={16} />
                  ) : (
                    <ArrowDownRight size={16} />
                  )}
                  {Math.abs(comparisonPercent)}%
                </span>
              </p>
            </div>
            <div className="bg-[#ffd342]/10 p-3 rounded-full mt-4 sm:mt-0">
              <TrendingUp className="text-[#ffd342]" size={24} />
            </div>
          </div>
          <div className="h-[200px] sm:h-[250px] md:h-[300px]">
            <Bar options={options} data={timeframe === 'weekly' ? weeklyData : monthlyData} />
          </div>
        </div>

        <div className=" p-4 sm:p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-black dark:text-white">
            Quick Stats
          </h2>
          <div className="space-y-4">
            <div className="p-3 sm:p-4  rounded-xl">
              <p className="text-gray-600 dark:text-gray-400 mb-1 text-sm sm:text-base">
                Total Rides
              </p>
              <p className="text-xl sm:text-2xl font-bold text-black dark:text-white">
                {timeframe === 'weekly' ? '42' : '168'}
              </p>
            </div>
            <div className="p-3 sm:p-4  rounded-xl">
              <p className="text-gray-600 dark:text-gray-400 mb-1 text-sm sm:text-base">
                Average Per Ride
              </p>
              <p className="text-xl sm:text-2xl font-bold text-black dark:text-white">
                £{(totalEarnings / (timeframe === 'weekly' ? 42 : 168)).toFixed(2)}
              </p>
            </div>
            <div className="p-3 sm:p-4  rounded-xl">
              <p className="text-gray-600 dark:text-gray-400 mb-1 text-sm sm:text-base">
                Online Hours
              </p>
              <p className="text-xl sm:text-2xl font-bold text-black dark:text-white">
                {timeframe === 'weekly' ? '38' : '152'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Section */}
      <div className=" rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white flex items-center gap-2">
            <Wallet className="text-[#ffd342]" size={20} /> Wallet
          </h2>
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
            Updated: April 4, 2025
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 sm:mb-6">
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 text-sm sm:text-base">
              <DollarSign size={16} /> Total Earnings
            </p>
            <p className="text-xl sm:text-2xl font-bold text-black dark:text-white">
              £{walletData.totalEarnings.toFixed(2)}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 text-sm sm:text-base">
              <Clock size={16} /> Pending Payout
            </p>
            <p className="text-xl sm:text-2xl font-bold text-black dark:text-white">
              £{walletData.pendingPayout.toFixed(2)}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 text-sm sm:text-base">
              <CalendarDays size={16} /> Last Withdrawal
            </p>
            <p className="text-base sm:text-lg font-medium text-black dark:text-white">
              {walletData.lastWithdrawal}
            </p>
          </div>
        </div>

        <Link href="/dashboard/withdraw">
          <button className="w-full sm:w-auto bg-[#ffd342] text-black py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold hover:bg-[#e6bd3b] transition-colors text-sm sm:text-base">
            Withdraw Earnings
          </button>
        </Link>
      </div>

      {/* Recent Transactions Section */}
      <div className=" rounded-2xl p-4 sm:p-6 shadow-lg">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-black dark:text-white">
          Recent Transactions
        </h2>
        {/* Mobile: Card Layout */}
        <div className="sm:hidden space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4  rounded-xl border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {transaction.type === 'Subscription Fee' ? (
                    <div className="bg-red-500/10 p-2 rounded-full">
                      <Clock className="text-red-500" size={20} />
                    </div>
                  ) : (
                    <div className="bg-green-500/10 p-2 rounded-full">
                      <MapPin className="text-green-500" size={20} />
                    </div>
                  )}
                  <span className="font-medium text-black dark:text-white">{transaction.type}</span>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {transaction.amount < 0 ? '-' : '+'}£{Math.abs(transaction.amount).toFixed(2)}
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p>{format(transaction.date, 'MMM d, yyyy HH:mm')}</p>
                <p>{transaction.location}</p>
                <p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                      transaction.status === 'completed'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-red-500/10 text-red-500'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop/Tablet: Table Layout */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600 text-sm">
                <th className="text-left py-3">Type</th>
                <th className="text-left py-3">Amount</th>
                <th className="text-left py-3">Date & Time</th>
                <th className="text-left py-3">Location</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-200 dark:border-gray-600"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      {transaction.type === 'Subscription Fee' ? (
                        <div className="bg-red-500/10 p-2 rounded-full">
                          <Clock className="text-red-500" size={20} />
                        </div>
                      ) : (
                        <div className="bg-green-500/10 p-2 rounded-full">
                          <MapPin className="text-green-500" size={20} />
                        </div>
                      )}
                      <span className="text-black dark:text-white">{transaction.type}</span>
                    </div>
                  </td>
                  <td
                    className={`py-4 ${
                      transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
                    }`}
                  >
                    {transaction.amount < 0 ? '-' : '+'}£{Math.abs(transaction.amount).toFixed(2)}
                  </td>
                  <td className="py-4 text-gray-600 dark:text-gray-400">
                    {format(transaction.date, 'MMM d, yyyy HH:mm')}
                  </td>
                  <td className="py-4 text-black dark:text-white">{transaction.location}</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        transaction.status === 'completed'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}