import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import UserService from "../services/userservice";
import SearchModal from './SearchModal';

export default class Dashboard extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
            currentUser: UserService.getCurrentUser(),
            isLoading:false,
        };

        this.logOut = this.logOut.bind(this);

    }

    logOut() {
        UserService.logout()
    }

    SearchModalRef = (obj) => {
        this.showModal = obj && obj.handleShow;
    }
    
    onClick = () => {
        this.showModal();
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
                    <header>
                        <h1>Dashboard</h1>
                        {' '}
                        <div>
                            <Link to={`/dashboard/profile/:${currentUser.user._id}`}>Profile</Link>
                        </div>
                        {' '}
                        <div>
                            <Link to="/login" onClick={this.logOut}>LogOut</Link>
                        </div>
                        {' '}
                        
                        <SearchModal currentUser={this.state.currentUser} ref={this.SearchModalRef} ></SearchModal>
                        <button type="button" onClick={this.onClick}>
                        Search
                        </button>
                        {' '}
                        <div>
                            <Link to={'/dashboard/messages'} >Messages</Link>
                        </div>
                        {' '}
                    </header>
                    <div>

                    </div>
                </div>
            );
        }
    }
}