import React from "react";
import InputBase from "../InputBase/InputBase";
import s from "./Shipping.module.css";

class Shipping extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {

        // style shipping inputs
        // populate data for remaining shipping inputs

        const shippingInputs = [
            {name: 'firstName', labelText: 'First Name *', type: 'text', error: 'firstNameError' },
        ]

        return (
            <div className={s.shippingContainer}>
                <h3>Shipping</h3>
                {shippingInputs.map((item) => (
                    <InputBase 
                        key={item.key}
                        name={item.name}
                        labelText={item.labelText}
                        type={item.type}
                    />
                ))}
            </div>
        )
    }
}

export default Shipping;