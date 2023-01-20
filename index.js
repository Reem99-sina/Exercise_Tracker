const express=require("express")
const mongoose=require("mongoose")
const app=express()
const path=require("path")
const connect = require("./connect")
const bodyParser = require('body-parser');
const usermodel = require("./module/user.module")
const exericesmodel = require("./module/exerices")
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('strictQuery', false);
connect.connectdb()
app.use("/index.html",express.static(path.join(__dirname,"./index.html")))
app.use("/style.css",express.static(path.join(__dirname,"./style.css")))
app.post("/api/users",async(req,res)=>{
    const{username}=req.body
    const newUser=new usermodel({username})
    const userFirst=await newUser.save()
    res.json(userFirst)
})
app.post("/api/users/:id/exercises",async(req,res)=>{
    const newdate=new Date()
    const months=["January","February","March","April","May","June","July","August","September","October","November","December"]
    const resultDate=new Date(newdate.getFullYear()+"-"+months[newdate.getMonth()]+"-"+newdate.getDate())
    const {description,duration,date,_id}=req.body
  const selectuser=await usermodel.findById(_id)
  const newExerices=new exericesmodel({
    description,
    duration,
    date:date?new Date(date):resultDate
  })
  const result=await newExerices.save()
  const resulrLolt=await usermodel.findByIdAndUpdate(_id,{$push:{logs:result}})
    res.json({description:result.description,
      duration:result.duration,
      date:result.date,username:selectuser.username,_id:selectuser._id})
  
})
app.get("/api/users/:id/logs",async(req,res)=>{
  const {from,to,limit}=req.query
  const {id}=req.params
  const count=1
  if(from&&to){
    const selectuser=await usermodel.findById(id).populate({path:"logs",match:{date:{$gte:new Date(from),$lte:new Date(to)}},select: '-_id description duration date',options: {
      limit: limit?limit:5} }).select("username")
  res.json({selectuser,count:selectuser.logs.length,message:"form to limit"})

  }else{
    const selectuser=await usermodel.findById(id).populate({ path: 'logs', select: '-_id description duration date',options: {
      limit: limit?limit:5} }).select("username")
      res.json({selectuser,count:selectuser.logs.length})
  }
  

})
app.listen(6700,()=>{
    console.log("done")
})