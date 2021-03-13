import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import UserService from "../services/userservice";
import {getUsersFriend} from "../services/messageservice";
import io from "socket.io-client";
const SOCKET_IO_URL = "http://localhost:4000/";

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
            // console.log("connection")
        })
        // this.socket.emit('send',{username:this.username,message:this.message,senderusername:currentUser.user.username});
        this.socket.on('sended',(data)=>{ 
            console.log('component did mount',data)
            // if(data.message.length>0){
                this.setState({messages:[...this.state.messages,data]})
            // }
            
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
            // console.log(user)
        }catch(err){
            console.log(err)
        }
    }

    showMessageSpace(elementusername){
        this.setState({
            show: true,
            username:elementusername
        });
    }

    onTextboxChangeMessage(e){
        this.setState({ message:e.target.value})
    }

    SendMessage(username,message,senderusername){
        const {messages} =this.state
        if(this.state.socketConnected){
            console.log('if condition test',username,message,senderusername )
            this.socket.emit('send',{username,message,senderusername});
            console.log('condition username',`${username}`,  )
            this.socket.on(`${username}`, (d)=>{
                    this.setState({messages:[...messages,d]})
            })
            // this.socket.on("new_msg",data=> {
            //     console.log("private",data)
            //     this.setState({messages:[...messages,data]})
            //  })
            // this.socket.on("message", (d) => {
            //     this.socket.on(`${this.username}`, (d)=>{
            //         console.log('test from receive username', d)
            //         this.setState({messages:[...messages,d]})
            //     })
            // });
        }
        this.setState( { message:'' })
    }

    

    render(){
        const { currentUser ,isLoading,userdetails,message,messages} = this.state;
        console.log(messages)
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
                                    <li><Link to={`/dashboard/profile/:${element._id}`}>{element.username}</Link>{' '}<input 
                                    type="button" 
                                    id={element._id}
                                    value="Message"
                                    onClick={this.showMessageSpace.bind(this,element.username)} ></input></li>
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
                <div>
                {
                    this.state.show &&
                    (<div>
                        <h2>Username : {' '}{this.state.username}</h2>
                        {' '}
                        <div>
                            <h3>Body</h3>
                            <div>
                                <ul>
                                {/* { this.state[`${this.state.username}`]?.map((msg,key) =>{ */}
                                {messages.length > 0 && messages.map((msg,key) =>{
                                    return(<li key={key}>{msg.senderusername}<span>{' '}{msg.message}</span></li>);
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
                            value={message}
                            onChange={this.onTextboxChangeMessage}
                            ></input>
                            <button className='btn btn-info' onClick={this.SendMessage.bind(this,this.state.username,this.state.message,currentUser.user.username )}>Send</button>
                        </div>
                        {' '}
                    </div>)
                    }
                </div>
            </div>
        )
        }
    }
}