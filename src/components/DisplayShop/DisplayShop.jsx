import React from "react";
import s from './DisplayShop.module.css';
import ShopItem from "../ShopItem/ShopItem";
import { items } from '../../utilities/constants';

class DisplayShop extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cart: {}
        }
    }

    // Maybe try this later
    // addToCart = () => {
    //     this.setState((prevState) => ({
    //         cart: {
    //             ...prevState.cart,
    //             // newItem
    //         } 
    //     }))
    //     // set state prevState
    //     // cart: [...prevState.cart, newItem]
    //     console.log('add');
    // }

    render() {

        return (
            <div>
                <h3 className={s.containerHeader}>Shop Our Gear</h3>
                <div className={s.shopContainer}>
                {items.map((item) => (
                    <ShopItem 
                        key={item.name}
                        name={item.name}
                        img={item.image}
                        price={item.price}
                    // addItemToCart={this.addToCart}
                    />
                ))}
                </div>
            </div>
        )
    }

}

export default DisplayShop;
