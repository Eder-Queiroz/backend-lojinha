import { Request, Response, NextFunction } from "express";
import {verify} from 'jsonwebtoken';

interface Payload {
    sub: string;
}

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {

    // receber token
    const authToken = req.headers.authorization;

    // verificar se recebemos o token
    if(!authToken) {
        res.status(401).end()
    }

    const [, token] = authToken.split(" ");

    try{

        // validar token
        const {sub} = verify(token, process.env.JWT_SECRET) as Payload;

        req.user_id = sub;

        return next();

    }catch(err) {
        res.status(401).end()
    }

}