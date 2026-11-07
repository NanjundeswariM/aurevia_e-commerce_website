import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import Payment from './pages/Payment.jsx'
import Success from './pages/Success'
import Wishlist from './pages/Wishlist.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import MyOrders from './pages/MyOrders.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminProtectedRoute from './AdminProtectedRoute.jsx'
import AdminProducts from './pages/AdminProducts.jsx'
import GoogleSuccess from "./pages/GoogleSucces.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Website />} />
          <Route path="/new-arrivals" element={<NewArrival />} />
          <Route path="/dresses" element={<Dresses />} />
          <Route path="/clothing" element={<Clothing />} />
          <Route path="/cosmetics" element={<Cosmetics />} />
          <Route path="/footwear" element={<Footwear />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/skincare" element={<Skincare />} />
          <Route path="/haircare" element={<Haircare />} />
          <Route path="/product/:category/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={
            <ProtectedRoute><Cart /></ProtectedRoute>
          } />
          <Route path="/wishlist" element={
            <ProtectedRoute><Wishlist /></ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute><Checkout /></ProtectedRoute>
          } />
          <Route path="/payment" element={
            <ProtectedRoute><Payment /></ProtectedRoute>
          } />
          <Route path="/success" element={
            <ProtectedRoute><Success /></ProtectedRoute>
          } />
          <Route path="/my-orders" element={
            <ProtectedRoute><MyOrders /></ProtectedRoute>
          } />
          <Route path="/admin" element={
            <AdminProtectedRoute>
              <AdminDashboard />
              </AdminProtectedRoute>
          }/>
          <Route path="/admin/products" element={
            <AdminProtectedRoute>
              <AdminProducts />
            </AdminProtectedRoute>
          }/>
          <Route path="/google-success" element={<GoogleSuccess />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App