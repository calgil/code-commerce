import React from "react";
import s from './InputBase.module.css';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class InputBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
        }
    }

    passwordVisible = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }

    render() {
        const {labelText, className, error, type, ...props} = this.props;
        const { showPassword } = this.state;
        return (
            <div className={s.inputContainer}>
             <label className={className}>
            {labelText}
                <input className={s.input} type={(type === 'password' && showPassword) ? 'text' : type} {...props} />
                    {(labelText === 'Password *' ||  
                    labelText === 'Confirm Password *')

                    &&
                    <FontAwesomeIcon 
                        className={s.eye} 
                        icon={showPassword  ? faEye : faEyeSlash }
                        onClick={this.passwordVisible} 
                    />}
                    {error && <div className={s.error}>{error}</div>}
            </label>
       </div>
        )
    }
}

export default InputBase;
