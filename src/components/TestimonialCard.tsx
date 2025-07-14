
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  testimonial: {
    name: string;
    company: string;
    content: string;
    rating: number;
    avatar: string;
  };
  index: number;
}

export const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  return (
    <Card
      key={index}
      className="min-w-[340px] max-w-[340px] border border-gray-100 bg-white shadow-md hover:shadow-xl transition-all duration-300 flex-shrink-0 backdrop-blur-sm hover:-translate-y-1"
    >
      <CardContent className="pt-8 pb-8 px-8">
        <div className="flex justify-center mb-6">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 text-amber-400 fill-amber-400 mr-1"
            />
          ))}
        </div>
        <p className="text-gray-700 mb-8 italic text-base leading-relaxed font-light line-clamp-4">
          "{testimonial.content}"
        </p>
        <div className="flex items-center">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="h-12 w-12 rounded-full mr-4 object-cover ring-2 ring-gray-100"
          />
          <div>
            <p className="font-semibold text-black text-base">
              {testimonial.name}
            </p>
            <p className="text-gray-600 text-sm font-medium">
              {testimonial.company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
