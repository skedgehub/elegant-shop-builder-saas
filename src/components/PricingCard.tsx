
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

interface PricingCardProps {
  plan: {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    highlight: boolean;
  };
  index: number;
}

export const PricingCard = ({ plan, index }: PricingCardProps) => {
  return (
    <Card
      className={`border transition-all duration-300 hover:-translate-y-2 ${
        plan.highlight
          ? "border-primary shadow-2xl scale-105 bg-gradient-to-b from-white to-primary/5 ring-2 ring-primary/20"
          : "border-gray-200 bg-white shadow-lg hover:shadow-2xl"
      }`}
    >
      <CardHeader className="text-center pb-6">
        {plan.highlight && (
          <Badge className="w-fit mx-auto mb-6 bg-primary text-black font-semibold px-4 py-2">
            Mais Popular
          </Badge>
        )}
        <CardTitle className="text-2xl font-bold text-black mb-2">
          {plan.name}
        </CardTitle>
        <CardDescription className="text-gray-600 font-light text-base">
          {plan.description}
        </CardDescription>
        <div className="mt-8">
          <span className="text-5xl font-bold text-black">
            {plan.price}
          </span>
          <span className="text-gray-600 font-light text-lg">
            {plan.period}
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <ul className="space-y-4 mb-10">
          {plan.features.map((feature, featureIndex) => (
            <li
              key={featureIndex}
              className="flex items-center text-base"
            >
              <Check className="h-5 w-5 text-primary mr-4 flex-shrink-0" />
              <span className="text-gray-700 font-light">
                {feature}
              </span>
            </li>
          ))}
        </ul>
        <Link to="/register" title={`Solicitar acesso ${plan.name}`}>
          <Button
            className={`w-full py-6 text-base font-semibold ${
              plan.highlight
                ? "bg-black hover:bg-gray-900 text-white shadow-lg"
                : "bg-gray-100 hover:bg-gray-200 text-black"
            }`}
          >
            Solicitar Acesso
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
