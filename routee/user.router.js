const express = require("express");
const { CreateuserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send({ message: "all the  users" });
});

userRouter.post("/signup", async (req, res) => {
  const { username, email, DOB, location, role, password } = req.body;

  let existing_user = await CreateuserModel.find({ email });
  // console.log(existing_user);
  if (existing_user.length > 0) {
    res.send({ message: "Already an existing user please login" });
  } else {
    try {
      bcrypt.hash(password, 4, async (err, hash) => {
        if (err) {
          res.send(err);
        } else {
          let user = new CreateuserModel({
            username,
            email,
            DOB,
            location,
            role,
            password: hash,
          });
          await user.save();
          res.send({ message: "signup successfull" });
        }
      });
    } catch (error) {
      res.send({ message: "error" });
    }
  }
});



userRouter.post("/login", async(req,res)=>
{
   const {email,password}=req.body;

        try {
            let user=await CreateuserModel.find({email})
            console.log(user)
   if(user.length>0)
   {
    bcrypt.compare(password, user[0].password, (err, decoded)=> {
       if(err)
       {
        res.send({"message":"wrong credentials"})
       }
       else{
        const token=jwt.sign({ userID:user[0]._id }, process.env.key);
            res.send({"message":`login sucessfull`,"token":token})
       }
    });
   }
   else{
        res.send({"message":"wrong credendials"})
   }
   
        } catch (error) {
            res.send({"message":error})
        }

 
   
})
module.exports = {
  userRouter,
};

// {
//     "username":"chandan",
//     "email":"av@gmail.com",
//     "DOB":"30/08/1999",
//     "role":"Manger",
//     "location":"Belur",
//     "password":"av@123"

//   }
