import axios from "axios";
import io from "socket.io-client"
const socket = io('ws://localhost:9093')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
    chatMsg: [],
    unRead: 0,users:{}

}
export const chat = (state = initState, action) => {
    switch (action.type) {
        case MSG_LIST:
            return { ...state,
                users:action.payload.users,
                chatMsg: action.payload.data,
                unRead: action.payload.data.filter(v => !v.read&&v.to===action.payload.userId).length
            }
        case MSG_RECV:
            const n = action.payload.to===action.userId?1:0
            return{
                ...state,chatMsg:[...state.chatMsg,action.payload],unRead:state.unRead +n
            }
        case MSG_READ:
            const {from ,num} = action.payload
            return{...state,
                unRead:state.unRead -num,
                chatMsg:state.chatMsg.map(v=>({...v,read:v.from===from? true:v.read}))
            
            }

        default:
            return state
    }

}

const msgList = (data,users,userId) => {
    return {
        type: MSG_LIST,
        payload: {data,users,userId}
    }
}
const msgRecv=(data,userId) =>{
    return {
        type:MSG_RECV,
        payload:data,
        userId
    }
}

const msgRead=({num,userId,from}) =>{
    return {
        type:MSG_READ,
        payload:{num,userId,from},
        userId
    }
}
export const recvMsg = ()=>{
    return (dispatch,getState) =>{
        socket.on("recvmsg",function (data) { 
            let userId = getState().user._id
            dispatch(msgRecv(data,userId))
         })
    }
}

export const sendMsg =({to,from,msg}) =>{
    return dispatch=>{
        socket.emit('sendmsg', {to,from,msg})
    }
}

export const readMsg= (from) =>{
return (dispatch,getState)=>{
    axios.post("/user/readMsg",{from}).then((res)=>{
        if (res.status === 200 && res.data.code === 0) {
            let userId = getState().user._id
            dispatch(msgRead({userId,from,num:res.data.num}))
        }
    })
}
}

export const getMsgList = () => {
    return (dispatch,getState) => {
        axios.get("/user/getMsgList").then((res) => {
            if (res.status === 200 && res.data.code === 0) {
                let userId = getState().user._id
                dispatch(msgList(res.data.data,res.data.users,userId))
            }

        })
    }
}