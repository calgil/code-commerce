import React from "react";
import s from './CodeCommerce.module.css'
import SignIn from "../SignIn/SignIn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import DisplayShop from "../DisplayShop/DisplayShop";
import Cart from "../Cart/Cart";

class CodeCommerce extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            showSignIn: false, 
            showCart: false,
        }
    }

    updateLogin = () => {
        this.setState({ 
            loggedIn: !this.state.loggedIn,
         })
    }

    toggleShowSignIn = () => {
        this.setState({
            showSignIn: !this.state.showSignIn,
        });
    };

    handleCartClick = () => {
        this.setState({
            showCart: !this.state.showCart,
        });
    }

    render(){
        const { showSignIn, showCart} = this.state;
        return (
            <div className={s.main}>
                <div className={s.hero}>
                    <header className={s.header}>
                        <h1 className={s.gear}><a href="./">Gear Shop</a></h1>
                        <div className={s.links}>
                            <input 
                                className={s.login} 
                                type="button" 
                                value={'Login'}
                                onClick={this.toggleShowSignIn}
                             />
                             <FontAwesomeIcon
                                className={s.cart}
                                icon={faCartShopping}
                                onClick={this.handleCartClick}
                            />
                        </div>
                    </header>
                </div>
                {(showSignIn) && 
                <SignIn 
                    changeLoginStatus={this.updateLogin}
                    signInVisibility={this.toggleShowSignIn}
                /> }
                <DisplayShop />
                { showCart && 
                    <Cart
                        cartVisibility={this.handleCartClick} /> }
            </div>
        )
    }
}

export default CodeCommerce;