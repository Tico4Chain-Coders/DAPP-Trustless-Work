import { db } from "@/constants/firebase";
import { toast } from "@/hooks/use-toast";
import { useThemeStore } from "@/store/themeStore/store";
import { doc, setDoc } from "firebase/firestore";

const useAppearance = () => {
  const { theme } = useThemeStore();

  const handleSaveTheme = async () => {
    try {
      const userDoc = doc(db, "users", "appearance-settings");
      await setDoc(userDoc, { theme });

      toast({
        title: "Success",
        description: `Theme "${theme}" saved successfully!`,
      });
    } catch (error) {
      console.error("Error saving theme:", error);
      toast({
        title: "Error",
        description: "Failed to save theme. Please try again.",
        variant: "destructive",
      });
    }
  };

  return { handleSaveTheme };
};

export default useAppearance;
