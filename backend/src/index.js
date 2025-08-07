import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
const app = new Hono();
app.post('/api/v1/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: body.password,
        },
    });
    const mySecrete = "MySecrete";
    const payload = {
        name: body.name,
        email: body.email
    };
    const token = await sign(payload, mySecrete);
    return c.text(token);
});
// app.post('/signup',(c)=>{
// })
// app.post('/blog',(c)=>{
// })
// app.put('/blog',(c)=>{
// })
app.get('/blog:id', (c) => {
    return c.text('Hello Hono!');
});
export default app;
