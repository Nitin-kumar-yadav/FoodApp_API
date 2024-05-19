import express, { json } from 'express';
import dotenv from "dotenv";
import { mongoDB } from './db.js';
import Create from './routes/Create.js';
import Displaydata from './routes/Displaydata.js';
import OrderData from './routes/OrderData.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use('/api', Create);
app.use('/api', Displaydata);
app.use("/api", OrderData)

try {
    app.listen(process.env.PORT, () => {
        mongoDB()
        console.log(`listening on port ${process.env.PORT}`);
    })

} catch (error) {
    console.log(error)
}