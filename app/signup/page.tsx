"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/lib/supabase-client";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLock } from "react-icons/md";
import Link from "next/link";

export default function SignUp() {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [authMethod, setAuthMethod] = useState<"email" | "google">("email");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill out all fields.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleEmailSignUp = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      alert("Sign-up successful! Check your email for confirmation.");
      router.push("/form");
    } catch (error) {
      alert("Sign-up failed: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) alert("Google Sign-Up failed: " + error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md ">
        <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-white">
          Driver Sign Up
        </h1>

        <div className="flex justify-center space-x-6 mb-6">
          <button
            onClick={() => setAuthMethod("email")}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              authMethod === "email"
                ? "bg-[#ffd342] text-black"
                : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            } hover:bg-[#ffdc60] dark:hover:bg-gray-600`}
          >
            <MdEmail className="mr-2" /> Email
          </button>
          <button
            onClick={() => setAuthMethod("google")}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              authMethod === "google"
                ? "bg-[#ffd342] text-black"
                : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            } hover:bg-[#ffdc60] dark:hover:bg-gray-600`}
          >
            <FcGoogle className="mr-2" /> Google
          </button>
        </div>

        {authMethod === "email" ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEmailSignUp();
            }}
            className="space-y-6"
          >
            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffd342] transition-all"
                required
              />
            </div>
            <div className="relative">
              <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffd342] transition-all"
                required
              />
            </div>
            <div className="relative">
              <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffd342] transition-all"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#ffd342] text-black font-semibold rounded-lg hover:bg-[#ffdc60] disabled:opacity-50 transition-all"
            >
              {loading ? "Processing..." : "Sign Up with Email"}
            </button>
			
          </form>
        ) : (
          <button
            onClick={handleGoogleSignUp}
            className="w-full py-3 bg-[#ffd342] text-black font-semibold rounded-lg hover:bg-[#ffdc60] flex items-center justify-center transition-all"
          >
            <FcGoogle className="mr-2" /> Sign Up with Google
          </button>
		  
		  
        )}
		<p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-2">
          Already have an account?{" "}
          <Link href="/signin" className="text-[#ffd342] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}