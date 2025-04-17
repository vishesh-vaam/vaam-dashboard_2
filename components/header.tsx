// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import {
//   LayoutDashboard,
//   User,
//   Wallet,
//   CreditCard,
//   Menu,
//   Mail,
//   Trophy,
//   LogOut,
// } from "lucide-react";
// import { Button } from "./ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
// import { useState, useEffect, useRef } from "react";
// import { useSupabase } from "@/lib/supabase-client";
// import { ModeToggle } from "./global/ModeToggle";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Car, Star, Wallet as WalletIcon } from "lucide-react";
// import { useUser } from "@supabase/auth-helpers-react";

// const routes = [
//   {
//     label: "Dashboard",
//     icon: LayoutDashboard,
//     href: "/dashboard",
//     color: "text-sky-500",
//   },
//   {
//     label: "Earnings",
//     icon: Wallet,
//     href: "/dashboard/earnings",
//     color: "text-pink-700",
//   },
//   {
//     label: "Milestones",
//     icon: Trophy,
//     href: "/dashboard/milestone",
//     color: "text-orange-500",
//   },
//   {
//     label: "Subscription",
//     icon: CreditCard,
//     href: "/dashboard/subscription",
//     color: "text-orange-700",
//   },
//   {
//     label: "Support",
//     icon: Mail,
//     href: "/dashboard/contact",
//     color: "text-blue-400",
//   },
// ];

// export function Header() {
//   const pathname = usePathname();
//   const { supabase } = useSupabase();
//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter();
//   const user = useUser();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const handleSignOut = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       router.push("/signin");
//       router.refresh();
//       setDropdownOpen(false);
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   // Derive name from email as a fallback
//   const displayName = user?.email ? user.email.split("@")[0] : "Driver";

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <header className="fixed top-0 left-0 right-0 bg-black text-white z-50 border-b border-gray-800">
//       <div className="container mx-auto px-4">
//         {/* Mobile Header (below md breakpoint) */}
//         <div className="flex items-center justify-between h-16 md:hidden">
//           <Link href="/" onClick={() => setIsOpen(false)}>
//             <h1 className="text-2xl font-bold text-white">Vaam</h1>
//           </Link>
//           <div className="flex items-center gap-2">
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffd342] rounded-full"
//               >
//                 <Avatar className="h-8 w-8 cursor-pointer transition-all hover:ring-2 hover:ring-[#ffd342]">
//                   <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60" />
//                   <AvatarFallback className="bg-gray-700 text-white">
//                     {user?.email ? user.email[0].toUpperCase() : "DU"}
//                   </AvatarFallback>
//                 </Avatar>
//               </button>
//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
//                   <Card className="border-none bg-white dark:bg-black">
//                     <CardContent className="flex items-center space-x-4 pt-4 pb-4">
//                       <Avatar className="h-16 w-16">
//                         <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60" />
//                         <AvatarFallback className="bg-gray-700 text-white">
//                           {user?.email ? user.email[0].toUpperCase() : "DU"}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="min-w-0">
//                         <h2 className="text-xl font-bold text-black dark:text-white truncate">
//                           {displayName}
//                         </h2>
//                         <p className="text-gray-600 dark:text-gray-400">Premium Driver</p>
//                         <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
//                           {user?.email || "No email"}
//                         </p>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <Card className="mt-4 bg-white dark:bg-black border-2 border-[#ffd342]">
//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-lg font-semibold text-black dark:text-white">
//                         Driver Overview
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-3">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-2">
//                           <WalletIcon className="h-4 w-4 text-[#ffd342]" />
//                           <span className="text-sm text-black dark:text-white">Earnings</span>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-sm font-semibold text-black dark:text-white">$2,458.00</p>
//                           <p className="text-xs text-gray-600 dark:text-gray-400">+20.1% last mo.</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-2">
//                           <Car className="h-4 w-4 text-[#ffd342]" />
//                           <span className="text-sm text-black dark:text-white">Trips</span>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-sm font-semibold text-black dark:text-white">142 Total</p>
//                           <p className="text-xs text-gray-600 dark:text-gray-400">18 this mo.</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-2">
//                           <Star className="h-4 w-4 text-[#ffd342]" />
//                           <span className="text-sm text-black dark:text-white">Rating</span>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-sm font-semibold text-black dark:text-white">4.8</p>
//                           <p className="text-xs text-gray-600 dark:text-gray-400">95 reviews</p>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <div className="mt-4 space-y-2">
//                     <div className="flex gap-2">
//                       <Link href="/dashboard/account" onClick={() => setDropdownOpen(false)}>
//                         <Button
//                           variant="outline"
//                           className="w-1/2 bg-white dark:bg-black text-black dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-2 text-sm"
//                         >
//                           My Profile
//                         </Button>
//                       </Link>
//                       <Link href="/dashboard/account?edit=true" onClick={() => setDropdownOpen(false)}>
//                         <Button
//                           variant="outline"
//                           className="w-1/2 bg-white dark:bg-black text-black dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-2 text-sm"
//                         >
//                           Update Profile
//                         </Button>
//                       </Link>
//                     </div>
//                     <Button
//                       onClick={handleSignOut}
//                       className="w-full bg-[#ffd342] text-black hover:bg-[#ffdc60] dark:bg-[#ffd342] dark:text-black dark:hover:bg-[#ffdc60] px-6 py-2 text-sm"
//                     >
//                       <LogOut className="h-4 w-4 mr-2" />
//                       Sign Out
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <ModeToggle />
//             <Sheet open={isOpen} onOpenChange={setIsOpen}>
//               <SheetTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="text-white hover:bg-gray-800"
//                 >
//                   <Menu className="h-6 w-6" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent
//                 side="left"
//                 className="bg-black text-white p-0 w-64"
//               >
//                 <div className="flex flex-col h-full">
//                   <div className="p-4 border-b border-gray-800">
//                     <h1 className="text-2xl font-bold text-white">Vaam</h1>
//                   </div>
//                   <nav className="flex flex-col p-4 space-y-3">
//                     {routes.map((route) => (
//                       <Link
//                         key={route.href}
//                         href={route.href}
//                         className={cn(
//                           "flex items-center p-3 rounded-lg text-sm font-medium transition-colors",
//                           pathname === route.href
//                             ? "bg-[#ffd342] text-black"
//                             : "text-gray-400 hover:bg-gray-800 hover:text-white"
//                         )}
//                         onClick={() => setIsOpen(false)}
//                       >
//                         <route.icon
//                           className={cn("h-5 w-5 mr-3", route.color)}
//                         />
//                         {route.label}
//                       </Link>
//                     ))}
//                   </nav>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>

