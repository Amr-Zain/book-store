
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


interface IUser extends Document {
    email: string;
    password: string;
    username: string;
    role: 'user' | 'admin';
    comparePassword(canditatePassword: string): Promise<boolean>;
  }
const userSchema = new mongoose.Schema<IUser>({
    email: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, 
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
        default: 'user', 
    },
    }, {
    timestamps: true,
    });

    userSchema.pre('save', async function(next) {
        if (!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 10);
        next();
    });
    userSchema.methods.comparePassword = async function (canditatePassword) {
        const isMatch = await bcrypt.compare(canditatePassword, this.password);
        return isMatch;
    };
const User = mongoose.model('User', userSchema);

export default User;