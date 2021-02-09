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

    componentDidMount() {
        this.state = {
            isLoading:true
        };
    };

    logOut() {
        UserService.logout()
    }

    render(){
        const { currentUser } = this.state;
        console.log(currentUser)

        return(
            <div>
                <h1>Dashboard</h1>
                {' '}
                <div>
                    <div>
                        <header className="jumbotron">
                            <h3>
                                Welcome<strong>{'  '}{currentUser.user.username}</strong>
                            </h3>
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
                <div>
                    <a href="/login" onClick={this.logOut}>LogOut</a>
                </div>
            </div>
        );
    }
}