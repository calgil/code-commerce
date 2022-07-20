import React from "react";
import s from "./DetailPage.module.css";

const DetailPage = ({ data, ...props }) => {

        const { id, name, image, price, desc, } = data;

        const description = desc.slice(3, -4);

        return (
            <div className={s.detailsPage}>
                <button
                    onClick={props.closeDetailsPage}
                >Back to Products
                </button>
                <div className={s.detailsContainer}>
                    <div className={s.imageContainer}>
                        <img src={image} alt={name} />
                    </div>
                    <div className={s.details}>
                        <h3 className={s.name}>{name}</h3>
                        <p>{price.formatted}</p>
                        <p>{description}</p>
                        <button
                            className={s.add}
                            onClick={props.addToCart}
                            value={id}
                        > Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        )
}

export default DetailPage;