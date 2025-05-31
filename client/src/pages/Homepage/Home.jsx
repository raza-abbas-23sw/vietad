import React from "react";
import HeroSection from "./HeroSection"; // Make sure the path is correct based on your folder structure
import CustomSignSection from "./CustomSignSection";
import TrendySlider from "./TrendySlider";
import CommercialSignsSection from "./CommercialSignsSection";
import TestimonialSlider from "./TestimonialSlider";
import DesignSteps from "./DesignSteps";
const Home = () => {
  return (
    <div>
      <HeroSection />
      <CustomSignSection />
      <TrendySlider />
      <CommercialSignsSection/>
      <TestimonialSlider/>
      <DesignSteps/>
    </div>
  );
};

export default Home;
