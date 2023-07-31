const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { SECRET } = require('../config');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    subscribers: {
        type: Number,
        default: 0
    },
    subscribedUsers: {
        type: [String]
    }
}, {
    timestamps: true
});

//during signup
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 12);

    next();
});

//during login
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

//if password is same(i.e loged in)(1st time login)->generate jwt token
UserSchema.methods.generateJWT = async function () {
    let payload = {
        id: this._id,
        name: this.name,
        email: this.email
    }

    return jwt.sign(payload, SECRET, { expiresIn: '7 days' });
};

module.exports = mongoose.model('User', UserSchema);