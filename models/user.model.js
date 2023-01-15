const mongoose=require("mongoose")


createuserScheme=mongoose.Schema({
    username:String,
    email:String,
    DOB:String,
    role:String,
    location:String,
    password:String,
    confirmPassword:String,

})

CreateuserModel=mongoose.model("user",createuserScheme)

module.exports={
    CreateuserModel
}