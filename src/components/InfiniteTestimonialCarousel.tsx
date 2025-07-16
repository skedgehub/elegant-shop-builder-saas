
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

interface InfiniteTestimonialCarouselProps {
  testimonials: Testimonial[];
}

const InfiniteTestimonialCarousel = ({ testimonials }: InfiniteTestimonialCarouselProps) => {
  // Duplicate testimonials for infinite scroll
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex animate-scroll space-x-6"
        style={{
          animation: "scroll 40s linear infinite",
          width: "fit-content",
        }}
      >
        {allTestimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="min-w-[320px] max-w-[320px] border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex-shrink-0"
          >
            <CardContent className="pt-6 pb-6">
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 text-primary fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic text-sm leading-relaxed font-light line-clamp-3">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <p className="font-semibold text-black text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-600 text-xs font-medium">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InfiniteTestimonialCarousel;
