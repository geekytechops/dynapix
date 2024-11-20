const UserModel = require('../models/userModel');
const session = require('express-session');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDetails = await UserModel.getUserByEmail(email);
        console.log(userDetails)

        if (!userDetails) {
            return res.status(400).json({ message: "User not found" });
        }

        if (password !== userDetails.password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        req.session.user = {
            id: userDetails.user_id,
            username: userDetails.username,
            email: userDetails.email,
            isLoggedin:true
        };

        res.json({
            message: "Login successful",
            user: req.session.user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.checkAuth = (req, res, next) => {
    if (req.session.user) {
        next(); // User is authenticated, proceed to the next middleware or route
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};


exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.json({ message: "Logout successful" });
    });
};


exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = await UserModel.createUser({ username, email, password });
        res.status(201).json({
            message: "User registered successfully",
            user: newUser
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to register user" });
    }
};
