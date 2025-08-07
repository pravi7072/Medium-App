import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {verify} from 'hono/jwt'
import { blogInput, updateBlog } from "@pravi7072/medium_commom";

export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SCRT:string
    },
    Variables:{
        userInfo:Object
    }
    }>();
blogRouter.use('/*',async (c,next)=>{
    const authHeader = c.req.header('Authorization');
    if(!authHeader||!authHeader.startsWith('Bearer ')){
    c.status(401)
    return c.json({msg:"Unauthorized User"})
    }
    const token=authHeader.split(' ')[1];
    try{
    const response=await verify(token,c.env.JWT_SCRT);

    c.set("jwtPayload",{id:response.id,
        email:response.email
    })
    await next();
    } catch(e){
    return c.json({msg:"Invalid token"})
    }
    
})
blogRouter.post('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate())
      const body=await c.req.json();
      const {success}=blogInput.safeParse(body);
      if(!success){
        c.status(411);
        return c.text("Invalid inputs")
      }
      const content=c.get('jwtPayload');
      const id=content.id;
      const response=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            publisheDate:body.publishDate,
            authorId:id
        }
      })
      return c.json({
        msg:"Blog posted successfuly",
        id:response.id
      })
    
})
blogRouter.put('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate())
      const body=await c.req.json()
      const {success}=updateBlog.safeParse(body);
      if(!success){
        c.status(411);
        return c.text('Invalid inputs')
      }
      try{
        const blog=await prisma.post.update({
            where:{
                id:body.id
            },
            data:{
                title:body.title,
                content:body.content,
            }
        })
        return c.json({msg:"Post updated successfully"})
      }catch(e){
        return c.json({
            msg:"Invalid post Id"
        })
      }
    
})

blogRouter.get('/all', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate())
      const blogs=await prisma.post.findMany({
        select:{
          id:true,
          title:true,
          content:true,
          publisheDate:true,
          author:{
            select:{
              name:true
            }
          }
        }
      });
    return c.json({blogs});
})
blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id")?.trim(); // Trim whitespace
  console.log("Extracted ID:", id);

  if (!id) {
    c.status(400);
    return c.json({ msg: "Post ID is required" ,
      id:"hello"
    });
  }

  // Validate ID format (UUID check)
  // const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  // if (!isUUID) {
  //   c.status(400);
  //   return c.json({ msg: "Invalid ID format" });
  // }

  try {
    const blog = await prisma.post.findFirst({
      where: { id:id }, // Ensure ID is a string
      select: {
        id: true,
        title: true,
        content: true,
        publisheDate: true,  // Fixed typo (if needed)
        author: { select: { name: true } },
      },
    });

    console.log("Blog Query Result:", blog); // Debugging log

    if (!blog) {
      c.status(404);
      return c.json({ msg: "Post not found" });
    }

    return c.json({ msg: blog
     });
  } catch (e) {
    console.error("Error fetching blog:", e);
    c.status(500);
    return c.json({ msg: "Internal Server Error" });
  }
});
blogRouter.put("/:id",async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body=await c.req.json();
  const id=c.req.param('id');
  console.log(id)
  try{
    const res=await prisma.post.update({
      where:{
        id:id
      },data:{
        title:body.title,
        content:body.content,
        publisheDate:body.publisheDate
      }
    })
    console.log(res);
    if(!res){
      c.json({msg:"Cant able to update blog"})
    }
    return c.json({msg:"Blog Updated Successfully..."})
  } catch(e){
    c.status(411);
    console.error("error",e);
  }

})
blogRouter.delete("/:id",async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id=c.req.param('id');
  try{
    const delteBlog=await prisma.post.delete({
      where:{
        id:id
      }
    })
    if(!delteBlog){
      c.status(404);
      return c.json({
        msg:"Cant delete blog.."
      })
      
    }
    return c.json({
      msg:"Blog Deleted successfully"
    })
  }catch(e){
    c.status(411)
    console.error("error",e)
  }
})
