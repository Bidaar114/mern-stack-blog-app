import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const {Schema} = mongoose;

const userSchema = new Schema({
    email:{
        type: String,
        lowercase:  true,
        unique: true,
        required: true,
        validate: [validator.isEmail, "Please enter a Valid email"]
    },

    userName:{
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true,
        validate: [
            {
                validator : value => validator.isStrongPassword(value),
                message: "Please enter a Strong Password"
        }
        ]
    }
},{
timestamps: true
});



userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (givenPassword) {
    return await bcrypt.compare(givenPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;


