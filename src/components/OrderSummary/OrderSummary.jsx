import React from "react";
import InputBase from "../InputBase/InputBase";
import s from './OrderSummary.module.css';
import {validateCartCheckout} from "../../utilities/validations";

class OrderSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shippingCost: 0,
            cartTotal: '',
            disableButton: true,
            error: {},
        }
    }

    disableClick = () => {
        this.setState({ 
            disableButton: false,
         })
    }

    promptSignIn = () => {
        const {loggedIn,} = this.props;
        if (!loggedIn) {
            this.props.toggleShowSignIn();
        }
    }

    validateNextScreen = () => {
        const {checkoutStatus, userShoppingCart,} = this.props;
        Object.keys(checkoutStatus).forEach((key) => {
            let errorText;
            // let isError = false;
            switch(key){
                case 'showCart':
                        errorText = validateCartCheckout(userShoppingCart);
                        this.setState((prevState) => ({
                            error: {
                                ...prevState.error, 
                                [`${key}Error`]: errorText,
                            }
                        }))
                    break;
                case 'showShipping':
                        errorText = 'show shipping'
                        this.setState((prevState) => ({
                            error: {
                                ...prevState.error, 
                                [`${key}Error`]: errorText,
                            }
                        }))
                    break;
                case 'showPayment':
                    errorText = 'show billing'
                    break;
                case 'showConfirmation':
                    errorText = 'show confirmation'
                    break;
                default:
                    break;
            }
        })
    }

    checkError = () => {
        const {error} = this.state;
        let isError = false;
        Object.keys(error).forEach((key) => {
            console.log('check', key);
            if(error[key].length > 0) {
                isError = true;
                this.disableClick();
            } 
            // else {
            //     console.log('error check', error[val]);
            // }
            // if ((!error[val].length) && (error[val] === 'showCart')) {
            //     console.log('next screen');
            //     this.props.updateScreenState('checkoutStatus', 'showCart', false);
            //     this.props.updateScreenState('checkoutStatus', 'showShipping', true);
            // }
            // console.log(error[val].length);
        })
        return isError;
    }

    // componentDidMount = () => {
    //     this.validateNextScreen();
    // }

    handleClick = () => {
        const { checkoutStatus, goToShippingScreen, goToPaymentScreen } = this.props;
        this.validateNextScreen();
        this.promptSignIn();
        let errorCheck = this.checkError();
        if(!errorCheck) {
            if(checkoutStatus['showCart']){
                goToShippingScreen();
            } else if(checkoutStatus['showShipping']) {
                goToPaymentScreen();
            }
            console.log('no error');
        }
    }


    render() {
        const { shippingCost,  } = this.state
        const { cartSubtotal, userShoppingCart } = this.props;
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
                <div className={s.btnContainer}>
                    <InputBase 
                        className={s.checkoutBtn}
                        type="submit"
                        value='Checkout'
                        onClick={this.handleClick}
                        disabled={
                            (!userShoppingCart.length)
                            ? true
                            : false 
                        }
                    />
                </div>
            </div>
        )
    }
}

export default OrderSummary;