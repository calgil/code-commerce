import React from "react";
import s from './Checkout.module.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckoutStatus from "../CheckoutStatus/CheckoutStatus";
import Cart from "../Cart/Cart";
import OrderSummary from "../OrderSummary/OrderSummary";
import Shipping from "../Shipping/Shipping";
import Payment from "../Payment/Payment";
import Confirmation from "../Confirmation/Confirmation";
import InputBase from "../InputBase/InputBase";
import { SHIPPING_DATA, INIT_CARD_DATA } from "../../utilities/constants";
import { 
    onlyTextValidation,
    phoneValidation,
    postCodeValidation,
    cardNumberValidation,
    cardExpireValidation,
    securityCodeValidation,
 } from "../../utilities/validations";


class Checkout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            checkoutStatus: {
                showCart: true, 
                showShipping: false, 
                showPayment: false,
                showConfirmation: false,
            },
            subtotal: 0,
            shippingCost: '',
            userShoppingCart: this.props.cart,
            shippingData: SHIPPING_DATA,
            shippingError: {},
            disableButton: '',
            cardData: INIT_CARD_DATA,
            cardError: {},
        }
    }

    updateShippingCostState = (value) => {
        this.setState({shippingCost: value})
    }

    updateSubtotalState = (newSubtotal) => {
        this.setState({ subtotal: newSubtotal })
    }

    calcSubtotal = () => {
        const { userShoppingCart } = this.state;
        const subtotal = userShoppingCart.reduce((acc, obj) => {
            return acc + (obj.quantity * obj.price)
        }, 0);
        this.updateSubtotalState(subtotal);
    }

    updateQuantity = (name, value) => {
        // needs work remove button not working
        // if(value > 0) {
            this.setState((prevState) => ({
                userShoppingCart: prevState.userShoppingCart.map((item) => (
                    item.name === name 
                    ? Object.assign(item, {quantity: value})
                    : item
                ))
            }), this.calcSubtotal);
        // } 
        // else {
        //     this.setState((prevState) => ({
        //         userShoppingCart: [prevState.userShoppingCart.filter((item) => item.name !== name)]
        //     }), this.calcSubtotal);
        // }
        
    }

    componentDidMount() {
        this.calcSubtotal();
    }

    resetScreenState = () => {
        const {checkoutStatus } = this.state;
        Object.keys(checkoutStatus).forEach((val) => {
            this.setState((prevState) => ({
                checkoutStatus: {
                    ...prevState.checkoutStatus,
                    [`${val}`]: false,
                }
            }))
        })
    }

    setNewScreenState = (visibleScreen) => {
        const {checkoutStatus } = this.state;
        this.resetScreenState();
        Object.keys(checkoutStatus).forEach((val) => {
            if (val === visibleScreen) {
                this.setState((prevState) => ({
                    checkoutStatus: {
                        ...prevState.checkoutStatus,
                        [`${val}`]: true,
                    }
                }))
            } 
        })
    }

    goToCartScreen = () => {
        this.setNewScreenState('showCart');
    }

    goToShippingScreen = () => {
        const {loggedIn,} = this.props;
        if (!loggedIn) {
            this.props.toggleShowSignIn();
        } else {
            this.setNewScreenState('showShipping');
        }
    }

    goToPaymentScreen = () => {
        this.setNewScreenState('showPayment');
    }

    goToConfirmationScreen = () => {
        this.setNewScreenState('showConfirmation');
    }

    updateData = (name, sub, state) => {
        this.setState((prevState) => ({
            [name]: {
                ...prevState[name],
                [sub]: state,
            }
        }))
    }

    handleShippingValidations = (type, value) => {
        let errorText;
        if (
            type === 'title'
            || type === 'name'
            || type === 'city'
            || type === 'state'
            ) {
                errorText = onlyTextValidation(value);
                this.setState((prevState) => ({
                    shippingError: {
                        ...prevState.shippingError,
                        [`${type}Error`]: errorText,
                    }
                }))
        } else if (type === 'phone') {
                errorText = phoneValidation(value);

                this.setState((prevState) => ({
                    shippingError: {
                        ...prevState.shippingError,
                        [`${type}Error`]: errorText,
                    }
                }))
            
        } else if (type === 'postcode') {
                errorText = postCodeValidation(value);
                this.setState((prevState) => ({
                    shippingError: {
                        ...prevState.shippingError,
                        [`${type}Error`]: errorText,
                    }
                }))
        }
    }

    // checkError = (data, error) => {
    //     console.log( error);
    //     // I think I can refactor this function with sign in and billing validation ?
    //     // const { shippingData, shippingError } = this.state;
    //     let errorValue = {};
    //     let isError = false;
        
    //     Object.keys(data).forEach((val) => {
    //         if(!data[val].length) {
    //             errorValue = { ...errorValue, [`${val}Error`]: 'Required'}
    //             isError = true;
    //         }
    //     })
    //     this.setState({ error: errorValue })
    //     Object.keys(error).forEach((val) => {
    //         if(error[val]) {
    //             isError = true;
    //         }
    //     })
    //     Object.keys(data).forEach((val) => {
    //         if(data[val].length) {
    //             this.handleShippingValidations(val, data[val]);
    //         }
    //     })
    //     return isError;
    // }

    checkShippingError = () => {
        // I think I can refactor this function with sign in and billing validation ?
        const { shippingData, shippingError } = this.state;
        let errorValue = {};
        let isError = false;
        
        Object.keys(shippingData).forEach((val) => {
            if(!shippingData[val].length) {
                errorValue = { ...errorValue, [`${val}Error`]: 'Required'}
                isError = true;
            }
        })
        this.setState({ shippingError: errorValue })
        Object.keys(shippingError).forEach((val) => {
            if(shippingError[val]) {
                isError = true;
            }
        })
        Object.keys(shippingData).forEach((val) => {
            if(shippingData[val].length) {
                this.handleShippingValidations(val, shippingData[val]);
            }
        })
        return isError;
    }

    checkShipping = () => {
        const { shippingCost, } = this.state;
        let checkError = this.checkShippingError();
        if (typeof shippingCost === 'string') {
            checkError = true;
        }
        if (!checkError) {
            this.goToPaymentScreen()
        }
    }

    handleCardValidations = (type, value) => {
        let errorText;
        switch(type){
            case 'cardHolderName':
                errorText = onlyTextValidation(value);
                this.setState((prevState) => ({
                    cardError: {
                        ...prevState.cardError,
                        [`${type}Error`]: errorText,
                    }
                }))
                break;
            case 'cardNumber':
                errorText = cardNumberValidation(value);
                this.setState((prevState) => ({
                    cardError: {
                        ...prevState.cardError,
                        [`${type}Error`]: errorText,
                    }
                }))
                break;
            case 'cardExpiration':
                errorText = cardExpireValidation(value);
                this.setState((prevState) => ({
                    cardError: {
                        ...prevState.cardError,
                        [`${type}Error`]: errorText,
                    }
                }))
                break;
            case 'cardSecurity':
                errorText = securityCodeValidation(3, value);
                this.setState((prevState) => ({
                    cardError: {
                        ...prevState.cardError,
                        [`${type}Error`]: errorText,
                    }
                }))
                break;
                default:
                    break;
        }
    }

    // ahhh!! this sucks! 

    checkPaymentError = () => {
        const { cardData, cardError } = this.state;
        let errorValue = {};
        let isError = false;
        
        Object.keys(cardData).forEach((val) => {
            if(!cardData[val].length) {
                errorValue = { ...errorValue, [`${val}Error`]: 'Required'}
                isError = true;
            }
        })
        this.setState(({ cardError: errorValue }))
        Object.keys(cardError).forEach((val) => {
            if(cardError[val]) {
                isError = true;
            }
        })
        Object.keys(cardData).forEach((val) => {
            if(cardData[val].length) {
                this.handleShippingValidations(val, cardData[val]);
            }
        })
        return isError;
    }

    checkPayment = () => {
        let checkError = this.checkPaymentError();
        if(!checkError) {
            this.goToConfirmationScreen();
        }
    }

    render(){
        const { 
            // userShoppingCart, 
            subtotal, 
            checkoutStatus, 
            shippingCost,
            shippingData, 
            shippingError,
            cardData,
            cardError,
         } = this.state;

        const { showCart, showShipping, showPayment, showConfirmation } = checkoutStatus;
        const { cart } = this.props;
        return (
            <div className={s.checkoutBg}>
                <div>
                    <div className={s.close}>
                        <FontAwesomeIcon 
                            icon={faXmark}
                            onClick={this.props.checkoutVisibility}
                        />
                    </div>
                     <CheckoutStatus
                         checkoutStatus={checkoutStatus}
                     />
                    <div className={s.checkoutBody}>
                        {/* Add a message if the cart is empty */}
                         {  ( showCart ) &&
                         <Cart 
                             shoppingCartItems={cart}
                             updateQuantity={this.updateQuantity}
                         />}
                         { ( showShipping ) && 
                         <Shipping 
                            goToCartScreen={this.goToCartScreen}
                            updateShippingCost={this.updateShippingCostState}
                            updateData={this.updateData}
                            handleShippingValidations={this.handleShippingValidations}
                            shippingData={shippingData}
                            shippingError={shippingError}
                         />
                         }
                         { ( showPayment ) && 
                         <Payment 
                            goToShippingScreen={this.goToShippingScreen}
                            updateData={this.updateData}
                            handleCardValidations={this.handleCardValidations}
                            cardData={cardData}
                            cardError={cardError}
                         />
                         }
                         { ( showConfirmation ) &&
                            <Confirmation />
                         }
                         <OrderSummary
                             cartSubtotal={subtotal}
                             checkoutStatus={checkoutStatus}
                             userShoppingCart={cart}
                             shippingCost={shippingCost}
                          />
                          {( showCart ) && 
                            <InputBase 
                                className={s.checkoutBtn}
                                type="submit"
                                value='Checkout'
                                onClick={this.goToShippingScreen}
                                disabled={
                                    (!cart.length)
                                    ? true
                                    : false 
                                    }
                            />
                          }
                          { ( showShipping ) && 
                            <InputBase 
                                className={s.checkoutBtn}
                                type="submit"
                                value='Checkout'
                                onClick={this.checkShipping}
                            />
                            }
                            { ( showPayment ) && 
                            <InputBase 
                                className={s.checkoutBtn}
                                type="submit"
                                value='Checkout'
                                onClick={this.checkPayment}
                            />
                            }
                    </div>
                </div>
            </div>
        )
    }
}

export default Checkout;