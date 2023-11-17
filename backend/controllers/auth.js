const User = require("../models/Users");
const bcryptjs = require("bcryptjs");
const signup = async (req, res, next) => {

    const { username, email, password } = req.body;

    let userEmail = await User.findOne({ email });

    if (userEmail) {
        res.status(400).json({ success: false, message: "Email Already exists ." })
    } else if (await User.findOne({ username })) {
        res.status(400).json({ success: false, message: "Username Already exists ." })
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    try {

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ success: true, message: "Account created Successfully." });

    } catch (error) {

        next(error);

    }

}

module.exports = { signup };