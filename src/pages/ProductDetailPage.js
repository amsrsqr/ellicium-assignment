import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetailPage = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <>
    <div className="d-flex gap-3">
        <button className="btn btn-primary mt-3 mx-2" onClick={() => navigate(-1)}>
          go back
        </button>
      </div>
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.title} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p className="h4">${product.price}</p>
          <div className="my-3">
            <input
              type="number"
              className="form-control w-25 d-inline"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <button onClick={() => addToCart(product, quantity)} className="btn btn-success ms-3">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetailPage;
