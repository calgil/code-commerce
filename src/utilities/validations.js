import moment from "moment";

export const emailValidation = (value) => {
    const emailRegEx = /\S+@\S+\.\S+/g;
    if (value) {
        if(emailRegEx.test(value)){
            return undefined
        } else {
            return 'Please enter valid Email'
        }
    }
}

export const passwordValidation = (value) => {
    const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
    if(value) {
        if(passwordRegEx.test(value) && value.length > 8 && value.length < 20){
            return undefined
        } else {
            return 'Password must be 8-20 characters, including: at least 1 capital letter, at least one lower case letter, one number, and one special character -!@#$%^&*()_+'
        }
    }
}

export const confirmPasswordValidation = (value, password) => {
    if(value === password) {
        return undefined
    } else {
        return 'Passwords do not match'
    }
}

export const onlyTextValidation = (value) => {
    if (value) {
        if(/^[a-zA-Z ]*$/i.test(value)) {
            return undefined
        } else {
            return 'Alphabetical letters only'
        }
    } 
    else {
        return undefined;
    }
}

export const postCodeValidation = (value) => {
    if(value.length === 5) {
        return undefined;
    } else {
        return 'Invalid Zip code'
    }
}

export const validateCartCheckout = (userShoppingCart) => {
    if (userShoppingCart.length === 0) {
        return 'Cart is empty';
    } else {
        return '';
    }
}

export const phoneValidation = (phoneNumber) => {
    if (phoneNumber.length === 10) {
        return undefined
    } else {
        return 'Invalid phone number'
    }
    
}

export const cardNumberValidation = (cardNumber) => {
    const regexPattern = {
        MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/ ,
        VISA: /^4[0-9]{2,}$/ ,
        AMERICANEXPRESS: /^3[47][0-9]{5,}$/ ,
        DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/ ,
    }
    for (const card in regexPattern) {
        if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) {
            if(cardNumber && cardNumber.length === 19) {
                return cardNumber && /^[1-6]{1}[0-9]{14,15}$/i.test(cardNumber.replace(/[^\d]/g, '').trim())
                ? ''
                : 'Enter a valid Card '
            }
        }
    }
    return 'Enter a valid Card '
}

export const cardExpireValidation = (value) => {
    if (value) {
        if (/^(0[1-9]|1[0-2])\/[0-9]{2}$/i.test(value.trim())) {
            let today = new Date();
            const date = `${today.getFullYear()}-${today.getMonth()+1}-${new Date(today.getFullYear(),today.getMonth() + 1, 0).getDate()}`
            let currentDate = moment( new Date(date));
            let visaValue = value.split('/');
            let visaDate = new Date(`20${visaValue[1]}`, visaValue[0], 0);
            return currentDate < moment(visaDate)
                ? undefined
                : 'Please enter a valid date';
        } else {
            return 'Invalid Date Number';
        }
    }
}

export const securityCodeValidation = (min, value) => (value && value.length < min) ? 'Must be 3 Characters or more' : undefined;
