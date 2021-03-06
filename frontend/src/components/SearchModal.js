import React, { Component } from 'react';
import { AddFreind, SearchUser } from '../services/SearchService';
import UserService from "../services/userservice";
import Modal from 'react-bootstrap/Modal';

class SearchModal extends Component {
  constructor(props){
    super(props);
    this.state = {
        show: false,
        search: '',
        userdetails:[],
        active_id: null,
        requestedIds: {},
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onTextboxChangeSearch = this.onTextboxChangeSearch.bind(this);
}

handleShow() {
    this.setState({ show: true })
}

handleClose(){
    this.setState({ show: false,search:'' })
}

onTextboxChangeSearch(event) {
  const { value } = event.target;
  this.setState({
    search: value // <-- (1) update state
  });
}

SearchForUser = async () => { // <-- (3) refactored search function
  const { search, userdetails } = this.state;
  const data = { username: search };

  const  user  = await SearchUser(data);
  this.setState({ userdetails: user.user });
}

componentDidUpdate(prevProps, prevState) {
  if (prevState.search !== this.state.search) {
    this.SearchForUser(); // <-- (2) search state updated, do search for user
  }
}

async handleFreindRequest(elementid){
  const {currentUser} = this.props;
  const curid = currentUser.user._id ;
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
  const AddingFriendtoList = await AddFreind(data);
  console.log(AddingFriendtoList);
  const userdata = await UserService.getUser(curid);
  console.log(userdata);
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user.user.friendsList.push(fid));
  localStorage.setItem('user', JSON.stringify(user));
}


render() {
    let {search,userdetails}= this.state;
    const {currentUser} = this.props;
    return (
       <div>
          <Modal show={this.state.show} onHide={this.handleClose} 
          >
             <Modal.Header closeButton>
               <Modal.Title>
                 <input 
                  type="text" 
                  placeholder="Search.."
                  value={search}
                  onChange={this.onTextboxChangeSearch}
                 ></input>
               </Modal.Title>
             </Modal.Header>
             <Modal.Body>
               <h3>Users</h3>
               <div>
                <ul className="collection">
                  {userdetails.map((element) => {
                    if(currentUser.user.username !== element.username){
                      if(JSON.parse(localStorage.getItem('user')).user.friendsList.some(item => item)){
                        <div key={element._id}>
                          <li>{element.username}<input id={element._id} type="button" value="Added"></input></li>
                        </div>
                      }else{
                        return(
                          <div key={element._id}>
                            <li>{element.username}{' '}<input 
                            type="button" 
                            id={element._id} 
                            onClick={this.handleFreindRequest.bind(this,element._id )} 
                            value={this.state.requestedIds[element._id] ? 'Added' : 'Add Friend'}
                            style = {{backgroundColor: ( element._id === this.state.active_id ?  'yellow' : "white")}}></input></li>
                          </div>
                        );
                      }
                    }else{
                      return(
                        <div key={element._id}>
                          <li>{element.username}</li>
                        </div>
                      );
                    }
                  })}
                </ul>
               </div>
             </Modal.Body>
          </Modal>
        </div>
    )
  }
}
export default SearchModal;