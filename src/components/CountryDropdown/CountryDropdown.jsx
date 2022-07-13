import React from "react";
import s from "./CountryDropdown.module.css";
import { countryList } from "../../utilities/constants";

class CountryDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            // country: '',
        }
    }

    getCountryCode = ({ target: { value } }) => {
        this.props.getCountryDataToParent(value);
    }

    render() {
        const {error} = this.props;
        return (
            <div>
                <label htmlFor="countrySelect"> Choose a Country</label>
                {error && <div className={s.error}>{error}</div>}
                <br />
                <select 
                    className={s.dropdown} 
                    name="country" 
                    id="country" 
                    onChange={this.getCountryCode}
                    required
                >
                {countryList.map((country, i) => (
                    <option 
                        key={i}
                        name='country'
                        value={i === 0
                                ? ''
                                : country
                                }
                    >
                        {country}
                    </option>
                ))}
                </select>
            </div>
        )
    }
}



export default CountryDropdown;