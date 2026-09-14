import ConsultationForm from "@/components/buying-module/buying-consulation-form";
import MortgageCalculator from "@/components/buying-module/mortgage-calculator";
import ConsultExpert from "@/components/common/consult-expert";
import SlantBanner from "@/components/common/slant-banner";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function FirstTimeBuyerGuide() {
  return (
    <>
      <section className="bg-white py-16 px-6 lg:px-24 mt-24">
        <SlantBanner
          imageSrc="/images/inside4.png"
          altText="house image"
          title="Calculate Your Mortgage Payments with Ease"
          description="Not sure what mortgage payment you can afford? Use our Mortgage Calculator to quickly estimate your monthly payments and compare different options."
        />
      </section>
      <MortgageCalculator />
      <div className="lg:block hidden">
        <AuroraBackground>
          <ConsultExpert />
        </AuroraBackground>
      </div>
      <div className="lg:hidden">
        <ConsultExpert />
      </div>
      <ConsultationForm />
    </>
  );
}
