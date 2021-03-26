import React, { Component } from 'react';
import '../App.css';
import logo from '../img/logo1.png';
import { Link,Redirect } from 'react-router-dom';
import UserService from "../services/userservice";
import {getUsersFriend} from "../services/messageservice";
import io from "socket.io-client";
const SOCKET_IO_URL = "http://localhost:4000";

export default class Messages extends Component {
    constructor(props){
        super(props)
        this.socket = io(SOCKET_IO_URL)
        this.state = {
            currentUser: UserService.getCurrentUser(),
            isLoading:false,
            userdetails:[],
            show:false,
            username:'',
            message:'',
            senderusername:'',
            socketConnected:false,
            messages:[]
        };
        this.onTextboxChangeMessage = this.onTextboxChangeMessage.bind(this)
    }

    componentDidMount(){
        const {currentUser}=this.state
        this.fetchUser()
        this.socket.on('connect',()=> {
            this.setState({ socketConnected : true})
            this.socket.on('sended',(data)=>{ 
                console.log('component did mount',data)
                console.log(this.state.username==data.sendername)
                // if(this.state.username==data.username){
                    console.log(this.state.username,data.username,data.senderusername)
                    this.setState({messages:[...this.state.messages,data]})
                    console.log(this.state.messages)
                // }
                
            })
        })
        
    }

    async fetchUser(){
        try{
            const {currentUser} = this.state
            console.log(currentUser)
            const data = { userid : currentUser.user._id }
            console.log(data)
            let user = await getUsersFriend(data)
            this.setState({ userdetails: user });
        }catch(err){
            console.log(err)
        }
    }

    showMessageSpace(elementusername){
        this.setState({
            show: true,
            username:elementusername
        });
        console.log(this.socket.id)
        this.socket.emit('send',{username:elementusername });
    }

    onTextboxChangeMessage(e){
        this.setState({ message:e.target.value})
    }

    SendMessage(username,message,senderusername){
        const {messages} =this.state
        if(this.state.socketConnected){
            console.log('if condition test',username,message,senderusername )
            console.log('condition username',`${username}`,  )
            console.log(this.socket.id)
            this.socket.emit('sended',{username,message,senderusername });
        }
        this.setState( { message:'' })
    }

    

    render(){
        const { currentUser ,isLoading,userdetails,message,messages} = this.state;
        console.log(messages)
        console.log(userdetails.message)
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
            <div className="message-container">
                <div>
                    <div className="navbar navbar-inverse">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <img src={logo} alt="logo"
                                style={{height:'45px',width:'45px',marginBottom:'8px'}}></img>
                                <Link to="/dashboard" className="logo-link">Ping</Link>
                            </div>
                            <div>
                                <Link className="link" to={`/dashboard/profile/:${currentUser.user._id}`}>Profile</Link>
                            </div>
                            <div>
                                <Link className="link" to="/login" onClick={this.logOut}><i class="fa fa-sign-out" aria-hidden="true"></i>LogOut</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className="header">Message Space</h1>
                <div className="user-messages-container">
                    <div className="row">
                        <div className="users-list col-xs-6">
                            <p className="friends">Friends</p>
                            {userdetails.message!="error" &&
                                <ul className="list-group">
                                    {userdetails?.map((element) => {
                                        return(
                                            <div key={element._id} className="list-group-div">
                                                <li className="list-group-item list-group-username"><Link to={`/dashboard/profile/:${element._id}`}>{element.username}</Link>{' '}<input 
                                                type="button" 
                                                id={element._id}
                                                value="Message"
                                                className="message-btn"
                                                onClick={this.showMessageSpace.bind(this,element.username)} ></input></li>
                                            </div>
                                        );
                                    })
                                    }
                                </ul>
                            }
                        </div>
                        <div className="message-space-div col-xs-8">
                {
                    this.state.show &&
                    (<div className="message-space">
                        <h3 className="header-sendername">sending message to : <strong className="sendername">{this.state.username}</strong></h3>
                        {' '}
                        <div>
                            <div>
                                <ul>
                                {messages.length > 0 && messages.map((msg,key) =>{
                                    return(
                                    <div>
                                        <strong className="sendername"
                                        style ={{marginLeft:(this.state.username === msg.senderusername ? '0' : '2vw'),
                                                marginRight:(this.state.username === msg.senderusername ? '60vw' : '0')}}>{msg.senderusername}</strong>
                                        <li 
                                        key={key}
                                        className="list-group-item message-li"
                                        style = {{backgroundColor: ( this.state.username === msg.senderusername ?  'lightgray' : "lightgreen"),
                                                textAlign:(this.state.username === msg.senderusername ? 'left' : 'right'),
                                                marginLeft:(this.state.username === msg.senderusername ? '0' : '30vw')}}
                                        >
                                        <span>{' '}{msg.message}</span>
                                        </li>
                                    </div>
                                    );
                                })
                                }
                                </ul>
                            </div>
                        </div>
                        {' '}
                        <div>
                            {' '}
                            <input 
                            type="text"
                            name="message"
                            className="send-input form-control-warning"
                            value={message}
                            onChange={this.onTextboxChangeMessage}
                            ></input>
                            <button className='send-btn btn-info' onClick={this.SendMessage.bind(this,this.state.username,this.state.message,currentUser.user.username )}><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                        </div>
                        {' '}
                    </div>)
                    }
                    </div>
                    </div>
                </div>
            </div>
        )
        }
    }
}