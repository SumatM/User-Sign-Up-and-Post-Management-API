const express = require("express");
const { userModel } = require("../model/user.model");

const userRoute = express.Router();

userRoute.post("/", (req, res) => {
  try {
    const {email,name} = req.body;
    let user = userModel.findOne({email})
    if(!user){
        let newuser = new userModel(req.body);
    user.save();

    res.status(200).send("Successful user sign-up.");
    }else{
        res.status(400).send('User exist')
    }
    
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = { userRoute };
