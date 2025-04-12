"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DollarSign, ArrowLeft } from "lucide-react";

export default function WithdrawPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  
  // Simulated wallet data (replace with real data from your backend)
  const walletData = {
    totalEarnings: 245.75,
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (withdrawAmount > walletData.totalEarnings) {
      setError("Amount exceeds available earnings.");
      return;
    }
    // Add withdrawal logic here (e.g., API call)
    console.log(`Withdrawing £${withdrawAmount}`);
    router.push("/dashboard/earnings"); // Redirect back after success
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[rgb(10,10,10)] p-4 md:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto pt-16">
        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard/subscription")}
          className="flex items-center gap-2 text-black dark:text-white mb-6 hover:text-[#ffd342] transition-colors"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        {/* Withdraw Card */}
        <div className="bg-white dark:bg-black rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white flex items-center gap-2 mb-6">
            <DollarSign className="text-[#ffd342]" size={28} /> Withdraw Earnings
          </h1>

          <div className="space-y-6">
            {/* Available Balance */}
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Available Balance:{" "}
                <span className="font-bold text-black dark:text-white">
                  £{walletData.totalEarnings.toFixed(2)}
                </span>
              </p>
            </div>

            {/* Amount Input */}
            <div>
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError("");
                }}
                placeholder="Enter amount to withdraw"
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffd342]"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            {/* Withdraw Button */}
            <button
              onClick={handleWithdraw}
              className="w-full bg-[#ffd342] text-black py-3 rounded-xl font-semibold hover:bg-[#e6bd3b] transition-colors"
            >
              Confirm Withdrawal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}