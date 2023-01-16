import express from "express";
import {loginController,registerController,getCustomersController,updateUserController } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login",loginController);

userRouter.post("/register",registerController);

userRouter.get("/getcustomers",getCustomersController);

userRouter.post("/updateuser",updateUserController);



export default userRouter;

