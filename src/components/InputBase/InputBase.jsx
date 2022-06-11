import React from "react";
import s from './InputBase.module.css';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const InputBase = ({ labelText, ...props}) => (
        <label className={props.className}>
            {labelText}
            <input type={props.type} {...props} />
            {labelText === 'Password *' && 
                <FontAwesomeIcon 
                    className={s.eye} 
                    icon={faEye}
                    onClick={props.visible} 
                />}
        </label>
)

export default InputBase