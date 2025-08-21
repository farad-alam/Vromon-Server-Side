import z from "zod";

export const createUserZodSchema = z.object({
  name: z
    .string().min(2,{}).max(8),
  email: z.string,
  password: z.string,
  phone: z.string,
  picture: z.string,
  address: z.string,
});
