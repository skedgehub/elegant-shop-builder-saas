
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface ResourceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
  gradient?: string;
}

const ResourceCard = ({
  icon,
  title,
  description,
  features,
  highlight = false,
  badge,
  gradient = "from-blue-500 to-purple-600"
}: ResourceCardProps) => {
  return (
    <Card
      className={`relative overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group ${
        highlight
          ? "border-primary shadow-lg ring-2 ring-primary/20"
          : "border-gray-100 shadow-sm hover:shadow-lg"
      }`}
    >
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className={`${
            highlight 
              ? "bg-primary text-black" 
              : "bg-blue-100 text-blue-800 border-blue-200"
          }`}>
            {badge}
          </Badge>
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
        </div>
        
        <CardTitle className="text-xl font-semibold text-black leading-tight">
          {title}
        </CardTitle>
        
        <p className="text-gray-600 font-light leading-relaxed">
          {description}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700 font-light leading-relaxed">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
