import React from "react";
import s from "./ExpirationDropdown.module.css"
import {months, years} from "../../utilities/constants";

const ExpirationDropdown = ({ ...props }) => (
    <div className={s.expirationContainer}>
        <p>Expiration Date</p>
        <select 
            name="month" 
            className={s.expirationDropdown}
            onChange={props.onChange}
            required
        >
            { months.map((month, i) => (
                <option value={i}>{month}</option>
            ))
            }
        </select>
        <select 
            name="year" 
            className={s.expirationDropdown}
            onChange={props.onChange}
            required
        >
            { years.map((year) => (
                <option value={year}>{year}</option>
            ))

            }
        </select>
    </div>
)

export default ExpirationDropdown;