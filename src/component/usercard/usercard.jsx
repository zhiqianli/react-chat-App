import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import {withRouter} from "react-router-dom"
@withRouter
export default class Usercard extends Component {

    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    constructor(props){
        super(props) 
        this.handleClick= this.handleClick.bind(this)
    }

    handleClick (v) {
        this.props.history.push(`/chat/${v._id}`)
    }
    render() {
        return (
            <div>
            {
                this.props.userList.map(v => {
                    return v.avatar ? (
                        <WingBlank key={v._id} size="lg">

                            <Card onClick = {()=>this.handleClick(v)}>
                                <Card.Header
                                    title={v.userName}
                                    thumb={require(`../../component/img/${v.avatar}.png`)}
                                    extra={<span>{v.job}</span>}
                                />
                                <Card.Body>
                                    <div> 技能要求：{v.skills} </div>
                                    <div> 薪资:{v.money} </div>
                                    
                                   <div> {v.type==="boss"?v.company:null}  </div> 
                                </Card.Body>
                            </Card>
                            <WhiteSpace size="lg" />
                        </WingBlank>
                    ) : null
                })
            }
        </div>
        )
    }
}