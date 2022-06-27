import React from "react";
import s from './CartItem.module.css';

class CartItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quantity: props.quantity,
        }
    }

    handleQuantityChange = ({ target: { name, value }}) => {
        this.props.newQuantity(name, +value);
    }

    removeItem = () => {
        const { name } = this.props
        this.props.newQuantity(name, 0);
    }

    render() {
        const { name, img, quantity, price, } = this.props;
        return (
            
            <div>
                { (quantity > 0) && 
                <div className={s.cartItem}>
                    <hr />
                    <div className={s.product}>
                        <h4 className={s.itemName}>{name}</h4>
                        <div className={s.imgContainer}>
                            <img src={img} alt={name} />
                        </div>
                    </div>
                    <div className={s.itemInfo}>
                        <div className={s.priceContainer}>
                            <span>${price}</span>
                        </div>
                        <div className={s.qtyContainer}>
                            <select 
                                className={s.qtySelect}
                                onChange={this.handleQuantityChange} 
                                name={name} 
                                id="qty"
                                defaultValue={1}
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
                            </select>
                            <button className={s.removeBtn} onClick={this.removeItem}>Remove</button>
                        </div>
                        <div className={s.totalPriceContainer}>
                            <span className={s.price}>${(quantity * price).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                }
                
            </div>
        )
    }
}


export default CartItem;