import React from "react";
import s from './CheckoutStatus.module.css';

const CheckoutStatus = ({checkoutStatus}) => {
    return (
        <div className={s.status}>
                {checkoutStatus.showCart
                ? <div className={s.active}>Cart</div> 
                : <div>Cart</div>  }

                {checkoutStatus.showShipping
                ? <div className={s.active}>Shipping</div> 
                : <div>Shipping</div>  }

                {checkoutStatus.showPayment
                ? <div className={s.active}>Payment</div> 
                : <div>Payment</div>  }

                {checkoutStatus.showConfirmation
                ? <div className={s.active}>Confirmation</div> 
                : <div>Confirmation</div> }
                
            </div>
    )
}

export default CheckoutStatus;