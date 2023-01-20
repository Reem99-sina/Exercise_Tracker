const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    username:String,
    logs:[{type:mongoose.Schema.Types.ObjectId,ref:'exericess'}]
})
const usermodel=mongoose.model("users",userSchema)
module.exports=usermodel