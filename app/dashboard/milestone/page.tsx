import React from 'react'
import { FaTrophy, FaStar, FaCar, FaMapMarkedAlt, FaUserPlus, FaGift, FaShieldAlt, FaCopy } from 'react-icons/fa'
import { ReferralSection } from '@/components/referal'

const MilestonePage = () => {
  // Sample data - replace with your actual data
  const rideMilestones = [
    { target: 50, reward: '£50 bonus', achieved: true },
    { target: 100, reward: 'Free Vehicle Service', achieved: true },
    { target: 250, reward: '£150 bonus', achieved: false },
    { target: 500, reward: 'Premium Maintenance Kit', achieved: false },
    { target: 1000, reward: 'Vaam Elite Status', achieved: false },
  ]

  const distanceMilestones = [
    { target: 1000, unit: 'km', reward: '£30 fuel voucher', achieved: true },
    { target: 5000, unit: 'km', reward: 'Tyre Discount 20%', achieved: true },
    { target: 10000, unit: 'km', reward: 'Major Service 30% Off', achieved: false },
    { target: 25000, unit: 'km', reward: 'Insurance Premium Benefit', achieved: false },
  ]

  const referralMilestones = [
    { target: 5, reward: '€100 bonus', achieved: false },
    { target: 10, reward: '€250 + Service Credit', achieved: false },
    { target: 20, reward: 'VIP Partner Benefits', achieved: false },
  ]

  const currentStats = {
    ridesCompleted: 127,
    distanceCovered: 3800,
    referralsMade: 3,
    rating: 4.8,
  }

  // Copy referral code to clipboard
  const copyReferralCode = () => {
    const code = `VAAM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    navigator.clipboard.writeText(code)
    // You might want to add a toast notification here
  }

  return (
    <div className="min-h-screen  p-4 sm:p-6 transition-colors duration-300">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Vaam Driver Rewards</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Earn rewards for your dedication and performance on the Vaam platform
            </p>
          </div>
          <div className="hidden md:block">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#ffd342] bg-opacity-20 text-[#d4a732] dark:text-[#ffd342]">
              <FaStar className="mr-1" /> Rewards Program
            </span>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: FaCar, label: "Rides Completed", value: currentStats.ridesCompleted },
          { icon: FaMapMarkedAlt, label: "Distance Covered", value: `${currentStats.distanceCovered} km` },
          { icon: FaUserPlus, label: "Referrals", value: currentStats.referralsMade },
          { icon: FaStar, label: "Your Rating", value: `${currentStats.rating}/5` },
        ].map((stat, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-black p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-[#ffd342]"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 mr-4">
                <stat.icon className="text-[#ffd342] text-xl" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Milestone Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ride Milestones */}
        <div className=" p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-lg bg-[#ffd342] bg-opacity-20 mr-3">
              <FaCar className="text-[#ffd342] text-2xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ride Milestones</h2>
          </div>
          
          <div className="space-y-4">
            {rideMilestones.map((milestone, index) => (
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
                    <FaTrophy className="text-white" />
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
                      {milestone.target} Rides
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
                        style={{ width: `${Math.min(100, (currentStats.ridesCompleted / milestone.target) * 100)}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distance Milestones */}
        <div className=" p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-lg bg-[#ffd342] bg-opacity-20 mr-3">
              <FaMapMarkedAlt className="text-[#ffd342] text-2xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Distance Milestones</h2>
          </div>
          
          <div className="space-y-4">
            {distanceMilestones.map((milestone, index) => (
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
                    <FaTrophy className="text-white" />
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
                      {milestone.target} {milestone.unit}
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
                        style={{ width: `${Math.min(100, (currentStats.distanceCovered / milestone.target) * 100)}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        
        {/* Referral Program - Client Component */}
        <ReferralSection 
          referralsMade={currentStats.referralsMade} 
          referralMilestones={referralMilestones} 
        />
      </div>

      {/* VIP Status Info */}
      <div className="mt-8   p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-lg bg-[#ffd342] bg-opacity-20 mr-3">
            <FaShieldAlt className="text-[#ffd342] text-2xl" />
          </div>
          <h2 className="text-xl font-bold">Vaam VIP Status</h2>
        </div>
        <p className="mb-6 ">
          Achieve Elite or VIP status by reaching milestones to unlock exclusive benefits like higher earnings, 
          priority support, and special bonuses.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Silver Tier",
              requirements: "500+ rides OR 10,000 km",
              benefits: [
                "+5% earnings boost",
                "Priority customer matching"
              ]
            },
            {
              title: "Gold Tier",
              requirements: "1,000+ rides OR 25,000 km",
              benefits: [
                "+10% earnings boost",
                "Free premium vehicle inspection",
                "Dedicated support"
              ]
            },
            {
              title: "Platinum Tier",
              requirements: "2,500+ rides OR 50,000 km",
              benefits: [
                "+15% earnings boost",
                "Annual bonus up to €1,000",
                "VIP customer matching",
                "Concierge support"
              ]
            }
          ].map((tier, index) => (
            <div 
              key={index} 
              className=" bg-opacity-10 p-4 rounded-lg border  hover:border-[#ffd342] transition-colors duration-300"
            >
              <h3 className="font-medium text-[#ffd342]">{tier.title}</h3>
              <p className="text-sm  mb-3">{tier.requirements}</p>
              <ul className="text-sm space-y-2">
                {tier.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-[#ffd342] mr-2">•</span>
                    <span className="text-gray-500">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-8 text-center">
        <p className="  mb-4">
          Have questions about the rewards program?
        </p>
        <a 
          href="/dashboard/contact" 
          className="inline-block bg-[#ffd342] text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-[#f0c530] transition-colors shadow-sm"
        >
          Contact Support
        </a>
      </div>
    </div>
  )
}

export default MilestonePage