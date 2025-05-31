import React from 'react'
import HeroSection from './HeroSection' // Make sure the path is correct based on your folder structure
import CustomSignSection from './CustomSignSection';
import TrendySlider from './TrendySlider';
const Home = () => {
  return (
    <div>
      <HeroSection />
            <CustomSignSection />
   <TrendySlider />
    </div>
  )
}

export default Home