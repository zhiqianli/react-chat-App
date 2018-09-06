const DB_URL = "mongodb://127.0.0.1:27017/imooc"
const mongoose = require("mongoose")

mongoose.connect(DB_URL) 
mongoose.connection.on("connected",function(){
    console.log("mongo connect succees!")
})

const models = {
    user:{
        "userName":{type:String,"require":true},
        "password":{type:String,"require":true},
        "type":{type:String,"require":true},
        "avatar":String,
        "skills":String,
        "job":String,
        "company":String,
        "money":String,
    },
    chat:{
        "chatId":{type:String,require:true},
        "from":{type:String,require:true},
        "to":{type:String,require:true},
        "read":{type:Boolean,require:true,default:false},
        "content":{type:String,require:true,default:''},
        "creat_time":{type:Number,default:Date.now},
    }
}

for(let m in models){
  mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports= {
    getModel:function (name) { 
        return mongoose.model(name)
     }
}