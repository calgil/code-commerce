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
        }
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
        const { showSignIn, showCheckout, loggedIn} = this.state;
        return (
            <div className={s.main}>
                <div className={s.hero}>
                    {/* Need to pass userShoppingCart.length as props */}
                    < Header 
                        toggleShowSignIn={this.toggleShowSignIn}
                        handleCartClick={this.handleCartClick}
                        // cartLength={}
                    />
                </div>
                {(showSignIn) && 
                <SignIn 
                    changeLoginStatus={this.updateLogin}
                    signInVisibility={this.toggleShowSignIn}
                /> }
                { !showCheckout &&
                    <DisplayShop />
                }
                { showCheckout && 
                    <Checkout
                        checkoutVisibility={this.handleCartClick}
                        loggedIn={loggedIn}
                        toggleShowSignIn={this.toggleShowSignIn} 
                    /> }
            </div>
        )
    }
}

export default CodeCommerce;