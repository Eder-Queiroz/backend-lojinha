import { Request, Response } from "express";
import UserService from "../../Service/User/UserService";

export default class UserController {

    async createUser(req: Request, res: Response) {

        const {name, password, role} = req.body;

        const userService = new UserService();

        const user = await userService.createUser({name, password, role});

        return res.json(user);

    }

    async login(req: Request, res: Response) {
        const {name, password} = req.body

        const userService = new UserService();

        const user = await userService.auth({name, password});

        return res.json(user);

    }

    async getUserById(req: Request, res: Response) {
        const user_id = req.user_id;

        const userService = new UserService();

        const user = await userService.getOneById(user_id);

        return res.json(user);

    }

}