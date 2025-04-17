// lib/hooks/useUserProfile.ts
import { useState, useEffect, useCallback } from 'react';
import { useSupabase } from "@/lib/supabase-client";
import { useUser } from "@supabase/auth-helpers-react";

interface UserProfile {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  car_brand: string;
  car_model: string;
  drivers_license_number: string;
  insurance_file_url: string;
  email: string;
}

// Create a global refresh counter outside the hook
let globalRefreshCounter = 0;
let globalSubscribers: Array<() => void> = [];

// Function to notify all subscribers to refresh
export const refreshAllUserProfiles = () => {
  globalRefreshCounter++;
  globalSubscribers.forEach(callback => callback());
};

export function useUserProfile() {
  const { supabase } = useSupabase();
  const authUser = useUser();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [localRefreshCounter, setLocalRefreshCounter] = useState(globalRefreshCounter);

  // Function to refresh this instance of the hook
  const refreshProfile = useCallback(() => {
    setLocalRefreshCounter(prev => prev + 1);
    // Also update global to notify others
    refreshAllUserProfiles();
  }, []);

  // Register this hook instance as a subscriber
  useEffect(() => {
    const callback = () => setLocalRefreshCounter(globalRefreshCounter);
    globalSubscribers.push(callback);
    
    return () => {
      globalSubscribers = globalSubscribers.filter(cb => cb !== callback);
    };
  }, []);

  // Fetch user profile
  useEffect(() => {
    async function fetchUserProfile() {
      if (!authUser?.id) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
        } else if (data) {
          console.log('Profile data fetched:', data); // Debug log
          setUserProfile({
            ...data,
            email: authUser.email || ''
          });
        }
      } catch (error) {
        console.error('Error in fetchUserProfile:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [authUser, supabase, localRefreshCounter]); // Added localRefreshCounter

  // Create a consistent full name for display
  const getFullName = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name} ${userProfile.last_name}`;
    }
    return authUser?.email ? authUser.email.split('@')[0] : "Driver";
  };

  return {
    userProfile,
    loading,
    displayName: getFullName(),
    refreshProfile
  };
}