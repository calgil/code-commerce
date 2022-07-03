import React from "react";
import InputBase from "../InputBase/InputBase";
import s from './OrderSummary.module.css';

class OrderSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shippingCost: 0,
            cartTotal: '',
            disableButton: true,
        }
    }

    disableClick = () => {
        this.setState({ disableButton: false })
    }

    updateScreen = () => {
        const {status, shoppingCartLength} = this.props;
        for (const [key, value] of Object.entries(status)) {
            if ((value && key === 'showCart') && shoppingCartLength){
                this.disableClick();
                console.log('valid click');
                // this.updateSubState('checkoutStatus', 'showCart', false);
                // this.updateSubState('checkoutStatus', 'showShipping', true);
            }
            else if (value && key === 'showShipping') {
                // this.updateSubState('checkoutStatus', 'showShipping', false)
                // this.updateSubState('checkoutStatus', 'showPayment', true);
            }
            else if (value && key === 'showPayment'){
                // this.updateSubState('checkoutStatus', 'showPayment', false)
                // this.updateSubState('checkoutStatus', 'showConfirmation', true);
            }
          }
    }

    componentDidMount = () => {
        this.updateScreen();

    }

    handleClick = () => {
        console.log('click');
        
    }


    render() {
        const { shippingCost, disableButton } = this.state
        const { cartSubtotal,  } = this.props;
        return (
            <div className={s.summary}>
                <div className={s.orderInfo}>
                    <h3 className={s.title}>Order Summary</h3>
                    <p><span>Subtotal:</span>{
                        (cartSubtotal === 0) 
                        ? '' 
                        : <span className={s.subtotal}> ${cartSubtotal} </span>
                    }</p>
                    <p><span>Shipping & Handling:</span>{
                        (shippingCost === 0)
                        ? <span className={s.shipping}>{'--'}</span>
                        : <span className={s.shipping}>{shippingCost}</span>
                    }</p>
                    <p className={s.cartTotal}>
                        <span>Cart Total:</span>
                        <span className={s.cartTotal}>{cartSubtotal + shippingCost}</span>
                    </p>
                </div>
                <hr />
                <div className={s.btnContainer}>
                    <InputBase 
                        className={s.checkoutBtn}
                        type="submit"
                        value='Checkout'
                        onClick={this.handleClick}
                        disabled={disableButton}
                    />
                </div>
            </div>
        )
    }
}

export default OrderSummary;