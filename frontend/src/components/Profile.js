import React, { Component } from 'react';
import '../App.css';
import logo from '../img/logo1.png';
import { Link,Redirect } from 'react-router-dom';
import UserService from "../services/userservice";
import { AddFreind} from '../services/SearchService';

export default class Profile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentUser:[],
            isLoading:false,
            userdetails:[],
            active_id: null,
            requestedIds: {},
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
        this.fetchallUsers(userid)
    }

    componentDidUpdate(prevProps,prevState){
        if(this.props.match.params.userid) {
            let userid = this.props.match.params.userid;
            userid=userid.slice(1)
            console.log('First this called');
            this.fetchUser(userid)
        }
    }

    async fetchUser(userid){
        try{
            console.log(userid)
            let user = await UserService.getUserById(userid)
            this.setState({ currentUser:user})
            let local=JSON.parse(localStorage.getItem('user'))
            console.log(local.user)
            local['user']=user 
            localStorage.setItem('user',JSON.stringify(local))
        }catch(err){
            console.log(err)
        }        
    }

    async fetchallUsers(userid){
        console.log(userid)
        try{
            let allusers = await UserService.getallUsers(userid)
            this.setState({userdetails:allusers})
            console.log(allusers)
        }
        catch(err){
            console.log(err)
        }
    }

    async handleFreindRequest(elementid){
        const {currentUser} = this.state;
        const curid = currentUser._id ;
        console.log(curid)
        const fid = elementid;
        this.setState(prevState =>({ 
          active_id: prevState.active_id === fid ? null : fid, // toggle active id
          requestedIds: {
            ...prevState.requestedIds,
            [fid]: fid, // add requested id
          },
        }))
        console.log(fid)
        const data = { 
          id: curid,
          fid:fid
        }
        if((JSON.parse(localStorage.getItem('user')).user.friendsList.some(item => item == elementid))){
          console.log(data.fid,elementid)
          return
        }else{
          const AddingFriendtoList = await AddFreind(data);
          console.log(AddingFriendtoList);
          const userdata = await UserService.getUser(curid);
          console.log(userdata);
          const user = JSON.parse(localStorage.getItem('user'));
          console.log(user.user.friendsList.push(fid));
          localStorage.setItem('user', JSON.stringify(user));
        }
      }

    render(){
        const { currentUser ,isLoading,userdetails } = this.state;
        const k=Object(currentUser.friendsList)
        console.log(currentUser)
        console.log(userdetails)
        

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
                <div className="profile">
                    <div className="navbar profile-nav">
                        <div className="navbar-nav profile-navbar-nav">
                            <div className="navbar-item profile-navbar-item ">
                            <img src={logo} alt="logo"
                                style={{height:'38px',width:'38px'}}></img>
                                <Link to="/dashboard" className="logo-link Profile-logo-link ">Dashboard</Link>
                            </div>
                            <div className="navbar-item profile-navbar-item">
                                <Link className="link" to="/login" onClick={this.logOut}><i class="fa fa-sign-out logout-btn" aria-hidden="true">LogOut</i></Link>
                            </div>
                        </div>
                    </div>
                    <h3>Users</h3>
               <div>
               </div>
                    <div className="profile-container">
                        <h1 className="header">User Profile</h1>
                        <div className="profile-body">
                            <div className="list-group profile-data">
                                <p className="list-group-item list-group-item-profile username text-left">
                                <strong className="text">Username:</strong>{currentUser.username}
                                </p>
                                {currentUser.bio &&
                                    <p className="list-group-item list-group-item-profile text-left">
                                        <strong className="text bio-text">Bio:</strong> 
                                        {currentUser.bio}
                                    </p>
                                }
                                <p className="list-group-item list-group-item-profile text-left">
                                    <strong className="text">Id:</strong>{" "}
                                    {currentUser._id}
                                </p>
                                <p className="list-group-item list-group-item-profile text-left">
                                    <strong className="text">Email:</strong>{" "}
                                    {currentUser.email}
                                </p>
                                <p className="list-group-item list-group-item-profile text-left">
                                    <strong className="text">Friends:</strong>{' '}{ k.length }
                                </p>
                            </div>
                        </div>
                        {(currentUser._id==UserService.getCurrentUser().user._id) &&
                        <div >
                            <button className="btn-primary edit-btn"><Link className="link" to={`/dashboard/editprofile/:${currentUser._id}`}>Edit</Link></button>
                        </div>
                        }
                    </div>
                    <div className="suggestion">
                       <h3 className="suggestion-title">Suggestion</h3>
                        <ul className="list-group">
                        {userdetails.map((element) => { 
                            if((JSON.parse(localStorage.getItem('user')).user.friendsList.some(item => item == element._id))){
                                console.log((JSON.parse(localStorage.getItem('user')).user.friendsList.some(item => item == element._id)))
                                return(
                                <div key={element._id} className="user-list-profile">
                                <li className="list-group-item suggestion-username">{element.username}<input id={element._id} type="button" className="list-group-btn" value="Friends" style = {{backgroundColor:"#17a2b8"}}></input></li>
                                </div>
                                )
                            }else{
                                return(
                                <div key={element._id} className="user-list-profile">
                                    <li className="list-group-item suggestion-username">{element.username}<input 
                                    type="button" 
                                    id={element._id} 
                                    className="list-group-btn"
                                    onClick={this.handleFreindRequest.bind(this,element._id )} 
                                    value={this.state.requestedIds[element._id] ? 'Friends' : 'Add Friend'}
                                    style = {{backgroundColor: ( element._id === this.state.active_id ?  '#17a2b8' : "gray")}}></input></li>
                                </div>
                                );
                            }
                        })}
                    </ul>
                </div>
                </div>
            );
        }
    }
}