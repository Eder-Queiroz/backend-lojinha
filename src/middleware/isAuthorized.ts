import { Request, Response, NextFunction } from "express";
import prismaClient from "../prisma";

export default async function isAuthorized(req: Request, res: Response, next: NextFunction){
    
    try{
        const user = await prismaClient.user.findFirst({
            where: {
                id: req.user_id
            },
            select: {
                role: true
            }
        });
    
        if(!user || user.role !== 'admin') {
            return res.status(401).end();
        }

        return next();

    }catch(err) {
        return res.status(401).end();
    }

}