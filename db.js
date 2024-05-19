import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();



export const mongoDB = async () => {
    mongoose.connect(process.env.DATABASE_URL, async (err, result) => {
        if (err) {
            console.log(err);
        } else {
            try {

                console.log("connection established");
                const fetched_data = await mongoose.connection.db.collection("food_item");
                fetched_data.find({}).toArray(async (err, data) => {

                    const foodCategory = await mongoose.connection.db.collection("foodCategory");
                    foodCategory.find({}).toArray((err, catData) => {
                        if (err) {
                            console.log(err);
                        } else {
                            global.food_item = data;
                            global.foodCategory = catData;
                        }
                    })
                    // if (err) {
                    //     console.log(err);
                    // } else {
                    //     global.food_item = data;

                    // }
                });

            } catch (error) {
                console.log(error);
            }

        }
    });
};

