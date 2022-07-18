import React from "react";
import s from './CartItem.module.css';
import { itemImgs } from "../../utilities/constants";

const CartItem = ({ data, ...props }) => {
    const { name, image, quantity,  price, } = data;

    // updateQuantity from parent

    return (
        <div>
        {/* { (quantity > 0) &&  */}
        <div className={s.cartItemContainer}>
            <div className={s.line}></div>
            <div className={s.cartItem}>
            <div className={s.product}>
                <h4 className={s.itemName}>{name}</h4>
                <div className={s.imgContainer}>
                    <img src={image} alt={name} />
                </div>
            </div>
            <div className={s.itemInfo}>
                        <div className={s.priceContainer}>
                        <span>{price.formatted}</span>
                    </div>
                    {/* <div className={s.qtyContainer}> */}
                        {/* <select 
                            className={s.qtySelect}
                            // onChange={this.handleQuantityChange} 
                            name={name} 
                            id="qty"
                            value={quantity}
                            >
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                        </select> */}
                        {/* <button 
                            className={s.removeBtn} 
                            onClick={this.removeItem}
                        >
                            Remove */}
                        {/* </button> */}
                    {/* </div> */}
                <div className={s.totalPriceContainer}>
                    <span className={s.price}>${(1 * price.raw).toFixed(2)}</span>
                </div>
            </div>
            </div>
        </div>
        {/* } */}
    </div>
    )
}

export default CartItem;