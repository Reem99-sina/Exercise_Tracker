const mongoose=require("mongoose")
module.exports.connectdb=()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/descriptionUser").then(()=>{
        console.log("done connect db")
    }).catch((error)=>{
        console.log(" not done connect db",error)

    })
}