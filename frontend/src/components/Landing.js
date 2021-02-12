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
                <div>
                    <h1>Landing</h1>
                    {' '}
                    <div>
                        <Link to="/register">Register</Link>{' '}
                        <Link to="/login" > Log In </Link>
                    </div>
                    {' '}
                </div>
            );
        }
    }
}