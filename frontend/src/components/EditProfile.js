import React, { Component } from 'react';
import '../App.css' ;
import { Link,Redirect } from 'react-router-dom';
import UserService from "../services/userservice";

export default class EditProfile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentUser:[],
            UpdateUser:[],
            isLoading:false,
            username:UserService.getCurrentUser().user.username,
            bio:UserService.getCurrentUser().user.bio,
            update:false
        };
        this.logOut = this.logOut.bind(this);
        this.updateuser = this.updateuser.bind(this);
        this.onTextboxChangeUsername = this.onTextboxChangeUsername.bind(this);
        this.onTextboxChangeBio = this.onTextboxChangeBio.bind(this);
    }

    logOut() {
        UserService.logout()
    } 

    onTextboxChangeUsername(event) {
        let newvalue=event.target.value
        this.setState({
            username: newvalue,
        });
    }

    onTextboxChangeBio(event) {
        let newbiovalue=event.target.value
        this.setState({
            bio: newbiovalue,
        });
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

    async updateuser(){
        let data = {
            username:this.state.username,
            bio:this.state.bio
        }
        try{
            let userid = this.props.match.params.userid;
            userid=userid.slice(1)
            console.log(userid)
            let updateuser = await UserService.update(userid,data)
            this.setState({ 
                UpdateUser:updateuser,
                update:true
            })
            this.setState({
                bio:this.state.UpdateUser.user.bio
            })
        }catch(err){
            console.log(err)
        }
    }

    render(){
        const { currentUser ,isLoading,bio,username,UpdateUser,update } = this.state;
        

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
                <div className="editprofile">
                    <div className="navbar profile-nav">
                        <div className="navbar-nav profile-navbar-nav">
                            <div className="navbar-item profile-navbar-item ">
                                <Link to="/dashboard" className="logo-link Profile-logo-link ">Dashboard</Link>
                            </div>
                            <div className="navbar-item profile-navbar-item">
                                <Link className="link" to="/login" onClick={this.logOut}><i class="fa fa-sign-out logout-btn" aria-hidden="true">LogOut</i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="editprofile-container"> 
                        <h1 className="header"> Edit Profile</h1>
                        <div className="editprofile-body">
                            <div className="input-group" >
                                <label className="label">Username:</label>
                                <input 
                                className="form-control editprofile-input"
                                type="text"
                                value={this.state.username}
                                onChange={this.onTextboxChangeUsername}>
                                </input>
                            </div>
                            <div className="input-group" >
                                <label className="label">Bio:</label>
                                <input 
                                className="form-control editprofile-input"
                                type="text"
                                value={this.state.bio}
                                onChange={this.onTextboxChangeBio}
                                ></input>
                            </div>
                            <div className="button-group">
                                <button className="btn-danger cancel-btn"><Link className="cancel-link" to={`/dashboard/profile/:${currentUser._id}`}>Cancel</Link></button>
                                <button className="btn-primary update-btn" onClick={this.updateuser}>Update</button>
                            </div>
                            {!update ? <div></div> : <Redirect  to={`/dashboard/profile/:${currentUser._id}`} />}
                        </div>
                    </div>
                </div>
            );
        }
    }
}