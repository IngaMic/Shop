import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// desc    Auth user, get token
// route   POST /api/users/login
// access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    //method stored in userSchema to check password
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,

            token: generateToken(user._id),
        });
    } else {
        //unauthorised
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// desc    Get user profile
// route   GET /api/users/profile
// access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        //User not found
        res.status(404);
        throw new Error("User not found");
    }
});

// desc    Create new user
// route   POST /api/users
// access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        //Bad request
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        //mongoose middleware later for password
        password,
    });

    if (user) {
        //was created
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

export { authUser, getUserProfile, registerUser };
