import React from "react";
import style from './SignIn.module.css';
import RadioBase from "../RadioBase/RadioBase";
import InputBase from "../InputBase/InputBase";
import { 
    emailValidation, 
    passwordValidation, 
    confirmPasswordValidation, 
    onlyTextValidation,
    postCodeValidation
} from "./validations";

// const INIT_LOGIN = {
//     email: '',
//     password: '',
// }


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            newAccount: false,
            showPassword: false,
            userLoginData: {},
            error: {},
        }
    }


    // This is the way to alternate between two states
    handleRadioChange = () => {
        this.setState({ newAccount: !this.state.newAccount })
    };

    passwordVisible = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }

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
                }));
                if(errorText === undefined){
                    this.setState({
                        userLoginData: {
                            password: value,
                        }
                    })
                }
                break;
            case 'confirmPassword':
                const {password} = this.state.userLoginData
                errorText = confirmPasswordValidation(value, password);
                this.setState((prevState) => ({
                    error: {
                        ...prevState.error,
                        confirmPasswordError: errorText,
                    }
                }))
                break;
            case 'firstName':
                errorText = onlyTextValidation(value);
                this.setState((prevState) => ({
                    error: {
                        ...prevState.error,
                        firstNameError: errorText,
                    }
                }))
                break;
            case 'lastName':
                errorText = onlyTextValidation(value);
                this.setState((prevState) => ({
                    error: {
                        ...prevState.error,
                        lastNameError: errorText,
                    }
                }))
                break;
            case 'postcode':
                errorText = postCodeValidation(value);
                this.setState((prevState) => ({
                    error: {
                        ...prevState.error,
                        postCodeError: errorText,
                    }
                }))
                break;
                default:
                    break;
        }
    }

    handleBlur = ( { target: { name, value }} ) => { this.handleValidation(name, value) }

    handleChange= ({ target: { name, value }}) => {
        this.setState((prevState) => ({
            userLoginData: {
                ...prevState.userLoginData,
                [name]: value,
            }
        }))
    }

    validateLogin = () => {
        const { userLoginData, error } = this.state;
        let errorValue = {}; 
        let isError = false;
        Object.keys(userLoginData).forEach((val) => {
            if(!userLoginData[val].length){
                errorValue = { ...errorValue, [`${val}Error`]: `Required`};
                isError = true;
            }
        });
        Object.keys(error).forEach((val) => {
            if(error[val]){
                isError = true;
            }
        })
        this.setState({ error: errorValue });
        Object.keys(userLoginData).forEach((val) => {
            if(userLoginData[val].length) {
                this.handleValidation(val, userLoginData[val]);
            }
        })
            return isError;

    }

    handleLogin = (e) => {
        e.preventDefault();
        let errorCheck = this.validateLogin();
        console.log(errorCheck);
        // if(!errorCheck) {
        //     this.setState({
        //         userLoginData: INIT_LOGIN,
        //     })
        // }
    }



    render() {
        const {newAccount, showPassword, error} = this.state;

        const newAccountInputs = [
            {key: 4,name: 'firstName', labelText: 'First Name *', type: 'text', error: 'firstNameError' },
            {key: 5,name: 'lastName', labelText: 'Surname *', type: 'text', error: 'lastNameError' },
            {key: 6,name: 'postcode', labelText: 'Postcode *', type: 'number', error: 'postCodeError' },
        ]

        return (
                <form 
                    onSubmit={this.handleLogin}
                    className={style.signIn}
                >
                    <div className={style.radioContainer}>
                        {/* I feel like this should be built better? Map through data? */}
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
                                key={1}
                                labelText={'Your E-Mail Address *'}
                                name={'email'}
                                type={'email'}
                                onBlur={this.handleBlur}
                                autoComplete="off"
                                errorM={
                                    (error
                                    && error['emailError']
                                    && error['emailError'].length > 1)
                                    ? error['emailError']
                                    : null
                                }
                            />
                             <InputBase
                                key={2}
                                className={style.password}
                                labelText={'Password *'}
                                name={'password'}
                                type={showPassword? 'text' : 'password'}
                                onBlur={this.handleBlur}
                                onClick={this.passwordVisible}
                                visibility={showPassword}
                                autoComplete="off"
                                errorM={
                                    (error
                                    && error['passwordError']
                                    && error['passwordError'].length > 1)
                                    ? error['passwordError']
                                    : null
                                }
                            />
                            {newAccount && <InputBase
                                key={3}
                                labelText={'Confirm Password *'}
                                name={'password'}
                                type={showPassword? 'text' : 'password'}
                                onBlur={this.handleBlur}
                                onClick={this.passwordVisible}
                                visibility={showPassword}
                                autoComplete="off"
                                errorM={
                                    (error
                                    && error['confirmPasswordError']
                                    && error['confirmPasswordError'].length > 1)
                                    ? error['confirmPasswordError']
                                    : null
                                }
                            />}
                            {newAccount && newAccountInputs.map((item) => (
                                <InputBase
                                key={item.key}
                                name={item.name}
                                labelText={item.labelText}
                                type={item.type}
                                onBlur={this.handleBlur}
                                onChange={this.handleChange}
                                autoComplete="off"
                                errorM={
                                    (error
                                    && error[item.error]
                                    && error[item.error].length > 1)
                                    ? error[item.error]
                                    : null
                                }
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
        )
    }
}

export default SignIn;