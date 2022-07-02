import React from "react";
import s from './Checkout.module.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cart from "../Cart/Cart";
import OrderSummary from "../OrderSummary/OrderSummary";
import shirt from '../../assets/shirt.jpeg';
import backpack from '../../assets/backpack.jpeg';
import Shipping from "../Shipping/Shipping";
import Payment from "../Payment/Payment";
import CheckoutStatus from "../CheckoutStatus/CheckoutStatus";

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
            userShoppingCart: [
                { name: 'T-Shirt', quantity: 1, image: shirt, price: 19.99, },
                { name: 'Backpack', quantity: 1, image: backpack, price: 49.99, },
            ],
        }
    }

    updateStateSubtotal = (newSubtotal) => {
        this.setState({ subtotal: newSubtotal })
    }

    calcSubtotal = () => {
        const { userShoppingCart } = this.state;
        const subtotal = userShoppingCart.reduce((acc, obj) => {
            return acc + (obj.quantity * obj.price)
        }, 0);
        this.updateStateSubtotal(subtotal);
    }

    updateQuantity = (name, value) => {
        this.setState((prevState) => ({
            userShoppingCart: prevState.userShoppingCart.map((item) => (
                item.name === name 
                ? Object.assign(item, {quantity: value})
                : item
            ))
        }), this.calcSubtotal);
    }

    componentDidMount() {
        this.calcSubtotal();
    }

    updateSubState = (name, sub, state) => {
        this.setState((prevState) => ({
            [name]: {
                ...prevState[name],
                [sub]: state,
            }
        }))
    }

    handleCheckoutClick = () => {
        const { checkoutStatus } = this.state;
        for (const [key, value] of Object.entries(checkoutStatus)) {
            if (value && key === 'showCart'){
                this.updateSubState('checkoutStatus', key, false)
                this.updateSubState('checkoutStatus', 'showShipping', true);
            }
            else if (value && key === 'showShipping') {
                this.updateSubState('checkoutStatus', 'showShipping', false)
                this.updateSubState('checkoutStatus', 'showPayment', true);
            }
            else if (value && key === 'showPayment'){
                this.updateSubState('checkoutStatus', 'showPayment', false)
                this.updateSubState('checkoutStatus', 'showConfirmation', true);
            }
          }
    }

    render(){
        const { userShoppingCart, subtotal, checkoutStatus } = this.state;
        const { showCart, showShipping, showPayment, showConfirmation } = checkoutStatus;
        return (
            <div className={s.checkoutBg}>
                <div className={s.close}>
                        <FontAwesomeIcon 
                            icon={faXmark}
                            onClick={this.props.checkoutVisibility}
                        />
                </div>
                <div>
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
                             updateItemQuantity={this.updateQuantity}
                         />}
                         { ( showShipping ) && 
                         <Shipping />
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
                             status={checkoutStatus}
                             handleCheckoutClick={this.handleCheckoutClick}
                          />
                    </div>
                </div>
            </div>
        )
    }
}

export default Checkout;