import React from "react";
import s from './OrderSummary.module.css';

class OrderSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subtotal: 0,
        }
    }

    render() {
        const { subtotal } = this.state
        return (
            <div className={s.summary}>
                <h3>Order Summary</h3>
                <p>Subtotal:{(subtotal === 0) ? '' : subtotal}</p>
            </div>
        )
    }
}

export default OrderSummary;