import React from 'react'
import ProductHero from './hero/ProductHero'
import Products from './Products'
import ImgSlider from './imgSlider/ImgSlider'
import Faq from './Faq/Faq'
const ProductsPage = () => {
  return (
    <div>
      <ProductHero/>
      <Products/>
      <ImgSlider/>
      <Faq/>
      
    </div>
  )
}

export default ProductsPage
