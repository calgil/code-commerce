import React from "react";
import s from './Checkout.module.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckoutStatus from "../CheckoutStatus/CheckoutStatus";
import Cart from "../Cart/Cart";
import OrderSummary from "../OrderSummary/OrderSummary";
import Shipping from "../Shipping/Shipping";
import Payment from "../Payment/Payment";
import shirt from '../../assets/shirt.jpeg';
import backpack from '../../assets/backpack.jpeg';

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

    goToCartScreen = () => {
        this.updateScreenState('checkoutStatus', 'showCart', true);
        this.updateScreenState('checkoutStatus', 'showShipping', false);
    }

    goToShippingScreen = () => {
        this.updateScreenState('checkoutStatus', 'showCart', false);
        this.updateScreenState('checkoutStatus', 'showShipping', true);
    }

    goToPaymentScreen = () => {
        this.updateScreenState('checkoutStatus', 'showShipping', false);
        this.updateScreenState('checkoutStatus', 'showPayment', true);
    }

    handleCheckoutClick = () => {
        // I guess use this as OrderSummary's handleClick, and pass this info to updateScreenState from there 
        // const { checkoutStatus } = this.state;
        // for (const [key, value] of Object.entries(checkoutStatus)) {
        //     if (value && key === 'showCart'){
        //         this.updateScreenState('checkoutStatus', 'showCart', false)
        //         this.updateScreenState('checkoutStatus', 'showShipping', true);
        //     }
        //     else if (value && key === 'showShipping') {
        //         this.updateScreenState('checkoutStatus', 'showShipping', false)
        //         this.updateScreenState('checkoutStatus', 'showPayment', true);
        //     }
        //     else if (value && key === 'showPayment'){
        //         this.updateScreenState('checkoutStatus', 'showPayment', false)
        //         this.updateScreenState('checkoutStatus', 'showConfirmation', true);
        //     }
        //   }
    }

    render(){
        const { userShoppingCart, subtotal, checkoutStatus, shippingCost } = this.state;
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
                             {/* build this thing. It should be pretty fun */}
                             {/* Will implement progress bar here */}
                             {/* eventually I want a message to appear if all items have been removed from cart */}
                         {  ( showCart ) &&
                         <Cart 
                             shoppingCartItems={userShoppingCart}
                             updateQuantity={this.updateQuantity}
                         />}
                         { ( showShipping ) && 
                         <Shipping 
                            goToCartScreen={this.goToCartScreen}
                            updateShippingCost={this.updateShippingCostState}
                         />
                         }
                         { ( showPayment ) && 
                         <Payment />
                         }
                         { ( showConfirmation ) &&
                             <h3>Confirmation</h3>
                         }
                         {/* Pass something in as props to update state of checkout process */}
                         <OrderSummary
                             cartSubtotal={subtotal}
                             checkoutStatus={checkoutStatus}
                             handleCheckoutClick={this.handleCheckoutClick}
                             userShoppingCart={userShoppingCart}
                             updateScreenState={this.updateScreenState}
                             loggedIn={this.props.loggedIn}
                             toggleShowSignIn={this.props.toggleShowSignIn}
                             goToShippingScreen={this.goToShippingScreen}
                             goToPaymentScreen={this.goToPaymentScreen}
                             shippingCost={shippingCost}
                          />
                    </div>
                </div>
            </div>
        )
    }
}

export default Checkout;