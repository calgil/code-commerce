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
        this.props.updateData('shippingData', name, value)
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
                    handleBlur={this.handleBlur}
                    handleInputData={this.handleInputData}
                    error={
                        (shippingError
                        && shippingError['countryError']
                        && shippingError['countryError'].length > 1)
                        ? shippingError['countryError']
                        : null
                    }
                    // value={shippingData && shippingData['country']}

                />

                <div className={s.shippingMethod}>
                    {/* I could potentially add checked attribute, bring shippingCost */}
                    { typeof shippingCost === 'number'
                        ? null
                        : <div className={s.shippingCostError}>Please select shipping option:</div> 
                    } 
                        
                    <div>
                        <RadioBase 
                            name='method'
                            labelText='Standard'
                            type='radio'
                            value='Standard'
                            onChange={this.handleRadioChange}
                            // checked={shippingCost === 0
                            //         ? true
                            //         : false
                            //     }
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
                            // checked={shippingCost === 5
                            //         ? true
                            //         : false
                            //     }
                        />
                        <span className={s.shippingDetails}>Delivery in 1-3 Business Days -$5.00</span>
                    </div>
                </div>
            </form>
        )
    }
}

export default Shipping;