// schema
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

// Users schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});

// every time before a user is saved do this ->
userSchema.pre('save', function(next) {
    const user = this;

    // if psw is changed
    if (!user.isModified('password')) {
        return next();
    }

    //  if pervious is true -> use bcrypt to hash it
    try {
        bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) {
                throw err;
            }
            user.password = hash;
            return next();
        });

    } catch (err) {
        return next(err);
    }
});

// compare the user password with the hashed password on the db to see if they match
userSchema.methods = {
    comparePassword: function(password) {
        const user = this;
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    reject(err);
                }
            });
        });
    },
    createToken: function () {
        const user = this;
        return jwt.sign({_id: user._id, }, process.env.JWT_SECRET, {
            expiresIn:60 * 120,
        });
    },
};


//  models
const User = mongoose.model('User', userSchema);

module.exports = {
    userSchema, User
}