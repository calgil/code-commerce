import React from "react";
import s  from './SignIn.module.css';
import RadioBase from "../RadioBase/RadioBase";
import InputBase from "../InputBase/InputBase";
import { USER_DATA, FAKE_USER } from "../../utilities/constants";
import { 
    emailValidation, 
    passwordValidation, 
    confirmPasswordValidation, 
    onlyTextValidation,
    postCodeValidation
} from "../../utilities/validations";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newAccount: false,
            isLoggedIn: false,
            userLogin: '',
            user: USER_DATA,
            error: {},
        }
    }

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
                        [`${type}Error`]: errorText
                    }
                }))
                break;
            case 'password':
                errorText = passwordValidation(value);
                this.setState((prevState) => ({
                    error: {
                        ...prevState.error,
                        [`${type}Error`]: errorText
                    }
                }));
                break;
            case 'confirmPassword':
                const {password} = this.state.user
                errorText = confirmPasswordValidation(value, password);
                this.setState((prevState) => ({
                    error: {
                        ...prevState.error,
                        [`${type}Error`]: errorText,
                    }
                }))
                break;
            case 'firstName':
                errorText = onlyTextValidation(value);
                this.setState((prevState) => ({
                    error: {
                        ...prevState.error,
                        [`${type}Error`]: errorText,
                    }
                }))
                break;
            case 'lastName':
                errorText = onlyTextValidation(value);
                this.setState((prevState) => ({
                    error: {
                        ...prevState.error,
                        [`${type}Error`]: errorText,
                    }
                }))
                break;
            case 'postCode':
                errorText = postCodeValidation(value);
                this.setState((prevState) => ({
                    error: {
                        ...prevState.error,
                        [`${type}Error`]: errorText,
                    }
                }))
                break;
                default:
                    break;
        }
    }

    handleBlur = ( { target: { name, value }} ) => { this.handleValidation(name, value) }

    handleChange = ({ target: { name, value }}) => {
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                [name]: value,
            }
        }))
    }

    checkLoginError = () => {
        const { user, error, } = this.state;
        let errorValue = {};
        let isError = false;
        if (user === FAKE_USER) {
            console.log('good');
        } else {
            Object.keys(user).forEach((val) => {
                if(((val === 'email') || (val === 'password')) && !user[`${val}`].length) {
                    errorValue = {...errorValue, [`${val}Error`]: "Required"}
                    isError = true;
                }
            })
            this.setState({ error: errorValue });
            Object.keys(error).forEach((val) => {
                if(error[val]){
                    isError = true;
                }
            })
            Object.keys(user).forEach((val) => {
                if(((val === 'email') || (val === 'password')) && user[`${val}`].length) {
                    this.handleValidation(val, user[val]);
                }
            })
        }
        return isError;
    }

    checkErrorBeforeSave = () => {
        const { user, error, } = this.state;
        let errorValue = {};
        let isError = false;
      
        Object.keys(user).forEach((val) => {
            if(!user[val].length) {
                errorValue = {...errorValue, [`${val}Error`]: "Required"}
                isError = true;
            }
        })
        this.setState({ error: errorValue });
        Object.keys(error).forEach((val) => {
            if(error[val]){
                isError = true;
            }
        })
        Object.keys(user).forEach((val) => {
            if(user[`${val}`].length) {
                this.handleValidation(val, user[val]);
            }
        })
        return isError;
    }

    handleLogin = (e) => {
        e.preventDefault();
        const { newAccount } = this.state;
        if (!newAccount) {
            let checkError = this.checkLoginError();
            if (!checkError) {
                this.setState({
                    user: USER_DATA,
                    isLoggedIn: true,
                })
                this.props.changeLoginStatus();
            }
        } else {
            let checkError = this.checkErrorBeforeSave();
            if (!checkError) {
                this.setState({
                    user: USER_DATA,
                    isLoggedIn: true,
                })
                this.props.changeLoginStatus();
            }
        }
    }



    render() {
        const {newAccount, error, user} = this.state;

        const newAccountInputs = [
            {name: 'firstName', labelText: 'First Name *', type: 'text', error: 'firstNameError' },
            {name: 'lastName', labelText: 'Surname *', type: 'text', error: 'lastNameError' },
            {name: 'postCode', labelText: 'Postcode *', type: 'number', error: 'postCodeError' },
        ]

        return (
                <div 
                    className={s.signInBg}
                >
                    <form 
                    onSubmit={this.handleLogin}
                    className={s.signIn}
                    >
                        { newAccount
                            ? <h3 className={s.header}>Create an Account</h3>
                            : <h3 className={s.header}>Sign In</h3>
                        }
                        <div className={s.radioContainer}>
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
                        <div className={s.inputs}>
                                <InputBase
                                    labelText={'Email *'}
                                    name={'email'}
                                    type={'text'}
                                    value={user && user['email']}
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
                                    className={s.password}
                                    labelText={'Password *'}
                                    name={'password'}
                                    type={'password'}
                                    value={user && user['password']}
                                    onBlur={this.handleBlur}
                                    onChange={this.handleChange}
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
                                    className={s.password}
                                    labelText={'Confirm Password *'}
                                    name={'confirmPassword'}
                                    type={ 'password'}
                                    value={user && user['confirmPassword']}
                                    onBlur={this.handleBlur}
                                    onChange={this.handleChange}
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
                                    value={user && user[item.name]}
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
                        <div className={s.btnWrapper}>
                            <InputBase type='submit' value={newAccount ?'SAVE' : 'LOGIN'} />
                            <div className={s.line}><hr className={s.rule} /> <span>or</span> <hr className={s.rule} /></div>
                            <InputBase className={s.facebook} type='submit' value={newAccount ?'SIGN UP WITH FACEBOOK' : 'SIGN IN WITH FACEBOOK'} />
                            <input onClick={this.props.signInVisibility} className={s.cancel} type="button" value={'Cancel'} />
                            <div className={s.tos}>
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