import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import UserService from "../services/userservice";

export default class Profile extends Component{

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
                    <Redirect  to='/login' />
                </div>
            )
        }
        else{
            return(
                <div>
                    <h1>Profile</h1>
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
                        {' '}
                        <Link to="/dashboard">Dashboard</Link>
                        {' '}
                        <Link to="/login" onClick={this.logOut}>LogOut</Link>
                    </div>
                </div>
            );
        }
    }
}