import { NextFunction, Response } from 'express';
import { validateToken } from '../utils/jwt';

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['authorization'];
    if (!token || !token.startsWith('Bearer ')) {
        return next();
    }
    token = token.split(' ')[1];
    try {
        const user = validateToken({ token });
        req['user'] = user;
        next();
    } catch (error) {
        console.error('Token is invalid:', error);
        next();
    }
};


export default authenticateUser;
