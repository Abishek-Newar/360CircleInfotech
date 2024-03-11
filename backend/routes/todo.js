const { PrismaClient } = require("@prisma/client");
const express = require("express");
const jwt = require("jsonwebtoken")
const zod = require("zod")
const todoRouter = express.Router()
const SECRET_JWT = require("../config");
const prisma = new PrismaClient();
const authMiddleware = require("../middlewares/authMiddlewares")
const todoValidate = zod.object({
    userId: zod.string(),
    title: zod.string(),
    description: zod.string()
})
todoRouter.use(authMiddleware);
todoRouter.post("/add", authMiddleware, async(req,res)=>{
    const body = req.body;
    const userId = req.userId;
    const success = todoValidate.safeParse(body);
    if(!success){
        return res.status(403).json({msg: "invalid inputs"})
    }

    try{
         await prisma.todo.create({
            data: {
                title: body.title,
                description: body.description,
                 authorId: userId   
            }
        })

        return res.json({msg:" todo added"})
    }
    catch(e){
        console.log(e)
        return res.status(403).json({error: "toso add error"})
    }
})

todoRouter.get("/bulk",authMiddleware, async(req,res)=>{
    try{
        const todos = await prisma.todo.findMany({
            where: {
                authorId: req.userId
            }
        });
        return res.json({todos});
    }
    catch(e){
        return res.status(404).json({msg: "get error"})
    }
})
todoRouter.put("/updatetodo",authMiddleware, async(req,res)=>{
    const body = req.body;
    const success = todoValidate.safeParse(body);
    if(!success){
        return res.status(403).json("invalid inputs")
    }
    try{
        const todos = await prisma.todo.update({
            where:{
                id: body.id
            },
            data: {
                title: body.title,
                description: body.description
            }
        })
        return res.json({msg: "updated todo"})
    }
    catch(e){
        console.log(e)
        return res.status(403).json({msg: "erro updating todo"});
    }
})

todoRouter.put("/update", authMiddleware, async(req,res)=>{
    const body = req.body;
    const success = todoValidate.safeParse(body);
    if(!success){
        return res.status(403).json({msg: "invalid inputs"})
    }
    console.log(body);
    try{
        const todo = await prisma.todo.update({
            where: {
                id: body.id
            },
            data: {
                done: true
            }
        })
        return res.json({msg: "todo updated"})
    }
    catch(e){
        console.log(e);
        return res.status(403).json({eror: "update error"})
    }

})

todoRouter.delete("/delete",authMiddleware, async(req,res)=>{
    const body = req.body;
    console.log(body)
    const success = todoValidate.safeParse(body);
    if(!success){
        return res.status(403).json({msg: "invalid inputs"})
    }

    try{
        const todo = await prisma.todo.delete({
            where: {
                id: body.id
            }
        })
        return res.json({msg: "todo deleted"})
    }
    catch(e){
        return res.status(403).json({eror: "delete error"})
    }
})
module.exports = todoRouter;



