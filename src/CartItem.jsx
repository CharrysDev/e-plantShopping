// CartItem.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const handleRemoveItem = (item) => {
        dispatch(removeItem(item));
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item));
        }
    };

    const calculateTotalCost = () => {
        return cartItems.reduce((total, item) => total + (parseFloat(item.cost.slice(1)) * item.quantity), 0).toFixed(2);
    };

    return (
        <div className="cart-items">
            {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                    <h3>{item.name}</h3>
                    <img src={item.image} alt={item.name} />
                    <p>{item.description}</p>
                    <p>{item.cost}</p>
                    <div>
                        <button onClick={() => handleDecrement(item)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleIncrement(item)}>+</button>
                    </div>
                    <button onClick={() => handleRemoveItem(item)}>Remove</button>
                </div>
            ))}
            <h2>Total Cost: ${calculateTotalCost()}</h2>
            <button onClick={onContinueShopping}>Continue Shopping</button>
            <button onClick={() => alert('Functionality to be added for future reference')}>Checkout</button>
        </div>
    );
}

export default CartItem;
