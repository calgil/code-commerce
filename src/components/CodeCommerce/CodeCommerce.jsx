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

    updateShoppingCart = (newItem) => {
        const {userShoppingCart} = this.state;
        if (!userShoppingCart.includes(newItem)) {
            // remove from cart not working as expected
            // refactor to allow multiple clicks from displayShop to update quantity correctly
            newItem.quantity += 1
            this.setState((prevState) => ({
                userShoppingCart: [...prevState.userShoppingCart, newItem]
            }))
        } else {
            this.setState((prevState) => ({
                userShoppingCart: prevState.userShoppingCart.map((item) => (
                    item.name === newItem.name 
                    ? Object.assign(item, {quantity: item.quantity += 1})
                    : item
                ))
            }));
        }
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

    handleCartClick = () => {
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
                        handleCartClick={this.handleCartClick}
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
                        checkoutVisibility={this.handleCartClick}
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