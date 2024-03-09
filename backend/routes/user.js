const { PrismaClient } = require("@prisma/client");
const express = require("express");
const jwt = require("jsonwebtoken")
const zod = require("zod")
const userRouter = express.Router()
const SECRET_JWT = require("../config");

const prisma = new PrismaClient()
const signupValidate = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6)
})
userRouter.post("/signup",async(req,res)=>{
    const body = req.body;

    const success = signupValidate.safeParse(body);
    if(!success){
        return res.status(403).json({msg: "Invalid Inputs"})
    }

    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: body.password
        }
    })

    if(!user){
        return res.status(403).json({msg: "error"})
    }

    const token = jwt.sign(user.id, SECRET_JWT);

    return res.json({
        msg: "User Created",
        token: token
    })
})

userRouter.post("/signin", async(req,res)=>{
    const body = req.body;

    const success = signupValidate.safeParse(body);

    if(!success){
        return res.json({msg: "Invalid Inputs"})
    }

    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    })

    if(!user){
        return res.status(403).json({msg: "User not found"})
    }
    console.log(user);

    const token = jwt.sign(user.id,SECRET_JWT);

    return res.json({token: token})
})
const passwordValidate = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
})
userRouter.put("/updatepassword", async(req,res)=>{
    const body = req.body;
    const success = passwordValidate.safeParse(body);

    if(!success){
        return res.json({msg: "Invalid Inputs"})
    }

    try{
        const user = await prisma.user.update({
            where: {
                email: body.email
            },
            data: {
                password: body.password
            }
        })
        const token = jwt.sign(user.id,SECRET_JWT);
        return res.json({token: token})
    }
    catch(e){
        res.status(403).json({error: "error"})
    }
})


module.exports = userRouter;