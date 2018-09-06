


import React, { Component } from 'react'
import { Result, WhiteSpace, List, Modal } from "antd-mobile"
import { connect } from "react-redux"
import Cookie from "browser-cookies"
import {Redirect} from "react-router-dom"
import { logoutSubmit } from "../../redux/auth.redux"
@connect(state => state.user, { logoutSubmit })

export default class Me extends Component {
    constructor(props){
        super(props)
        this.logout=this.logout.bind(this)
    }

    logout() {
        const Alert = Modal.alert
        Alert('提示', '确认退出登录？', [
            { text: '取消', onPress: () => { return } },
            {
                text: "确认", onPress: () => {
                     Cookie.erase('userid')
                     this.props.logoutSubmit()
                }
            },
        ])

    }

    render() {
        const props = this.props

        const Item = List.Item
        console.log(props)
        return props.userName ? (
            <div>

                <Result
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{ width: "25px" }} className="spe am-icon am-icon-md" alt="" />}
                    title={props.userName}
                    message={props.job}
                />
                <WhiteSpace />

                <List renderHeader={() => '资料'} className="my-list">
                    {props.skills ? <Item multipleLine>技能：{props.skills}</Item> : null}
                    {props.msg ? <Item multipleLine>详情:{props.msg}</Item> : null}
                </List>
                <WhiteSpace />
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>
        ) : <Redirect to={props.redirectTo}/> 
    }
}

