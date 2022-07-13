import React from "react";
import s from './Checkout.module.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../Header/Header";
import CheckoutStatus from "../CheckoutStatus/CheckoutStatus";
import Cart from "../Cart/Cart";
import OrderSummary from "../OrderSummary/OrderSummary";
import Shipping from "../Shipping/Shipping";
import Payment from "../Payment/Payment";
import Confirmation from "../Confirmation/Confirmation";
import InputBase from "../InputBase/InputBase";
import { INIT_SHIPPING_DATA, INIT_CARD_DATA } from "../../utilities/constants";
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
            cart: [],
            shippingData: INIT_SHIPPING_DATA,
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

    calcSubtotal = (cart) => {
        const subtotal = cart.reduce((acc, obj) => {
            return acc + (obj.quantity * obj.price)
        }, 0);
        this.updateSubtotalState(subtotal);
    }

    updateQuantity = (name, value) => {
        const { cart } = this.props;
        if(value > 0) {
            cart.map((item) => (
                item.name === name 
                ? Object.assign(item, {quantity: value})
                : item
            ))
            this.props.updateCart(cart);
            this.calcSubtotal(cart);
        } 
        else {
            let updatedCart = cart.filter((item) => item.name !== name);
            this.props.updateCart(updatedCart);   
            this.calcSubtotal(updatedCart);
        }
    }

    componentDidMount() {
        this.calcSubtotal(this.props.cart);
    }

    static getDerivedStateFromProps(props) {
        return { cart: props.cart }
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
    // this function is almost identical to checkCardError
    //  I tried to make a function that could do both to be DRY
    // but I wanted isError boolean, errorValue array 
    // and the name of the object to be updated in state and 
    // didn't know how to make that work in another function ...sorry 
    
    checkShippingError = () => {
        const { shippingData, shippingError } = this.state;
        let errorValue = [];
        let isError = false;
        
        Object.keys(shippingData).forEach((val) => {
            if(!shippingData[val].length) {
                errorValue = { ...errorValue, [`${val}Error`]: 'Required'}
                isError = true;
            }
        })
        this.setState((prevState) => ({ 
            ...prevState.shippingError,
             ...errorValue
             }))
        Object.keys(shippingError).forEach((val) => {
            if(shippingError[val]) {
                isError = true;
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
        console.log('up', type, value);
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

    checkPaymentError = () => {
        const { cardData, cardError } = this.state;
        let errorValue = [];
        let isError = false;
        
        Object.keys(cardData).forEach((val) => {
            if(!cardData[val].length) {
                errorValue = { ...errorValue, [`${val}Error`]: 'Required'}
                isError = true;
            }
        })
        console.log('error',errorValue);
        this.setState((prevState) => ({
            cardError: {
                ...prevState.cardError,
                ...errorValue
            }
        }))
        Object.keys(cardError).forEach((val) => {
            if(cardError[val]) {
                isError = true;
            }
        })
        return isError;
    }

    checkPayment = () => {
        let checkError = this.checkPaymentError();
        console.log('error', checkError);
        if(!checkError) {
            this.goToConfirmationScreen();
        }
    }

    resetData = () => {
        this.setState({
            shippingData: INIT_SHIPPING_DATA,
            cardData: INIT_CARD_DATA,
        });
        this.props.updateCart([]);
        this.props.toggleShowCheckout();
    }

    applyDiscount = () => {
        const { subtotal } = this.state;
        let discountAmount = subtotal * 0.2;
        let updatedSubtotal = subtotal - discountAmount;
        this.updateSubtotalState(updatedSubtotal);
    }

    render(){
        const { 
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
                    <div className={s.close}>
                        <FontAwesomeIcon 
                            icon={faXmark}
                            onClick={this.props.toggleShowCheckout}
                        />
                    </div>
                    <Header 
                        toggleShowSignIn={this.props.toggleShowSignIn}
                        cartCount={cart.length}
                        handleCartClick={this.props.toggleShowCheckout}
                    />
                     <CheckoutStatus
                         checkoutStatus={checkoutStatus}
                     />
                    <div className={s.checkoutBody}>
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
                            <Confirmation 
                                reset={this.resetData}
                            />
                         }
                         <OrderSummary
                             cartSubtotal={subtotal}
                             checkoutStatus={checkoutStatus}
                             userShoppingCart={cart}
                             shippingCost={shippingCost}
                             shippingData={shippingData}
                             cardData={cardData}
                             applyDiscount={this.applyDiscount}
                          />
                          {( showCart ) && 
                            <div className={s.btnContainer}>
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
                            </div>
                          }
                          { ( showShipping ) && 
                            <div className={s.btnContainer}>
                                <InputBase 
                                    className={s.checkoutBtn}
                                    type="submit"
                                    value='Checkout'
                                    onClick={this.checkShipping}
                                />
                            </div>
                            }
                            { ( showPayment ) && 
                            <div className={s.btnContainer}>
                                <InputBase 
                                    className={s.checkoutBtn}
                                    type="submit"
                                    value='Pay'
                                    onClick={this.checkPayment}
                            />
                            </div>
                            }
                    </div>
            </div>
        )
    }
}

export default Checkout;