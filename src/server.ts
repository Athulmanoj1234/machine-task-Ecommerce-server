import cors from 'cors';
import express from 'express';
import productRouter from "./Routes/ProductRouter";
import dotenv from 'dotenv';


dotenv.config()

const app = express();

app.use(cors({
    origin: `${process.env.CLIENT_URL}`,
}));
app.use(express.json());

app.use('/', productRouter);

app.listen(3008, () => {
    console.log("server and typescript is running");
})