import React from "react";
import './SignIn.css';
import InputBase from "../InputBase/InputBase";


class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            newAccount: false,
        }
    }

    handleChange = (e) => {
        console.log(e.target.name);
    }

    handleSubmit(e){
        e.preventDefault();
    }


    render() {

        const radioData = [
            {labelName: 'Sign In', type: 'radio', },
            {labelName: 'Create Account', type: 'radio', },
        ]

        return (
            <div className="sign-in">
                <form onSubmit={this.handleSubmit}>
                    <h2>Sign In</h2>
                    <div className="radio-container">
                        {radioData.map((item) => (
                            <InputBase 
                                labelName={item.labelName.toUpperCase()} 
                                type={item.type} 
                                onChange={this.handleChange}
                            />
                        ))}
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;