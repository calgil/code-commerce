import React from "react";
import s from './Checkout.module.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckoutStatus from "../CheckoutStatus/CheckoutStatus";
import Cart from "../Cart/Cart";
import OrderSummary from "../OrderSummary/OrderSummary";
import Shipping from "../Shipping/Shipping";
import Payment from "../Payment/Payment";
import InputBase from "../InputBase/InputBase";
import shirt from '../../assets/shirt.jpeg';
import backpack from '../../assets/backpack.jpeg';
import { SHIPPING_DATA } from "../../utilities/constants";
import { 
    onlyTextValidation,
    phoneValidation,
    postCodeValidation,
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
            userShoppingCart: [
                { name: 'T-Shirt', quantity: 1, image: shirt, price: 19.99, },
                { name: 'Backpack', quantity: 1, image: backpack, price: 49.99, },
            ],
            shippingData: SHIPPING_DATA,
            shippingError: {},
            disableButton: '',
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
        if(value > 0) {
            this.setState((prevState) => ({
                userShoppingCart: prevState.userShoppingCart.map((item) => (
                    item.name === name 
                    ? Object.assign(item, {quantity: value})
                    : item
                ))
            }), this.calcSubtotal);
        } else {
            this.setState((prevState) => ({
                userShoppingCart: prevState.userShoppingCart.filter((item) => item.name !== name)
            }), this.calcSubtotal);
        }
        
    }

    componentDidMount() {
        this.calcSubtotal();
    }

    updateScreenState = (name, sub, state) => {
        this.setState((prevState) => ({
            [name]: {
                ...prevState[name],
                [sub]: state,
            }
        }))
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

    // is there a way to replace all of these functions 
    // sets all of checkoutStatus to false, resetScreenStatus, except for the desired one?
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

    updateShippingData = (name, value) => {
        this.setState((prevState) => ({
            shippingData: {
                ...prevState.shippingData, 
                [name]: value,
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
        const { shippingCost } = this.state;
        // console.log('cost',typeof shippingCost === 'string');
        let checkError = this.checkShippingError();
        if (typeof shippingCost === 'string') {
            checkError = true;
        }
        if (!checkError) {
            this.goToPaymentScreen()
        }
    }

    render(){
        const { userShoppingCart, subtotal, checkoutStatus, shippingCost,shippingData, shippingError } = this.state;
        const { showCart, showShipping, showPayment, showConfirmation } = checkoutStatus;
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
                             shoppingCartItems={userShoppingCart}
                             updateQuantity={this.updateQuantity}
                         />}
                         { ( showShipping ) && 
                         <Shipping 
                            goToCartScreen={this.goToCartScreen}
                            updateShippingCost={this.updateShippingCostState}
                            updateShippingData={this.updateShippingData}
                            handleShippingValidations={this.handleShippingValidations}
                            shippingData={shippingData}
                            shippingError={shippingError}
                         />
                         }
                         { ( showPayment ) && 
                         <Payment 
                            goToShippingScreen={this.goToShippingScreen}
                         />
                         }
                         { ( showConfirmation ) &&
                             <h3>Confirmation</h3>
                         }
                         <OrderSummary
                             cartSubtotal={subtotal}
                             checkoutStatus={checkoutStatus}
                             userShoppingCart={userShoppingCart}
                             shippingCost={shippingCost}
                          />
                          {( showCart ) && 
                            <InputBase 
                                className={s.checkoutBtn}
                                type="submit"
                                value='Checkout'
                                onClick={this.goToShippingScreen}
                                disabled={
                                    (!userShoppingCart.length)
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
                    </div>
                </div>
            </div>
        )
    }
}

export default Checkout;