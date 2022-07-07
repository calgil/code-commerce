import React from "react";
import './RadioBase.css';

const RadioBase = ({labelText, name, type, ...props}) => (
<label>
   <input name={name} type={type} {...props} />
   {labelText}
</label>
)

export default RadioBase;