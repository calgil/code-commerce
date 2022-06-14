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

const USER_DATA = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    postcode: '',
    isLoggedIn: false,
}


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newAccount: false,
            showPassword: false,
            user: USER_DATA,
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

    validateCreateNewAccount = () => {
        const { user, error } = this.state;
        let errorValue = {}; 
        let isError = false;
        Object.keys(user).forEach((val) => {
            if(!user[val].length){
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
        Object.keys(user).forEach((val) => {
            if(user[val].length) {
                this.handleValidation(val, user[val]);
                console.log('');
            }
        })
        console.log('validate', isError);
            return isError;

    }

    validateSignIn = () => {
        const { user, } = this.state;
        let errorValue = {}; 
        let isError = false;
        if(!user['email'].length){
            errorValue = { ...errorValue, [`emailError`]: 'Required'};
            isError = true;
        } else if (!user['password'].length){
            errorValue = { ...errorValue, [`passwordError`]: 'Required'};
            isError = true;
        }
        this.setState({ error: errorValue });
        return isError;
    }

    handleLogin = (e) => {
        const {newAccount} = this.state;
        e.preventDefault();
        if(!newAccount){
            let errorCheck = this.validateCreateNewAccount();
            if(!errorCheck) {
                console.log('handle', errorCheck);
                this.setState({
                    user: USER_DATA,
                })
            }
        }
        else {
            let errorCheck = this.validateSignIn();
            if(!errorCheck) {
                console.log('sign in', errorCheck);
                this.setState({
                    user: USER_DATA,
                })
            }
        }
    }



    render() {
        const {newAccount, showPassword, error} = this.state;

        const newAccountInputs = [
            {name: 'firstName', labelText: 'First Name *', type: 'text', error: 'firstNameError' },
            {name: 'lastName', labelText: 'Surname *', type: 'text', error: 'lastNameError' },
            {name: 'postcode', labelText: 'Postcode *', type: 'number', error: 'postcodeError' },
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
                                labelText={'Email *'}
                                name={'email'}
                                type={'text'}
                                onBlur={this.handleBlur}
                                onChange={this.handleChange}
                                autoComplete="off"
                                error={
                                    (error
                                    && error['emailError']
                                    && error['emailError'].length > 1)
                                    ? error['emailError']
                                    : null
                                }
                            />
                             <InputBase
                                className={style.password}
                                labelText={'Password *'}
                                name={'password'}
                                type={showPassword? 'text' : 'password'}
                                onBlur={this.handleBlur}
                                onChange={this.handleChange}
                                onClick={this.passwordVisible}
                                visibility={showPassword.toString()}
                                autoComplete="off"
                                error={
                                    (error
                                    && error['passwordError']
                                    && error['passwordError'].length > 1)
                                    ? error['passwordError']
                                    : null
                                }
                            />
                            {newAccount && <InputBase
                                labelText={'Confirm Password *'}
                                name={'confirmPassword'}
                                type={showPassword? 'text' : 'password'}
                                onBlur={this.handleBlur}
                                onChange={this.handleChange}
                                onClick={this.passwordVisible}
                                visibility={showPassword.toString()}
                                autoComplete="off"
                                error={
                                    (error
                                    && error['confirmPasswordError']
                                    && error['confirmPasswordError'].length > 1)
                                    ? error['confirmPasswordError']
                                    : null
                                }
                            />}
                            {newAccount && newAccountInputs.map((item) => (
                                <InputBase
                                key={item.name}
                                name={item.name}
                                labelText={item.labelText}
                                type={item.type}
                                onBlur={this.handleBlur}
                                onChange={this.handleChange}
                                autoComplete="off"
                                error={
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