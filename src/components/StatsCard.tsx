
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  index: number;
  scrollY: number;
}

export const StatsCard = ({ icon, value, label, index, scrollY }: StatsCardProps) => {
  return (
    <Card
      className="bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group transform-gpu backdrop-blur-sm"
      style={{
        transform: `translateY(${scrollY * 0.02 * (index + 1)}px)`,
      }}
    >
      <CardContent className="p-8 text-center">
        <div className="flex justify-center mb-6 text-primary group-hover:scale-125 transition-transform duration-300">
          {icon}
        </div>
        <div className="text-4xl font-bold text-black mb-3 group-hover:text-primary transition-colors">
          {value}
        </div>
        <div className="text-sm text-gray-600 font-medium uppercase tracking-wide">
          {label}
        </div>
      </CardContent>
    </Card>
  );
};
