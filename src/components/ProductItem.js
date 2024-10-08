import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ product, addToCart }) => {
  return (
    <div className="card h-100">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          className="card-img-top"
          alt={product.title}
          style={{ height: "200px", objectFit: "contain" }}
        />
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">${product.price}</p>
          <p>
            <b>Category:</b>&nbsp;{product.category}
          </p>
          category
          <p>
            <b>Description:</b>&nbsp;{product.description}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="btn btn-primary mt-auto"
          >
            Add to Cart
          </button>
        </div>
      
    </div>
  );
};

export default ProductItem;
