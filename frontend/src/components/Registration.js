import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UserRegistration } from '../services/RegistrationService';
import axios from 'axios';
import Message from '../elements/Message';
import Error from '../elements/Error';
import {
    REGISTRATION_MESSAGE,
    ERROR_IN_REGISTRATION,
  } from '../MessageBundle';

export default class Registration extends Component{
    constructor(props){
        super(props);

        this.state = {
            isLoading : true,
            token:'',
            RegistrationUsername:'',
            RegistrationEmail:'',
            RegistrationPassword:'',
            register: false,
            error: false,
            registerError: null,
        };

        this.onTextboxChangeRegistrationUsername = this.onTextboxChangeRegistrationUsername.bind(this);
        this.onTextboxChangeRegistrationEmail = this.onTextboxChangeRegistrationEmail.bind(this);
        this.onTextboxChangeRegistrationPassword = this.onTextboxChangeRegistrationPassword.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
    }

    componentDidMount() {
        this.setState({
          isLoading: false
        });
    };

    onTextboxChangeRegistrationUsername(event) {
        this.setState({
            RegistrationUsername: event.target.value,
        });
    }

    onTextboxChangeRegistrationEmail(event) {
        this.setState({
            RegistrationEmail: event.target.value,
        });
    }

    onTextboxChangeRegistrationPassword(event) {
        this.setState({
            RegistrationPassword: event.target.value,
        });
    }

    async onSignUp() {
        const {
            RegistrationUsername,
            RegistrationEmail,
            RegistrationPassword
        } = this.state;

        this.setState({
           isLoading: true,
        });

        const data = {
            email:RegistrationEmail,
            username: RegistrationUsername,
            password: RegistrationPassword,
        };

        // axios.post('http://localhost:4000/users/register', data)
        //     .then(res => {
        //         console.log('res:', res);
        //         if (res.status===200) {
        //             this.setState ({
        //                 RegistrationUsername:'',
        //                 RegistrationEmail:'',
        //                 RegistrationPassword:'',
        //                 register: true,
        //                 error: false,
        //                 isLoading:false,
        //         });
        //         } else
        //             this.setState ({
        //             error: true,
        //             register: false,
        //             isLoading:false,
        //         });
            // .catch(function (error) {
            //     console.log(error);
            // });
        // });
        
        try{
        const registerStatus =await UserRegistration (data);
        // if (registerStatus.status === 200) {
        console.log(registerStatus);
        this.setState ({
            RegistrationUsername:'',
            RegistrationEmail:'',
            RegistrationPassword:'',
            register: true,
            error: false,
            isLoading:false,
            registerError: null,
        });
        }
        catch(err) {
            if (err.response) {
                if (err.response) {
                    console.log(err.response.data)
                  this.setState({
                    error: true,
                    register: false,
                    isLoading:false,
                    fieldErrors: err.message
                  });
                } else {
                  this.setState({
                    registerError: err.message
                  });
                }
              } else {
                console.log(err);
              }
    }
        
    };

    render() {

        const {
          isLoading,
          token,
          register,
          error,
          registerError,
          RegistrationUsername,
          RegistrationEmail,
          RegistrationPassword,
        } = this.state;

        if (isLoading) {
            return (<div><p>Loading...</p></div>);
        }

        return(
            <div className="Registration">
                <div>
                    <input
                    type="username"
                    placeholder="Username"
                    value={RegistrationUsername}
                    onChange={this.onTextboxChangeRegistrationUsername}
                    /><br />
                    <input
                    type="email"
                    placeholder="Email"
                    value={RegistrationEmail}
                    onChange={this.onTextboxChangeRegistrationEmail}
                    /><br />
                    <input
                    type="password"
                    placeholder="Password"
                    value={RegistrationPassword}
                    onChange={this.onTextboxChangeRegistrationPassword}
                    /><br />
                    <button onClick={this.onSignUp}>Sign Up</button>
                </div>
                {' '}
                {registerError && (
                    <div>
                    {registerError}
                    </div>
                )}
                {' '}
                {error && <Error message={ERROR_IN_REGISTRATION} />}
                {' '}
                {register && <Message message={REGISTRATION_MESSAGE} />}
                {' '}
            </div>

        );
    }

};