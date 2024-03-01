const express = require("express")
const userRouter = express.Router()
const {JWT_SECRET} = require("../config")
const { User, Account } = require("../db")
const jwt = require("jsonwebtoken")
const zod = require("zod")
const authMiddleware = require("../middleware")

userRouter.get('/me', async (req, res) => {
    const bearerToken = req.headers.authorization
    if(bearerToken && bearerToken.startsWith("Bearer ")){
        const token = bearerToken.split(" ")[1]
        const id = jwt.decode(token, JWT_SECRET)
        if(id){
            const user = await User.findOne({_id: id.userId})
            if(user){
                return res.json({"success": "Verified"})
            }
            else{
                return res.json({"failure": "An error occurred"})
            }
        }
        else{
            res.json({"failure": "An error occurred"})
        }
    }    
    else{
        return res.json({"failure": "An error occurred"})
    }
})

userRouter.post('/signup', async (req, res) => {
    const body = req.body
    const schema = zod.object({
        username: zod.string().email(),
        firstName: zod.string(),
        lastName: zod.string(),
        password: zod.string()
    })
    const valid = schema.safeParse(body)
    if(!valid.success){
        return res.status(411).json({message: "Email already taken / Incorrect inputs"})
    }

    const entry = await User.findOne({username: body.username})
    if(entry){
        return res.status(411).json({message: "Email already taken / Incorrect inputs"})
    }

    const newUser = await User.create({
        username: body.username,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password
    })
    const newAccount = await Account.create({
        userId: newUser._id,
        balance: 1 + Math.random() * 10000
    })

    const userId = newUser._id
    const token = jwt.sign({userId}, JWT_SECRET)
    
    res.json({
        message: "User created successfully",
	    token: token
    })
})

userRouter.post('/signin', async (req, res) => {
    const schema = zod.object({
        username: zod.string().email(),
        password: zod.string()
    })
    const body = req.body
    const valid = schema.safeParse(body)
    if(!valid.success){
        return res.status(411).json({message: "Error while logging in"})
    }

    const user = await User.findOne({username: body.username, password: body.password})
    if(user == null){
        return res.status(411).json({message: "Error while logging in"})
    }

    const token = jwt.sign({userId: user._id}, JWT_SECRET)
    res.json({token: token})
})

userRouter.put('/', authMiddleware, async (req, res) => {
    const schema = zod.object({
        password: zod.string().min(6).optional(),
        firstName: zod.string().optional(),
        lastName: zod.string().optional()
    })
    const body = req.body
    const valid = schema.safeParse(body)
    if(!valid.success){
        return res.status(411).json({message: "Error"})
    }
    const id = req.userId
    await User.updateOne({_id: id}, body)
    res.json({message: "Updated successfully"})
})

userRouter.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter || ""
    const results = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }, 
        },{
            lastName: {
                "$regex": filter
            }
        }]
    })

    if(results){
        res.json({
            users: results.map((user) => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                id: user._id
            }))
        })
    }
})

module.exports = userRouter