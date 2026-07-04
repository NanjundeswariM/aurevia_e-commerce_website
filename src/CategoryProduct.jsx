import React from 'react'
import Dress from './category/Dress'
import Clothing from './category/Clothing'
import Cosmetics from './category/Cosmetics'
import Footwear from './category/Footwear'
import Accessories from './category/Accessories'
import Skincare from './category/Skincare'
import Haircare from './category/Haircare'
function CategoryProduct() {
  return (
    <div>
        <div><Dress/></div>
        <div><Clothing/></div>
        <div><Cosmetics/></div>
        <div><Footwear/></div>
        <div><Accessories/></div>
        <div><Skincare/></div>
        <div><Haircare/></div>
    </div>
  )
}

export default CategoryProduct