import React from "react";
import s from './ShopItem.module.css';

class ShopItem extends React.Component {

    handleClick = () => {
        const { data } = this.props;
        const { id } = data;
        this.props.openDetailPage(id, data);
    }

    render() {
        const { name, image, price, } = this.props.data;
        return(
            <div 
            className={s.itemContainer}
            onClick={this.handleClick}
        >
            <div className={s.imgContainer}>
                <img src={image} alt={name} />
            </div>
            <h4 className={s.itemName}>{name}</h4>
            <div className={s.price}>{price.formatted}</div>
        </div>
        )
    }
}

// const ShopItem = ({ data, ...props }) => {
    // const {id, name, image, price, } = data;

    // handleClick = () => {
    //     props.openDetailPage(id);
    // }
//     // variants categories
//    return (
        // <div 
        //     className={s.itemContainer}
        //     onClick={this.handleClick}
        // >
        //     <div className={s.imgContainer}>
        //         <img src={image} alt={name} />
        //     </div>
        //     <h4 className={s.itemName}>{name}</h4>
        //     <div className={s.price}>{price.formatted}</div>
        //     {/* <button
        //         value={id}
        //         className={s.add}
        //         onClick={props.addToCart}
        //     >
        //         Add to Cart
        //     </button> */}
        // </div>
//    )
// }


export default ShopItem;