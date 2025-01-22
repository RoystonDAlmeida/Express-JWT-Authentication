// Importing modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const jwt = require("jsonwebtoken");
const User = require("./models/user");

const app = express();

app.use(express.json());

// Handling post request
app.post("/login",
    async (req, res, next) => {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        let existingUser;
        try {
            existingUser =
                await User.findOne({ email: email });
        } catch {
            const error =
                new Error(
                    "Error! Something went wrong."
                );
            return next(error);
        }
        if (!existingUser
            || existingUser.password
            != password) {
            const error =
                Error(
                    "Wrong details please check at once"
                );
            return next(error);
        }
        let token;
        try {
            //Creating jwt token
            token = jwt.sign(
                {
                    userId: existingUser.id,
                    email: existingUser.email
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
            );
        } catch (err) {
            console.log(err);
            const error =
                new Error("Error! Something went wrong.");
            return next(error);
        }

        res
            .status(200)
            .json({
                success: true,
                data: {
                    userId: existingUser.id,
                    email: existingUser.email,
                    token: token,
                },
            });
    });

// Handling post request(While unpacking use the same column name while creating the ORM)
app.post("/signup",
    async (req, res, next) => {
        const {
            name,
            email,
            password
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newUser =
            User({
                name,
                email,
                password,
            });

        try {
            await newUser.save();
        } catch {
            const error =
                new Error("Error! Something went wrong.");
            return next(error);
        }
        let token;
        try {
            token = jwt.sign(
                {
                    userId: newUser.id,
                    email: newUser.email
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
            );
        } catch (err) {
            const error =
                new Error("Error! Something went wrong.");
            return next(error);
        }
        res
            .status(201)
            .json({
                success: true,
                data: {
                    userId: newUser.id,
                    email: newUser.email,
                    token: token
                },
            });
    });

//Connecting to the database
mongoose
    .connect(process.env.MONGODB_CONNECTION_URL)
    .then(() => {
        app.listen(process.env.PORT,
            () => {
                console.log(`Server is listening on port ${process.env.PORT}`);
            });
    })
    .catch(
        (err) => {
            console.log("Error Occurred");
        }
    );

// Unpacking user details by decoding the token
app.get('/accessResource',(req,res)=>{
    // Step 1: Accessing the token from req.headers property
    const token=req.headers.authorization.split(' ')[1]
    
    // Step 2: Checking if the token is initialised
    if(!token){
        res.status(200)
            .json({
                success:false,
                message:"Error! Token was not provided"
            })
    }

    // Step 3: Validating the extracted token using jwt.verify
    const decodedToken=jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.status(200).json(
        {
            success:true,
            data:{
                userId:decodedToken.userId,
                email:decodedToken.email
            }
        }
    )
})