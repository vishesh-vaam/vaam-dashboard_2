// app/ride-details/[id]/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Calendar, ArrowLeft, DollarSign, Ruler } from "lucide-react";
import Link from "next/link";

export default function RideDetails({ params }: { params: { id: string } }) {
  const ride = {
    id: params.id,
    date: "12/12/2024",
    startTime: "12:00 AM",
    endTime: "12:32 AM",
    duration: "32.4 mins",
    distance: "8.7 miles",
    pickup: "Serica Court, 154 Serica Court, Greenwich High Road, London, SE10 8NZ, England",
    destination: "Soho Square, London W1D 3QP, United Kingdom",
    customerPaid: 28.50,
    driverEarned: 22.80,
  };

  return (
    <main className="min-h-screen  p-6 md:p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-6">
        {/* Back Button */}
        <Link href="/dashboard">
          <button className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-[#ffd342] dark:hover:text-[#ffd342] transition-colors duration-200">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>
        </Link>

        {/* Ride Details Card */}
        <Card className=" border border-gray-200/50 dark:border-[#ffd342]/20 rounded-2xl shadow-xl overflow-hidden">
          <CardHeader className="border-b border-gray-200/50 dark:border-[#ffd342]/20 bg-gradient-to-r from-[#ffd342]/10 to-transparent">
            <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <MapPin className="h-6 w-6 text-[#ffd342]" />
              Ride Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            {/* Location and Date */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">London</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">Soho Square</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Calendar className="h-4 w-4 text-[#ffd342]" />
                <p className="text-sm text-gray-500 dark:text-gray-400">{ride.date}</p>
              </div>
            </div>

            {/* Time, Duration, and Distance */}
            <div className="grid grid-cols-3 gap-4  rounded-xl py-4 px-6 shadow-inner">
              <div className="text-center">
                <p className="text-xl font-bold text-[#ffd342]">{ride.startTime}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Start Time</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-[#ffd342]">{ride.endTime}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">End Time</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-[#ffd342]">{ride.duration}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Duration</p>
              </div>
              <div className="text-center col-span-3 mt-4">
                <div className="flex items-center justify-center gap-2">
                  <Ruler className="h-4 w-4 text-[#ffd342]" />
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">{ride.distance}</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Distance</p>
              </div>
            </div>

            {/* Fare Details */}
            <div className=" rounded-xl p-4 shadow-inner">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-[#ffd342]" />
                  <p className="text-sm font-medium text-gray-800 dark:text-white">Customer Paid</p>
                </div>
                <p className="text-lg font-bold text-gray-800 dark:text-white">£{ride.customerPaid.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-[#ffd342]" />
                  <p className="text-sm font-medium text-gray-800 dark:text-white">You Earned</p>
                </div>
                <p className="text-lg font-bold text-gray-800 dark:text-white">£{ride.driverEarned.toFixed(2)}</p>
              </div>
            </div>

            {/* Pickup and Destination */}
            <div className="space-y-4 border border-gray-200/50 dark:border-[#ffd342]/20 rounded-xl p-4 shadow-inner ">
              <div className="flex items-start gap-3">
                <span className="w-4 h-4 bg-[#ffd342] rounded-full mt-1"></span>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">Pickup</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{ride.pickup}</p>
                </div>
              </div>
              <div className="flex items-center justify-start">
                <span className="text-gray-500 dark:text-gray-400 mx-5">↓</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-4 h-4 bg-[#ffd342] rounded-full mt-1"></span>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">Destination</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{ride.destination}</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-4">
              <button className="bg-[#ffd342] text-gray-900 text-sm font-medium py-2 px-6 rounded-full  transition-colors duration-200 shadow-md">
                Get Receipt
              </button>
              <Link href="/dashboard/contact">
              <button className=" text-[#ffd342] text-sm font-medium py-2 px-6 rounded-full border border-[#ffd342] hover:bg-[#ffd342] hover:text-gray-900 dark:hover:text-black transition-colors duration-200 shadow-md">
                Report Issue
              </button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}