"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, User, Wallet, CreditCard, Menu, Mail, Trophy, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { useSupabase } from "@/lib/supabase-client";
import { ModeToggle } from "./global/ModeToggle";

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
    label: "Milestones",
    icon: Trophy,
    href: "/dashboard/milestone",
    color: "text-orange-500",
  },
  {
    label: "Subscription",
    icon: CreditCard,
    href: "/dashboard/subscription",
    color: "text-orange-700",
  },
  {
    label: "Contact",
    icon: Mail,
    href: "/dashboard/contact",
    color: "text-blue-400",
  },
];

export function Header() {
  const pathname = usePathname();
  const { supabase } = useSupabase();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/signin");
      router.refresh(); // Force a refresh to ensure clean state
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[rgb(10,10,10)] text-white z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        {/* Mobile Header (below md breakpoint) */}
        <div className="flex items-center justify-between h-16 md:hidden">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <h1 className="text-2xl font-bold text-white">Vaam</h1>
          </Link>
          <div className="flex items-center gap-2">
            <ModeToggle />
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
              <SheetContent side="left" className="bg-[rgb(10,10,10)] text-white p-0 w-64">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-gray-800">
                    <h1 className="text-2xl font-bold text-white">Vaam</h1>
                  </div>
                  <nav className="flex flex-col p-4 space-y-3">
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
                  <div className="mt-auto p-4 border-t border-gray-800">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full p-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      <LogOut className="h-5 w-5 mr-3 text-red-500" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Desktop Header (md and above) */}
        <div className="hidden md:flex items-center justify-between h-16">
          <Link href="/">
            <h1 className="text-2xl font-bold text-white">Vaam</h1>
          </Link>
          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-6">
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
            <div className="flex items-center gap-4">
              <ModeToggle />
              <button
                onClick={handleSignOut}
                className="flex items-center bg-[#ffd342] text-black font-medium py-2 px-4 rounded-full hover:bg-[#e6bd3b] transition-colors shadow-md"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}