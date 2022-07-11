import React from "react";
import s from './ShopItem.module.css';
import { itemImgs } from "../../utilities/constants";

const ShopItem = ({ name, img, price, ...props }) => (
    <div className={s.itemContainer}>
        <div className={s.imgContainer}>
            <img src={itemImgs[img]} alt={name} />
        </div>
        <h4 className={s.itemName}>{name}</h4>
        <span className={s.price}>{price}</span>
        <button
            value={name}
            className={s.add}
            onClick={props.addToCart}
        >
            Add to Cart
        </button>
        {/* Make add to cart button */}
    </div>
)


export default ShopItem;