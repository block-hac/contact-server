const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});

UserSchema.set('toJSON', {
    virtuals: true
});

module.exports = User = mongoose.model('user', UserSchema);