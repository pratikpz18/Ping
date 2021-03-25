import React, { Component } from 'react';
import '../App.css';
import { Link,Redirect } from 'react-router-dom';
import { UserLogin } from '../services/LoginService';
import Message from '../elements/Message';
import Error from '../elements/Error';

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
            console.log(LoginStatus);
            if (LoginStatus.data.token) {
                localStorage.setItem("user", JSON.stringify(LoginStatus.data));
            }
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
                        fieldError:err.response.data.errors,
                        LoginEmail:'',
                        LoginPassword:'',
                    });
                }
                else if(err.response.data.msg){
                    this.setState({
                    error: true,
                    login: false,
                    isLoading:false,
                    LoginError: err.response.data.msg,
                    LoginEmail:'',
                    LoginPassword:'',
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
                <div className="form">
                    <div className="status">
                        {!login ? <div>{LoginError}</div> : <Redirect  to='/dashboard' />}
                    </div>
                    <h1 className="header">LOGIN</h1>
                    <div>
                        <div className="input-group">
                        <i class="fa fa-envelope input-group-addon" aria-hidden="true"></i>
                        <input
                        type="email"
                        placeholder="Email"
                        className="form-control register"
                        autoComplete="Email"
                        value={LoginEmail}
                        onChange={this.onTextboxChangeLoginEmail}
                        />
                        </div>
                        {fieldError.email && (
                        <div className="fieldError">{fieldError.email}</div>
                        )}
                        <div className="input-group">
                        <i class="fa fa-lock input-group-addon" aria-hidden="true"></i>
                        <input
                        type="password"
                        placeholder="Password"
                        className="form-control register"
                        value={LoginPassword}
                        autoComplete="password"
                        onChange={this.onTextboxChangeLoginPassword}
                        />
                        </div>
                        {fieldError.password && (
                        <div className="fieldError">{fieldError.password}</div>
                        )}
                        <div className="btn-group">
                            <button className="btn signin-btn" onClick={this.onSignIn}>Sign In</button>
                            <Link to="/register" className="Register-link"> Register </Link>
                        </div>
                    </div>
                    </div>
            </div>
        );
    }
}