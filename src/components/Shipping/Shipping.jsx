import React from "react";
import CountryDropdown from "../CountryDropdown/CountryDropdown";
import InputBase from "../InputBase/InputBase";
import RadioBase from "../RadioBase/RadioBase";
import s from "./Shipping.module.css";

class Shipping extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            shippingCost: null,
        }
    }
    
    handleBlur = ({ target: { name, value } }) => this.props.handleShippingValidations(name, value);

    handleInputData = ({ target: { name, value } }) => {
        console.log(name);
        this.props.updateData('shippingData', name, value)
    }

    getCountryDataToParent = (value) => {
        this.props.updateData('shippingData', 'country', value)
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
        const { goToCartScreen, shippingData, shippingError } = this.props;
        const { shippingCost } = this.state;
        const shippingInputs = [
            {name: 'title', labelText: 'Address Title *', type: 'text', error: 'titleError' },
            {name: 'name', labelText: 'Name - Surname *', type: 'text', error: 'nameError' },
            {name: 'address', labelText: 'Your Address *', type: 'text', error: 'addressError' },
            {name: 'phone', labelText: 'Phone *', type: 'number', error: 'phoneError' },
            {name: 'city', labelText: 'City *', type: 'text', error: 'cityError' },
            {name: 'state', labelText: 'State/Providence *', type: 'text', error: 'stateError' },
            {name: 'postcode', labelText: 'Zip *', type: 'number', error: 'postcodeError' },
        ];

        return (
            <form 
                className={s.shippingContainer}
            >
                <button className={s.back} onClick={goToCartScreen}>
                    Back to Cart
                </button>
                <h3>Shipping</h3>
                {shippingInputs.map((item) =>  (
                        <InputBase 
                            key={item.name}
                            name={item.name}
                            labelText={item.labelText}
                            autoComplete='off'
                            type={item.type}
                            max={item.max}
                            onBlur={this.handleBlur}
                            onChange={this.handleInputData}
                            value={ shippingData[item.name]}
                            error={
                                (shippingError
                                && shippingError[item.error]
                                && shippingError[item.error].length > 1)
                                ? shippingError[item.error]
                                : null
                            }
                        />
                    ))}
                <CountryDropdown 
                    key={'country'}
                    name={'country'}
                    getCountryDataToParent={this.getCountryDataToParent}
                    error={
                        (shippingError
                        && shippingError['countryError']
                        && shippingError['countryError'].length > 1)
                        ? shippingError['countryError']
                        : null
                    }
                />

                <div className={s.shippingMethod}>
                    { typeof shippingCost === 'number'
                        ? null
                        : <div className={s.shippingCostError}>Please select shipping option:</div> 
                    } 
                        
                    <div>
                        <RadioBase 
                            name='method'
                            labelText='Delivery in 4-6 Business Days -Free ($40 min)'
                            type='radio'
                            value='Standard'
                            onChange={this.handleRadioChange}
                        />
                    </div>
                    <div>
                        <RadioBase 
                            name='method'
                            labelText='Delivery in 1-3 Business Days -$5.00'
                            type='radio'
                            value='Express'
                            onChange={this.handleRadioChange}
                        />
                    </div>
                </div>
            </form>
        )
    }
}

export default Shipping;