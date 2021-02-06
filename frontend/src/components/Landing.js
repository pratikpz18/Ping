import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Registration extends Component{
    render(){
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