import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    email: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    order_data: {
        type: Array,
        required: true
    }
})

const Order = mongoose.model('Order', OrderSchema);

export default Order;