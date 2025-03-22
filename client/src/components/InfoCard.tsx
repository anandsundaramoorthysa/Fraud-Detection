
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}

const InfoCard = ({
  title,
  description,
  icon: Icon,
  className = "",
  iconClassName = "",
}: InfoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={cn(
        "overflow-hidden border transition-all duration-300 bg-white/80 dark:bg-gray-800/40 backdrop-blur-sm",
        isHovered ? "shadow-lg translate-y-[-4px]" : "shadow",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300",
          isHovered ? "bg-blue-600 text-white dark:bg-blue-500" : "",
          iconClassName
        )}>
          <Icon size={24} />
        </div>
        <CardTitle className="mt-4 text-xl text-gray-900 dark:text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base text-gray-600 dark:text-gray-300">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
