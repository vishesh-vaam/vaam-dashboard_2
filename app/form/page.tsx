// app/profile-form/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/lib/supabase-client";

export default function ProfileForm() {
	const { supabase } = useSupabase();
	const router = useRouter();
	const [userId, setUserId] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		firstName: "",
		middleName: "",
		lastName: "",
		phoneNumber: "",
		address: "",
		selectedBrand: "",
		selectedModel: "",
		carNumber: "",
		driversLicenseNumber: "",
	});
	const [insuranceFile, setInsuranceFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);

	const carBrands: Record<string, string[]> = {
		Toyota: ["Corolla", "Camry", "RAV4"],
		Ford: ["Focus", "Mustang", "Explorer"],
		Honda: ["Civic", "Accord", "CR-V"],
		BMW: ["X5", "M3", "320i"],
		Mercedes: ["C-Class", "E-Class", "GLA"],
	};

	useEffect(() => {
		const getSession = async () => {
			const { data, error } = await supabase.auth.getSession();
			if (error || !data?.session?.user) {
				router.push("/signin");
			} else {
				setUserId(data.session.user.id);
			}
		};
		getSession();
	}, [supabase, router]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setInsuranceFile(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!userId) return;
		setLoading(true);
		try {
			let insuranceUrl = "";
			if (insuranceFile) {
				const filePath = `insurance/${userId}/${insuranceFile.name}`;
				const { error: uploadError } = await supabase.storage
					.from("insurance")
					.upload(filePath, insuranceFile);

				if (!uploadError) {
					const { data: urlData } = supabase.storage
						.from("insurance")
						.getPublicUrl(filePath);
					insuranceUrl = urlData.publicUrl;
				} else {
					console.warn("File upload failed, proceeding without it.");
				}
			}

			const { error: profileError } = await supabase.from("profiles").insert({
				id: userId,
				first_name: formData.firstName,
				middle_name: formData.middleName,
				last_name: formData.lastName,
				phone_number: formData.phoneNumber,
				address: formData.address,
				car_brand: formData.selectedBrand,
				car_model: formData.selectedModel,
				car_registration_number: formData.carNumber,
				drivers_license_number: formData.driversLicenseNumber,
				insurance_file_url: insuranceUrl,
			});
			if (profileError) throw profileError;

			alert("Profile saved successfully!");
			router.push("/dashboard");
		} catch (error) {
			alert("Profile save failed: " + (error as Error).message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">
			<div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-lg">
				<h1 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">
					Driver Profile
				</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="text"
						name="firstName"
						value={formData.firstName}
						onChange={handleInputChange}
						placeholder="First Name"
						required
					/>
					<input
						type="text"
						name="middleName"
						value={formData.middleName}
						onChange={handleInputChange}
						placeholder="Middle Name"
					/>
					<input
						type="text"
						name="lastName"
						value={formData.lastName}
						onChange={handleInputChange}
						placeholder="Last Name"
						required
					/>
					<input
						type="text"
						name="phoneNumber"
						value={formData.phoneNumber}
						onChange={handleInputChange}
						placeholder="Phone Number"
						required
					/>
					<input
						type="text"
						name="address"
						value={formData.address}
						onChange={handleInputChange}
						placeholder="Address"
						required
					/>
					<select
						name="selectedBrand"
						value={formData.selectedBrand}
						onChange={handleInputChange}
						required
					>
						<option value="">Select Car Brand</option>
						{Object.keys(carBrands).map((brand) => (
							<option key={brand} value={brand}>
								{brand}
							</option>
						))}
					</select>
					<select
						name="selectedModel"
						value={formData.selectedModel}
						onChange={handleInputChange}
						required
					>
						<option value="">Select Model</option>
						{formData.selectedBrand &&
							carBrands[formData.selectedBrand].map((model) => (
								<option key={model} value={model}>
									{model}
								</option>
							))}
					</select>
					<input
						type="text"
						name="carNumber"
						value={formData.carNumber}
						onChange={handleInputChange}
						placeholder="Car Registration Number"
						required
					/>
					<input
						type="text"
						name="driversLicenseNumber"
						value={formData.driversLicenseNumber}
						onChange={handleInputChange}
						placeholder="Driver's License Number"
						required
					/>
					<input type="file" onChange={handleFileChange} />
					<button type="submit" disabled={loading}>
						{" "}
						{loading ? "Saving..." : "Save Profile"}{" "}
					</button>
				</form>
			</div>
		</div>
	);
}
