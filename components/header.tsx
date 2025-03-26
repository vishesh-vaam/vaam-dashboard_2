"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, User, Wallet, CreditCard, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "My Account",
    icon: User,
    href: "/dashboard/account",
    color: "text-violet-500",
  },
  {
    label: "Earnings",
    icon: Wallet,
    href: "/dashboard/earnings",
    color: "text-pink-700",
  },
  {
    label: "Subscription",
    icon: CreditCard,
    href: "/dashboard/subscription",
    color: "text-orange-700",
  },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-black text-white z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        {/* Mobile Header (below md breakpoint) */}
        <div className="flex items-center justify-between h-16 md:hidden">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <h1 className="text-2xl font-bold text-white">DriveHub</h1>
          </Link>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-gray-800"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-black text-white p-0 w-64">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-800">
                  <h1 className="text-2xl font-bold text-white">DriveHub</h1>
                </div>
                <nav className="flex flex-col flex-1 p-4 space-y-2">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "flex items-center p-3 rounded-lg text-sm font-medium transition-colors",
                        pathname === route.href
                          ? "bg-[#ffd342] text-black"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Header (md and above) */}
        <div className="hidden md:flex items-center justify-between h-16">
          <Link href="/">
            <h1 className="text-2xl font-bold text-white">DriveHub</h1>
          </Link>
          <nav className="flex items-center space-x-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors",
                  pathname === route.href
                    ? "text-[#ffd342]"
                    : "text-gray-400 hover:text-white"
                )}
              >
                <route.icon className={cn("h-5 w-5 mr-2", route.color)} />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}