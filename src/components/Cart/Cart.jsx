import React from "react";
import s from './Cart.module.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartItem from "../CartItem/CartItem";
import OrderSummary from "../OrderSummary/OrderSummary";
import shirt from '../../assets/shirt.jpeg';
import backpack from '../../assets/backpack.jpeg';

class Cart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            subtotal: 0,
            userShoppingCart: [
                { name: 'T-Shirt', quantity: 1, image: shirt, price: 19.99, },
                { name: 'Backpack', quantity: 1, image: backpack, price: 49.99, },
            ]
        }
    }

    calcSubtotal = () => {
        // I thought I could iterate through shoppingCart and update the subtotal from there.
        // Idk how to make a subtotal I guess. ugh
        // const { userShoppingCart } = this.state;
        // userShoppingCart.forEach((item) => {
        //     let total = item.quantity * item.price;
        //     console.log(total.toFixed(2));
        // })
    }

    updateQuantity = (name, value) => {
        this.setState((prevState) => ({
            userShoppingCart: prevState.userShoppingCart.map((item) => (
                item.name === name 
                ? Object.assign(item, {quantity: value})
                : item
            ))
        }));
        this.calcSubtotal();
    }

    

    // componentDidMount() {
    //     this.calcSubtotal();
    // }

    render(){
        const { userShoppingCart } = this.state
        return (
            <div className={s.cartBg}>
                <div className={s.close}>
                        <FontAwesomeIcon 
                            icon={faXmark}
                            onClick={this.props.cartVisibility}
                        />
                </div>
                <div className={s.cartBody}>
                    <h3 className={s.title}>Your Cart</h3>
                    <div className={s.cartHeader}>
                        <span className={s.product}>Product</span>
                        <div className={s.info}>
                            <span>Price</span>
                            <span>Quantity</span>
                            <span>Total Price</span>
                        </div>
                    </div>
                    <hr />
                    {userShoppingCart.map((item) => (
                        <CartItem 
                            key={item.name}
                            name={item.name}
                            img={item.image}
                            price={item.price}
                            quantity={item.quantity}
                            updateItemQuantity={this.updateQuantity}
                        />
                    ))}
                </div>
                <OrderSummary
                    subtotal={this.state.subtotal}
                 />
            </div>
        )
    }
}

export default Cart;