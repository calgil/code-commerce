import React from "react";
import s from './Payment.module.css';
import InputBase from "../InputBase/InputBase";

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render(){

        const paymentInputs = [
            {name: 'cardHolderName', labelText: 'Card Holder Name *', type: 'text', error: 'cardHolderNameError' },
            {name: 'cardNumber', labelText: 'Card Number *', type: 'number', error: 'cardNumberError' },
            {name: 'cardExpiration', labelText: 'CVV *', type: 'number', error: 'cardExpiryError' },
        ]


        return (
            <div className={s.paymentContainer}>
                <h3>Payment</h3>
                {paymentInputs.map((item) => (
                    <InputBase
                        key={item.name}
                        name={item.name}
                        labelText={item.labelText}
                        type={item.type}
                    />
                ))}
            </div>
        )
    }
}

export default Payment;