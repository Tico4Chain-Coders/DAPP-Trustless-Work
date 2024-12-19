"use client";

import SettingsSidebar from "@/components/modules/setting/settingsSidebar";
import { useState } from "react";
import { db } from "@/constants/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "@/hooks/use-toast";
import { useThemeStore } from "@/store/themeStore/store";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/layout/header/Header";
import PreferencesSection, {
  PreferencesForm,
} from "@/components/modules/setting/preferencesSection";
import AppearanceSection from "@/components/modules/setting/appearanceSection";
import ProfileSection, {
  ProfileForm,
} from "@/components/modules/setting/profileSection";

const SettingsPage = () => {
  const [currentTab, setCurrentTab] = useState("profile");
  const { theme, toggleTheme } = useThemeStore();

  const saveProfile = async (data: ProfileForm | PreferencesForm) => {
    try {
      const userDoc = doc(db, "users", data.identification || "default");
      await setDoc(userDoc, { ...data, theme });

      toast({
        title: "Success",
        description: "Profile and preferences saved successfully!",
      });
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen w-full">
        <Header />
        <div className="flex h-screen">
          <SettingsSidebar
            currentTab={currentTab}
            onTabChange={setCurrentTab}
          />

          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-8">
              {currentTab === "profile" && (
                <ProfileSection onSave={saveProfile} walletAddress={""} />
              )}
              {currentTab === "appearance" && (
                <AppearanceSection theme={theme} onThemeChange={toggleTheme} />
              )}
              {currentTab === "preferences" && (
                <PreferencesSection onSave={saveProfile} />
              )}
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SettingsPage;
