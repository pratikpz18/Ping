import React, { Component } from 'react';
import '../App.css'
import { Link,Redirect } from 'react-router-dom';
import UserService from "../services/userservice";
import SearchModal from './SearchModal';
import logo from '../img/logo1.png';

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
                <div className="dashboard-container">
                    <div className="navbar navbar-inverse">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <img src={logo} alt="logo"
                                style={{height:'45px',width:'45px',marginBottom:'8px'}}></img>
                                <Link to="/dashboard" className="logo-link">Ping</Link>
                            </div>
                            <div>
                                <SearchModal currentUser={this.state.currentUser} ref={this.SearchModalRef} ></SearchModal>
                                <button className="btn btn-search" type="button" onClick={this.onClick}>
                                <i className="fa fa-search" aria-hidden="true"></i>
                                    Search
                                </button>
                            </div>
                            <div>
                                <Link className="link" to={`/dashboard/profile/:${currentUser.user._id}`} >Profile</Link>
                            </div>
                            <div>
                                <Link className="link" to="/login" onClick={this.logOut}><i class="fa fa-sign-out" aria-hidden="true"></i>LogOut</Link>
                            </div>
                        </div>
                    </div>
                    <div className="container"> 
                        <div className="call-to-action">
                            <p className="cta-text">For Chatting Click here <i class="fa fa-level-down" aria-hidden="true"></i></p>
                            <button className="btn btn-secondary messages">
                            <Link  to={'/dashboard/messages'} className="link link-message">Messages</Link>
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
    }
}