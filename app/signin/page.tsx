// app/signin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSupabase } from "@/lib/supabase-client";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLock } from "react-icons/md";

export default function SignIn() {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const router = useRouter();

  // Email/password sign-in handler
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResetMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        router.refresh();
        router.push("/dashboard");
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred during sign-in"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Google sign-in handler
  const handleGoogleSignIn = async () => {
    setError(null);
    setResetMessage(null);
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google sign-in error:", error);
      setError(error.message);
    }
    setIsLoading(false);
  };

  // Forgot password handler
  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResetMessage(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setResetMessage("A password reset link has been sent to your email.");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while sending the reset link."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data?.session) {
        router.push("/dashboard");
      }
    };

    checkSession();
  }, [router, supabase.auth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md ">
        <h2 className="text-3xl font-bold mb-8 text-center text-black dark:text-white">
          Sign In
        </h2>

        <form onSubmit={handleSignIn} className="space-y-6">
          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          {resetMessage && (
            <div className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-200 px-4 py-3 rounded-md">
              {resetMessage}
            </div>
          )}
          <div className="space-y-6">
            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffd342] transition-all"
              />
            </div>
            <div className="relative">
              <MdLock className="absolute left-3 top-1/3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffd342] transition-all"
              />
              <Link href={"/reset-password"}>
              <button
                type="button"
                className="text-sm text-[#ffd342] hover:underline focus:outline-none mt-2 block"
                disabled={isLoading}
              >
                Forgot Password?
              </button>
              </Link>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#ffd342] text-black font-semibold rounded-lg hover:bg-[#ffdc60] disabled:opacity-50 transition-all"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center justify-center py-4">
          <hr className="w-full border-gray-300 dark:border-gray-700" />
          <span className="px-2 text-gray-500 dark:text-gray-400">or</span>
          <hr className="w-full border-gray-300 dark:border-gray-700" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full py-3 bg-[#ffd342] text-black font-semibold rounded-lg hover:bg-[#ffdc60] flex items-center justify-center transition-all"
          disabled={isLoading}
        >
          <FcGoogle className="mr-2" /> Sign In with Google
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
          New here?{" "}
          <Link href="/signup" className="text-[#ffd342] hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}