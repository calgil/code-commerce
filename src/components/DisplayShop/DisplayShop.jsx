import React from "react";
import s from './DisplayShop.module.css';
import ShopItem from "../ShopItem/ShopItem";
import { items } from '../../utilities/constants';

class DisplayShop extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    addToCart = ({target: {value}}) => {
        let newItem = {}
        let addItem = items.find((item) => item.name === value);
        for(let key in addItem) {
            newItem[key] = addItem[key];
        }
        console.log('add', newItem);
        this.props.updateShoppingCart(newItem);
    }

    render() {

        return (
                <div className={s.shopContainer}>
                    <h3 className={s.containerHeader}>Shop Our Gear</h3>
                {items.map((item) => (
                    <ShopItem 
                        key={item.name}
                        name={item.name}
                        img={item.image}
                        price={item.price}
                        addToCart={this.addToCart}
                    />
                ))}
                </div>
        )
    }

}

export default DisplayShop;
