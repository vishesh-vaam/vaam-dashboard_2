"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import logo from "@/public/logo.png";
import logo_dark from "@/public/logo_dark.png";

export function Footer() {
  const { resolvedTheme } = useTheme();  
  // resolvedTheme will be "light" or "dark"
  const logoSrc = resolvedTheme === "dark" ? logo_dark : logo;

  return (
    <footer className="bg-white text-black dark:bg-[#141414] dark:text-white">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand & Copy */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Image
              src={logoSrc}
              alt="Vaam Logo"
              width={70}
              height={70}
              className="rounded-full"
            />
            
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed">
            Copyright © 2025. All Rights Reserved<br/>
            Ride Vaam is a trading name of Vaam LTD.<br/>
            Vaam LTD is registered in England &amp; Wales (Company No 16199364).
          </p>
          <div className="flex space-x-4">
            <a href="https://x.com/ridevaam" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-gray-600 hover:text-black dark:text-gray-500 dark:hover:text-white" />
            </a>
            <a href="https://www.facebook.com/people/VAAM/61571934550106/" aria-label="Facebook">
              <Facebook className="h-5 w-5 text-gray-600 hover:text-black dark:text-gray-500 dark:hover:text-white" />
            </a>
            <a href="https://www.instagram.com/ridevaam/" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-gray-600 hover:text-black dark:text-gray-500 dark:hover:text-white" />
            </a>
            <a href="https://www.linkedin.com/company/ridevaam/posts/?feedView=all" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-gray-600 hover:text-black dark:text-gray-500 dark:hover:text-white" />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="mb-4 font-semibold text-black dark:text-white">Navigation</h3>
          <ul className="space-y-2">
            {[
              ["Dashboard", "/dashboard"],
              ["Earnings", "/dashboard/earnings"],
              ["Milestones", "/dashboard/milestone"],
              ["Subscription", "/dashboard/subscription"],
              ["Support", "/dashboard/contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="mb-4 font-semibold text-black dark:text-white">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/privacy-policy"
                className="text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-of-service"
                className="text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-4">
        <p className="text-center text-sm text-gray-600 dark:text-gray-500">
          © 2025 Vaam. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
