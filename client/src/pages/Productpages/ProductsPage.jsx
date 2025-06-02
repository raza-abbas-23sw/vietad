import React from 'react'
import ProductHero from './ProductHero'
import Products from './Products'
import {scrollerData} from "../../assets/allData/productPageData/imgSliderData.js"
import Faq from '../../components/Faq/Faq'
import {faqsData} from "../../assets/allData/faqData/ProductPageFaq.js" 
import ImageTextScroller from '../../components/imgTextSlider/ImageTextScroller.jsx'

const ProductsPage = () => {
  return (
    <div>
      <ProductHero/>
      <Products/>
      <ImageTextScroller scrollerData={scrollerData} />
      <Faq faqs={faqsData }/>
      
    </div>
  )
}

export default ProductsPage
