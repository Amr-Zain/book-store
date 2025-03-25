import { Request, Response } from "express";
import Order from "../models/order";
import User from "../models/user";

const createOrder = async (req: Request, res: Response ) => {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
};

const getUserOrders = async (req: Request, res: Response) => {
    let orders =[]
    if(req['user'].role ==='user'){
        const id = req['user'].userId;
        const { email } = await User.findOne({ _id: id });
        if (!email) res.status(404).json({ message: 'user not Found' })
        orders = await Order.find({ email }).sort({ createdAt: -1 });
    }
    if (req['user'].role ==='admin') {
        orders = await Order.find({});
    }
    if(!orders.length)res.status(404).json({ message: "there is no orders found" });
    res.status(200).json({orders});
}


export {
    createOrder,
    getUserOrders,
};
