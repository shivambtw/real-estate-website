import BuyerForm from "@/components/buying-module/buyer-form";
import TestimonialsSection from "@/components/buying-module/testimonial-section";
import ConsultExpert from "@/components/common/consult-expert";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Image from "next/image";

const TestimonialSection = () => {
  return (
    <>
      <section className="bg-white py-16 px-4 md:px-8 lg:px-24 text-gray-700 mt-20 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-black mb-8">
          Bought With Shivam Arora!
        </h2>
        <Image
          src="/images/dfgh.png"
          alt="Real Estate Agent"
          width={400}
          height={400}
          className="rounded-lg shadow-lg"
        />
        <div className="text-center text-lg leading-relaxed space-y-4 mt-4">
          <p>
            As one of the most trusted real estate agents in Nova Scotia, we are
            dedicated to helping you find a property that perfectly aligns with
            your lifestyle. Our commitment is to make your transition into your
            ideal home as smooth as possible, guiding you through each step of
            the process.
          </p>
          <p>
            We take a personalized approach, focusing on your specific needs and
            preferences in every decision. Leveraging our extensive knowledge of
            the local market, we work to identify properties that meet your
            criteria, ensuring a pleasant and efficient home-buying journey.
          </p>
          <p>
            From the first consultation to the closing of the deal, we offer
            comprehensive support, including expert guidance on financing
            options, neighborhood analysis, and property assessments. Our
            mission is to simplify the process and alleviate stress, so you can
            focus on building your future in your new home.
          </p>
        </div>
      </section>
      <TestimonialsSection />
      <div className="lg:block hidden">
        <AuroraBackground>
          <ConsultExpert />
        </AuroraBackground>
      </div>
      <div className="lg:hidden">
        <ConsultExpert />
      </div>
      {/* <ConsultationForm /> */}
      <div className="bg-black py-12">
        <BuyerForm />
      </div>
    </>
  );
};

export default TestimonialSection;
