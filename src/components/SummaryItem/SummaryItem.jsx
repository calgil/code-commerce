import React from "react";
import s from "./SummaryItem.module.css";
import { itemImgs } from "../../utilities/constants";

const SummaryItem = ({ data }) => {
    const { name, image, quantity,  price, } = data;

    return (
        <div className={s.summaryItem}>
        <h4 className={s.name}>{name}</h4>
        <div className={s.itemContainer}>
            <div className={s.thumbnailImg}>
                <img src={image} alt={name} />
            </div>
            <div className={s.info}>
                <div className={s.quantityContainer}>
                    <span className={s.quantity}>Qty: {quantity}</span>
                </div>
                <div className={s.price}>
                    <span>${(quantity * price.raw).toFixed(2) }</span>
                </div>
            </div>
        </div>
        <hr />
    </div>
    )
}
    


export default SummaryItem;