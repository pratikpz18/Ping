import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import UserService from "../services/userservice";
import {getUsersFriend} from "../services/messageservice";

export default class Messages extends Component {
    constructor(props){
        super(props)

        this.state = {
            currentUser: UserService.getCurrentUser(),
            isLoading:false,
            userdetails:[],
        };
    }

    componentDidMount(){
        this.fetchUser()
    }

    async fetchUser(){
        try{
            const {currentUser} = this.state
            console.log(currentUser)
            const data = { userid : currentUser.user._id }
            console.log(data)
            let user = await getUsersFriend(data)
            this.setState({ userdetails: user });
            console.log(user)
        }catch(err){
            console.log(err)
        }
    }


    render(){
        const { currentUser ,isLoading,userdetails } = this.state;

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
                <h1>Messages</h1>
                <div>
                    <p>Users</p>
                    {' '}
                    <ul className="collection">
                        {userdetails.map((element) => {
                            return(
                                <div key={element._id}>
                                    <li>{element.username}{' '}<input 
                                    type="button" 
                                    id={element._id}
                                    value="MEssage"></input></li>
                                </div>
                        );
                        })
                    }
                    </ul>
                    {' '}
                </div>
                {' '}
                    <Link to="/dashboard">Dashboard</Link>
                {' '}
            </div>
        )
        }
    }
}