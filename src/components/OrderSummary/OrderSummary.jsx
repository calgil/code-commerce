import React from "react";
import s from './OrderSummary.module.css';
import { CARDICON } from "../../utilities/constants";
import InputBase from "../InputBase/InputBase";
import SummaryItem from "../SummaryItem/SummaryItem";


class OrderSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handlePromoCodeChange = ({ target: { value } }) => {
        const { promoCode } = this.state;
        if ( promoCode !== 'valid') {
            this.setState({ promoCode: value })
        }
    }

    validatePromoCode = (e) => {
        e.preventDefault();
        const { promoCode } = this.state;
        if (promoCode === 'Discount') {
            this.props.applyDiscount()
            this.setState({ promoCode: 'valid' })
        }
    }

    render() {
        const { promoCode } = this.state;
        const { 
            cartSubtotal, 
            cart, 
            shippingCost, 
            checkoutStatus, 
            shippingData,
            cardData,
        } = this.props;

        const { 
            showShipping, 
            showPayment, 
            showConfirmation 
        } = checkoutStatus;

        return (
            <div className={s.summary}>
                <h3 className={s.title}>Order Summary</h3>
                <div className={s.orderInfo}>
                    <p>Promo Code</p>
                    <form 
                        className={s.promoCode}
                        onSubmit={this.validatePromoCode}
                    >
                         <InputBase
                              name='discount'
                              type='text'
                              onChange={this.handlePromoCodeChange}
                              placeholder='Discount'
                          />
                          <InputBase
                             type='submit'
                             value='Apply Promo'
                             onClick={this.validatePromoCode}
                          />
                    </form>
                    { promoCode
                    ? promoCode === 'valid' 
                        ? <p className={s.success}>Discount Applied!</p> 
                        : <p className={s.fail}>Discount not applied</p>
                    : ''

                    }
                    <hr />
                    {(showShipping || showPayment || showConfirmation )&&
                        <div className={s.cartItems}>
                            {cart.length > 1 
                            ?  <span className={s.itemCount}>{cart.length} items in cart</span>
                            : <span className={s.itemCount}>{cart.length} item in cart</span>
                            }
                            {cart.map((item) => (
                                <SummaryItem 
                                    key={item.name}
                                    data={item}
                                />
                            ))
                            }
                        </div>
                    }
                    { (showPayment || showConfirmation) &&
                            <div className={s.shippingInfoContainer}>
                                <p>Shipping</p>
                                <p className={s.shipInfo}>{shippingData.name}</p>
                                <p className={s.shipInfo}>{shippingData.address}</p>
                                <p className={s.shipInfo}>{shippingData.postcode}</p>
                                <p className={s.shipInfo}>{shippingData.city}</p>
                                <hr />
                            </div>

                    }
                    { showConfirmation && 
                            <div>
                                <p className={s.paymentHeader}>Payment</p>
                                <div className={s.paymentInfoContainer}>
                                    <div className={s.cardWrapper}>
                                        <img src={CARDICON[cardData.cardType]} alt="card" />
                                    </div>
                                    <span>Ending in: {cardData.cardNumber.slice(-4)}</span>
                                    <span>Total Payment: {Number(cartSubtotal + shippingCost).toFixed(2)}</span>
                                </div>
                            </div>
                    }
                    { !showConfirmation &&
                        <div className={s.info}>
                            <p><span>Subtotal:</span>{
                                (cartSubtotal === isNaN(cartSubtotal)) 
                                ? '' 
                                : <span className={s.subtotal}> ${Number(cartSubtotal).toFixed(2)} </span>
                            }</p>
                            <p><span>Shipping & Handling:</span>{
                                (shippingCost === '')
                                ? <span className={s.shipping}>{'--'}</span>
                                : <span className={s.shipping}>${shippingCost.toFixed(2)}</span>
                            }</p>
                            <div className={s.total}>
                                <hr />
                                <p className={s.cartTotal}>
                                    <span>Cart Total:</span>
                                    <span className={s.cartTotal}>${Number(cartSubtotal + shippingCost).toFixed(2)}</span>
                                </p>
                            </div>
                        </div>
                    }
                    
                </div>
            </div>
        )
    }
}

export default OrderSummary;