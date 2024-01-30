import { JWT_SECRET } from '../config/config.js';
import User from '../models/User.js';
 import jwt from 'jsonwebtoken';


export const register = async (req, res) => {

    // 404 not found
    // 500 server error
    // 403 unauthorized
    // 400 bad request

    try {

        // const email = req.body.email;
        // const username = req.body.username;
        // const password = req.body.password;

        const { password, userName, email } = req.body;


        const isUserExists = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { userName: userName.toLowerCase() },
            ]
        });

        if (isUserExists) {
            return res.status(400).send("email or username already exists");
        }

        const newUser = new User({
            userName: userName,
            password: password,
            email: email
        });

        await newUser.save();

        newUser.password = undefined;

        return res.status(201).send(newUser);
    } catch (err) {
        console.log("error at register User", err.message);
        res.send("something went wrong" + err.message);
    }


};

export const login = async (req, res) => {

    try {
        const { email, password } = req.body;
 
        const isUserExists = await User.findOne({ email: email.toLowerCase() }).select("+password");

        if (!isUserExists) {
            return res.status(400).send("Invalid Email please provide a valid email");
        }
        // password checking

        const isPasswordCorrect = await isUserExists.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(400).send("Incorrect password");
        }

        // token generation

        const expiresIn = 7 * 24 * 60 * 60; // 7 days

        const token = jwt.sign({ _id: isUserExists._id }, JWT_SECRET, { expiresIn });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: expiresIn * 1000
        });

        isUserExists.password = undefined;

        res.status(200).send({ ...isUserExists.toJSON(), expiresIn });

    } catch (err) {
        console.log("error at loginUser", err);
        res.status(400).send(err.message);
    }

};