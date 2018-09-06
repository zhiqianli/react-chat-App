const express = require("express")
const Router = express.Router()
const model = require("./model")
const User = model.getModel("user")
const Chat = model.getModel("chat")
const utility= require("utility")
const _filter = {password:0,__v:0}


Router.get("/removeChat",(req,res)=>{
    Chat.remove({},function (err,doc) { 
        console.log(doc)
        return res.json({data:doc,code:0})
     })
})
Router.get('/getMsgList',(req,res)=>{
    let {userid} = req.cookies

    User.find({},(err,doc)=>{
        let users ={}
        doc.forEach(v=>{
            users[v._id]={userName:v.userName,avatar:v.avatar}
        })
        
        Chat.find({"$or":[{from:userid},{to:userid}]},(err,doc)=>{
        if(!err){
           return res.json({code:0,data:doc,users:users})
        }
    })
    })

    
})

Router.get("/list", (req, res) => {
     let {type} =  req.query
    // User.remove({},function (req,res) {  })
    User.find({type}, _filter,function (err,doc) { 

        if(err){
            return res.json({code:1,msg:"服务的错误"})
        } 
             return res.json({data:doc,code:0})
 })
})

//注册
Router.post("/register",function(req,res){
    const {userName,password,type} = req.body
    User.findOne({userName},function (err,doc) {
        if(doc){
            return res.json({code:1,msg:'用户名已存在'})
        }

        const userSave = new User({userName,password:md5Psw(password),type})
        userSave.save(function (err,doc) { 
            if(err){
              return res.json({code:1,msg:"服务的错误"})
          } 
        
          res.cookie("userid",doc._id)
          return res.json({code:0,type:doc.type})
       })
      
      })
})
//登录
Router.post("/login",function(req,res){
    const {userName,password} = req.body
    User.findOne({userName,password:md5Psw(password)},_filter,function (err,doc) {
         
        if(err){
            return res.json({code:1,msg:'用户名或者密码错误'})
        }
        
        res.cookie("userid",doc._id)
        return res.json({code:0,msg:'登录成功',data:doc})
      })
})

Router.get('/info', (req, res) => {
   const {userid} = req.cookies
   if(!userid){
       return res.json({code:1})
   }
   User.findOne({_id:userid},_filter,function (err,doc) {
       if(err){
           return res.json({code:1,msg:"服务的错误"})
       }
       if(doc){
           return res.json({code:0,data:doc})
       }
     })
})

//完善信息

Router.post("/update",(req,res)=>{
    const userid = req.cookies.userid
    (userid)
    if(!userid){
        return res.json.dumps({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,(err,doc)=>{
        const data = Object.assign({},{user:doc.user,type:doc.type},body)
        return res.json({code:0,data:data})
    })


})
Router.post("/readMsg",(req,res)=>{
    const userid = req.cookies.userid
    const {from} =req.body   
    Chat.update(
        {from,to:userid},
         {"$set":{"read":true}}, //默认设置第一条
         {"multi":true},
        function (err,doc) {
            console.log(doc)
            if(!err){
                return res.json({code:0,num:doc.nModified})
            }
            return res.json({code:1,msg:"更新未读失败"})
            
          }
    
    ) 
})

function  md5Psw(psw) { 
return utility.md5("zhonghuaren_minggongheguo!@#"+psw)
 }

module.exports = Router