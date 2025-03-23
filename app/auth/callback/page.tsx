// app/auth/callback/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/lib/supabase-client";

export default function AuthCallback() {
	const { supabase } = useSupabase();
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function handleCallback() {
			try {
				router.push("/dashboard");
			} catch (error) {
				console.error("Callback error:", error);
				alert("Authentication failed: " + (error as Error).message);
				router.push("/signup");
			} finally {
				setLoading(false);
			}
		}
		handleCallback();
	}, []);

	return (
        <div>{loading ? "Loading..." : "Processing authentication..."}</div>
    )
}
