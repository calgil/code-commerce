import React from "react";

const ExpirationDropdown = ({ ...props }) => (
    <div>
        <select 
            name={props.name} 
            onChange={props.onChange}
            onBlur={props.onBlur}
            required
        >
            { props.data.map((item, i) => (
                <option key={i} value={item.value}>{item.name}</option>
            ))
            }
        </select>
        {props.error && <div>{props.error}</div>}
    </div>
)

export default ExpirationDropdown;