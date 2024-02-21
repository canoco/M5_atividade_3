import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

class ValidateBodyMiddleware {
    static validateBody(schema: AnyZodObject){
        return function (req: Request, res: Response, next: NextFunction) {
            req.body = schema.parse(req.body);
            return next();
        }
    }
}

export const validateBody = ValidateBodyMiddleware.validateBody;