import React from "react";
import InputBase from "../InputBase/InputBase";
import s from './OrderSummary.module.css';

class OrderSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shippingCost: 0,
            cartTotal: '',
        }
    }

    render() {
        const { shippingCost } = this.state
        const { cartSubtotal } = this.props;
        return (
            <div className={s.summary}>
                <div className={s.orderInfo}>
                    <h3 className={s.title}>Order Summary</h3>
                    <p><span>Subtotal:</span>{
                        (cartSubtotal === 0) 
                        ? '' 
                        : <span className={s.subtotal}> ${cartSubtotal} </span>
                    }</p>
                    <p><span>Shipping & Handling:</span>{
                        (shippingCost === 0)
                        ? <span className={s.shipping}>{'--'}</span>
                        : <span className={s.shipping}>{shippingCost}</span>
                    }</p>
                    <p className={s.cartTotal}>
                        <span>Cart Total:</span>
                        <span className={s.cartTotal}>{cartSubtotal + shippingCost}</span>
                    </p>
                </div>
                <hr />
                <InputBase 
                    type="submit"
                    value='Checkout'
                    onClick={this.props.handleCheckoutClick}
                />
            </div>
        )
    }
}

export default OrderSummary;