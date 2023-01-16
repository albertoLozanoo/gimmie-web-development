import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
    
    customerName :{type: String,required: true},
    customerId: {type: String, required: true},
    customerPhone: {type: Number,required:true},
    customerAddress: {type: String,required:true},
    totalAmount: {type:Number,required: true},
    subTotal: {type:Number,required: true},
    tax: {type:Number,required: true},
    paymentMethod: {type:String,required: false},
    cartItems: {type: Array, required: true}
}, {
    timestamps: true
});

const Bill = mongoose.model("Bill",billSchema);
export default Bill;