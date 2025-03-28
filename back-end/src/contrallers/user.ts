import { Request, RequestHandler, Response } from "express";
import User from "../models/user";
import { createJWT } from "../utils/jwt";

export const register: RequestHandler = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    if (!email || !password) res.status(400).json({ message: 'please provide email and password' })
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
        res.status(409).json({ message: 'Email already exists' });
    }

    // first registered user is an admin
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const newUser = new User({ username, email, password, role });
    const user = await newUser.save();

    const accessToken = createJWT({ payload: { userId: user._id, role: user.role, email } });
    res.status(201).json({ user, accessToken });
};


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Please provide email and password' });
    }
    const user = await User.findOne({ email });

    if (!user) {
        res.status(400).json({ message: 'Invalid Credentials' });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        res.status(400).json({ message: 'Invalid Credentials' });
    }
    const accessToken = createJWT({ payload: { userId: user._id, role: user.role, email } });
    res.status(201).json({ user, accessToken });
}