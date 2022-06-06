import React from "react";
import './CodeCommerce.css'
import SignIn from "../SignIn/SignIn";

class CodeCommerce extends React.Component {
    constructor() {
        super();
        this.state = {
            
        }
    }
    render(){
        return (
            <div className="main">
                <h1>Code Commerce</h1>
                <SignIn />
            </div>
        )
    }
}

export default CodeCommerce;