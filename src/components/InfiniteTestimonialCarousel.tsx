
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";

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
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Duplicate testimonials for infinite effect
    const scrollerInner = scroller.querySelector('.scroller-inner');
    if (!scrollerInner) return;

    const scrollerContent = Array.from(scrollerInner.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scrollerInner.appendChild(duplicatedItem);
    });

    // Add animation class
    scroller.setAttribute('data-animated', 'true');
  }, []);

  return (
    <div 
      ref={scrollerRef}
      className="scroller max-w-7xl mx-auto"
      data-speed="slow"
      data-direction="left"
    >
      <div className="scroller-inner flex gap-6 py-4">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="min-w-[350px] max-w-[350px] flex-shrink-0 border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 group"
          >
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 italic text-sm leading-relaxed font-light">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full mr-4 object-cover"
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
