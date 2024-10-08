import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) setCartItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id, newQuantity) => {
    setCartItems(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<HomePage addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetailPage addToCart={addToCart} />} />
        <Route path="/cart" element={
          <CartPage
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateCartQuantity={updateCartQuantity}
          />
        } />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
