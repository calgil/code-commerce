
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