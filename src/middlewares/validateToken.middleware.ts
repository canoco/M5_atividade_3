import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";
import { NextFunction, Request, Response } from "express";

class ValidateToken {
    static validateToken(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new AppError("Token is required", 401);
        }

        const [_, token] = authorization.split(" "); 
        jwt.verify(token, process.env.JWT_SECRET!);

        res.locals.decodedToken = jwt.decode(token);
        return next();
    }
}

export const validateToken = ValidateToken.validateToken;
