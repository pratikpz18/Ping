import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import { UserRegistration } from '../services/RegistrationService';
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
            registerError: '',
            fieldError:{}
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

        this.setState({
            registerError: '',
            fieldError:{}
        })
      

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
            registerError:'',
            fieldError:{}
        });
        }
        catch(err) {
            console.log(err.response.data.errors)
            if (err.response && err.response.data) {
                if(err.response.data.errors){
                    this.setState({
                        error: true,
                        register: false,
                        isLoading:false,
                        fieldError:err.response.data.errors
                    });
                }
                else if(err.response.data.msg){
                    this.setState({
                    error: true,
                    register: false,
                    isLoading:false,
                    registerError: err.response.data.msg,
                });


        }
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
            fieldError
            } = this.state;

            if (isLoading) {
                return (<div><p>Loading...</p></div>);
            }
            
            if (!token) {
                return(
                    <div className="Registration">
                        <div className="form">
                            <div className="status">
                                {error && <Error message={ERROR_IN_REGISTRATION} />}
                                {' '}
                                {register && <Message message={REGISTRATION_MESSAGE} />}
                                {' '}
                            </div>
                            {' '}
                            <div className="header">
                                <h1>REGISTER</h1>
                            </div>
                            {' '}
                            <div>
                                <div className="input-group">
                                    <i class="fa fa-user input-group-addon" aria-hidden="true"></i>
                                    <input
                                    type="username"
                                    placeholder="Username"
                                    autoComplete="Username"
                                    className="form-control"
                                    value={RegistrationUsername}
                                    onChange={this.onTextboxChangeRegistrationUsername}
                                    />
                                </div>
                                <div className="input-group">
                                <i class="fa fa-envelope input-group-addon" aria-hidden="true"></i>
                                    <input
                                    type="email"
                                    placeholder="Email"
                                    autoComplete="Email"
                                    className="form-control"
                                    value={RegistrationEmail}
                                    onChange={this.onTextboxChangeRegistrationEmail}
                                    />
                                    {fieldError.email && (
                                    <div >{fieldError.email}</div>
                                    )}
                                </div>
                                <div className="input-group">
                                <i class="fa fa-lock input-group-addon" aria-hidden="true"></i>
                                    <input
                                    type="password"
                                    placeholder="Password"
                                    className="form-control"
                                    value={RegistrationPassword}
                                    autoComplete="password"
                                    onChange={this.onTextboxChangeRegistrationPassword}
                                    />
                                    {fieldError.password && (
                                    <div >{fieldError.password}</div>
                                    )}
                                </div>
                                {' '}
                                {' '}
                                <div>
                                    <button className="btn signup-btn" onClick={this.onSignUp}>Sign Up</button>
                                    {' '}
                                    <Link className="Login-link" to="/login"> Login </Link>
                                </div>
                                {' '}
                                {!register ? <div>{registerError}</div> : <Redirect  to='/login' />}
                                {' '}
                            </div>{' '}
                            {' '}
                            {registerError && 
                                (<div>
                                    {registerError}
                                </div>) 
                            }
                        </div>
                    </div>
                );
            }

            return (
                <div>
                  <p>Signed in</p>
                </div>
              );
        }

};