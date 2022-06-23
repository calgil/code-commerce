import React from "react";
import s from './Cart.module.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { items } from '../../utilities/constants';
import CartItem from "../CartItem/CartItem";
import OrderSummary from "../OrderSummary/OrderSummary";

class Cart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            subtotal: 0,
        }
    }

    updateSubtotal = (itemTotal) => {
        
    }

    render(){
        return (
            <div className={s.cartBg}>
                <div className={s.close}>
                        <FontAwesomeIcon 
                            icon={faXmark}
                            onClick={this.props.cartVisibility}
                        />
                </div>
                <div className={s.cartBody}>
                    <h3 className={s.title}>Your Cart</h3>
                    <div className={s.cartHeader}>
                        <span className={s.product}>Product</span>
                        <div className={s.info}>
                            <span>Price</span>
                            <span>Quantity</span>
                            <span>Total Price</span>
                        </div>
                    </div>
                    <hr />
                    {items.map((item) => (
                        <CartItem 
                            key={item.name}
                            name={item.name}
                            img={item.image}
                            price={item.price}
                            updateTotalItemPrice={this.updateSubtotal}
                        />
                    ))}
                </div>
                <OrderSummary />
            </div>
        )
    }
}

export default Cart;