const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');
const crypto = require('crypto');

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
    }
})

userSchema.virtual('password')
.set(function(password) {
    this._password = password;
    this.salt = uuid();
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

module.exports = mongoose.model("User", userSchema)