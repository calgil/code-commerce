
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
            return 'Password must meet criteria'
        }
    }
}