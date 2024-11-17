const UserModel = require('../models/userModel');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.getUserByEmail(email);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        
        res.json({
            message: "Login successful",
            user: {
                id: user.user_id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
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
