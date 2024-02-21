import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import {
    UserCreation,
    UserLogin,
    UserLoginReturn,
    UserReturn,
} from "../interfaces/user.interfaces";
import { userLoginReturnSchema, userReturnSchema } from "../schemas/user.schemas";

@injectable()
export class UserServices {
    async create(data: UserCreation): Promise<UserReturn> {
        const email = await prisma.user.findFirst({where: {email: data.email}}) 
        if (email) {
            throw new AppError("User already registered", 409)
        }
        
        data.password = await bcrypt.hash(data.password, 10);
        const newUser = await prisma.user.create({ data });
        return userReturnSchema.parse(newUser);
    }

    async login({ email, password }: UserLogin): Promise<UserLoginReturn> {
        const userFound = await prisma.user.findUnique({ where: { email } });

        if (!userFound) {
            throw new AppError("Invalid credentials", 401);
        }

        const wrightPassword = await bcrypt.compare(password, userFound.password);
        
        if (!wrightPassword) {
            throw new AppError("Invalid credentials", 401);
        }

        const user = userReturnSchema.parse(userFound);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
            expiresIn: "12h",
        });

        return userLoginReturnSchema.parse({ user, token });
    }

    async retrieve(id: number) {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        return userReturnSchema.parse(user);
    }   
}
