import React from "react";
import s from './Payment.module.css';
import InputBase from "../InputBase/InputBase";
import { OTHERCARDS, months, years } from "../../utilities/constants";
import ExpirationDropdown from "../ExpirationDropdown/ExpirationDropdown";

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maxLength: OTHERCARDS.length,
            expiration: '',
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

    updateCardExpiration = () => {
        const { month, year } = this.state.expiration;
        if(month && year) {
            let value = `${month}/${year}`;
            this.props.updateData('cardData', 'cardExpiration', value);
        } else {
            this.props.updateData('cardData', 'cardExpiration', '');
        }
    }

    handleExpiration = ({ target: { name, value } }) => {
        console.log('name', name);
        console.log('value', value);
        this.setState((prevState) => ({
             expiration: {
                ...prevState['expiration'],
                [name]: value 
             }
            }));
    }

    render(){
        const { goToShippingScreen, cardData, cardError, cardType, } = this.props;
        const { maxLength, } = this.state;

        const paymentInputs = [
            {name: 'cardHolderName', labelText: 'Card Holder Name *', type: 'text', error: 'cardHolderNameError' },
            {name: 'cardNumber', labelText: 'Card Number *', type: 'text', error: 'cardNumberError' },
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
                    <div>Expiration Date: </div>
                    {(cardError
                        && cardError['cardExpirationError']
                        && cardError['cardExpirationError'].length > 1)
                        ? <div className={s.error}>{cardError['cardExpirationError']}</div>
                        : null
                    }
                    <div className={s.dropdownContainer}>
                        < ExpirationDropdown 
                            className={s.dropdown}
                            name="month"
                            onChange={this.handleExpiration}
                            onBlur={this.updateCardExpiration}
                            data={months}
                        />
                        < ExpirationDropdown 
                            className={s.dropdown}
                            name="year"
                            onChange={this.handleExpiration}
                            onBlur={this.updateCardExpiration}
                            data={years}
                        />
                    </div>
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