"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Star, Wallet } from "lucide-react";
import { ModeToggle } from "./global/ModeToggle";
import { useUser } from "@supabase/auth-helpers-react";

export function UserInfo() {
  const user = useUser();

  // If user data is still loading, show a loading message
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-4">
      <Card className="border-none shadow-md bg-white dark:bg-black">
        <CardContent className="flex items-center space-x-4 pt-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60" />
            <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
              {user.email ? user.email[0].toUpperCase() : "DU"}
            </AvatarFallback>
          </Avatar>
          <div className="truncate">
            <h2 className="text-xl font-bold text-black dark:text-white truncate">
              {user.email ? user.email.split("@")[0] : "Driver"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">Premium Driver</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-black shadow-md border-2 border-[#ffd342]">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-black dark:text-white">
            Driver Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wallet className="h-4 w-4 text-[#ffd342]" />
              <span className="text-sm text-black dark:text-white">Earnings</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-black dark:text-white">$2,458.00</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">+20.1% last mo.</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Car className="h-4 w-4 text-[#ffd342]" />
              <span className="text-sm text-black dark:text-white">Trips</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-black dark:text-white">142 Total</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">18 this mo.</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-[#ffd342]" />
              <span className="text-sm text-black dark:text-white">Rating</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-black dark:text-white">4.8</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">95 reviews</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="hidden md:block">
        <ModeToggle />
      </div>
    </div>
  );
}