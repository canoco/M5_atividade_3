import { z } from "zod";

export const userSchema = z.object({
   id: z.number().positive(),
   name: z.string().min(1),
   email: z.string().min(1).email(),
   password: z.string().min(8)
});

export const userCreationSchema = userSchema.omit({
   id: true,
})

export const userReturnSchema = userSchema.omit({
   password: true,
})

export const userLoginSchema = userSchema.omit({
   id: true,
   name: true,
})

export const userLoginReturnSchema = z.object({
   token: z.string().min(1),
   user: userReturnSchema,
})
