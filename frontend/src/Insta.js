import React,{ Component } from 'react';
import axios from "axios" ;

export default class Insta extends Component {
    componentDidMount = () => {
        axios.get("/me").then(response => {
            console.log(response);
        });
    };
    
    render() {
        return(
            <div>
                <h1>Hello</h1>
            </div>
        )
    }
}