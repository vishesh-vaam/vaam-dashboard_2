"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/lib/supabase-client";

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
			<div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-lg">
				<h1 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">
					Driver Sign Up
				</h1>

				<div className="flex justify-center space-x-4 mb-4">
					<button
						onClick={() => setAuthMethod("email")}
						className={`px-4 py-2 rounded-lg ${
							authMethod === "email"
								? "bg-[#ffd342] text-black"
								: "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
						} hover:bg-[#ffdc60] dark:hover:bg-gray-600`}
					>
						Email & Password
					</button>
					<button
						onClick={() => setAuthMethod("google")}
						className={`px-4 py-2 rounded-lg ${
							authMethod === "google"
								? "bg-[#ffd342] text-black"
								: "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
						} hover:bg-[#ffdc60] dark:hover:bg-gray-600`}
					>
						Google
					</button>
				</div>

				{authMethod === "email" ? (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleEmailSignUp();
						}}
						className="space-y-4"
					>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							placeholder="Email"
							className="w-full px-4 py-2 border rounded-lg"
							required
						/>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							placeholder="Password"
							className="w-full px-4 py-2 border rounded-lg"
							required
						/>
						<input
							type="password"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleInputChange}
							placeholder="Confirm Password"
							className="w-full px-4 py-2 border rounded-lg"
							required
						/>
						<button
							type="submit"
							disabled={loading}
							className="w-full py-2 bg-[#ffd342] text-black rounded-lg hover:bg-[#ffdc60] disabled:opacity-50"
						>
							{loading ? "Processing..." : "Sign Up with Email"}
						</button>
					</form>
				) : (
					<button
						onClick={handleGoogleSignUp}
						className="w-full py-2 bg-[#ffd342] text-black rounded-lg hover:bg-[#ffdc60]"
					>
						Sign Up with Google
					</button>
				)}
			</div>
		</div>
	);
}
