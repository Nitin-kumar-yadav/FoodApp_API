import express from 'express';
import Order from '../models/Orders.js';

const router = express.Router();

router.post('/foodData', async (req, res) => {
    try {

        let data = req.body.order_data;
        await data.splice(0, 0, { order_date: req.body.order_date })
        let eId = await Order.findOne({ 'email': req.body.email });
        console.log(eId)
        if (eId === null) {
            try {
                await Order.create({
                    email: req.body.email,
                    order_data: [data]
                })
                    .then(() => {
                        res.json({ success: true })
                    })
            } catch (error) {
                console.log(error.message);
                res.send("Server Error: " + error.message);
            }
        }

        else {
            try {
                await Order.findOneAndUpdate({
                    email: req.body.email
                },
                    { $push: { order_data: data } }
                )
                    .then(() => {
                        res.json({ success: true })
                    })
            } catch (error) {
                res.json("Server error: " + error.message)
            }
        }

    } catch (error) {
        res.status(400).json({ message: "FoodDate not found" })
        console.log(error);
    }
})

export default router;