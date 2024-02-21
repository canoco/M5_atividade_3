import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { UserServices } from "../services/user.services";

@injectable()
export class UserController {
    constructor(@inject("UserServices") private userServices: UserServices){};

    async create(req: Request, res: Response): Promise<Response> {
        const newUser = await this.userServices.create(req.body);
        return res.status(201).json({newUser});
    }

    async login(req: Request, res: Response){
        const user = await this.userServices.login(req.body);
        return res.status(200).json(user);
    }

    async retrieve(req: Request, res: Response){
        const { id } = res.locals.decodedToken;
        const user = await this.userServices.retrieve(Number(id))
        return res.status(200).json(user)
    }
}