const express = require("express")
const zod = require("zod")
const { Account } = require("../db")
const authMiddleware = require("../middleware")
const mongoose = require("mongoose")

const accountRouter =  express.Router()

accountRouter.get('/balance', authMiddleware, async (req, res) => {
    const id = req.userId
    const account = await Account.findOne({userId: id})
    if(account){
        res.json({balance: account.balance})
    }
})

accountRouter.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    const body = req.body
    const debitAccount = await Account.findOne({userId: req.userId}).session(session)
    if(debitAccount.balance < body.amount){
        await session.abortTransaction()
        return res.status(400).json({Message: "Insufficient balance"})
    }

    const creditAccount = await Account.findOne({userId: body.to}).session(session)
    if(!creditAccount){
        await session.abortTransaction()
        return res.status(400).json({Message: "Invalid Account"})
    }

    //debit account
    await Account.updateOne({userId: req.userId}, {
        $inc: {
            balance: -body.amount
        }
    }).session(session)

    //credit account
    await Account.updateOne({userId: body.to}, {
        $inc: {
            balance: body.amount
        }
    }).session(session)

    await session.commitTransaction()
    res.json({Message: "Transfer Successful"})
})

module.exports = {
    accountRouter
}