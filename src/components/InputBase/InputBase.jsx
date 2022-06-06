import React from "react";
import './InputBase.css';

const InputBase = ({labelName, type})=> (
   <div className="radio-root">
        <input name='signIn' type={type} />
        <label htmlFor="">{labelName}</label>
   </div>
)

export default InputBase;