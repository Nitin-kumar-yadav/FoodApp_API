import express from 'express';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = 'JjersdasdfF&*0q2rsdfsd'


router.post('/create', [body("email").isEmail(),
body('user').isLength({ min: 5 }),
body('password').isLength({ min: 5 })], async (req, res) => {

    const result = validationResult(req);
    if (result.isEmpty()) {
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);
        try {
            const newUser = await User.create({ user: req.body.user, email: req.body.email, password: secPassword, location: req.body.location });
            await newUser.save();
            res.status(200).json(newUser);
        }
        catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
    else {
        res.send({ errors: result.array() });
    }


})



router.post('/login', [body("email").isEmail(),
body('password').isLength({ min: 5 })], async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            const { email } = req.body;
            const usereData = await User.findOne({ email: email });

            if (!usereData) {
                return res.status(404).json({ message: "User not found", success: false });
            }

            const pwdCompare = await bcrypt.compare(req.body.password, usereData.password);

            if (!pwdCompare) {
                return res.status(404).json({ message: "Password not matched", success: false });
            }

            const data = {
                user: {
                    id: usereData.id,
                }
            }
            const token = jwt.sign(data, JWT_SECRET, { expiresIn: 3600 });
            return res.json({ token: token, message: "Login successful", success: true });


        }
        catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
    else {
        res.send({ errors: result.array() });
    }

})



export default router;