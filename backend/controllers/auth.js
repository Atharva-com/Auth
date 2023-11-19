const User = require("../models/Users");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

const signin = async (req, res, next) => { 

    const { email, password } = req.body;
    try {

        const validUser = await User.findOne({ email });
        if (!validUser) {
            res.status(404).json({ success: false, message: "User not found." })
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            res.status(400).json({ success: false, message: "Invalid Credentials." })
        }
        const { password: pass, ...rest } = validUser._doc;
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const expiryDate = new Date(Number(new Date()) + 1 * 24 * 60 * 60 * 1000);
        res.cookie("access_token", token, { httpOnly: true, expires: expiryDate }).status(200).json({ success: true, message: "Logged in Successfully.", user: rest });
        
    } catch (error) {

        next(error);
        
    }
 }

module.exports = { signup, signin };