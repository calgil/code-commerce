import React from "react";
import s from './ShopItem.module.css';

const ShopItem = ({ name, img, price, ...props }) => (
    <div className={s.itemContainer}>
        <div className={s.imgContainer}>
            <img src={img} alt={name} />
        </div>
        <h4 className={s.itemName}>{name}</h4>
        <span className={s.price}>{price}</span>
        {/* Make add to cart button */}
    </div>
)


export default ShopItem;