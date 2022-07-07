import React from "react";
import InputBase from "../InputBase/InputBase";
import s from './OrderSummary.module.css';
import {validateCartCheckout} from "../../utilities/validations";

class OrderSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // shippingCost: 0,
            cartTotal: '',
            disableButton: true,
            error: {},
        }
    }

    // disableClick = () => {
    //     this.setState({ 
    //         disableButton: false,
    //      })
    // }

    enableClick = () => {
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

    // checkError = () => {
    //     const {error} = this.state;
    //     let isError = false;
    //     Object.keys(error).forEach((key) => {
    //         // console.log('check', key);
    //         if(error[key].length > 0) {
    //             isError = true;
    //             // this.disableClick();
    //         } 
    //         // else {
    //         //     console.log('error check', error[val]);
    //         // }
    //         // if ((!error[val].length) && (error[val] === 'showCart')) {
    //         //     console.log('next screen');
    //         //     this.props.updateScreenState('checkoutStatus', 'showCart', false);
    //         //     this.props.updateScreenState('checkoutStatus', 'showShipping', true);
    //         // }
    //         // console.log(error[val].length);
    //     })
    //     return isError;
    // }

    componentDidMount = () => {
        this.validateNextScreen();
    }

    handleClick = () => {
        const { checkoutStatus, goToShippingScreen, goToPaymentScreen } = this.props;
        const { error } = this.state;
        this.validateNextScreen();
        this.promptSignIn();
            if(checkoutStatus['showCart'] && (!error['showCartError'].length) ){
                console.log('go to shipping');
                goToShippingScreen();
            } else if(checkoutStatus['showShipping'] && (!error['showShippingError'].length)) {
                console.log('go to payment');
                goToPaymentScreen();
            }
        // }
    }


    render() {
        // const {  } = this.state
        const { cartSubtotal, userShoppingCart, shippingCost } = this.props;
        return (
            <div className={s.summary}>
                <div className={s.orderInfo}>
                    <div className={s.info}>
                        <h3 className={s.title}>Order Summary</h3>
                        <p><span>Subtotal:</span>{
                            (cartSubtotal === 0) 
                            ? '' 
                            : <span className={s.subtotal}> ${cartSubtotal} </span>
                        }</p>
                        <p><span>Shipping & Handling:</span>{
                            // Maybe change this to check for Nan
                            (shippingCost === '')
                            ? <span className={s.shipping}>{'--'}</span>
                            : <span className={s.shipping}>${shippingCost.toFixed(2)}</span>
                        }</p>
                    </div>
                    <div className={s.total}>
                        <hr />
                        <p className={s.cartTotal}>
                            <span>Cart Total:</span>
                            <span className={s.cartTotal}>${cartSubtotal + shippingCost}</span>
                        </p>

                    </div>
                </div>
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