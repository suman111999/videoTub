const User = require('../models/User');

const signup = async (req, res) => {
    try {
        const { name, email } = req.body;
        const isUserNameExist = await validateName(name);

        if (isUserNameExist) {
            return res.status(400).json({
                message: `Name ${name} already exist.`,
                success: false
            });
        };

        let isUserEmailExist = await validateEmail(email);

        if (isUserEmailExist) {
            return res.status(400).json({
                message: `Email ${email} already exist.`,
                success: false
            });
        };

        const newUser = await User.create({
            ...req.body
        });

        return res.status(201).json({
            message: `User ${name} successfully registered.`,
            success: true,
            newUser
        });

    } catch (e) {
        return res.status(400).json({
            message: `failed to registered.`,
            success: false
        });
    }
};

const signin = async (req, res) => {
    try {
        const { name, password: userPassword } = req.body;
        const user = await User.findOne({ name });
        if (!user) {
            //404->resource not found
            return res.status(404).json({
                message: `User ${name} is not registered.Please signup.`,
                success: false
            });
        };

        if (user && !await user.comparePassword(userPassword)) {
            return res.status(401).json({
                message: 'Incorrect password',
                success: false
            });
        };

        //now password is verified->means logedin
        //now generate jwt token
        const token = await user.generateJWT()
        // let payload={
        //     name:user.name,
        //     email:user.email,
        //     // token: `Bearer ${token}`,
        //     // expiresIn: 168
        // }

        const { password, ...others } = user._doc;

        return res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others);

    } catch (e) {
        return res.status(400).json({
            message: `failed to login.`,
            success: false
        });
    }
};

const googleAuth = async (req, res) => {

};

const validateName = async (name) => {
    let user = await User.findOne({ name });
    return user ? true : false;
};

const validateEmail = async (email) => {
    let user = await User.findOne({ email });
    return user ? true : false;
};

module.exports = {
    signin,
    signup,
    googleAuth
};


