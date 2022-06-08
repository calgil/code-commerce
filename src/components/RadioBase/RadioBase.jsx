import React from "react";
import './RadioBase.css';

const RadioBase = ({labelText, type, ...props})=> (
<label>
   <input name='signIn' type={type} {...props} />
   {labelText}
</label>
)

export default RadioBase;