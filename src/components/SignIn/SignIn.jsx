import React from "react";
import './SignIn.css';
import RadioBase from "../RadioBase/RadioBase";
import InputBase from "../InputBase/InputBase";
import { emailValidation } from "./validations";


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            newAccount: false,
            userLoginData: {
                email: '',
            },
            error: {},
        }
    }


    // This is the way to alternate between two states
    handleRadioChange = () => {
        this.setState({ newAccount: !this.state.newAccount })
    };

    handleValidation = (type, value) => {
        console.log('handle', type, value);
        let errorText;
        switch(type){
            case 'email':
                errorText = emailValidation(value);
                this.setState((prevState) => ({
                    error: {
                        ...prevState.error,
                        emailError:errorText
                    }
                }))
                break;

                default:
                    break;
        }
        console.log('end', errorText);
    }

    handleBlur = ( { target: { name, value }} ) => { this.handleValidation(name, value) }

    handleChange = () => {

    }

    handleSubmit(e){
        e.preventDefault();
    }


    render() {
        const {newAccount} = this.state;

        // const radioData = [
        //     {name: 'account',labelText: 'Sign In', type: 'radio',  },
        //     {name: 'account',labelText: 'Create Account', type: 'radio',  },
        // ];

        const inputData = [
            {name: 'email', labelText: 'Your E-Mail Address *', type: 'email',  },
            {name: 'password', labelText: 'Password *', type: 'text', },
        ];

        const newAccountInputs = [
            {name: 'confirm-password', labelText: 'Confirm Password *', type: 'text', },
            {name: 'first-name', labelText: 'First Name *', type: 'text', },
            {name: 'surname', labelText: 'Surname *', type: 'text', },
            {name: 'postcode', labelText: 'Postcode *', type: 'number', },
        ]

        return (
            <div className="sign-in">
                <form onSubmit={this.handleSubmit}>
                    <div className="radio-container">
                            <RadioBase 
                                name='account'
                                labelText='Sign In'
                                type='radio'
                                value='Sign In' 
                                onChange={this.handleRadioChange}
                                checked={!newAccount} 
                            />
                            <RadioBase 
                                name='account'
                                labelText='Create Account'
                                type='radio'
                                value='Create Account'
                                onChange={this.handleRadioChange}
                                checked={newAccount}
                            />
                            
                    </div>
                    <div className="inputs">
                            {inputData.map((item) => (
                                <InputBase
                                    labelText={item.labelText}
                                    name={item.name}
                                    type={item.type}
                                    onBlur={this.handleBlur}
                                    onChange={this.handleChange}
                                 />
                            ))}
                            {newAccount && newAccountInputs.map((item) => (
                                <InputBase
                                labelText={item.labelText}
                                type={item.type}
                                onBlur={this.handleBlur}
                                onChange={this.handleChange}
                                />
                            ))}
                    </div>
                    <div className="btn-wrapper">
                        <InputBase type='submit' value={newAccount ?'SAVE' : 'LOGIN'} />
                        <div className="line"><hr className="rule" /> <span>or</span> <hr className="rule" /></div>
                        <InputBase className="facebook" type='submit' value={newAccount ?'SIGN UP WITH FACEBOOK' : 'SIGN IN WITH FACEBOOK'} />
                        <span className="cancel">Cancel</span>
                        <div className="tos">
                            <a href="www">Privacy Policy and Cookies</a>
                            <span>|</span>
                            <a href="www">Terms of Sale and Use</a>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;