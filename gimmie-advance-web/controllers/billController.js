import Bill from "../models/billModel.js";


export const addBillController = async(req,res) => {
    try{
        const  newBill = new Bill(req.body);
        await newBill.save();
        res.send("Bill Added succesfully!");

    }catch(error){
        console.log(error);
    }
}

export const getBillsController = async(req,res) => {
    try{
        const bill = await Bill.find();
        res.send(bill);

    }catch(error){
        console.log(error);
    }
}




