import { Request, Response } from "express";
import Order from "../models/order";

const createOrder = async (req: Request, res: Response) => {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
};

const getUserOrders = async (req: Request, res: Response) => {
    let orders = []
    console.log(req['user'])
    if (req['user'].role === 'user') {
        const email = req['user'].email;
        orders = await Order.find({ email }).sort({ createdAt: -1 });
        console.log(orders)
    }
    else if (req['user'].role === 'admin') {
        orders = await Order.find({});
    }
    if (!orders.length) {
        res.status(201).json({ message: "there is no orders found", orders: [] });
        return
    }
    res.status(200).json({ orders });
}


export {
    createOrder,
    getUserOrders,
};
