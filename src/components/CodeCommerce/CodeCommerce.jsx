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
            data: [],
            loading: false,
            error: false,
        }

    // addItemToCart = (newItem) => {
    //     newItem.quantity += 1
    //     this.setState((prevState) => ({
    //         userShoppingCart: [...prevState.userShoppingCart, newItem]
    //     }))
    // }

    changeQuantity = (newItem, cart) => {
        let updatedItem = cart.find(item => item.name === newItem.name)
        updatedItem.quantity++
    }

    addToCart = ({ target: {value} }) => {
        const { data } = this.state;
        let found = data.find(item => item.id === value);
        console.log(found);
        // have to think about inventory here to show OUT OF STOCK 

       this.setState((prevState) => ({ userShoppingCart: [...prevState.userShoppingCart, found] }))
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
        this.setState({ loading: true});

        const url = new URL(SHOPPER_URL); 
        let params = {
            "limit": "30",
        };
        Object.keys(params)
            .forEach(key => url.searchParams.append(key, params[key]));

        let headers = {
            "X-Authorization": SHOPPER_API,
            "Accept": "application/json",
            "Content-Type": "application/json",
        };

        try {
            // conditional here to decide to fetch data
            // if(this.state.shopItems.length) return;
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        });
        console.log('response');


        if(response.ok) {
            const json = await response.json()
            const data = json.data
                .map(item => ({
                    id: item.id,
                    name: item.name,
                    desc: item.description,
                    category: item.categories,
                    inventory: item.inventory.available,
                    price: { 
                            raw: item.price.raw, 
                            formatted: item.price.formatted_with_symbol 
                            },
                    image: item.assets[0].url,
                    variants: item.variant_groups[0],
                }));
            
            this.setState({ 
                data: data, 
                loading: false,
            });
        } else {
            this.setState({ 
                error: true, 
                loading: false,
            });
        };
        } catch(err) {
            this.setState({ 
                error: true, 
                loading: false,
            });
            console.error("There was an error", err)
        };
    };

    render(){
        const { showSignIn, showCheckout, loggedIn, userShoppingCart, loading, error, data} = this.state;
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
                        {data.map((item) => (
                        <ShopItem 
                            key={item.id}
                            addToCart={this.addToCart}
                            data={item}
                        />
                        ))} </div> : <div className={s.loading}>Loading...</div>
                }
                { (!showCheckout && !loading && error) &&
                    <div className={s.error}>There was an error! Failed to load</div>
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