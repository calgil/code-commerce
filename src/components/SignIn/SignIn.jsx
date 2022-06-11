import React from "react";
import style from './SignIn.module.css';
import RadioBase from "../RadioBase/RadioBase";
import InputBase from "../InputBase/InputBase";
import { emailValidation, passwordValidation } from "./validations";


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
        let errorText;
        switch(type){
            case 'email':
                errorText = emailValidation(value);
                this.setState((prevState) => ({
                    error: {
                        ...prevState.error,
                        emailError: errorText
                    }
                }))
                break;
            case 'password':
                errorText = passwordValidation(value);
                this.setState((prevState) => ({
                    error: {
                        ...prevState.error,
                        passwordError: errorText
                    }
                }))
                break;

                default:
                    break;
        }
    }

    passwordVisible = () => {
        console.log('click');
    }

    handleBlur = ( { target: { name, value }} ) => { this.handleValidation(name, value) }

    // handleChange = () => {

    // }

    handleSubmit(e){
        e.preventDefault();
    }


    render() {
        const {newAccount} = this.state;

        const newAccountInputs = [
            {name: 'first-name', labelText: 'First Name *', type: 'text', },
            {name: 'surname', labelText: 'Surname *', type: 'text', },
            {name: 'postcode', labelText: 'Postcode *', type: 'number', },
        ]

        return (
            <div className={style.signIn}>
                <form onSubmit={this.handleSubmit}>
                    <div className={style.radioContainer}>
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
                    <div className={style.inputs}>
                            <InputBase
                                labelText={'Your E-Mail Address *'}
                                name={'email'}
                                type={'email'}
                                onBlur={this.handleBlur}
                                autoComplete="off"
                            />
                             <InputBase
                                className={style.password}
                                labelText={'Password *'}
                                name={'password'}
                                type={'password'}
                                onBlur={this.handleBlur}
                                visible={this.passwordVisible}
                                autoComplete="off"
                            />
                            {newAccount && <InputBase
                                className={style.password}
                                labelText={'Confirm Password *'}
                                name={'password'}
                                type={'password'}
                                onBlur={this.handleBlur}
                                autoComplete="off"
                            />}
                            {newAccount && newAccountInputs.map((item) => (
                                <InputBase
                                labelText={item.labelText}
                                type={item.type}
                                onBlur={this.handleBlur}
                                onChange={this.handleChange}
                                autoComplete="off"
                                />
                            ))}
                    </div>
                    <div className={style.btnWrapper}>
                        <InputBase type='submit' value={newAccount ?'SAVE' : 'LOGIN'} />
                        <div className={style.line}><hr className={style.rule} /> <span>or</span> <hr className={style.rule} /></div>
                        <InputBase className={style.facebook} type='submit' value={newAccount ?'SIGN UP WITH FACEBOOK' : 'SIGN IN WITH FACEBOOK'} />
                        <span className={style.cancel}>Cancel</span>
                        <div className={style.tos}>
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