// app/profile-form/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/lib/supabase-client";
import { MdPerson, MdPhone, MdHome, MdCarRental, MdCreditCard, MdUpload } from "react-icons/md";

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
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-2xl transform transition-all hover:scale-105">
        <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-white">
          Driver Profile
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields in One Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffd342] transition-all"
                required
              />
            </div>
            <div className="relative">
              <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                placeholder="Middle Name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffd342] transition-all"
              />
            </div>
            <div className="relative">
              <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffd342] transition-all"
                required
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="relative">
            <MdPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffd342] transition-all"
              required
            />
          </div>
          <div className="relative">
            <MdHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffd342] transition-all"
              required
            />
          </div>

          {/* Car Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <MdCarRental className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                name="selectedBrand"
                value={formData.selectedBrand}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffd342] transition-all appearance-none"
                required
              >
                <option value="">Select Car Brand</option>
                {Object.keys(carBrands).map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <MdCarRental className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                name="selectedModel"
                value={formData.selectedModel}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffd342] transition-all appearance-none"
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
            </div>
          </div>
          <div className="relative">
            <MdCarRental className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="carNumber"
              value={formData.carNumber}
              onChange={handleInputChange}
              placeholder="Car Registration Number"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffd342] transition-all"
              required
            />
          </div>

          {/* License and Insurance */}
          <div className="relative">
            <MdCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="driversLicenseNumber"
              value={formData.driversLicenseNumber}
              onChange={handleInputChange}
              placeholder="Driver's License Number"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffd342] transition-all"
              required
            />
          </div>
          <div className="relative">
            <MdUpload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffd342] transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#ffd342] file:text-black hover:file:bg-[#ffdc60]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#ffd342] text-black font-semibold rounded-lg hover:bg-[#ffdc60] disabled:opacity-50 transition-all"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}