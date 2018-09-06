import React, { Component } from 'react'
 
// import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import { connect } from "react-redux";
import { getUserList } from "../../redux/chatuser.redux";
import Usercard from "../../component/usercard/usercard"

@connect(state => state.chatuser, { getUserList })

export default class Boss extends Component {
   
    componentDidMount = () => {
        this.props.getUserList("genius")
    }

    render() {
        return (
            <div>
                {/* {
                    this.props.userList.map(v => {
                        return v.avatar ? (
                            <WingBlank key={v._id} size="lg">

                                <Card  >
                                    <Card.Header
                                        title={v.userName}
                                        thumb={require(`../../component/img/${v.avatar}.png`)}
                                        extra={<span>{v.job}</span>}
                                    />
                                    <Card.Body>
                                        <div>{v.skills}</div>
                                    </Card.Body>
                                </Card>
                                <WhiteSpace size="lg" />
                            </WingBlank>
                        ) : null
                    })
                } */}
                  <Usercard  userList={this.props.userList}></Usercard>
            </div>
        )
    }
}