//         {/* Desktop Header (md and above) */}
//         <div className="hidden md:flex items-center justify-between h-16">
//           <Link href="/">
//             <h1 className="text-2xl font-bold text-white">Vaam</h1>
//           </Link>
//           <div className="flex items-center gap-8">
//             <nav className="flex items-center gap-6">
//               {routes.map((route) => (
//                 <Link
//                   key={route.href}
//                   href={route.href}
//                   className={cn(
//                     "flex items-center text-sm font-medium transition-colors",
//                     pathname === route.href
//                       ? "text-[#ffd342]"
//                       : "text-gray-400 hover:text-white"
//                   )}
//                 >
//                   <route.icon className={cn("h-5 w-5 mr-2", route.color)} />
//                   {route.label}
//                 </Link>
//               ))}
//             </nav>
//             <div className="flex items-center gap-4">
//               <div className="relative" ref={dropdownRef}>
//                 <button
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   className="outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffd342] rounded-full"
//                 >
//                   <Avatar className="h-8 w-8 cursor-pointer transition-all hover:ring-2 hover:ring-[#ffd342]">
//                     <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60" />
//                     <AvatarFallback className="bg-gray-700 text-white">
//                       {user?.email ? user.email[0].toUpperCase() : "DU"}
//                     </AvatarFallback>
//                   </Avatar>
//                 </button>
//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
//                     <Card className="border-none bg-white dark:bg-black">
//                       <CardContent className="flex items-center space-x-4 pt-4 pb-4">
//                         <Avatar className="h-16 w-16">
//                           <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60" />
//                           <AvatarFallback className="bg-gray-700 text-white">
//                             {user?.email ? user.email[0].toUpperCase() : "DU"}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div className="min-w-0">
//                           <h2 className="text-xl font-bold text-black dark:text-white truncate">
//                             {displayName}
//                           </h2>
//                           <p className="text-gray-600 dark:text-gray-400">Premium Driver</p>
//                           <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
//                             {user?.email || "No email"}
//                           </p>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     <Card className="mt-4 bg-white dark:bg-black border-2 border-[#ffd342]">
//                       <CardHeader className="pb-2">
//                         <CardTitle className="text-lg font-semibold text-black dark:text-white">
//                           Driver Overview
//                         </CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-3">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-2">
//                             <WalletIcon className="h-4 w-4 text-[#ffd342]" />
//                             <span className="text-sm text-black dark:text-white">Earnings</span>
//                           </div>
//                           <div className="text-right">
//                             <p className="text-sm font-semibold text-black dark:text-white">$2,458.00</p>
//                             <p className="text-xs text-gray-600 dark:text-gray-400">+20.1% last mo.</p>
//                           </div>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-2">
//                             <Car className="h-4 w-4 text-[#ffd342]" />
//                             <span className="text-sm text-black dark:text-white">Trips</span>
//                           </div>
//                           <div className="text-right">
//                             <p className="text-sm font-semibold text-black dark:text-white">142 Total</p>
//                             <p className="text-xs text-gray-600 dark:text-gray-400">18 this mo.</p>
//                           </div>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-2">
//                             <Star className="h-4 w-4 text-[#ffd342]" />
//                             <span className="text-sm text-black dark:text-white">Rating</span>
//                           </div>
//                           <div className="text-right">
//                             <p className="text-sm font-semibold text-black dark:text-white">4.8</p>
//                             <p className="text-xs text-gray-600 dark:text-gray-400">95 reviews</p>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     <div className="mt-4 space-y-2">
//                       <div className="flex gap-2">
//                         <Link href="/dashboard/account" onClick={() => setDropdownOpen(false)}>
//                           <Button
//                             variant="outline"
//                             className="w-1/2 bg-white dark:bg-black text-black dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-2 text-sm"
//                           >
//                             My Profile
//                           </Button>
//                         </Link>
//                         <Link href="/dashboard/account?edit=true" onClick={() => setDropdownOpen(false)}>
//                           <Button
//                             variant="outline"
//                             className="w-1/2 bg-white dark:bg-black text-black dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-2 text-sm"
//                           >
//                             Update Profile
//                           </Button>
//                         </Link>
//                       </div>
//                       <Button
//                         onClick={handleSignOut}
//                         className="w-full bg-[#ffd342] text-black hover:bg-[#ffdc60] dark:bg-[#ffd342] dark:text-black dark:hover:bg-[#ffdc60] px-6 py-2 text-sm"
//                       >
//                         <LogOut className="h-4 w-4 mr-2" />
//                         Sign Out
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <ModeToggle />
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import {
//   LayoutDashboard,
//   User,
//   Wallet,
//   CreditCard,
//   Menu,
//   Mail,
//   Trophy,
//   LogOut,
// } from "lucide-react";
// import { Button } from "./ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
// import { useState, useEffect, useRef } from "react";
// import { useSupabase } from "@/lib/supabase-client";
// import { ModeToggle } from "./global/ModeToggle";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Car, Star, Wallet as WalletIcon } from "lucide-react";
// import { useUser } from "@supabase/auth-helpers-react";

// const routes = [
//   {
//     label: "Dashboard",
//     icon: LayoutDashboard,
//     href: "/dashboard",
//     color: "text-sky-500",
//   },
//   {
//     label: "Earnings",
//     icon: Wallet,
//     href: "/dashboard/earnings",
//     color: "text-pink-700",
//   },
//   {
//     label: "Milestones",
//     icon: Trophy,
//     href: "/dashboard/milestone",
//     color: "text-orange-500",
//   },
//   {
//     label: "Subscription",
//     icon: CreditCard,
//     href: "/dashboard/subscription",
//     color: "text-orange-700",
//   },
//   {
//     label: "Support",
//     icon: Mail,
//     href: "/dashboard/contact",
//     color: "text-blue-400",
//   },
// ];

// export function Header() {
//   const pathname = usePathname();
//   const { supabase } = useSupabase();
//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter();
//   const user = useUser();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const handleSignOut = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       router.push("/signin");
//       router.refresh();
//       setDropdownOpen(false);
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   // Derive name from email as a fallback
//   const displayName = user?.email ? user.email.split("@")[0] : "Driver";

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <header className="fixed top-0 left-0 right-0 bg-black text-white z-50 border-b border-gray-800">
//       <div className="container mx-auto px-4">
//         {/* Mobile Header (below md breakpoint) */}
//         <div className="flex items-center justify-between h-16 md:hidden">
//           <Link href="/" onClick={() => setIsOpen(false)}>
//             <h1 className="text-2xl font-bold text-white">Vaam</h1>
//           </Link>
//           <div className="flex items-center gap-2">
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffd342] rounded-full"
//               >
//                 <Avatar className="h-8 w-8 cursor-pointer transition-all hover:ring-2 hover:ring-[#ffd342]">
//                   <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60" />
//                   <AvatarFallback className="bg-gray-700 text-white">
//                     {user?.email ? user.email[0].toUpperCase() : "DU"}
//                   </AvatarFallback>
//                 </Avatar>
//               </button>
//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
//                   <Card className="border-none bg-white dark:bg-black">
//                     <CardContent className="flex items-center space-x-4 pt-4 pb-4">
//                       <Avatar className="h-16 w-16">
//                         <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60" />
//                         <AvatarFallback className="bg-gray-700 text-white">
//                           {user?.email ? user.email[0].toUpperCase() : "DU"}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="min-w-0">
//                         <h2 className="text-xl font-bold text-black dark:text-white truncate">
//                           {displayName}
//                         </h2>
//                         <p className="text-gray-600 dark:text-gray-400">
//                           Premium Driver
//                         </p>
//                         <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
//                           {user?.email || "No email"}
//                         </p>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <Card className="mt-4 bg-white dark:bg-black border-2 border-[#ffd342]">
//                     <CardHeader className="pb-2">
//                       <CardTitle className="text-lg font-semibold text-black dark:text-white">
//                         Driver Overview
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-3">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-2">
//                           <WalletIcon className="h-4 w-4 text-[#ffd342]" />
//                           <span className="text-sm text-black dark:text-white">
//                             Earnings
//                           </span>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-sm font-semibold text-black dark:text-white">
//                             $2,458.00
//                           </p>
//                           <p className="text-xs text-gray-600 dark:text-gray-400">
//                             +20.1% last mo.
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-2">
//                           <Car className="h-4 w-4 text-[#ffd342]" />
//                           <span className="text-sm text-black dark:text-white">
//                             Trips
//                           </span>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-sm font-semibold text-black dark:text-white">
//                             142 Total
//                           </p>
//                           <p className="text-xs text-gray-600 dark:text-gray-400">
//                             18 this mo.
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-2">
//                           <Star className="h-4 w-4 text-[#ffd342]" />
//                           <span className="text-sm text-black dark:text-white">
//                             Rating
//                           </span>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-sm font-semibold text-black dark:text-white">
//                             4.8
//                           </p>
//                           <p className="text-xs text-gray-600 dark:text-gray-400">
//                             95 reviews
//                           </p>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <div className="mt-4 space-y-2">
//                     <div className="flex gap-2">
//                       <Link
//                         href="/dashboard/account"
//                         onClick={() => setDropdownOpen(false)}
//                         className="w-1/2"
//                       >
//                         <Button
//                           variant="outline"
//                           className="w-full bg-white dark:bg-black text-black dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-2 text-sm"
//                         >
//                           My Profile
//                         </Button>
//                       </Link>
//                       <Link
//                         href="/dashboard/account?edit=true"
//                         onClick={() => setDropdownOpen(false)}
//                         className="w-1/2"
//                       >
//                         <Button
//                           variant="outline"
//                           className="w-full bg-white dark:bg-black text-black dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-2 text-sm"
//                         >
//                           Update Profile
//                         </Button>
//                       </Link>
//                     </div>
//                     <Button
//                       onClick={handleSignOut}
//                       className="w-full bg-[#ffd342] text-black hover:bg-[#ffdc60] dark:bg-[#ffd342] dark:text-black dark:hover:bg-[#ffdc60] px-6 py-2 text-sm"
//                     >
//                       <LogOut className="h-4 w-4 mr-2" />
//                       Sign Out
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <ModeToggle />
//             <Sheet open={isOpen} onOpenChange={setIsOpen}>
//               <SheetTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="text-white hover:bg-gray-800"
//                 >
//                   <Menu className="h-6 w-6" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent
//                 side="left"
//                 className="bg-black text-white p-0 w-64"
//               >
//                 <div className="flex flex-col h-full">
//                   <div className="p-4 border-b border-gray-800">
//                     <h1 className="text-2xl font-bold text-white">Vaam</h1>
//                   </div>
//                   <nav className="flex flex-col p-4 space-y-3">
//                     {routes.map((route) => (
//                       <Link
//                         key={route.href}
//                         href={route.href}
//                         className={cn(
//                           "flex items-center p-3 rounded-lg text-sm font-medium transition-colors",
//                           pathname === route.href
//                             ? "bg-[#ffd342] text-black"
//                             : "text-gray-400 hover:bg-gray-800 hover:text-white"
//                         )}
//                         onClick={() => setIsOpen(false)}
//                       >
//                         <route.icon
//                           className={cn("h-5 w-5 mr-3", route.color)}
//                         />
//                         {route.label}
//                       </Link>
//                     ))}
//                   </nav>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>

