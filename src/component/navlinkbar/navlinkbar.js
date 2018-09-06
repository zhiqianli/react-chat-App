import React, { Component } from 'react'
import propTypes from 'prop-types'
import { TabBar  } from "antd-mobile"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux";
@connect(state=>state.chat )
@withRouter
export default class NavLinkBar extends Component {
    static propTypes = {
        data: propTypes.array.isRequired
    }
    render() {
        const navList = this.props.data.filter(v => !v.hide)
        const pathname = this.props.location.pathname

        return (

            <TabBar>
                {
                    navList.map(v => (
                        <TabBar.Item
                            badge={v.path==="/msg"? this.props.unRead:0}
                            key={v.path}
                            title={v.title}
                            icon={{ uri: require(`./img/${v.icon}.png`) }}
                            selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
                            selected={pathname === v.path}
                            onPress={() => {
                                this.props.history.push(v.path)
                            }}
                        ></TabBar.Item>
                    ))

                }

            </TabBar>

        )
    }
}
