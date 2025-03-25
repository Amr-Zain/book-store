import jwt from 'jsonwebtoken';
import { Role } from '../types';

const createJWT = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    return token;
};

const validateToken = ({ token }):{ _id: string,role: Role, email: string  } => jwt.verify(token, process.env.JWT_SECRET);


export {
    createJWT,
    validateToken,
};
