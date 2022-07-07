import React from "react";
import CountryDropdown from "../CountryDropdown/CountryDropdown";
import InputBase from "../InputBase/InputBase";
import RadioBase from "../RadioBase/RadioBase";
import s from "./Shipping.module.css";
import { 
    onlyTextValidation,
    postCodeValidation,
 } from "../../utilities/validations";

class Shipping extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            shippingData: {},
            shippingError: {},
            shippingCost: 0,
        }
    }

    handleValidations = (type, value) => {
        let errorText;
        if (
            type === 'title'
            || type === 'name'
            || type === 'city'
            || type === 'state'
            ) {
                errorText = onlyTextValidation(value);
                this.setState((prevState) => ({
                    shippingError: {
                        ...prevState.shippingError,
                        [`${type}Error`]: errorText,
                    }
                }))
                
        } 
        else if (type === 'phone') {
            console.log('phone validation');
            // maybe do that mask thing we did to credit cards
        } else if (type === 'postcode') {
            errorText = postCodeValidation(value);
            this.setState((prevState) => ({
                shippingError: {
                    ...prevState.shippingError,
                    [`${type}Error`]: errorText,
                }
            }))
        }
    }

    handleBlur = ({ target: { name, value } }) => this.handleValidations(name, value);

    handleInputData = ({ target: { name, value } }) => {
        if(name === 'phone'){
            console.log('phone');
            let mask = value.split(' ').join('')
            if(mask.length) {
                // gotta tinker with this pattern 
                mask = mask.match(new RegExp('.{1,4}', 'g')).join(' ');
                this.setState((prevState) => ({
                    shippingData: {
                        ...prevState.shippingData, 
                        [name]: mask,
                    }
                }))
            } else {
                this.setState((prevState) => ({
                    shippingData: {
                        ...prevState.shippingData, 
                        [name]: '',
                    }
                }))
            }
        } else {
            this.setState((prevState) => ({
                shippingData: {
                    ...prevState.shippingData, 
                    [name]: value,
                }
            }))
        }
    }


    handleRadioChange = ({ target: { value } }) => {
        const {updateShippingCost} = this.props
        if (value === 'Express') {
            this.setState({ shippingCost: 5 })
            updateShippingCost(5);
        } else {
            this.setState({ shippingCost: 0 })
            updateShippingCost(0);
        }
    }

    render() {
        const { goToCartScreen } = this.props;
        const { shippingData } = this.state;
        const shippingInputs = [
            {name: 'title', labelText: 'Address Title *', type: 'text', error: 'addressTitleError' },
            {name: 'name', labelText: 'Name - Surname *', type: 'text', error: 'nameError' },
            {name: 'address', labelText: 'Your Address *', type: 'text', error: 'addressError' },
            {name: 'phone', labelText: 'Phone *', type: 'number', error: 'phoneError' },
            {name: 'city', labelText: 'City *', type: 'text', error: 'cityError' },
            {name: 'state', labelText: 'State/Providence *', type: 'text', error: 'stateError' },
            {name: 'postcode', labelText: 'Zip *', type: 'number', error: 'postcodeError' },
        ]

        return (
            <div className={s.shippingContainer}>
                <button className={s.back} onClick={goToCartScreen}>
                    Back to Cart
                </button>
                <h3>Shipping</h3>
                {shippingInputs.map((item) => (
                    <InputBase 
                        key={item.name}
                        name={item.name}
                        labelText={item.labelText}
                        type={item.type}
                        onBlur={this.handleBlur}
                        onChange={this.handleInputData}
                        value={shippingData && shippingData[item.name]}
                    />
                ))}
                {/* Might have to make a custom select for country */}
                <CountryDropdown />

                <div className={s.shippingMethod}>
                    <div>
                        <RadioBase 
                            name='method'
                            labelText='Standard'
                            type='radio'
                            value='Standard'
                            onChange={this.handleRadioChange}
                        />
                        <span className={s.shippingDetails}>Delivery in 4-6 Business Days -Free ($40 min)</span>
                    </div>
                    <div>
                        <RadioBase 
                            name='method'
                            labelText='Express'
                            type='radio'
                            value='Express'
                            onChange={this.handleRadioChange}
                        />
                        <span className={s.shippingDetails}>Delivery in 1-3 Business Days -$5.00</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Shipping;