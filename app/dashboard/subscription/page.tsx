"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, AlertCircle, Shield, Zap, Trophy, Wallet, DollarSign, Clock } from "lucide-react";

export default function SubscriptionPage() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);

  const benefits = [
    { icon: Shield, text: "Priority Support 24/7" },
    { icon: Zap, text: "Unlimited Ride Requests" },
    { icon: Trophy, text: "Premium Driver Status" },
  ];

  const walletData = {
    totalEarnings: 245.75,
    pendingPayout: 45.20,
    lastWithdrawal: "April 1, 2025",
  };

  return (
    <div className="min-h-screen  dark:bg-[rgb(10,10,10)] p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto pt-16 space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-white">
          Vaam Driver Dashboard
        </h1>

        {/* Wallet Section */}
        <div className="bg-white dark:bg-black rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-black dark:text-white flex items-center gap-2">
              <Wallet className="text-[#ffd342]" size={24} /> Wallet
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">Updated: April 4, 2025</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <DollarSign size={16} /> Total Earnings
              </p>
              <p className="text-2xl font-bold text-black dark:text-white">
                £{walletData.totalEarnings.toFixed(2)}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Clock size={16} /> Pending Payout
              </p>
              <p className="text-2xl font-bold text-black dark:text-white">
                £{walletData.pendingPayout.toFixed(2)}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <CalendarDays size={16} /> Last Withdrawal
              </p>
              <p className="text-lg font-medium text-black dark:text-white">
                {walletData.lastWithdrawal}
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push("/dashboard/withdraw")}
            className="w-full md:w-auto bg-[#ffd342] text-black py-3 px-6 rounded-xl font-semibold hover:bg-[#e6bd3b] transition-colors"
          >
            Withdraw Earnings
          </button>
        </div>

        {/* Subscription Section */}
        <div className="bg-white dark:bg-black rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-black dark:text-white">
              Premium Weekly Plan
            </h2>
            <span className="bg-[#ffd342] px-3 py-1 rounded-full text-black font-medium text-sm">
              Recommended
            </span>
          </div>

          <div className="space-y-4 mb-6">
            {benefits.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <Icon className="text-[#ffd342]" size={20} />
                <span className="text-black dark:text-white">{text}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <CalendarDays className="text-[#ffd342]" size={20} />
            <span className="text-black dark:text-white">
              Next renewal on {expiryDate.toLocaleDateString()}
            </span>
          </div>

          <div className="mb-6">
            <div className="text-2xl md:text-3xl font-bold text-black dark:text-white">
              £29.99<span className="text-lg font-normal">/week</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Cancel anytime, no questions asked
            </p>
          </div>

          <button
            onClick={() => router.push("#")}
            className="w-full bg-[#ffd342] text-black py-3 rounded-xl font-semibold hover:bg-[#e6bd3b] transition-colors"
          >
            Renew Subscription
          </button>
        </div>

        {/* Cancel Subscription */}
        <div className="bg-white dark:bg-black rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setShowConfirmation(true)}
            className="w-full text-red-500 py-2 rounded-lg font-medium hover:bg-red-500/10 transition-colors"
          >
            Cancel Subscription
          </button>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-black rounded-2xl p-6 max-w-md w-full border border-gray-200 dark:border-gray-800 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="text-[#ffd342]" size={24} />
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  Cancel Subscription?
                </h3>
              </div>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Are you sure you want to cancel your subscription? You'll lose access to all premium features at the end of your current billing period.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-800 text-black dark:text-white py-3 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 bg-[#ffd342] text-black py-3 rounded-xl hover:bg-[#e6bd3b] transition-colors"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}