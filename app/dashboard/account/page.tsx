"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useSupabase } from "@/lib/supabase-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface Profile {
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  car_brand: string;
  car_model: string;
  drivers_license_number: string;
  insurance_file_url: string;
}

function AccountContent() {
  const session = useSession();
  const { supabase } = useSupabase();
  const [profile, setProfile] = useState<Profile>({
    first_name: "",
    middle_name: "",
    last_name: "",
    phone_number: "",
    address: "",
    car_brand: "",
    car_model: "",
    drivers_license_number: "",
    insurance_file_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Profile>(profile);
  const searchParams = useSearchParams();
  const editMode = searchParams.get("edit") === "true";

  useEffect(() => {
    if (!session?.user) return;
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
      } else {
        setProfile(data);
        setFormData(data);
      }
      setLoading(false);
    };

    fetchProfile();
    setEditing(editMode); // Set editing mode based on URL parameter
  }, [session, supabase, editMode]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: formData.first_name,
        middle_name: formData.middle_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
        car_brand: formData.car_brand,
        car_model: formData.car_model,
        drivers_license_number: formData.drivers_license_number,
      })
      .eq("id", session.user.id);
    if (error) {
      alert("Error updating profile: " + error.message);
    } else {
      setProfile(formData);
      setEditing(false);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditing(false);
  };

  if (!session) return <div className="text-center text-gray-600 dark:text-gray-300">Loading session...</div>;
  if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading profile...</div>;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-black dark:text-white">My Profile</h2>
          <p className="text-gray-600 dark:text-gray-300">Manage your personal and vehicle information</p>
        </div>

        {/* Personal Information Section */}
        <Card className="bg-white dark:bg-black shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-black dark:text-white">
              {editing ? "Edit Personal Information" : "Personal Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {editing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="first_name" className="text-black dark:text-white">First Name</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      required
                      className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-black dark:text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="middle_name" className="text-black dark:text-white">Middle Name</Label>
                    <Input
                      id="middle_name"
                      name="middle_name"
                      value={formData.middle_name}
                      onChange={handleInputChange}
                      className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-black dark:text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="last_name" className="text-black dark:text-white">Last Name</Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      required
                      className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-black dark:text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone_number" className="text-black dark:text-white">Phone Number</Label>
                    <Input
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      required
                      className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-black dark:text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <Label htmlFor="email" className="text-black dark:text-white">Email (Non-editable)</Label>
                    <Input
                      id="email"
                      value={session.user.email}
                      disabled
                      className="bg-gray-200 dark:bg-black border-gray-300 dark:border-gray-700 text-black dark:text-white cursor-not-allowed"
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <Label htmlFor="address" className="text-black dark:text-white">Address (Non-editable)</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      disabled
                      className="bg-gray-200 dark:bg-black border-gray-300 dark:border-gray-700 text-black dark:text-white cursor-not-allowed"
                    />
                  </div>
                </div>
                {/* Buttons moved to Car Info section for consistency */}
              </form>
            ) : (
              <div className="space-y-2 text-black dark:text-white">
                <p><strong>Name:</strong> {profile.first_name} {profile.middle_name} {profile.last_name}</p>
                <p><strong>Email:</strong> {session.user.email}</p>
                <p><strong>Phone Number:</strong> {profile.phone_number}</p>
                <p><strong>Address:</strong> {profile.address}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Car Information Section */}
        <Card className="bg-white dark:bg-black shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-black dark:text-white">
              {editing ? "Edit Vehicle Information" : "Vehicle Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {editing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="car_brand" className="text-black dark:text-white">Car Brand</Label>
                    <Input
                      id="car_brand"
                      name="car_brand"
                      value={formData.car_brand}
                      onChange={handleInputChange}
                      required
                      className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-black dark:text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="car_model" className="text-black dark:text-white">Car Model</Label>
                    <Input
                      id="car_model"
                      name="car_model"
                      value={formData.car_model}
                      onChange={handleInputChange}
                      required
                      className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-black dark:text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <Label htmlFor="drivers_license_number" className="text-black dark:text-white">Driver's License Number</Label>
                    <Input
                      id="drivers_license_number"
                      name="drivers_license_number"
                      value={formData.drivers_license_number}
                      onChange={handleInputChange}
                      required
                      className="bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-black dark:text-white"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <Button
                    type="submit"
                    className="bg-[#ffd342] text-black hover:bg-[#ffdc60] dark:bg-[#ffd342] dark:text-black dark:hover:bg-[#ffdc60]"
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-2 text-black dark:text-white">
                <p><strong>Car:</strong> {profile.car_brand} {profile.car_model}</p>
                <p><strong>Driver's License:</strong> {profile.drivers_license_number}</p>
                <p><strong>Insurance File:</strong>{" "}
                  {profile.insurance_file_url ? (
                    <a
                      href={profile.insurance_file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ffd342] hover:underline"
                    >
                      View File
                    </a>
                  ) : (
                    "Not uploaded"
                  )}
                </p>
                <Button
                  onClick={() => setEditing(true)}
                  className="mt-4 bg-[#ffd342] text-black hover:bg-[#ffdc60] dark:bg-[#ffd342] dark:text-black dark:hover:bg-[#ffdc60]"
                >
                  Edit Profile
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>}>
      <AccountContent />
    </Suspense>
  );
}