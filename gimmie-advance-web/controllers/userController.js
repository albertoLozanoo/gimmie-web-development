import User from "../models/userModel.js";


export const loginController = async(req,res) => {
    try{
        const {username,password} = req.body;
        var username2 = req.body[0];
        console.log(req.body);
        
        const user = await User.findOne({username2, password});
       
        if(user){
            res.status(200).send(user);
        } else{
            res.json({
                message: "Login Fail",
                user,
            });
        }

    }catch(error){
        console.log(error);
    }
}

export const registerController = async(req,res) => {
    try{
        const newUser = new User({...req.body,verified:  true});
        await newUser.save();
        res.status(200).send("User Added succesfully!");

    }catch(error){
        console.log(error);
    }
}

export const getCustomersController = async(req,res) => {
    try{
        const customer = await User.find();
        res.send(customer);

    }catch(error){
        console.log(error);
    }
}

export const updateUserController = async(req,res) => {
    try{
        await User.findOneAndUpdate({_id:req.body.userId}, req.body, {new: true});
        res.status(201).json("User Update Succesfully!")

    }catch(error){
        res.status(400).send(error);
        console.log(error.toJSON());
    }
}

