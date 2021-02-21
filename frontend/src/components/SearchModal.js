import React, { Component } from 'react';
import { SearchUser } from '../services/SearchService';
import Modal from 'react-bootstrap/Modal'

class SearchModal extends Component {
  constructor(props){
    super(props);
    this.state = {
        show: false,
        search: '',
        userdetails:[]
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onTextboxChangeSearch = this.onTextboxChangeSearch.bind(this);
}

handleShow() {
    this.setState({ show: true })
}
handleClose(){
    this.setState({ show: false })
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


render() {
    let {search,userdetails}= this.state;
    return (
       <div>
          <Modal show={this.state.show} onHide={this.handleClose} 
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
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
                  {userdetails.map((element,i) => {
                    return(
                      <li key={i}>{element.username}</li>
                    );
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