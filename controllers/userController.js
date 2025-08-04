const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const userModel = require('../models/UserModel');


//Register controller
const usercontroller = async (req, res) => {
    try {
        const { username, email, password, contact } = req.body
        console.log("registration body", req.body);
        //validation
        if (!username || !email || !password || !contact) {
            return res.status(500).send({
                success: false,
                message: "Please provide All Fields"
            });
        }
        //check user existance
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            res.status(400).send({
                success: false,
                message: "User Already Exist"
            });
        }
        //hashing password
        const hashPassword = await bcrypt.hash(password, 10);

        //save User
        const newUser = new userModel({ username, email, password: hashPassword, contact })
        await newUser.save();

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user: newUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Register API",
            error: error.message
        });
    }
}

//Login Controller
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Email and password is required"
            });
        }

        //find user
        console.log("login Attempt email", email);
        const user = await userModel.findOne({ email: email.trim().toLowerCase() });
        console.log("Found user", user);
        //validation
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Invalid Email or Password"
            });
        }
        //match Password
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(500).send({

                success: false,
                message: 'Invalid Credentials'
            });
        }
        //Token Generate
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "100d" });
        user.password = undefined;

        res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Login API",
            error
        });
    }
}

//get category
const GetUserController = async (req, res) => {
    try {
        const User = await userModel.find({})
        if (!User) {
            res.status(404).send({
                success: false,
                message: "No User Found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Successfully Get User",
            User
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In get User API",
            error
        });
    }
}


module.exports = { usercontroller, loginController, GetUserController }