import React from "react";
import s from './OrderSummary.module.css';

class OrderSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { cartSubtotal, userShoppingCart, shippingCost } = this.props;
        return (
            <div className={s.summary}>
                <div className={s.orderInfo}>
                    <div className={s.info}>
                        <h3 className={s.title}>Order Summary</h3>
                        <p><span>Subtotal:</span>{
                            (cartSubtotal === 0) 
                            ? '' 
                            : <span className={s.subtotal}> ${Number(cartSubtotal).toFixed(2)} </span>
                        }</p>
                        <p><span>Shipping & Handling:</span>{
                            (shippingCost === '')
                            ? <span className={s.shipping}>{'--'}</span>
                            : <span className={s.shipping}>${shippingCost.toFixed(2)}</span>
                        }</p>
                    </div>
                    <div className={s.total}>
                        <hr />
                        <p className={s.cartTotal}>
                            <span>Cart Total:</span>
                            <span className={s.cartTotal}>${Number(cartSubtotal + shippingCost).toFixed(2)}</span>
                        </p>

                    </div>
                </div>
            </div>
        )
    }
}

export default OrderSummary;