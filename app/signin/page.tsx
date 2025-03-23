// app/signin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSupabase } from "@/lib/supabase-client";

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
      <div className="max-w-md w-full space-y-6 p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-black dark:text-white">
          Sign In
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
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
          <div className="space-y-4">
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Email address"
            />
            <div className="space-y-2">
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-[#ffd342] hover:underline focus:outline-none"
                disabled={isLoading}
              >
                Forgot Password?
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-[#ffd342] text-black rounded-md hover:bg-[#ffdc60] disabled:opacity-50 dark:bg-[#ffd342] dark:text-black dark:hover:bg-[#ffdc60]"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="flex items-center justify-center py-4">
          <hr className="w-full border-gray-300 dark:border-gray-700" />
          <span className="px-2 text-gray-500 dark:text-gray-400">or</span>
          <hr className="w-full border-gray-300 dark:border-gray-700" />
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
          disabled={isLoading}
        >
          Sign in with Google
        </button>
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          New here?{" "}
          <Link href="/signup" className="text-[#ffd342] hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}