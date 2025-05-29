"use client";

import "../globals.css";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UserInfo } from "@/components/user-info";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/lib/supabase-client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { supabase } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!data?.session) {
        router.push("/signin");
        return;
      }

      const userId = data.session.user.id;
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", userId)
        .single();

      if (!profile) {
        router.push("/form");
      }
    };

    checkSession();
  }, []);

  return (
    <html lang="en">
      <SessionContextProvider supabaseClient={supabase}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="driver-theme"
        >
          <div className="min-h-screen flex flex-col">
            {/* Header */}
            <Header />

            {/* Main content area */}
            <div className="flex-1">
              <div className="flex min-h-[calc(100vh-4rem)]">
                <div className="flex-1 p-8 mt-16">{children}</div>
                {/* User Info Sidebar */}
                <div className="hidden xl:block w-80 p-8 mt-16 border-l">
                  <UserInfo />
                </div>
              </div>
            </div>

            {/* Footer */}
            <Footer />
          </div>
        </ThemeProvider>
      </SessionContextProvider>
    </html>
  );
}
