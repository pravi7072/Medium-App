import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from 'hono/jwt'
import { signinInput, signupInput } from "@pravi7072/medium_commom";

export const userRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SCRT:string
    }
}>();
userRouter.post('/signup',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    
    const body=await c.req.json();
    const {success}=signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.text("invalid inputs")
    }
    try{
      const user=await prisma.user.create({
        data:{
          name:body.name,
          email:body.email,
          password:body.password,
        },
      })
      const payload={
        id:user.id,
        email:body.email
      }
      const token=await sign(payload,c.env.JWT_SCRT);
      return c.text(token)
    } catch(e){
      c.status(402)
      return c.json({
        msg:"Error during sign in"
      })
    }
  })
  userRouter.post('/signin',async (c)=>{
    const prisma=new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body=await c.req.json();
    const {success}=signinInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.text('Invalid credentials')
    }
   try{
    const user=await prisma.user.findUnique({
      where:{
        email:body.email,
        password:body.password
      }
    })
    if(!user){
      return c.json({msg:"Invalid User check your credentials"})
    }
    const jwt=await sign({id:user.id,email:user.email},c.env.JWT_SCRT)
    return c.json({jwt:jwt,
      msg:"successfully signed in"})
   } catch(e){
    c.status(402)
    return c.json({
      msg:"Error during signin"
    })
   }
  })
