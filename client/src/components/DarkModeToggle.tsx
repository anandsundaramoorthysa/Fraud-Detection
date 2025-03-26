
import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm">
      <Sun className="h-4 w-4 text-yellow-500 dark:text-gray-400" />
      <Switch
        checked={isDarkMode}
        onCheckedChange={toggleDarkMode}
        className="data-[state=checked]:bg-blue-700"
      />
      <Moon className="h-4 w-4 text-gray-400 dark:text-blue-300" />
    </div>
  );
};

export default DarkModeToggle;
