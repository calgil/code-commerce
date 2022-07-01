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

        const shippingInputs = [
            {name: 'addressTitle', labelText: 'Address Title *', type: 'text', error: 'addressTitleError' },
            {name: 'name', labelText: 'Name - Surname *', type: 'text', error: 'nameError' },
            {name: 'address', labelText: 'Address *', type: 'text', error: 'addressError' },
            {name: 'phone', labelText: 'Phone *', type: 'number', error: 'phoneError' },
            {name: 'postcode', labelText: 'Zip *', type: 'number', error: 'postcodeError' },
            {name: 'city', labelText: 'City *', type: 'text', error: 'cityError' },
            {name: 'state', labelText: 'State/Providence *', type: 'text', error: 'stateError' },
        ]

        return (
            <div className={s.shippingContainer}>
                <h3>Shipping</h3>
                {shippingInputs.map((item) => (
                    <InputBase 
                        key={item.name}
                        name={item.name}
                        labelText={item.labelText}
                        type={item.type}
                    />
                ))}
                {/* Might have to make a custom select for country */}
            </div>
        )
    }
}

export default Shipping;