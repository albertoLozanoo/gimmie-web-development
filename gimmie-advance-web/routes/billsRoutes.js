import express from "express";
import { addBillController, getBillsController } from "../controllers/billController.js";

const billRouter = express.Router();

billRouter.get("/getbills",getBillsController);

billRouter.post("/addbills",addBillController);




export default billRouter;