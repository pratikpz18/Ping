import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserService from "../services/userservice";

export default class Registration extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
            currentUser: UserService.getCurrentUser(),
            isLoading:false
        };

        this.logOut = this.logOut.bind(this);

    }

    logOut() {
        UserService.logout()
    }

    render(){
        const { currentUser ,isLoading } = this.state;
        console.log(currentUser)

        if (isLoading) {
            return (<div><p>Loading...</p></div>);
        }

        if(!currentUser){
            return(
                <div>
                    <div>
                        <h1>You Need to Login....</h1>
                    </div>
                    <div>
                        <Link to="/login" > Log In </Link>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>
                    <h1>Dashboard</h1>
                    {' '}
                    <div>
                        <div>
                            <div>
                                <header className="jumbotron">
                                    <p>
                                        Welcome<strong>{'  '}{currentUser.user.username}</strong>
                                    </p>
                                </header>
                            </div>
                            {' '}
                            <p>
                                <strong>Id:</strong>{" "}
                                {currentUser.user._id}
                            </p>
                            <p>
                                <strong>Email:</strong>{" "}
                                {currentUser.user.email}
                            </p>
                        </div>
                    </div>
                    <div>
                        <a href="/login" onClick={this.logOut}>LogOut</a>
                    </div>
                </div>
            );
        }
    }
}