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
                    <h1>Profile</h1>
                    {' '}
                    <div>
                        <div>
                            <div>
                                <header className="jumbotron">
                                    <p>
                                        Welcome<strong>{'  '}{currentUser.username}</strong>
                                    </p>
                                </header>
                            </div>
                            {' '}
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