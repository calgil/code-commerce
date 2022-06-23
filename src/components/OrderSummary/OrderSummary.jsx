import React from "react";
import s from './OrderSummary.module.css';

class OrderSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    render() {
        return (
            <div className={s.summary}>
                <h3>Order Summary</h3>
            </div>
        )
    }
}

export default OrderSummary;