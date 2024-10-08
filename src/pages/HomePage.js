import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import { Link } from 'react-router-dom';

const HomePage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));

    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  let filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filterCategory) {
    filteredProducts = filteredProducts.filter(
      product => product.category === filterCategory
    );
  }

  if (sortOption === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'name-asc') {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
  }else if (sortOption === 'name-desc') {
    filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="d-flex">
          <select className="form-select me-2" onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Sort by</option>
            <option value="price-asc">Price (low to high)</option>
            <option value="price-desc">Price (high to low)</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
          <select className="form-select" onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <Link to="/cart">
          <button className="btn btn-primary">View Cart</button>
        </Link>
      </div>
      <ProductList products={filteredProducts} addToCart={addToCart} />
    </div>
  );
};

export default HomePage;
