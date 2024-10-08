import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="row">
      {products.map(product => (
        <div key={product.id} className="col-md-4 col-lg-3 mb-4">
          <ProductItem product={product} addToCart={addToCart} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
