import React from 'react'
import HeroBar from './HeroBar.jsx'
import Category from './Category.jsx'
import Banner from './Banner.jsx'
import ProductCard from './ProductCard.jsx'
import Footer from './Footer.jsx'
import CategoryProduct from './CategoryProduct.jsx'
function Website() {
  return (
    <div>
      <div>
        <Category />
        <Banner />
        <ProductCard />
        <CategoryProduct />
      </div>
    </div>
  );
}

export default Website;