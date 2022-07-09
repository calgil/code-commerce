
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