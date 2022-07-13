import React from "react";
import s from './InputBase.module.css';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CARD, CARDICON } from '../../utilities/constants';


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
        const {labelText, className, cardType, error, type, ...props} = this.props;
        const { showPassword } = this.state;
        return (
            <div className={s.inputContainer}>
             <label className={className}>
            {labelText}
            {error && <div className={s.error}>{error}</div>} 
                <input className={s.input} type={(type === 'password' && showPassword) ? 'text' : type} {...props} />
                    {(labelText === 'Password *' ||  
                    labelText === 'Confirm Password *')
                    &&
                    <FontAwesomeIcon 
                        className={s.eye} 
                        icon={showPassword  ? faEye : faEyeSlash }
                        onClick={this.passwordVisible} 
                    />}
                    {(!error || !error.cardNumberError) && (props.name === 'cardNumber') && CARD.includes(cardType) && (
                        <img 
                            style={{
                                position: "absolute",
                                top: "5px",
                                right: "190px",
                                width: "50px",
                                height: "33px",
                            }}
                            src={CARDICON[cardType]} 
                            alt="card" 
                        />
                    )}
            </label>
       </div>
        )
    }
}

export default InputBase;
