
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  scrollY: number;
}

export const FeatureCard = ({ icon, title, description, index, scrollY }: FeatureCardProps) => {
  return (
    <Card
      className="border border-gray-100 bg-white shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group transform-gpu backdrop-blur-sm"
      style={{
        animation: `fade-in 0.6s ease-out ${index * 0.1}s both`,
        transform: `translateY(${scrollY * 0.01 * (index + 1)}px)`,
      }}
    >
      <CardHeader className="pb-4">
        <div className="h-14 w-14 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl mb-6 group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-300 flex items-center justify-center text-primary group-hover:scale-110 shadow-lg">
          {icon}
        </div>
        <CardTitle className="text-xl text-black font-semibold group-hover:text-gray-900 transition-colors leading-tight">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 leading-relaxed font-light text-base">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};
