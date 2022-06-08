import React from "react";
import './InputBase.css';

const InputBase = ({labelText, type, ...props}) => (
        <label>
            {labelText}
            <input className="input-root" type={type} {...props} />
        </label>
)

export default InputBase