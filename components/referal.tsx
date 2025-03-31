'use client'

import { FaUserPlus, FaGift, FaCopy } from 'react-icons/fa'
import { useState } from 'react'

export const ReferralSection = ({ referralsMade, referralMilestones }: {
  referralsMade: number
  referralMilestones: Array<{
    target: number
    reward: string
    achieved: boolean
  }>
}) => {
  const [copied, setCopied] = useState(false)

  const copyReferralCode = () => {
    const code = `VAAM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className=" p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 lg:col-span-2">
      <div className="flex items-center mb-6">
        <div className="p-2 rounded-lg bg-[#ffd342] bg-opacity-20 mr-3">
          <FaUserPlus className="text-[#ffd342] text-2xl" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Referral Program</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-4">Your Referral Code</h3>
          <div className=" bg-white dark:bg-black p-4 rounded-lg flex items-center justify-between transition-all hover:shadow">
            <code className="font-mono text-lg text-gray-900 dark:text-white">
              VAAM-{Math.random().toString(36).substring(2, 8).toUpperCase()}
            </code>
            <button 
              onClick={copyReferralCode}
              className="flex items-center bg-[#ffd342] text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-[#f0c530] transition-colors"
            >
              <FaCopy className="mr-2" /> {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
            Share your code with other drivers. When they sign up and complete 20 rides, you both earn rewards!
          </p>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-4">Referral Milestones</h3>
          <div className="space-y-4">
            {referralMilestones.map((milestone, index) => (
              <div 
                key={index} 
                className={`flex items-start p-3 rounded-lg transition-all duration-200 ${milestone.achieved ? 
                  'bg-[#ffd342] bg-opacity-10 border border-[#ffd342] border-opacity-30' : 
                  ''}`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-all ${milestone.achieved ? 
                  'bg-[#ffd342] shadow-md' : 
                  'bg-gray-200 dark:bg-gray-600'}`}
                >
                  {milestone.achieved ? (
                    <FaGift className="text-white" />
                  ) : (
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-baseline">
                    <h3 className={`font-medium ${milestone.achieved ? 
                      'text-gray-900 dark:text-white' : 
                      'text-gray-700 dark:text-gray-300'}`}
                    >
                      {milestone.target} Successful Referrals
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${milestone.achieved ? 
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}
                    >
                      {milestone.achieved ? 'Achieved' : 'Pending'}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${milestone.achieved ? 
                    'text-[#ffd342] font-medium' : 
                    'text-gray-500 dark:text-gray-400'}`}
                  >
                    Reward: {milestone.reward}
                  </p>
                  {!milestone.achieved && (
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-3">
                      <div 
                        className="bg-[#ffd342] h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, (referralsMade / milestone.target) * 100)}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}