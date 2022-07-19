import React from "react";
import s from './Cart.module.css';
import CartItem from "../CartItem/CartItem";

const Cart = ({...props}) => {
    const { cart } = props;

    return (
            <div className={s.cartBody}>
                <h3 className={s.title}>Your Cart</h3>
                <div className={s.cartHeader}>
                    <span className={s.product}>Product</span>
                    <div className={s.info}>
                        <span className={s.price}>Price</span>
                        <span>Quantity</span>
                        <span>Total Price</span>
                    </div>
                </div>
                {cart.length && cart.map((item) => (
                    <CartItem 
                        key={item.name}
                        updateQuantity={props.updateQuantity}
                        data={item}
                    />
                ))}
            </div>
    )
}

export default Cart;