import React from "react";
import HeroSection from "./HeroSection"; // Make sure the path is correct based on your folder structure
import CustomSignSection from "./CustomSignSection";
import TrendySlider from "./TrendySlider";
import CommercialSignsSection from "./CommercialSignsSection";
const Home = () => {
  return (
    <div>
      <HeroSection />
      <CustomSignSection />
      <TrendySlider />
      <CommercialSignsSection/>
    </div>
  );
};

export default Home;
