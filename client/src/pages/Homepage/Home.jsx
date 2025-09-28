import React from "react";
import HeroSection from "./sections/HeroSection.jsx"; // Make sure the path is correct based on your folder structure
import CustomSignSection from "./sections/CustomSignSection.jsx";
import TrendySlider from "./sections/TrendySlider.jsx";
import CommercialSignsSection from "./sections/CommercialSignsSection";
import TestimonialSlider from "./sections/TestimonialSlider.jsx";
import DesignSteps from "./sections/DesignSteps.jsx";
import ImageTextScroller from "../../components/imgTextSlider/ImageTextScroller";
import {scrollerData} from "../../assets/allData/homePagaData/imgTextSliderData.js"
import TrustedBy from "./sections/TrustedBy.jsx";
import GetStartedSection from "./GetStarted/GetStartedSection.jsx";
const Home = () => {
  return (
    <div>
      <HeroSection />
      <CustomSignSection />
      <TrendySlider />
      <CommercialSignsSection />
      <TestimonialSlider />
      <DesignSteps />
      <TrustedBy />
      <ImageTextScroller scrollerData={scrollerData} />
      <GetStartedSection />
    </div>
  );
};

export default Home;
