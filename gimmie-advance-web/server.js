import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./routes/productsRoutes.js";
import userRouter from "./routes/usersRoutes.js";
import billRouter from "./routes/billsRoutes.js";

dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://0.0.0.0:27017/gimmiedb').then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err.message);
});

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :false}));
app.use(morgan("dev"));

//api-routes
app.use('/api/products/',productRouter);

app.use('/api/users/',userRouter);

app.use('/api/bills/',billRouter);

//port
const PORT = process.env.PORT || 5000;

//Listen
app.listen(PORT, () => {
    console.log(`Server at running on the port: http://localhost:${PORT}`);
});