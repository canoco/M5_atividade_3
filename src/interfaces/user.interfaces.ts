import { z } from "zod";
import { userCreationSchema, userLoginReturnSchema, userLoginSchema, userReturnSchema, userSchema } from "../schemas/user.schemas";

type User = z.infer<typeof userSchema>;
type UserCreation = z.infer<typeof userCreationSchema>;
type UserReturn = z.infer<typeof userReturnSchema>;
type UserLogin = z.infer<typeof userLoginSchema>;
type UserLoginReturn = z.infer<typeof userLoginReturnSchema>;

export { User, UserCreation, UserLogin, UserReturn, UserLoginReturn };
