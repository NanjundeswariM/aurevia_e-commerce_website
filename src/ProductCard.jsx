import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
function ProductCard() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3000/new-arrivals")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err))
  }, [])
  return (
    <div className='container mt-3'>
      <div className='d-flex justify-content-center align-items-center flex-column gap-2 mb-4'>
        <h3 className='banner-text'>
          New Arrivals <i className="bi bi-stars"></i>
        </h3>
        <small className='banner-text text-center'>
          Explore our newest collections designed to make every moment stylish.
        </small>
      </div>
      <div className='row g-4'>
        {
          products.map(product => (
            <div className='col-lg-3 col-md-4 col-sm-6' key={product.id}>
              <div className='card shadow-sm h-100' style={{cursor:'pointer'}} onClick={()=>navigate(`/product/new-arrivals/${product.id}`)}>
                <img src={product.image} className='card-img-top product-image' alt={product.name} />
                <div className='card-body'>
                  <span className='badge bg-dark'>
                    {product.tag}
                  </span>
                  <h5 className='mt-2'>
                    {product.name}
                  </h5>
                  <p className='text-muted'>
                    {product.category}
                  </p>
                  <h6>
                    ₹{product.price}
                    <del className='ms-2 text-muted'>
                      ₹{product.oldPrice}
                    </del>
                  </h6>
                  <p>
                    ⭐ {product.rating} ({product.reviews})
                  </p>
                  <button className='btn btn-dark w-100'>
                    <i className="bi bi-cart"></i> Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ProductCard