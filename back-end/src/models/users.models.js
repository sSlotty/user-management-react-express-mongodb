const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const userSchema = new Schema({
    firstName: {
        type: String,
        require: [true, 'firstName is required'],
        minlength: 3,

    },
    lastName: {
        type: String,
        require: [true, 'Last name is required'],
        minlength: 3
    },
    gender: {
        type: String,
        require: [true, 'Gender is required'],
        minlength: 3,
        enum: ['male', 'female']
    },
    birthDate: {
        type: Date,
        require: [true, 'Birth date is required']
    },
    image: {
        type: String,
        require: [true, 'Image is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

const userValidationSchema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    gender: Joi.string().min(3).required(),
    birthDate: Joi.date(),
    image: Joi.string().required(),
});

userSchema.methods.validateInput = function (obj) {
    const schema = userValidationSchema;
    return schema.validate(obj);
}

const User = mongoose.model('User', userSchema);

module.exports = User