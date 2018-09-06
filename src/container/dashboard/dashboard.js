import React, { Component } from 'react'
import { connect } from "react-redux"
import { NavBar } from "antd-mobile"
import NavLinkBar from "../../component/navlinkbar/navlinkbar"
import { Switch, Route } from "react-router-dom";
import "./dashboard.css"
import Boss from "../boss/boss"
import Msg from "../msglist/msglist"
import Genius from "../genius/genius"
import Me from "../../component/me/me"

import { getMsgList,  recvMsg } from "../../redux/chat.redux"
 

@connect(state => state, { getMsgList, recvMsg })

 
class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentHeight: document.documentElement.clientHeight - 105
        }
    }

    componentDidMount = () => {
      if(!this.props.chat.chatMsg.length){
          this.props.getMsgList()
          this.props.recvMsg()
      }
    }
    

    
    render() {
        const user = this.props.user
        const pathname = this.props.location.pathname
        const navList = [
            {
                path: "/genius",
                text: 'boss',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type === "boss"
            },
            {
                path: "/boss",
                text: 'genius',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === "genius"
            },
            {
                path: "/msg",
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg,
            },
            {
                path: "/me",
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: Me,
            }
        ]
        return (
            <div>
                <NavBar className="fixed-nav" mode="dark">
                    {
                        navList.find(v => v.path === pathname).title
                    }
                </NavBar>
                <div style={{ height: `${this.state.contentHeight}px`, padding: "5px", marginTop: "45px" }}>
                    <Switch>
                        {
                            navList.map(v => (
                                <Route key={v.path} path={v.path} component={v.component} />
                            ))
                        }
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>


        )
    }
}

export default Dashboard;
