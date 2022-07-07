import React from "react";
import s from './Cart.module.css';
import CartItem from "../CartItem/CartItem";

const Cart = ({...props}) => {
    const { shoppingCartItems } = props;

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
                {shoppingCartItems.map((item) => (
                    <CartItem 
                        key={item.name}
                        name={item.name}
                        img={item.image}
                        price={item.price}
                        quantity={item.quantity}
                        updateQuantity={props.updateQuantity}
                    />
                ))}
            </div>
    )
}

export default Cart;