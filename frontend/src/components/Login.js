import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Registration extends Component{
    constructor(props){
        super(props);

        this.state = {
            isLoading : true,
            token:'',
            LoginUsername:'',
            LoginEmail:'',
            LoginPassword:'',
            login: false,
            error: false,
            LoginError: '',
            fieldError:{}
        };
    }

    render(){

        const {
            isLoading,
            token,
            LoginUsername,
            LoginEmail,
            LoginPassword,
            login,
            error,
            LoginError,
            fieldError
            } = this.state;



        return(
            <div>
                <h1>LOGIN</h1>
                {' '}
                <div>
                    <input
                    type="email"
                    placeholder="Email"
                    autoComplete="Email"
                    value={LoginEmail}
                    onChange={this.onTextboxChangeLoginEmail}
                    /><br />
                    <input
                    type="password"
                    placeholder="Password"
                    value={LoginPassword}
                    autoComplete="password"
                    onChange={this.onTextboxChangeLoginPassword}
                    /><br />
                    {' '}
                    <div>
                        <button onClick={this.onSignIn}>Sign In</button>
                        {' '}
                        <Link to="/register"> Register </Link>
                    </div>
                    {' '}
                </div>
            </div>
        );
    }
}