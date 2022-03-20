const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const Todo = require('./todo.model');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        trim: true,
        require: true
    },
    hashed_password: {
        type: String,
        require: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    resetPasswordLink: {
        type: String,
        default: ""
    }
})

userSchema.virtual('password')
.set(function(password) {
    this._password = password;
    this.salt = uuidv4();
    this.hashed_password = this.encryptPassword(password)
})
.get(function() {
    return this._password
})

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    
    encryptPassword: function(password) {
        if(!password) return "";
        try {
            return crypto.createHmac('sha1', this.salt)
                        .update(password)
                        .digest('hex')
        } catch (err) {
            return this._password; 
        }
    }
}

userSchema.pre('remove', function(next) {
    Todo.remove({postedBy: this._id}).exec();
    next();
});

module.exports = mongoose.model("User", userSchema)