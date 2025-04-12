'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { PhoneIcon, MapIcon, ExclamationCircleIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface FormData {
  issueType: string;
  description: string;
}

const SupportPage = () => {
  const [formData, setFormData] = useState<FormData>({
    issueType: '',
    description: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Support request submitted:', formData);
    setFormData({ issueType: '', description: '' });
  };

  const handleInputChange = (e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen text-black dark:text-white ">
      {/* Header */}
      <header className="p-4 sm:p-6  rounded-b-lg shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center dark:text-[#ffd342]">
          Vaam Driver Support
        </h1>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8">
        {/* Emergency Section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="p-6 sm:p-8 bg-white dark:bg-black rounded-xl shadow-lg border-l-4 border-[#ffd342]"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3">
            <ExclamationCircleIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#ffd342]" />
            Emergency Support
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-4 rounded-lg ">
              <PhoneIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#ffd342] flex-shrink-0" />
              <div>
                <p className="font-semibold text-base sm:text-lg">Emergency Hotline</p>
                <p className="text-[#ffd342] text-lg sm:text-xl">+44 7552 037 496</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg ">
              <MapIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#ffd342] flex-shrink-0" />
              <div>
                <p className="font-semibold text-base sm:text-lg">Support Email</p>
                <p className="text-[#ffd342] text-lg sm:text-xl">info@ridevaam.com</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Report Form */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="p-6 sm:p-8  rounded-xl shadow-lg border-t-4 border-[#ffd342]"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Report an Incident</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Issue Type
              </label>
              <select
                name="issueType"
                value={formData.issueType}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-300 text-black dark:text-white  focus:ring-2 focus:ring-[#ffd342] focus:border-transparent text-base"
                required
              >
                <option value="">Select an issue</option>
                <option value="passenger">Passenger Issue</option>
                <option value="vehicle">Vehicle Problem</option>
                <option value="payment">Payment Dispute</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-300 text-black dark:text-white  focus:ring-2 focus:ring-[#ffd342] focus:border-transparent min-h-[120px] sm:min-h-[150px] text-base"
                placeholder="Describe your issue in detail..."
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full p-3 bg-[#ffd342] text-black font-semibold rounded-lg hover:bg-opacity-90 transition-colors text-base"
            >
              Submit Report
            </motion.button>
          </form>
        </motion.section>

        {/* Contact Us Section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="p-6 sm:p-8 bg-white dark:bg-black rounded-xl shadow-lg border-r-4 border-[#ffd342]"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Contact Us</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-lg ">
              <PhoneIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#ffd342] flex-shrink-0" />
              <div>
                <p className="font-semibold text-base sm:text-lg">Customer Support</p>
                <p className="text-lg sm:text-xl">+44 7552 037 496</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg ">
              <MapIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#ffd342] flex-shrink-0" />
              <div>
                <p className="font-semibold text-base sm:text-lg">General Inquiries</p>
                <p className="text-lg sm:text-xl">info@ridevaam.com</p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="font-semibold text-base sm:text-lg">Social Media</p>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <a
                  href="https://x.com/ridevaam"
                  className="text-[#ffd342] text-base sm:text-lg hover:underline transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="https://www.facebook.com/people/VAAM/61571934550106/"
                  className="text-[#ffd342] text-base sm:text-lg hover:underline transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/ridevaam/"
                  className="text-[#ffd342] text-base sm:text-lg hover:underline transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#ffd342] text-black rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-base"
              >
                <ChatBubbleLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                Start Live Chat
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Additional Resources */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="p-6 sm:p-8  rounded-xl shadow-lg border-b-4 border-[#ffd342]"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Additional Resources</h2>
          <ul className="space-y-4">
            <li>
              <a
                href="guidelines"
                className="text-[#ffd342] text-base sm:text-lg hover:underline transition-colors"
              >
                Driver Safety Guidelines
              </a>
            </li>
            <li>
              <a href="terms" className="text-[#ffd342] text-base sm:text-lg hover:underline transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="faq" className="text-[#ffd342] text-base sm:text-lg hover:underline transition-colors">
                FAQ Section
              </a>
            </li>
          </ul>
        </motion.section>
      </main>
    </div>
  );
};

export default SupportPage;