//         {/* Desktop Header (md and above) */}
//         <div className="hidden md:flex items-center justify-between h-16">
//           <Link href="/">
//             <h1 className="text-2xl font-bold text-white">Vaam</h1>
//           </Link>
//           <div className="flex items-center gap-8">
//             <nav className="flex items-center gap-6">
//               {routes.map((route) => (
//                 <Link
//                   key={route.href}
//                   href={route.href}
//                   className={cn(
//                     "flex items-center text-sm font-medium transition-colors",
//                     pathname === route.href
//                       ? "text-[#ffd342]"
//                       : "text-gray-400 hover:text-white"
//                   )}
//                 >
//                   <route.icon className={cn("h-5 w-5 mr-2", route.color)} />
//                   {route.label}
//                 </Link>
//               ))}
//             </nav>
//             <div className="flex items-center gap-4">
//               <div className="relative" ref={dropdownRef}>
//                 <button
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   className="outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffd342] rounded-full"
//                 >
//                   <Avatar className="h-8 w-8 cursor-pointer transition-all hover:ring-2 hover:ring-[#ffd342]">
//                     <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60" />
//                     <AvatarFallback className="bg-gray-700 text-white">
//                       {user?.email ? user.email[0].toUpperCase() : "DU"}
//                     </AvatarFallback>
//                   </Avatar>
//                 </button>
//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
//                     <Card className="border-none bg-white dark:bg-black">
//                       <CardContent className="flex items-center space-x-4 pt-4 pb-4">
//                         <Avatar className="h-16 w-16">
//                           <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60" />
//                           <AvatarFallback className="bg-gray-700 text-white">
//                             {user?.email ? user.email[0].toUpperCase() : "DU"}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div className="min-w-0">
//                           <h2 className="text-xl font-bold text-black dark:text-white truncate">
//                             {displayName}
//                           </h2>
//                           <p className="text-gray-600 dark:text-gray-400">
//                             Premium Driver
//                           </p>
//                           <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
//                             {user?.email || "No email"}
//                           </p>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     <Card className="mt-4 bg-white dark:bg-black border-2 border-[#ffd342]">
//                       <CardHeader className="pb-2">
//                         <CardTitle className="text-lg font-semibold text-black dark:text-white">
//                           Driver Overview
//                         </CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-3">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-2">
//                             <WalletIcon className="h-4 w-4 text-[#ffd342]" />
//                             <span className="text-sm text-black dark:text-white">
//                               Earnings
//                             </span>
//                           </div>
//                           <div className="text-right">
//                             <p className="text-sm font-semibold text-black dark:text-white">
//                               $2,458.00
//                             </p>
//                             <p className="text-xs text-gray-600 dark:text-gray-400">
//                               +20.1% last mo.
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-2">
//                             <Car className="h-4 w-4 text-[#ffd342]" />
//                             <span className="text-sm text-black dark:text-white">
//                               Trips
//                             </span>
//                           </div>
//                           <div className="text-right">
//                             <p className="text-sm font-semibold text-black dark:text-white">
//                               142 Total
//                             </p>
//                             <p className="text-xs text-gray-600 dark:text-gray-400">
//                               18 this mo.
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-2">
//                             <Star className="h-4 w-4 text-[#ffd342]" />
//                             <span className="text-sm text-black dark:text-white">
//                               Rating
//                             </span>
//                           </div>
//                           <div className="text-right">
//                             <p className="text-sm font-semibold text-black dark:text-white">
//                               4.8
//                             </p>
//                             <p className="text-xs text-gray-600 dark:text-gray-400">
//                               95 reviews
//                             </p>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     <div className="mt-4 space-y-2">
//                       <div className="flex gap-2">
//                         <Link
//                           href="/dashboard/account"
//                           onClick={() => setDropdownOpen(false)}
//                           className="w-1/2"
//                         >
//                           <Button
//                             variant="outline"
//                             className="w-full bg-white dark:bg-black text-black dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-2 text-sm"
//                           >
//                             My Profile
//                           </Button>
//                         </Link>
//                         <Link
//                           href="/dashboard/account?edit=true"
//                           onClick={() => setDropdownOpen(false)}
//                           className="w-1/2"
//                         >
//                           <Button
//                             variant="outline"
//                             className="w-full bg-white dark:bg-black text-black dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-2 text-sm"
//                           >
//                             Update Profile
//                           </Button>
//                         </Link>
//                       </div>
//                       <Button
//                         onClick={handleSignOut}
//                         className="w-full bg-[#ffd342] text-black hover:bg-[#ffdc60] dark:bg-[#ffd342] dark:text-black dark:hover:bg-[#ffdc60] px-6 py-2 text-sm"
//                       >
//                         <LogOut className="h-4 w-4 mr-2" />
//                         Sign Out
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <ModeToggle />
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  Wallet,
  CreditCard,
  Menu,
  Mail,
  Trophy,
  LogOut,
} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState, useEffect, useRef } from "react";
import { useSupabase } from "@/lib/supabase-client";
import { ModeToggle } from "./global/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Car, Star, Wallet as WalletIcon } from "lucide-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useUserProfile } from "@/lib/useUserProfile"; // Import the custom hook

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
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
    label: "Support",
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
  const user = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use the custom hook to get consistent user profile information
  const { displayName } = useUserProfile();

  // Client-side only rendering to prevent hydration errors
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/signin");
      router.refresh();
      setDropdownOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-black text-white z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        {/* Mobile Header (below md breakpoint) */}
        <div className="flex items-center justify-between h-16 md:hidden">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <h1 className="text-2xl font-bold text-white">Vaam</h1>
          </Link>
          <div className="flex items-center gap-2">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffd342] rounded-full"
              >
                <Avatar className="h-8 w-8 cursor-pointer transition-all hover:ring-2 hover:ring-[#ffd342]">
                  <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60" />
                  <AvatarFallback className="bg-gray-700 text-white">
                    {user?.email ? user.email[0].toUpperCase() : "DU"}
                  </AvatarFallback>
                </Avatar>
              </button>
              {isClient && dropdownOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
                  <Card className="border-none bg-white dark:bg-black">
                    <CardContent className="flex items-center space-x-4 pt-4 pb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60" />
                        <AvatarFallback className="bg-gray-700 text-white">
                          {user?.email ? user.email[0].toUpperCase() : "DU"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <h2 className="text-xl font-bold text-black dark:text-white truncate">
                          {displayName}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          Premium Driver
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {user?.email || "No email"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-4 bg-white dark:bg-black border-2 border-[#ffd342]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold text-black dark:text-white">
                        Driver Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <WalletIcon className="h-4 w-4 text-[#ffd342]" />
                          <span className="text-sm text-black dark:text-white">
                            Earnings
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-black dark:text-white">
                            $2,458.00
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            +20.1% last mo.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Car className="h-4 w-4 text-[#ffd342]" />
                          <span className="text-sm text-black dark:text-white">
                            Trips
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-black dark:text-white">
                            142 Total
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            18 this mo.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-[#ffd342]" />
                          <span className="text-sm text-black dark:text-white">
                            Rating
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-black dark:text-white">
                            4.8
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            95 reviews
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="mt-4 space-y-2">
                    <div className="flex gap-2">
                      <Link
                        href="/dashboard/account"
                        onClick={() => setDropdownOpen(false)}
                        className="w-1/2"
                      >
                        <Button
                          variant="outline"
                          className="w-full bg-white dark:bg-black text-black dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-2 text-sm"
                        >
                          My Profile
                        </Button>
                      </Link>
                      <Link
                        href="/dashboard/account?edit=true"
                        onClick={() => setDropdownOpen(false)}
                        className="w-1/2"
                      >
                        <Button
                          variant="outline"
                          className="w-full bg-white dark:bg-black text-black dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-2 text-sm"
                        >
                          Update Profile
                        </Button>
                      </Link>
                    </div>
                    <Button
                      onClick={handleSignOut}
                      className="w-full bg-[#ffd342] text-black hover:bg-[#ffdc60] dark:bg-[#ffd342] dark:text-black dark:hover:bg-[#ffdc60] px-6 py-2 text-sm"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              )}
            </div>
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
              <SheetContent
                side="left"
                className="bg-black text-white p-0 w-64"
              >
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
                        <route.icon
                          className={cn("h-5 w-5 mr-3", route.color)}
                        />
                        {route.label}
                      </Link>
                    ))}
                  </nav>
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
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffd342] rounded-full"
                >
                  <Avatar className="h-8 w-8 cursor-pointer transition-all hover:ring-2 hover:ring-[#ffd342]">
                    <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60" />
                    <AvatarFallback className="bg-gray-700 text-white">
                      {user?.email ? user.email[0].toUpperCase() : "DU"}
                    </AvatarFallback>
                  </Avatar>
                </button>
                {isClient && dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
                    <Card className="border-none bg-white dark:bg-black">
                      <CardContent className="flex items-center space-x-4 pt-4 pb-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60" />
                          <AvatarFallback className="bg-gray-700 text-white">
                            {user?.email ? user.email[0].toUpperCase() : "DU"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <h2 className="text-xl font-bold text-black dark:text-white truncate">
                            {displayName}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400">
                            Premium Driver
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {user?.email || "No email"}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="mt-4 bg-white dark:bg-black border-2 border-[#ffd342]">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold text-black dark:text-white">
                          Driver Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <WalletIcon className="h-4 w-4 text-[#ffd342]" />
                            <span className="text-sm text-black dark:text-white">
                              Earnings
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-black dark:text-white">
                              $2,458.00
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              +20.1% last mo.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Car className="h-4 w-4 text-[#ffd342]" />
                            <span className="text-sm text-black dark:text-white">
                              Trips
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-black dark:text-white">
                              142 Total
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              18 this mo.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-[#ffd342]" />
                            <span className="text-sm text-black dark:text-white">
                              Rating
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-black dark:text-white">
                              4.8
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              95 reviews
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="mt-4 space-y-2">
                      <div className="flex gap-2">
                        <Link
                          href="/dashboard/account"
                          onClick={() => setDropdownOpen(false)}
                          className="w-1/2"
                        >
                          <Button
                            variant="outline"
                            className="w-full bg-white dark:bg-black text-black dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-2 text-sm"
                          >
                            My Profile
                          </Button>
                        </Link>
                        <Link
                          href="/dashboard/account?edit=true"
                          onClick={() => setDropdownOpen(false)}
                          className="w-1/2"
                        >
                          <Button
                            variant="outline"
                            className="w-full bg-white dark:bg-black text-black dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-2 text-sm"
                          >
                            Update Profile
                          </Button>
                        </Link>
                      </div>
                      <Button
                        onClick={handleSignOut}
                        className="w-full bg-[#ffd342] text-black hover:bg-[#ffdc60] dark:bg-[#ffd342] dark:text-black dark:hover:bg-[#ffdc60] px-6 py-2 text-sm"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
