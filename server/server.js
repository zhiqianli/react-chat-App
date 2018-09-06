const express = require("express")
const userRouter = require("./user")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
//新建app
const app =express() 
const server  = require("http").Server(app)
const io = require("socket.io")(server)

const model = require("./model")
 
const Chat = model.getModel("chat")


io.on('connection',function (socket) {
    socket.on('sendmsg',function (data) { 
        const {to,from ,msg} =data
        const chatId = [from,to].sort().join("_")
       Chat.create({chatId,from,to,content:msg},function (err,doc) {
           io.emit("recvmsg",Object.assign({},doc._doc,))
           
       })
 
     })
})


app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
//监听端口
server.listen(9093,()=>{
    console.log("appSever Is Running...")
})


