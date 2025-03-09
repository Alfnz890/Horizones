import z from 'zod'

export const UserValidator = z.object({
   username: z.string().min(3, "Username must 3 characters long"),
   email: z.string().email("Invalid email format"),
   password: z.string().min(6, "Password must 6 characters long")
})