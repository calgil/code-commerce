import React from "react";
import s from './Payment.module.css';
import InputBase from "../InputBase/InputBase";
import { OTHERCARDS } from "../../utilities/constants";
import ExpirationDropdown from "../ExpirationDropdown/ExpirationDropdown";

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maxLength: OTHERCARDS.length,
            // might put expiration date up here
            // cardType: null,
        }
    }

    findCardType = (cardNumber) => {
        const regexPattern = {
            MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
            VISA: /^4[0-9]{2,}$/,
            AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
            DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
        }
        for(const card in regexPattern) {
            if(cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) return card;
        }
        return '';
    }

    handleBlur = ({ target: { name, value } }) => {
        if (name === 'cardNumber') {
            let cardType = this.findCardType(value);
            this.props.updateData('cardData', 'cardType', cardType);
            this.props.handleCardValidations(name, value);
        } else {
            this.props.handleCardValidations(name, value);
        }
    }

    createCardMask = (value) => {
        let mask = value.split(' ').join('');
        if(mask.length) {
            mask = mask.match(new RegExp('.{1,4}', 'g')).join(' ')
            return mask;
        }
    }

    handleInputData = ({ target: { name, value } }) => {
        if(name === 'cardNumber'){
            let mask = this.createCardMask(value);
            this.props.updateData('cardData', name, mask)
        } else {
            this.props.updateData('cardData', name, value)
        }
    }

    handleExpiration = ({ target: { name, value } }) => {
        let dateObj = {month: '', year: ''}
        if (name === 'month') {
            dateObj.month = value
        } else {
            dateObj.year = value
        }
        // needs work
        if(dateObj.name !== '' 
            && dateObj.year !== '') {
            let string = (dateObj.name + dateObj.year)
            console.log(string);
        }
        // this.props.updateData('cardData', 'cardExpiration', (dateObj.month + dateObj.year))
        // I want to take in the month/year and make a string 
        // hopefully can manipulate the string here and pass to checkout
    }

    render(){
        const { goToShippingScreen, cardData, cardError, cardType, } = this.props;
        const { maxLength, } = this.state;

        const paymentInputs = [
            {name: 'cardHolderName', labelText: 'Card Holder Name *', type: 'text', error: 'cardHolderNameError' },
            {name: 'cardNumber', labelText: 'Card Number *', type: 'text', error: 'cardNumberError' },
            {name: 'cardSecurity', labelText: 'CVV *', type: 'text', error: 'cardSecurityError' },
        ]


        return (
            <div className={s.paymentContainer}>
                <button className={s.back} onClick={goToShippingScreen}>
                    Back to Shipping
                </button>

                <h3>Payment</h3>
                <form action="">
                    {paymentInputs.map((item) => (
                        <InputBase
                            key={item.name}
                            name={item.name}
                            labelText={item.labelText}
                            type={item.type}
                            onChange={this.handleInputData}
                            onBlur={this.handleBlur}
                            value={cardData[item.name]}
                            cardType={cardType}
                            maxLength={
                                item.name === 'cardNumber'
                                ? maxLength
                                : null
                            }
                            error={
                                (cardError
                                && cardError[item.error]
                                && cardError[item.error].length > 1)
                                ? cardError[item.error]
                                : null
                            }

                        />
                    ))}
                         {/* probably need another function here to actually update state correctly */}
                    < ExpirationDropdown 
                        onChange={this.handleExpiration}
                    />
                    <InputBase
                            key={'cardSecurity'}
                            name={'cardSecurity'}
                            labelText={'CVV *'}
                            type={'number'}
                            onChange={this.handleInputData}
                            onBlur={this.handleBlur}
                            value={cardData['cardSecurity']}
                            cardType={cardType}
                            maxLength={3}
                            error={
                                (cardError
                                && cardError['cardSecurityError']
                                && cardError['cardSecurityError'].length > 1)
                                ? cardError['cardSecurityError']
                                : null
                            }

                        />
                </form>
            </div>
        )
    }
}

export default Payment;