import React from "react";
import './CodeCommerce.css'
import SignIn from "../SignIn/SignIn";

class CodeCommerce extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            // I guess when this is true signIn will not display and the next part of the app can be displayed
        }
    }
    render(){
        const {loggedIn} = this.state;
        return (
            <div className="main">
                <h1>Code Commerce</h1>
                {!loggedIn && <SignIn /> }
                
            </div>
        )
    }
}

export default CodeCommerce;