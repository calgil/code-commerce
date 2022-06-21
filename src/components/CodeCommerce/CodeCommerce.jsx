import React from "react";
import s from './CodeCommerce.module.css'
import SignIn from "../SignIn/SignIn";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DisplayShop from "../DisplayShop/DisplayShop";
import Cart from "../Cart/Cart";

class CodeCommerce extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            showSignIn: false, 
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

    render(){
        const {loggedIn, showSignIn, } = this.state;
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
                            />
                        </div>
                    </header>
                </div>
                {(showSignIn || loggedIn) && 
                <SignIn 
                    changeLoginStatus={this.updateLogin}
                    signInVisibility={this.toggleShowSignIn}
                /> }
                <DisplayShop />
                <Cart />
            </div>
        )
    }
}

export default CodeCommerce;