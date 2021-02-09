import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import { UserLogin } from '../services/LoginService';
import Message from '../elements/Message';
import Error from '../elements/Error';
import {
    LOGIN_MESSAGE,
    ERROR_IN_LOGIN,
  } from '../MessageBundle';

export default class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            isLoading : true,
            token:'',
            LoginEmail:'',
            LoginPassword:'',
            login: false,
            error: false,
            LoginError: '',
            fieldError:{}
        };

        this.onTextboxChangeLoginEmail = this.onTextboxChangeLoginEmail.bind(this);
        this.onTextboxChangeLoginPassword = this.onTextboxChangeLoginPassword.bind(this);
        this.onSignIn = this.onSignIn.bind(this);

    }

    componentDidMount() {
        this.setState({
          isLoading: false
        });
    };

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }

    onTextboxChangeLoginEmail(event) {
        this.setState({
            LoginEmail: event.target.value,
        });
    }

    onTextboxChangeLoginPassword(event) {
        this.setState({
            LoginPassword: event.target.value,
        });
    }

    async onSignIn() {
        const {
            LoginEmail,
            LoginPassword
        } = this.state;

        this.setState({
           isLoading: true,
        });

        this.setState({
            LoginError: '',
            fieldError:{}
        })

        const data = {
            email:LoginEmail,
            password: LoginPassword,
        };

        try{
            const LoginStatus =await UserLogin (data);
            // if (registerStatus.status === 200) {
            console.log(LoginStatus);
            if (LoginStatus.data.token) {
                localStorage.setItem("user", JSON.stringify(LoginStatus.data));
            }
            // if(LoginStatus){
            //     return <Redirect to="/dashboard" />
            // }
            this.setState ({
                isLoading : false,
                token:'',
                LoginEmail:'',
                LoginPassword:'',
                login: true,
                error: false,
                LoginError: '',
                fieldError:{}
            });
        }
        catch(err){
            console.log(err.response.data.errors)
            if (err.response && err.response.data) {
                if(err.response.data.errors){
                    this.setState({
                        error: true,
                        login: false,
                        isLoading:false,
                        fieldError:err.response.data.errors
                    });
                }
                else if(err.response.data.msg){
                    this.setState({
                    error: true,
                    login: false,
                    isLoading:false,
                    LoginError: err.response.data.msg,
                }); 
            }
        }

        }

    }

    render(){

        const {
            isLoading,
            token,
            LoginEmail,
            LoginPassword,
            login,
            error,
            LoginError,
            fieldError
        } = this.state;

        if (isLoading) {
            return (<div><p>Loading...</p></div>);
        }



        return(
            <div className="Login">
                {' '}
                <div className="status">
                    {' '}
                    {error && <Error message={ERROR_IN_LOGIN} />}
                    {' '}
                    {login && <Message message={LOGIN_MESSAGE} />}
                    {' '}
                </div>
                {' '}
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
                    {' '}
                    {fieldError.email && (
                    <div >{fieldError.email}</div>
                    )}
                    {' '}
                    <input
                    type="password"
                    placeholder="Password"
                    value={LoginPassword}
                    autoComplete="password"
                    onChange={this.onTextboxChangeLoginPassword}
                    /><br />
                    {' '}
                    {fieldError.password && (
                    <div >{fieldError.password}</div>
                    )}
                    {' '}
                    {' '}
                    <div>
                        <button onClick={this.onSignIn}>Sign In</button>
                        {' '}
                        <Link to="/register"> Register </Link>
                    </div>
                    {' '}
                    <div>
                        {!login ? <div>{LoginError}</div> : <Redirect  to='/dashboard' />}
                    </div>
                    {' '}
                </div>
                {' '}
                {LoginError && 
                    (<div>
                        {LoginError}
                    </div>) 
                }
                {' '}
            </div>
        );
    }
}