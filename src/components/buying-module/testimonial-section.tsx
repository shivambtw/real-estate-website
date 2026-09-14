import Image from "next/image";

const TestimonialsSection = () => {
  const testimonials = [
    {
      image: "/images/homeowner1.jpg",
      title: "A Heartwarming Journey to a New Home",
      content: `Helping this family find the perfect home was a true pleasure. After a thoughtful search, we celebrated the joy of closing day together. Their excitement reminded me why I love guiding clients through such a meaningful life moment.`,
      align: "left",
    },
    {
      image: "/images/homeowner2.jpg",
      title: "A Heartfelt Thank You to My Client",
      content: `Working with this wonderful client through the ups and downs of the process was deeply rewarding. Their trust and happiness on closing day made every step worth it. I'm grateful to be part of their journey to building a better future.`,
      align: "right",
    },
    {
      image: "/images/homeowner3.jpg",
      title: "Cherishing Closing Day Moments",
      content: `Closing day is always special, and this one was truly heartwarming. 
      Helping this wonderful family step into their dream home reminded me why I love what I do. 
      Their smiles, excitement, and trust made every step of the journey meaningful. 
      
      I’m grateful to have been part of this milestone and wish them joy in every corner of their new home.`,
      align: "left",
    },
  ];

  return (
    <section className="bg-white py-20 px-6 lg:px-24">
      {testimonials.map((testimonial, index) => {
        const isLeft = testimonial.align === "left";

        return (
          <div
            key={index}
            className={`flex flex-col ${
              isLeft ? "md:flex-row" : "md:flex-row-reverse"
            } items-center gap-10 mb-24`}
          >
            {/* Image with background block */}
            <div className="relative w-full md:w-1/2 h-[350px]">
              <div className="absolute top-4 left-4 w-full h-full bg-blue-100 rounded-lg -z-10" />
              <Image
                src={testimonial.image}
                alt={testimonial.title}
                fill
                className="object-cover rounded-lg shadow-md"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                {testimonial.title}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {testimonial.content}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default TestimonialsSection;
