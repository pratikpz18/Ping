import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import UserService from "../services/userservice";


export default class Landing extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
            currentUser: UserService.getCurrentUser(),
            isLoading:false
        };
    }

    render(){

        const { currentUser ,isLoading } = this.state;

        if (isLoading) {
            return (<div><p>Loading...</p></div>);
        }

        if(currentUser){
            return(
                <Redirect  to='/dashboard' />
            )
        }
        else{
            return(
                <div className="Landing">
                    <h1><Link to="/" className="Landing-header">Ping</Link></h1>
                    <div className="Main-Text col-sm-6">
                        <h3><strong>Our Team</strong>Welcomes You!</h3>
                        <div className="quote-div">
                            <p className="quote">Spend some time and connect to your friends.</p>
                            <p className="quote">Register for having a chat with your friends and family </p>
                            <p className="p-quote">PS: Your Messages are not accessible by Us</p>
                        </div>
                    <div className="CTA">
                        <button className="btn btn-register"><i class="fa fa-sign-in register-icon" aria-hidden="true"></i><Link to="/register" className="register-link">Sign Up</Link></button>
                        <button className="btn btn-login"><i class="fa fa-sign-out login-icon" aria-hidden="true"></i><Link to="/login" className="login-link">Sign In </Link></button>
                    </div>
                </div>
                </div>
            );
        }
    }
}