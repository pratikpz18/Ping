import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import UserService from "../services/userservice";

export default class Profile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentUser:[],
            isLoading:false,
        };
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        UserService.logout()
    }

    componentWillMount(){
        let userid = this.props.match.params.userid;
        userid=userid.slice(1)
        console.log('First this called');
        this.fetchUser(userid)
    }

    async fetchUser(userid){
        try{
            console.log(userid)
            let user = await UserService.getUserById(userid)
            this.setState({ currentUser:user})
        }catch(err){
            console.log(err)
        }
        
    }

    render(){
        const { currentUser ,isLoading } = this.state;
        const k=Object(currentUser.friendsList)
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
                    <div className="navbar navbar-inverse">
                    <div className="container-fluid">
                            <div className="navbar-header">
                                <Link to="/dashboard" className="logo-link">Ping</Link>
                            </div>
                            <div>
                                <Link className="link" to="/login" onClick={this.logOut}><i class="fa fa-sign-out" aria-hidden="true"></i>LogOut</Link>
                            </div>
                        </div>
                    </div>
                    <h1>Profile</h1>
                    <div>
                        <div>
                            <div>
                                <header>
                                    <p>
                                       Username:<strong>{'  '}{currentUser.username}</strong>
                                    </p>
                                </header>
                            </div>
                            {currentUser.bio &&
                                <p>
                                    <strong>Bio :</strong> 
                                    {currentUser.bio}
                                </p>
                             }
                            <p>
                                <strong>Id:</strong>{" "}
                                {currentUser._id}
                            </p>
                            <p>
                                <strong>Email:</strong>{" "}
                                {currentUser.email}
                            </p>
                            <p>
                                <strong>Friends:</strong>{' '}{ k.length }
                            </p>
                        </div>
                    </div>
                    {(currentUser._id==UserService.getCurrentUser().user._id) &&
                    <div>
                        <button className="btn-primary"><Link className="link" to={`/dashboard/editprofile/:${currentUser._id}`}>Edit</Link></button>
                    </div>
                    }
                </div>
            );
        }
    }
}