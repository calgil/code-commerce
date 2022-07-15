import React from "react";
import s from './ShopItem.module.css';

const ShopItem = ({ data }) => {
    const {id, name, image, price, variants} = data;
   return (
        <div className={s.itemContainer}>
            <h4 className={s.itemName}>{name}</h4>
            <div className={s.imgContainer}>
                <img src={image} alt={name} />
            </div>
            <div className={s.price}>{price.formatted}</div>
            <button
                value={id}
                className={s.add}
                // onClick={props.addToCart}
            >
                Add to Cart
            </button>
        </div>
   )
}


export default ShopItem;