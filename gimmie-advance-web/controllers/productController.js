import Product from "../models/productModel.js";

export const getProductController = async(req,res) => {
    try{
        
        const prodcuts = await Product.find();
        res.status(200).send(prodcuts);

    }catch(error){
        console.log(error);
    }
}

export const addProductController = async(req,res) => {
    try{
        const  newProdcuts = new Product(req.body);
        await newProdcuts.save();
        res.status(200).send("Product Added succesfully!");

    }catch(error){
        console.log(error);
    }
}

export const updateProductController = async(req,res) => {
    try{
        await Product.findOneAndUpdate({_id:req.body.productId}, req.body, {new: true});
        res.status(201).json("Product Update Succesfully!")

    }catch(error){
        res.status(400).send(error);
        console.log(error);
    }
}

export const deleteProductController = async(req,res) => {
    try{
        await Product.findOneAndDelete({_id:req.body.productId});
        res.status(201).json("Product Delete Succesfully!")

    }catch(error){
        res.status(400).send(error);
        console.log(error);
    }
}

export const getOneProduct = async(req,res) => {
    try{
        const product = await Product.findOne({_id:req.body.productId});
        res.send(product);
    }catch{
        res.status(400).send({message: 'Product Not Found'});
    }
}


