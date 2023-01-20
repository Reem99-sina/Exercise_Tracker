const mongoose=require("mongoose")
const exericesSchema=mongoose.Schema({
  description: String,
  duration: Number,
  date: Date
})
const exericesmodel=mongoose.model("exericess",exericesSchema)
module.exports=exericesmodel