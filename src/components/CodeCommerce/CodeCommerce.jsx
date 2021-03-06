import React from "react";
import s from './CodeCommerce.module.css'
import SignIn from "../SignIn/SignIn";
import DisplayShop from "../DisplayShop/DisplayShop";
import Checkout from "../Checkout/Checkout";
import Header from "../Header/Header";

class CodeCommerce extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            showSignIn: false, 
            showCheckout: false,
            userShoppingCart: [],
        }
    }

    addItemToCart = (newItem) => {
        newItem.quantity += 1
        this.setState((prevState) => ({
            userShoppingCart: [...prevState.userShoppingCart, newItem]
        }))
    }

    changeQuantity = (newItem, cart) => {
        let updatedItem = cart.find(item => item.name === newItem.name)
        updatedItem.quantity++
    }

    updateShoppingCart = (newItem) => {
        const {userShoppingCart} = this.state;
        let found = userShoppingCart.find(item => item.name === newItem.name);
        found === undefined
        ? this.addItemToCart(newItem)
        : this.changeQuantity(newItem, userShoppingCart)
    }

    updateCart = (shoppingCart) => {
        this.setState({userShoppingCart: [...shoppingCart]})
    }

    updateLogin = () => {
        this.setState({ 
            loggedIn: !this.state.loggedIn,
            showSignIn: !this.state.showSignIn,
         })
    }

    toggleShowSignIn = () => {
        this.setState({
            showSignIn: !this.state.showSignIn,
        });
    };

    toggleShowCheckout = () => {
        this.setState({
            showCheckout: !this.state.showCheckout,
        });
    }

    render(){
        const { showSignIn, showCheckout, loggedIn, userShoppingCart} = this.state;
        return (
            <div className={s.main}>
                { !showCheckout && 
                    <div className={s.hero}>
                    </div>
                }
                { !showCheckout &&
                    < Header 
                        toggleShowSignIn={this.toggleShowSignIn}
                        cartCount={userShoppingCart.length}
                        handleCartClick={this.toggleShowCheckout}
                    />
                }
                {(showSignIn) && 
                <SignIn 
                    changeLoginStatus={this.updateLogin}
                    signInVisibility={this.toggleShowSignIn}
                /> }
                { !showCheckout &&
                    <DisplayShop 
                        updateShoppingCart={this.updateShoppingCart}
                    />
                }
                { showCheckout && 
                    <Checkout
                        toggleShowCheckout={this.toggleShowCheckout}
                        loggedIn={loggedIn}
                        toggleShowSignIn={this.toggleShowSignIn} 
                        updateCart={this.updateCart}
                        cart={userShoppingCart}
                    /> }
            </div>
        )
    }
}

export default CodeCommerce;