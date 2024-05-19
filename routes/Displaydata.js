import express from 'express';
import User from '../models/User.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post("/foodData", async (req, res) => {
    try {
        res.send([global.food_item, global.foodCategory])
    } catch (error) {
        console.log(error);
        res.send("server error")
    }
})


export default router;