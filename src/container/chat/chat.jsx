import React, { Component } from 'react'
import { List, InputItem, NavBar, Icon } from "antd-mobile"
import { connect } from "react-redux"
import { sendMsg, getMsgList, recvMsg,readMsg } from "../../redux/chat.redux"
import { getChatId } from "../../util/util"
@connect(state => state, { sendMsg, getMsgList, recvMsg ,readMsg})


export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.handSubmit = this.handSubmit.bind(this)
    this.state = {
      text: '',
      msg: []
    }
  }


  componentDidMount() {
    if (!this.props.chat.chatMsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }

  componentWillUnmount = () => {
    const to = this.props.match.params.userName
   this.props.readMsg(to)
  }
  

  handSubmit() {
    // socket.emit('sendmsg', { text: this.state.text })
    const from = this.props.user._id
    const to = this.props.match.params.userName
    const msg = this.state.text

    this.props.sendMsg({ from, to, msg })
    this.setState({ text: '' })

  }

  render() {

    const userId = this.props.match.params.userName
    const Item = List.Item
    const users = this.props.chat.users

    if (!users[userId]) {
      return null
    }
    const chatid = getChatId(userId, this.props.user._id)
    const ChatMsgs = this.props.chat.chatMsg.filter(v => v.chatId === chatid)
    // console.log(ChatMsgs)
    return (
      <div id="chat-page">
        <NavBar mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          {users[userId].userName}
        </NavBar>
        {
          ChatMsgs.map(v => {
            const avatar = require(`../../component/img/${users[v.from].avatar}.png`)
            return v.from === userId ? (
              <List key={v._id}>
                <Item thumb={avatar}> {v.content}</Item>
              </List>
            ) : (
                <List key={v._id}>
                  <Item extra={<img alt={v.avatar} src={avatar} />} className="chat-me"> {v.content}</Item>
                </List>
              )
          })
        }

        <div className='stick-footer'>
          <List>
            <InputItem placeholder='请输入信息'
              value={this.state.text}
              onChange={v => {
                this.setState({ text: v })
              }}
              extra={<span onClick={this.handSubmit}> 发送</span>}
            >

            </InputItem>
          </List>
        </div>
      </div>
    )
  }
}
