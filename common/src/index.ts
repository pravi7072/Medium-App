import {z} from 'zod'
export const signupInput=z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
})
export const signinInput=z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
})

export const blogInput=z.object({
    title:z.string(),
    content:z.string(),
    publisheDate:z.date().optional()
})
export const updateBlog=z.object({
    title:z.string(),
    content:z.string(),
    id:z.string()
})

export type SignupInput=z.infer<typeof signupInput>;
export type SigninInput=z.infer<typeof signinInput>;

export type BlogInput=z.infer<typeof blogInput>;
export type UpdateBlog=z.infer<typeof updateBlog>;
