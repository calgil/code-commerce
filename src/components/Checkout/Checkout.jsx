import React from "react";
import s from './Checkout.module.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cart from "../Cart/Cart";
import OrderSummary from "../OrderSummary/OrderSummary";
import shirt from '../../assets/shirt.jpeg';
import backpack from '../../assets/backpack.jpeg';
import Shipping from "../Shipping/Shipping";

class Checkout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showCart: false,
            showShipping: true,
            subtotal: 0,
            userShoppingCart: [
                { name: 'T-Shirt', quantity: 1, image: shirt, price: 19.99, },
                { name: 'Backpack', quantity: 1, image: backpack, price: 49.99, },
            ]
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

    render(){
        const { userShoppingCart, showCart, showShipping, subtotal } = this.state
        return (
            <div className={s.checkoutBg}>
                <div className={s.close}>
                        <FontAwesomeIcon 
                            icon={faXmark}
                            onClick={this.props.checkoutVisibility}
                        />
                </div>
                {/* build this thing. It should be pretty fun */}
                {/* Will implement progress bar here */}

                {/* eventually I want a message to appear if all items have been removed from cart */}
                {  (showCart) && 
                <Cart 
                    shoppingCartItems={userShoppingCart}
                    updateItemQuantity={this.updateQuantity}
                />}
                { (showShipping) && 
                <Shipping />
                }

                <OrderSummary
                    cartSubtotal={subtotal}
                 />
            </div>
        )
    }
}

export default Checkout;