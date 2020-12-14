const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema ({
    name: String,
    username: String,

    email: {
        type: String,
        unique: true
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    friendships: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],

    topic_of_interest: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topic'
    }],

    gender: {
        type: String,
        enum: ["", 'Female', 'Male', 'NaN', 'No comments', 'Other']
    },
    place: String,
    picture: String,
    short_about: String,
    complete_about: String,
    account_confirmed: Boolean,
    privacy_term_accepted: Boolean,

    skills: {
        type: [tring],
        required: true
    },

    education: [{
        school: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true  
        },
        fieldofstudy: {
            type: String,
            required: true
        },
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    }],
    social_media: {
        facebook: String,
        instagram: String,
        twitter: String,
        github: String,
        skype: String,
        linkedin: String,
    },
}, opts);

module.exports = mongoose.model('user',, UserSchema);