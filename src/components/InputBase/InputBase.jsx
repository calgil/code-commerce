import React from "react";
import s from './InputBase.module.css';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const InputBase = ({ labelText, ...props}) => (
       <div className={s.inputContainer}>
             <label className={props.className}>
            {labelText}
                <input type={props.type} {...props} />
                    {(labelText === 'Password *' ||  
                    labelText === 'Confirm Password *')
                    &&
                    <FontAwesomeIcon 
                        className={s.eye} 
                        icon={props.visibility ? faEye : faEyeSlash }
                        onClick={props.passwordVisible} 
                    />}
                    {props.errorM && <div className={s.error}>{props.errorM}</div>}
            </label>
       </div>
)

export default InputBase