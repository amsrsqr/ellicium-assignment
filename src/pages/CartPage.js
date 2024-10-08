import React from "react";
import { useNavigate } from "react-router-dom";

const CartPage = ({ cartItems, removeFromCart, updateCartQuantity }) => {
  const navigate = useNavigate();
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <>
      <div className="d-flex gap-3">
        <button className="btn btn-primary mt-3 mx-2" onClick={() => navigate(-1)}>
          go back
        </button>
      </div>

      <div className="container my-4">
        {cartItems.length === 0 ? (
          <h2 className="mt-2">Your cart is empty.</h2>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="row mb-4">
                <div className="col-md-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-6">
                  <h5>{item.title}</h5>
                  <p>${item.price}</p>
                </div>
                <div className="col-md-2">
                  <input
                    type="number"
                    className="form-control"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      updateCartQuantity(item.id, parseInt(e.target.value))
                    }
                  />
                </div>
                <div className="col-md-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <h2>Total Price: ${getTotalPrice()}</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
