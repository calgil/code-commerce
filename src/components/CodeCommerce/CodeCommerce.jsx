import React from "react";
import s from './CodeCommerce.module.css'
import SignIn from "../SignIn/SignIn";
import Checkout from "../Checkout/Checkout";
import Header from "../Header/Header";
import { SHOPPER_URL, SHOPPER_API } from "../../utilities/constants";
import ShopItem from "../ShopItem/ShopItem";

class CodeCommerce extends React.Component {
        state = {
            loggedIn: false,
            showSignIn: false, 
            showCheckout: false,
            userShoppingCart: [],
            shopItems: [],
            loading: false,
            error: false,
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

    componentDidMount = async () => {
        this.setState({ loading: true})
        try {
        const url = new URL(SHOPPER_URL); 
        let headers = {
            "X-Authorization": SHOPPER_API,
            "Accept": "application/json",
            "Content-Type": "application/json",
        }

        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        })
        if(response.ok) {
            const json = await response.json()
            const data = json.data
                .map(item => ({
                    id: item.id,
                    name: item.name,
                    desc: item.description,
                    price: { 
                            raw: item.price.raw, 
                            formatted: item.price.formatted_with_symbol 
                            },
                    image: item.assets[0].url,
                    variants: item.variant_groups[0],

                }) )
                console.log(json);
                console.log(data);
            this.setState({ 
                shopItems: data, 
                loading: false,
            });
        } else {
            this.setState({ 
                error: true, 
                loading: false,
            });
        }
        } catch(err) {
            this.setState({ 
                error: true, 
                loading: false,
            });
            console.error("There was an error", err)
        }
    }

    render(){
        const { showSignIn, showCheckout, loggedIn, userShoppingCart, loading, error, shopItems} = this.state;
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
                    !loading ? <div className={s.displayShop}>
                        {shopItems.map((item) => (
                        <ShopItem 
                            key={item.id}
                            updateShoppingCart={this.updateShoppingCart}
                            data={item}
                        />
                        ))} </div> : <div>Loading...</div>
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