"use client";

import { useState } from "react";
import { X, DollarSign } from "lucide-react";

interface WithdrawModalProps {
  totalEarnings: number;
  onClose: () => void;
}

export function WithdrawModal({ totalEarnings, onClose }: WithdrawModalProps) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (withdrawAmount > totalEarnings) {
      setError("Amount exceeds available earnings.");
      return;
    }
    // Add withdrawal logic here (e.g., API call)
    console.log(`Withdrawing £${withdrawAmount}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-black rounded-2xl p-6 max-w-md w-full border border-gray-200 dark:border-gray-800 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-black dark:text-white flex items-center gap-2">
            <DollarSign className="text-[#ffd342]" size={24} /> Withdraw Earnings
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Available Balance: <span className="font-bold text-black dark:text-white">£{totalEarnings.toFixed(2)}</span>
          </p>
        </div>

        <div className="space-y-4 mb-6">
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <button
          onClick={handleWithdraw}
          className="w-full bg-[#ffd342] text-black py-3 rounded-xl font-semibold hover:bg-[#e6bd3b] transition-colors"
        >
          Confirm Withdrawal
        </button>
      </div>
    </div>
  );
}