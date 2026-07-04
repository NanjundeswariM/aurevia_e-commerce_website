import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Website from './Website.jsx'
import NewArrival from './pages/NewArrival.jsx'
import Dresses from './pages/Dresses.jsx'
import Clothing from './pages/Clothing.jsx'
import Cosmetics from './pages/Cosmetics.jsx'
import Footwear from './pages/Footwear.jsx'
import Accessories from './pages/Accessories.jsx'
import Skincare from './pages/Skincare.jsx'
import Haircare from './pages/Haircare.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Layout from './Layout.jsx'
import Checkout from './pages/Checkout.jsx'
import { CartProvider } from './context/CartContext.jsx'
import Payment from './pages/Payment.jsx'
import Success from "./pages/Success"
import Wishlist from './pages/Wishlist.jsx'
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Website />} />
            <Route path="/new-arrivals" element={<NewArrival />} />
            <Route path="/dresses" element={<Dresses />}/>
            <Route path="/clothing" element={<Clothing/>}/>
            <Route path="/cosmetics" element={<Cosmetics/>}/>
            <Route path="/footwear" element={<Footwear/>}/>
            <Route path="/accessories" element={<Accessories/>}/>
            <Route path="/skincare" element={<Skincare/>}/>
            <Route path="/haircare" element={<Haircare/>}/>
            <Route path="/product/:category/:id" element={<ProductDetails />}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment/>}/>
            <Route path="/success" element={<Success/>}/>
            <Route path="/wishlist" element={<Wishlist/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App