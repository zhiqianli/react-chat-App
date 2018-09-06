import React, { Component } from 'react'
import { connect } from "react-redux"
import { List, Badge } from "antd-mobile"
@connect(state => state, )

export default class Msglist extends Component {

  getLast(arr) {
    return arr[arr.length - 1]
  }
 

  render() {
    const Item = List.Item
    const Brief = Item.Brief
    const userId = this.props.user._id
    const userInfo = this.props.chat.users

    const msgList = {}
    this.props.chat.chatMsg.forEach(v => {
      msgList[v.chatId] = msgList[v.chatId] || []

      msgList[v.chatId].push(v)
    });
    // console.log(msgList)//生成聊天的字典
    const Msg = Object.values(msgList).sort((a,b)=>{
      const a_last = this.getLast(a).creat_time
      const b_last = this.getLast(b).creat_time
      return  b_last-a_last
    })//将字典变成数组
  
    return (
      <div>
        {Msg.map(v => {
          const lastItem = this.getLast(v)
          const targetId = v[0].from === userId ? v[0].to : v[0].from
          const userName = userInfo[targetId] ? userInfo[targetId].userName : ''
          const avatar = userInfo[targetId] ? userInfo[targetId].avatar : ''
          const unReadNum = v.filter(v => !v.read && v.to === userId).length
          return (
            <List key={lastItem.creat_time}>
              <Item 
                    extra={<Badge text={unReadNum}></Badge>} 
                    thumb={require(`../../component/img/${avatar}.png`)} 
                    arrow="horizontal"
                    onClick={()=>{
                      this.props.history.push(`/chat/${targetId}`)
                    }}
                    >
                {lastItem.content}
                <Brief>{userName}</Brief>
              </Item>
            </List>
          )
        })}


      </div>
    )
  }
}
