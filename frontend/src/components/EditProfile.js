import React, { Component } from 'react';
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
                    <h1> Edit Profile</h1>
                    <div className="form">
                        <div className="input-group" >
                            <label>Username:</label>
                            <input 
                            className="form-control"
                            type="text"
                            value={this.state.username}
                            onChange={this.onTextboxChangeUsername}>
                            </input>
                        </div>
                        <div className="input-group" >
                            <label>Bio:</label>
                            <input 
                            className="form-control"
                            type="text"
                            value={this.state.bio}
                            onChange={this.onTextboxChangeBio}
                            ></input>
                        </div>
                        <div>
                            <button className="btn-secondary"><Link className="link" to={`/dashboard/profile/:${currentUser._id}`}>Cancel</Link></button>
                            <button className="btn-primary" onClick={this.updateuser}>Update</button>
                        </div>
                        {' '}
                        {!update ? <div></div> : <Redirect  to={`/dashboard/profile/:${currentUser._id}`} />}
                        {' '}
                    </div>
                </div>
            );
        }
    }
}