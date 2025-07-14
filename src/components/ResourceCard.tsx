
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight } from "lucide-react";

interface ResourceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
}

const ResourceCard = ({ icon, title, description, features, highlight, badge }: ResourceCardProps) => {
  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group ${
        highlight ? 'border-2 border-primary shadow-lg' : 'border border-gray-200'
      }`}
    >
      {badge && (
        <Badge className="absolute top-4 right-4 bg-primary text-black font-medium">
          {badge}
        </Badge>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`p-3 rounded-xl transition-all duration-300 ${
            highlight ? 'bg-primary/10 text-primary' : 'bg-gray-50 text-gray-700 group-hover:bg-primary/10 group-hover:text-primary'
          }`}>
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-black group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
          </div>
        </div>
        <CardDescription className="text-gray-600 leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span className="text-sm text-gray-700">{feature}</span>
          </div>
        ))}
        
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
            Saiba mais
            <ArrowRight className="h-4 w-4 ml-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
