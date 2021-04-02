const { Schema, Types, model } = require('mongoose');

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

// criteria provided by the module requirements
const UserSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [validateEmail, 'Valid Email Required'],
            match: [
                /^\S[^\n\r][a-zA-Z0-9\.]+@+\S[^\n\r][a-zA-Z]+[.]+[a-z]+/,
                'Please fill a valid email address'
            ]
        },
        thoughts: [
            {
                type: Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);

UserSchema.virtual('friendsCount').get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;