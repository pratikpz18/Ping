import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import UserService from "../services/userservice";

export default class Dashboard extends Component{

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
                    <h1>Dashboard</h1>
                    {' '}
                    <div>
                        <Link to={`/dashboard/profile/:${currentUser.user._id}`}>Profile</Link>
                    </div>
                    {' '}
                    <div>
                        <Link to="/login" onClick={this.logOut}>LogOut</Link>
                    </div>
                </div>
            );
        }
    }
}