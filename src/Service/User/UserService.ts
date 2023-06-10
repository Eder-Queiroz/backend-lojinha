import prismaClient from "../../prisma";
import {hash, compare} from 'bcryptjs'
import {sign} from 'jsonwebtoken'

interface UserRequest {
    name: string;
    password: string;
    role: string;
}

interface AuthRequest{
    name: string;
    password: string;
}

export default class UserService {

    async createUser({name, password, role}: UserRequest) {

        if(!name) {
            throw new Error('Name incorrect!');
        }

        const passswordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                name,
                password: passswordHash,
                role
            },
            select: {
                id: true,
                name: true,
                role: true
            }
        })

        return user

    }

    async auth({name, password}: AuthRequest) {
        
        // verificar se usuario existe
        const user = await prismaClient.user.findFirst({
            where: {
                name: name
            }
        })

        if(!user) {
            throw new Error('User Name / password incorrect!');
        }

        // verificando senha

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error('User Name / password incorrect!');
        }

        const token = sign(
            {
                name: user.name,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        );

        return {id: user.id, name: user.name, role: user.role, token: token}

    }

    async getOneById(user_id: string) {

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                role: true
            }
        })

        return user;

    }

}