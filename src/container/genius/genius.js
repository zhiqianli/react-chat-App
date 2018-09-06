import React, { Component } from 'react'
 
import { connect } from "react-redux";
import { getUserList } from "../../redux/chatuser.redux";
import Usercard from "../../component/usercard/usercard"

@connect(state => state.chatuser, { getUserList })

export default class Genius extends Component {
     
    componentDidMount = () => {
        this.props.getUserList("boss")
    }

    render() {
        return (
            <div>
               
               <Usercard  userList={this.props.userList}></Usercard>
            </div>
        )
    }
}
