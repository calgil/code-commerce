import React from "react";
import s from "./SummaryItem.module.css";
import { itemImgs } from "../../utilities/constants";

const SummaryItem = ({ ...props }) => (
    <div className={s.summaryItem}>
        <h4 className={s.name}>{props.name}</h4>
        <div className={s.itemContainer}>
            <div className={s.thumbnailImg}>
                <img src={itemImgs[props.img]} alt={props.name} />
            </div>
            <div className={s.info}>
                <div className={s.quantityContainer}>
                    <span className={s.quantity}>Qty: {props.quantity}</span>
                </div>
                <div className={s.price}>
                    <span>${(props.quantity * props.price).toFixed(2) }</span>
                </div>
            </div>
        </div>
    </div>
)

export default SummaryItem;